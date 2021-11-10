#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test }     from 'tstest'
import { WechatyBuilder }  from 'wechaty'

import {
  mock,
  PuppetMock,
}               from 'wechaty-puppet-mock'

test('wechaty-puppet-mock', async t => {
  const mocker = new mock.Mocker()
  mocker.use(mock.SimpleEnvironment())
  const puppetMock = new PuppetMock({ mocker })

  const bot = WechatyBuilder.build({
    puppet: puppetMock,
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
