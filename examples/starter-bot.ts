/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
import {
  Contact,
  Message,
  ScanStatus,
  Wechaty,
}               from 'wechaty'

import { generate } from 'qrcode-terminal'

function onScan (qrcode: string, status: ScanStatus) {
  generate(qrcode)  // show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.info(`${ScanStatus[status]}(${status})`, qrcodeImageUrl)
}

function onLogin (user: Contact) {
  console.info(`${user} login`)
}

function onLogout (user: Contact) {
  console.info(`${user} logout`)
}

async function onMessage (msg: Message) {
  console.info(msg.toString())
}

const bot = new Wechaty({ name: 'wechaty' })

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
  .then(() => console.info('Starter Bot Started.'))
  .catch(e => console.error(e))
