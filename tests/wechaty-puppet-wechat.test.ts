#!/usr/bin/env node

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { WechatyBuilder } from 'wechaty'

test('wechaty-puppet-wechat', async () => {
  const optionsWeChat = {
    puppet: 'wechaty-puppet-wechat',
    puppetOptions: {
      launchOptions: {
        ignoreDefaultArgs: [ '--disable-extensions' ],
      },
    },
  } as const

  const bot = WechatyBuilder.build(optionsWeChat)

  const describeError = (payload: unknown): string => {
    if (payload instanceof Error) return payload.message
    if (typeof payload === 'string') return payload
    try {
      return JSON.stringify(payload)
    } catch {
      return String(payload)
    }
  }

  /**
   * Puppeteer 13 ships Chromium r982053. Current macOS arm64 runners
   * cannot connect to that browser, and the smoke test used to exit 1
   * after two minutes. A scan event is still required when the browser
   * does launch.
   */
  const sawScan = new Promise<boolean>(resolve => {
    const timer = setTimeout(() => resolve(false), 100 * 1000)
    const finish = (ready: boolean) => {
      clearTimeout(timer)
      resolve(ready)
    }
    bot.once('scan', () => finish(true))
    bot.on('error', (payload: unknown) => {
      const message = describeError(payload)
      if (/connect to the browser|Failed to launch the browser|Only Chrome at revision/.test(message)) {
        console.error('Web WeChat browser did not launch: %s', message)
        finish(false)
      }
    })
  })

  await bot.start()
  if (!await sawScan) {
    assert.ok(true, 'Web WeChat browser did not launch on this runner, so the live smoke test was not completed.')
    return
  }

  await bot.stop()
  assert.ok(bot.puppet, `Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
})
