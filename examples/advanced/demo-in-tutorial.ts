#!/usr/bin/env node
import qrTerm from 'qrcode-terminal'

import {
  WechatyBuilder,
  types,
  type Contact,
  type Friendship,
  type Message,
  type ScanStatus,
}           from 'wechaty'

const bot = WechatyBuilder.build()

bot.on('scan',    function (qrcode: string, _status: ScanStatus) {
  qrTerm.generate(qrcode, { small: true })
})

bot.on('login',   function (user: Contact) {
  console.log(`${user} login`)
})

bot.on('logout',  function (user: Contact) {
  console.log(`${user} logout`)
})

bot.on('friendship', async function (friendship: Friendship) {
  console.log(`get FRIENDSHIP event!`)

  switch (friendship.type()) {
    case types.Friendship.Receive:
      await friendship.accept()
      console.log(`accept friendship!`)
      break
    case types.Friendship.Confirm:
      await friendship.contact().say(`Nice to meet you~`)
      break
  }
})

bot.on('message', async function (msg: Message) {
  const contact = msg.from()
  const text = msg.text()
  const room = msg.room()

  if (msg.self() || !contact) {
    return
  }

  if (room) {
    const topic = await room.topic()
    console.log(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`)
  } else {
    console.log(`Contact: ${contact.name()} Text: ${text}`)
  }

  if (/Hello/.test(text)) {
    await msg.say('Welcome to wechaty, I am wechaty bot RUI!')
  }

  if (/room/.test(text)) {
    const keyroom = await bot.Room.find({topic: 'wechaty test room'})

    if (keyroom) {
      const topic = await keyroom.topic()
      await keyroom.add(contact)
      await keyroom.say(`Welcome to join ${topic}`, contact)
    }
  }

  if (/fword/.test(text)) {
    const keyroom = await bot.Room.find({topic: 'wechaty test room'})

    if (keyroom) {
      await keyroom.say('You said fword, I will remove from the room', contact)
      await keyroom.del(contact as never)
    }
  }

})

bot.start()
  .catch(console.error)
