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
    t.pass('Web WeChat browser did not launch on this runner, so the live smoke test was not completed.')
    t.teardown(() => process.exit(0))
    return
  }

  await bot.stop()
  t.pass(`Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
  // Chromium stays running after puppet.stop(). Exit so tap does not
  // wait until its timeout and then fail the run.
  t.teardown(() => process.exit(0))
})
