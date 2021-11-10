import qrTerm from 'qrcode-terminal'

import {
  Wechaty,
  Message,
}             from 'wechaty'

const welcome = `
=============== Powered by Wechaty ===============
-------- https://github.com/chatie/wechaty --------

I'm a bot, I can save file to local for you!
__________________________________________________

Please wait... I'm trying to login in...

`
console.log(welcome)

const bot = WechatyBuilder.build()

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)
bot.on('error',   onError)

bot.start()
.catch(console.error)

function onScan (qrcode, status) {
  qrTerm.generate(qrcode, { small: true })  // show qrcode on console
}

function onLogin (user) {
  console.log(`${user} login`)
}

function onLogout (user) {
  console.log(`${user} logout`)
}

function onError (e) {
  console.error(e)
}

async function onMessage(msg) {
  console.log(`RECV: ${msg}`)

  if (msg.type() !== Message.Type.Text) {
    const file = await msg.toFileBox()
    const name = file.name
    console.log('Save file to: ' + name)
    file.toFile(name)
  }
}
