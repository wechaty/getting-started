const { Wechaty } = require('wechaty')
const { PuppetPadpro } = require('wechaty-puppet-padpro')

// Please change the token below to the one that you are given.
const WECHATY_PUPPET_PADPRO_TOKEN = 'your-token-here'

const puppet = new PuppetPadpro({
  token: WECHATY_PUPPET_PADPRO_TOKEN,
})

const bot = new Wechaty({
  puppet,
})

// 运行 wechaty
bot
.on('scan', (qrcode, status) => {
  console.log(`Scan QR Code to login: ${status}
  https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`)
})
.on('login', user => {
  console.log(`User ${user} login.`)
})
.on('message', message => {
  console.log(`Message: ${message}`)
})
.start()
