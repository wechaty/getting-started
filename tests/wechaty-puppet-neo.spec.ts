#!/usr/bin/env node

import { test }            from 'tstest'
import { WechatyBuilder }  from 'wechaty'
import { PuppetNeo }       from 'wechaty-puppet-neo'

test('wechaty-puppet-neo', async t => {
  const puppet = new PuppetNeo()
  const bot = WechatyBuilder.build({
    puppet,
  })

  const timer = setTimeout(() => {
    console.error('Smoke testing timeout after 2 minutes.')
    process.exit(1)
  }, 120 * 1000)

  let sawScan = false
  // A failed login rejects the background session. Exit then, unless a QR
  // scan event has already arrived.
  process.once('unhandledRejection', reason => {
    if (sawScan) return
    console.error(reason)
    clearTimeout(timer)
    process.exit(1)
  })

  const future = new Promise((resolve, reject) => {
    bot.once('scan', () => {
      sawScan = true
      resolve(undefined)
    })
    bot.once('error', reject)
  })

  try {
    await bot.start()
    await future
    await bot.stop()
  } catch (error) {
    clearTimeout(timer)
    await bot.stop().catch(() => undefined)
    throw error
  }

  clearTimeout(timer)
  t.pass(`Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
  // A successful smoke test can leave sockets open. Exit so tap does not
  // wait until its timeout and then fail the run.
  t.teardown(() => process.exit(0))
})
