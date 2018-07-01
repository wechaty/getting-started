import { Wechaty, Room } from 'wechaty'

const qrTerm = require('qrcode-terminal')

const bot = new Wechaty()

bot.on('scan', (qrcode, status) => {
  qrTerm.generate(qrcode, { small: true })	// show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
    '&size=220x220&margin=20',
  ].join('')

  console.log(qrcodeImageUrl)
})

bot.on('login', user => {
  console.log(`${user} login`)
})

bot.on('message', async function (msg) {
  console.log(msg.toString())
})

bot.start()