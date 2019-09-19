const { Wechaty } = require('wechaty')
const { PuppetMacpro } = require('wechaty-puppet-macpro')
const qrTerm = require('qrcode-terminal')

// Please change the token below to the one that you are given.
const WECHATY_PUPPET_MACPRO_TOKEN = 'puppet_macpro_7a4814925237a17f'

const puppet = new PuppetMacpro({
  token: WECHATY_PUPPET_MACPRO_TOKEN,
})

const bot = new Wechaty({
  puppet,
})

// 运行 wechaty
bot
.on('scan', (qrcode, status) => {
  qrTerm.generate(qrcode, {small: true})
})
.on('login', user => {
  console.log(`User ${user} login.`)
})
.on('message', message => {
  console.log(`Message: ${message}`)
})
.start()
