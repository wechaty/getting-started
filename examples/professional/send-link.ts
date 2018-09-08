
import {
  Wechaty,
  Message,
  UrlLink,
} from 'wechaty'

import { PuppetPadchat } from 'wechaty-puppet-padchat'

import { generate      } from 'qrcode-terminal'


const puppet = new PuppetPadchat()

export const wechatyBot = Wechaty.instance({
  puppet,
})

wechatyBot
  .on('scan', async (qrcode) => {
    generate(qrcode, {small: true})

  })
  .on('login', async function (user) {
    console.log(user)
  })
  .on('error', async err => {
    console.error('BOT ERROR:', `exit for ${JSON.stringify(err.message || '')}`)
  })
  .on('message', async function (m: Message) {
    if (m.text() === 'ding') {
      const link = new UrlLink({
        description : '一个段子，虽然今天看起来有点老，但却仍然形象：你用小米手机，穿凡客T恤，泡贝塔咖啡听创业讲座，宅家看哈佛公开',
        title       : 'SHE成团17年发布新歌《十七》MV 还原出道时经典造型(视频)',
        url         : 'https://view.inews.qq.com/w/WXN201809080546120A0?refer=nwx&bat_id=1114015870&cur_pos=3&grp_type=region&rg=2&openid=o04IBAE_ggt-jQaC2fgkTQUjFWWs&groupid=1536393804&msgid=3',
        thumbnailUrl: 'https://avatars2.githubusercontent.com/u/17776713?s=460&v=4',
      })
      m.say(link)
    }
  })

wechatyBot.start()