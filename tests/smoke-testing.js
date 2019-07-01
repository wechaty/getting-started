#!/usr/bin/env node

const { Wechaty } = require('wechaty')
const isPr = require('is-pr')

async function main () {
  const botList = [
    new Wechaty({ puppet: 'wechaty-puppet-mock' }),
    new Wechaty({ puppet: 'wechaty-puppet-puppeteer' }),
    new Wechaty({ puppet: 'wechaty-puppet-wechat4u' }),
  ]

  if (isPr) {
    console.info('This CI test was activitated from Pull Request.')
  } else {
    console.info('This CI test was activitated from Master Branch.')
    botList.push(
      new Wechaty({ puppet: 'wechaty-puppet-padchat' }),
      new Wechaty({ puppet: 'wechaty-puppet-padpro' }),
    )
  }

  try {
    for (const bot of botList) {
      const future = new Promise(resolve => bot.once('scan', resolve))
      await bot.start()
      await future
      await bot.stop()
      console.info(`Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
    }
    console.info(`Wechaty v${Wechaty.VERSION} smoke testing passed.`)
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
