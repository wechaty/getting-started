#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
/**
 * Wechaty - Conversational RPA SDK for Chatbot Makers.
 *  - https://github.com/wechaty/wechaty
 */
import {
  Contact,
  ScanStatus,
  WechatyBuilder,
  log,
}                  from 'wechaty'

import qrcodeTerminal from 'qrcode-terminal'

function onScan (qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')
    log.info('DumpRoomMemberBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)

    qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console

  } else {
    log.info('DumpRoomMemberBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}

function onLogin (user: Contact) {
  log.info('DumpRoomMemberBot', '%s login', user)
}

const bot = WechatyBuilder.build({
  name: 'ding-dong-bot',
  puppet: 'wechaty-puppet-wechat',
})

const onReady = async () => {
  log.info('DumpRoomMemberBot', '%s ready', bot.name())

  const roomTopicRegex = /TEEC人工智能委员会/

  const dump = async () => {
    const room = await bot.Room.find({ topic: roomTopicRegex })
    if (!room) {
      log.error('DumpRoomMemberBot', 'no room found, wait 3 seconds')
      log.info('DumpRoomMemberBot', 'Tip: if you are using web protocol, you can try to say something in the room so that the puppet can discover it')
      setTimeout(dump, 3 * 1000)
      return
    }

    log.info('DumpRoomMemberBot', 'dumping members for room: %s ...', room)
    for await (const member of room) {
      console.info(member.name())
    }
    log.info('DumpRoomMemberBot', 'dumping members for room: %s ... done', room)

    process.exit(0)
  }

  dump()
}

bot.on('scan',  onScan)
bot.on('login', onLogin)
bot.on('ready', onReady)

bot.start()
  .then(() => log.info('DumpRoomMemberBot', 'DumpRoomMember Bot Started.'))
  .catch(e => log.error('DumpRoomMemberBot', e))
