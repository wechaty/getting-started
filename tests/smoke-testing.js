#!/usr/bin/env node

const { Wechaty } = require('wechaty')

async function main() {
  const botList = [
    new Wechaty({ puppet: 'wechaty-puppet-mock' }),
    new Wechaty({ puppet: 'wechaty-puppet-puppeteer' }),
    new Wechaty({ puppet: 'wechaty-puppet-wechat4u' }),
  ]

  if (   !process.env.TRAVIS_PULL_REQUEST
      && !process.env.APPVEYOR_PULL_REQUEST_NUMBER
  ) {
    botList.push(
      new Wechaty({ puppet: 'wechaty-puppet-padchat' }),
    )

  try {
    for (const bot of botList) {
      const future = new Promise(r => bot.once('scan', r))
      await bot.start()
      await future
      await bot.stop()
      console.log(`Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
    }
    console.log(`Wechaty v${Wechaty.VERSION} smoke testing passed.`)
  } catch (e) {
    console.error(e)
    // Error!
    return 1
  }
  return 0
}

main()
.then(process.exit)
.catch(e => {
  console.error(e)
  process.exit(1)
})
