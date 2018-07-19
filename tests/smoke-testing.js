#!/usr/bin/env node

const { Wechaty } = require('wechaty')

async function main() {
  const botList = [
    new Wechaty({ puppet: 'mock' }),
    new Wechaty({ puppet: 'puppeteer' }),
    new Wechaty({ puppet: 'padchat', puppetOptions: { token: 'smoke-testing' } }),
    new Wechaty({ puppet: 'wechat4u' }),
  ]
  try {
    const futureList = botList.map(
      bot => new Promise(r => 
        bot.once('scan', r),
      ),
    )
    for (const bot of botList) {
      await bot.start()
    }
    await Promise.all(futureList)
    console.log(`Wechaty v${Wechaty.VERSION} smoking test passed.`)
    botList.forEach(bot => {
      console.log(`Wechaty Puppet ${bot.puppet} v${bot.puppet.version()} smoking test passed.`)
    })
  } catch (e) {
    console.error(e)
    // Error!
    return 1
  } finally {
    await Promise.all(
      botList.map(
        bot => bot.stop(),
      ),
    )
  }
  return 0
}

main()
.then(process.exit)
.catch(e => {
  console.error(e)
  process.exit(1)
})
