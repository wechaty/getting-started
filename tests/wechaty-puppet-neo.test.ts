#!/usr/bin/env node
/**
 * Smoke test for Wechaty with `wechaty-puppet-neo`.
 *
 * Verifies that `WechatyBuilder` starts `PuppetNeo`, emits a `scan` QR code,
 * and stops cleanly without leaking unhandled rejection listeners.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { WechatyBuilder } from 'wechaty'
import { PuppetNeo } from 'wechaty-puppet-neo'

test('wechaty-puppet-neo', { timeout: 120_000 }, async (t) => {
  const puppet = new PuppetNeo()
  const bot = WechatyBuilder.build({
    // wechaty-puppet-neo@0.1.1 still bundles wechaty-puppet@1.x types
    puppet: puppet as unknown as Exclude<NonNullable<Parameters<typeof WechatyBuilder.build>[0]>['puppet'], string | undefined>,
  })

  let sawScan = false
  // Neo rejects its background login promise when stopped before a QR scan.
  // Register a scoped listener and remove it in t.after() so it never leaks.
  const onUnhandledRejection = (reason: unknown) => {
    if (!sawScan) return
    console.error('Neo login was not completed after the QR code was shown.')
    console.error(reason)
  }
  process.on('unhandledRejection', onUnhandledRejection)

  t.after(async () => {
    process.off('unhandledRejection', onUnhandledRejection)
    await bot.stop().catch(() => undefined)
  })

  const future = new Promise<void>((resolve, reject) => {
    bot.once('scan', () => {
      sawScan = true
      resolve()
    })
    bot.once('error', reject)
  })

  await bot.start()
  await future
  assert.ok(bot.puppet, `Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
})
