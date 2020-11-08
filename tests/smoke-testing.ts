#!/usr/bin/env node -r ts-node/register

import { Wechaty } from 'wechaty'
const isPr = require('is-pr')

import {
  PuppetMock,
  mock,
}                       from 'wechaty-puppet-mock'

async function main () {
  // Timeout after 2 minutes
  const timer = setTimeout(() => {
    console.error('Smoke testing timeout after 2 minutes.')
    process.exit(1)
  }, 120 * 1000)

  const mocker = new mock.Mocker()
  mocker.use(mock.SimpleEnvironment())
  const puppetMock = new PuppetMock({ mocker })

  const botList = [
    new Wechaty({ puppet: puppetMock }),
    new Wechaty({ puppet: 'wechaty-puppet-padplus' }),
    new Wechaty({
      puppet: 'wechaty-puppet-puppeteer',
      puppetOptions: {
        launchOptions: {
          ignoreDefaultArgs: ['--disable-extensions'],
        },
      },
    }),
    new Wechaty({ puppet: 'wechaty-puppet-wechat4u' }),
  ]

  if (isPr) {
    console.info('This CI test was activated from Pull Request.')
  } else {
    console.info('This CI test was activated from Master Branch.')
  }

  for (const bot of botList) {
    const future = new Promise(resolve => bot.once('scan', resolve))
    await bot.start()
    await future
    await bot.stop()
    console.info(`Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
  }

  clearTimeout(timer)
  console.info(`Wechaty v${Wechaty.VERSION} smoke testing passed.`)
  return 0
}

main()
  .then(process.exit)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
