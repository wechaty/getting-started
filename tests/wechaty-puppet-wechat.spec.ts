#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test }     from 'tstest'
import { WechatyBuilder }  from 'wechaty'

test('wechaty-puppet-wechat', async t => {
  const optionsWeChat = {
    puppet: 'wechaty-puppet-wechat',
    puppetOptions: {
      launchOptions: {
        ignoreDefaultArgs: [ '--disable-extensions' ],
      },
    },
  } as const

  const bot = WechatyBuilder.build(optionsWeChat)

  const timer = setTimeout(() => {
    console.error('Smoke testing timeout after 2 minutes.')
    process.exit(1)
  }, 120 * 1000)

  const future = new Promise(resolve => bot.once('scan', resolve))
  await bot.start()
  await future
  await bot.stop()

  clearTimeout(timer)
  t.pass(`Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
})
