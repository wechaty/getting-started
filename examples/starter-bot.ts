/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
import { 
  Wechaty,
  Contact,
  Message,
}           from 'wechaty'

import { generate } from 'qrcode-terminal'

function onScan (qrcode: string, status: number) {
  generate(qrcode)  // show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(status, qrcodeImageUrl)
}

function onLogin (user: Contact) {
  console.log(`${user} login`)
}

function onLogout(user: Contact) {
  console.log(`${user} logout`)
}

async function onMessage (msg: Message) {
  console.log(msg.toString())
}

const bot = new Wechaty()

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
.then(() => console.log('Starter Bot Started.'))
.catch(e => console.error(e))
