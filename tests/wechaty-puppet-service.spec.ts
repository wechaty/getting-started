#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test }     from 'tstest'
import { WechatyBuilder }  from 'wechaty'

import 'dotenv/config.js'

test('wechaty-puppet-service', async t => {
  const bot = WechatyBuilder.build({
    puppet: 'wechaty-puppet-service',
    /**
     * Huan(202108): our puppet service token is no-TLS for now.
     * FIXME: enable TLS in the future
     */
    puppetOptions: { tls: { disable: true } },
  })

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
