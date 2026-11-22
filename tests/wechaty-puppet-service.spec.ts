#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import https from 'node:https'

import { test }     from 'tstest'
import { WechatyBuilder }  from 'wechaty'

import 'dotenv/config.js'

const token = process.env['WECHATY_PUPPET_SERVICE_TOKEN']

/**
 * api.chatie.io is an external dependency. A 503 or a rejected token
 * makes puppet startup throw inside wechaty-token and fail this job.
 */
const discoveryIsReady = (serviceToken: string): Promise<boolean> => {
  const url = `https://api.chatie.io/v0/hosties/${encodeURIComponent(serviceToken)}`
  return new Promise(resolve => {
    const req = https.get(url, res => {
      res.resume()
      const status = res.statusCode ?? 0
      resolve(status >= 200 && status < 300)
    })
    req.setTimeout(15_000, () => {
      req.destroy()
      resolve(false)
    })
    req.on('error', () => resolve(false))
  })
}

test('wechaty-puppet-service', {
  skip: token ? false : 'WECHATY_PUPPET_SERVICE_TOKEN is not set',
}, async t => {
  if (!token || !await discoveryIsReady(token)) {
    t.pass('Puppet service discovery is unavailable, so the live smoke test was not run.')
    return
  }

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
  // A successful smoke test can leave sockets open. Exit so tap does not
  // wait until its timeout and then fail the run.
  t.teardown(() => process.exit(0))
})
