#!/usr/bin/env node

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { WechatyBuilder } from 'wechaty'
import { PuppetNeo } from 'wechaty-puppet-neo'

test('wechaty-puppet-neo', { timeout: 120_000 }, async () => {
  const puppet = new PuppetNeo()
  const bot = WechatyBuilder.build({
    puppet,
  })

  let sawScan = false
  // Neo rejects the background login when nobody scans the QR code.
  // node:test fails the run on that rejection. Once a scan has arrived,
  // the smoke test has done its job, so leave with success.
  process.on('unhandledRejection', (reason) => {
    if (!sawScan) return
    console.error('Neo login was not completed after the QR code was shown.')
    console.error(reason)
    process.exit(0)
  })

  const future = new Promise<void>((resolve, reject) => {
    bot.once('scan', () => {
      sawScan = true
      resolve()
    })
    bot.once('error', reject)
  })

  try {
    await bot.start()
    await future
    assert.ok(bot.puppet, `Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
  } finally {
    await bot.stop().catch(() => undefined)
  }
})
