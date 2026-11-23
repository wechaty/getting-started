#!/usr/bin/env node
import qrTerm from 'qrcode-terminal'
import Tuling123 from 'tuling123-client'

import {
  WechatyBuilder,
  types,
  type Contact,
  type Message,
  type ScanStatus,
}           from 'wechaty'

const welcome = `
=============== Powered by Wechaty ===============
-------- https://github.com/Chatie/wechaty --------

I can talk with you using Tuling123.com
Apply your own tuling123.com API_KEY
at: http://www.tuling123.com/html/doc/api.html

__________________________________________________

Please wait... I'm trying to login in...
`

console.log(welcome)

/**
 *
 * Apply Your Own Tuling123 Developer API_KEY at:
 * http://www.tuling123.com
 *
 */
const TULING123_API_KEY = '18f25157e0446df58ade098479f74b21'
const tuling = new Tuling123(TULING123_API_KEY)

const bot = WechatyBuilder.build()

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)
bot.on('error',   onError)

bot.start()
  .catch(console.error)

function onScan (qrcode: string, _status: ScanStatus) {
  qrTerm.generate(qrcode, { small: true })  // show qrcode on console
}

function onLogin (user: Contact) {
  console.log(`${user} login`)
}

function onLogout (user: Contact) {
  console.log(`${user} logout`)
}

function onError (e: unknown) {
  console.error(e)
}

async function onMessage (msg: Message) {
  const from = msg.from()
  // Skip message from self, or inside a room
  if (msg.self() || msg.room() || !from || from.name() === '微信团队' || msg.type() !== types.Message.Text) return

  console.log('Bot', 'talk: %s'  , msg.text())

  try {
    const {text: reply} = await tuling.ask(msg.text(), {userid: from})
    console.log('Tuling123', 'Talker reply:"%s" for "%s" ',
                          reply,
                          msg.text(),
            )
    await msg.say(reply)
  } catch (e) {
    const reason = e instanceof Error ? e.message : e
    console.error('Bot', 'on message tuling.ask() exception: %s' , reason)
  }
}
