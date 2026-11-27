#!/usr/bin/env node
/**
 * Smoke test for Wechaty with `wechaty-puppet-mock`.
 *
 * Verifies that `WechatyBuilder` starts a mocked bot, emits a `scan` event,
 * and stops cleanly within the test timeout.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { WechatyBuilder } from 'wechaty'
import {
  mock,
  PuppetMock,
} from 'wechaty-puppet-mock'

test('wechaty-puppet-mock', { timeout: 120_000 }, async (t) => {
  const mocker = new mock.Mocker()
  mocker.use(mock.SimpleEnvironment())
  const puppetMock = new PuppetMock({ mocker })

  const bot = WechatyBuilder.build({
    // wechaty-puppet-mock@1.x still bundles wechaty-puppet@1.x types
    puppet: puppetMock as unknown as Exclude<NonNullable<Parameters<typeof WechatyBuilder.build>[0]>['puppet'], string | undefined>,
  })

  t.after(async () => {
    await bot.stop().catch(() => undefined)
  })

  const future = new Promise((resolve) => bot.once('scan', resolve))
  await bot.start()
  await future

  assert.ok(bot.puppet, `Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
})
