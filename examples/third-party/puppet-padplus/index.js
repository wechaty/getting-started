/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-console */
const { Wechaty } = require('wechaty')
const { PuppetPadplus } = require('wechaty-puppet-padplus')
const qrTerm = require('qrcode-terminal')

// Please change the token below to the one that you are given.
const WECHATY_PUPPET_PADPLUS_TOKEN = 'puppet_padplus_xxxxxxxxxxxx'

const puppet = new PuppetPadplus({
  token: WECHATY_PUPPET_PADPLUS_TOKEN,
})

const bot = new Wechaty({
  puppet,
  name: 'your_bot_name',
})

// 运行 wechaty
bot
  .on('scan', (qrcode, status) => {
    qrTerm.generate(qrcode, { small: true })
  })
  .on('login', user => {
    console.log(`User ${user} login.`)
  })
  .on('message', message => {
    console.log(`Message: ${message}`)
  })
  .start()
