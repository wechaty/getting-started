#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
// 导入Wechaty相关模块
import {
    Contact,
    Message,
    ScanStatus,
    WechatyBuilder,
    log,
  } from 'wechaty'

import qrcodeTerminal from 'qrcode-terminal'

  // 导入语雀相关模块
  import Yuque from '@yuque/sdk'

// 创建一个语雀客户端对象，使用环境变量中的token和repoId（需要提前设置）
  const yuqueClient = new Yuque({
    token:process.env.YUQUE_TOKEN
})
  const repoId = process.env.YUQUE_REPO_ID
  
  // 创建一个Wechaty实例
  const bot = WechatyBuilder.build({
    name: 'meeting-bot',
  })
  
  // 定义一个全局变量存储当前是否在会议中
  let isMeeting = false
  
  // 定义一个全局变量存储当前会议的聊天记录
  let meetingLog = ''
  
  // 定义一个全局变量存储当前会议的群聊对象
  let meetingRoom
  
  // 定义一个函数处理扫码登录事件
  function onScan (qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')
  
      log.info('MeetingBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
  
      // 在终端显示二维码图片
      qrcodeTerminal.generate(qrcode, { small: true })
    } else {
      log.info('MeetingBot', 'onScan: %s(%s)', ScanStatus[status], status)
    }
  }
  
  // 定义一个函数处理登录事件
  function onLogin (user: Contact) {
    log.info('MeetingBot', '%s login', user)
  }
  
  // 定义一个函数处理登出事件
  function onLogout (user: Contact) {
    log.info('MeetingBot', '%s logout', user)
  }
  
  // 定义一个异步函数处理消息事件
  async function onMessage (msg: Message) {
    
    // 获取消息发送者和内容
    const sender = msg.talker()
    const text = msg.text()
    console.debug(text)

    
     // 如果消息来自群聊，并且内容是 #开会 ，则开始记录会议信息，并回复“开始记录”
     if (msg.room() && text === '#开会') {
  
       // 设置当前状态为在会议中，并保存当前群聊对象和时间戳为会议标题
       isMeeting = true
       meetingRoom = msg.room()
       const timestamp = new Date().getTime()
       meetingLog = `# ${timestamp}\n\n`
  
       // 回复“开始记录”
       await msg.say('开始记录')
     }
  
     // 如果消息来自群聊，并且内容是 #结束 ，则结束记录会议信息，并回复“结束记录”
     if (msg.room() && text === '#结束') {
  
       // 设置当前状态为不在会议中，并清空当前群聊对象和时间戳为会议标题
       isMeeting = false
       meetingRoom = null
  
       // 回复“结束记录”
       await msg.say('结束记录')
     }
  
     // 如果消息来自群聊，并且内容是 #会议纪要 ，则导出会议期间的聊天记录到语雀文档中，并回复文档链接或错误信息。
     if (msg.room() && text === '#会议纪要') {
  
        try {
  
          // 调用语雀API创建一
// 调用语雀API创建一个文档，使用会议标题和聊天记录作为参数
const doc = await yuqueClient.docs.create({
    namespace: repoId,
    // title: meetingLog.split('\n')[0],
    body: meetingLog,
  })

  // 获取文档的链接地址，并回复给群聊
  const docUrl = `https://www.yuque.com/${repoId}/${doc.slug}`
  await msg.say(`会议纪要已导出到语雀文档：${docUrl}`)

} catch (err) {

  // 如果出现错误，打印错误信息，并回复给群聊
  log.error('MeetingBot', err)
  await msg.say(`导出会议纪要失败：${err.message}`)
}
}

// 如果消息来自群聊，并且当前状态是在会议中，则将消息内容追加到聊天记录中
if (msg.room() && isMeeting) {

// 获取消息发送者的昵称和内容，拼接成一行记录，并追加到聊天记录中
const name = sender ? sender.name() : '未知用户'
const line = `- ${name}: ${text}\n`
meetingLog += line
}
}

// 绑定事件处理函数到Wechaty实例上
bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)

// 启动Wechaty实例
bot.start()
.then(() => log.info('MeetingBot', 'Meeting Bot Started.'))
.catch(e => log.error('MeetingBot', e))