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

  const future = new Promise<void>((resolve, reject) => {
    bot.once('scan', () => resolve())
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
