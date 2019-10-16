import {
  Wechaty,
  Message,
  UrlLink,
} from 'wechaty'

import { PuppetPadchat } from 'wechaty-puppet-padchat'

import { generate      } from 'qrcode-terminal'


const puppet = new PuppetPadchat()

export const wechatyBot = Wechaty.instance({
  puppet,
})

wechatyBot
  .on('scan', async (qrcode) => {
    generate(qrcode, {small: true})

  })
  .on('login', async function (user) {
    console.log(user)
  })
  .on('error', async err => {
    console.error('BOT ERROR:', `exit for ${JSON.stringify(err.message || '')}`)
  })
  .on('message', async function (m: Message) {
    if (m.text() === 'ding') {
      const urlLink = new UrlLink ({
        description : 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
        thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
        title       : 'Welcome to Wechaty',
        url         : 'https://github.com/chatie/wechaty',
      })
      m.say(urlLink)
    }
  })

wechatyBot.start()
