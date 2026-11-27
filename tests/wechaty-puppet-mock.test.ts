#!/usr/bin/env node
/**
 * Smoke tests for Wechaty with `wechaty-puppet-mock`.
 *
 * Verifies that `Wechaty` starts a mocked bot, emits a `scan` event,
 * handles a `ding` -> `dong` message roundtrip, and stops cleanly.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { Wechaty } from 'wechaty'
import {
  mock,
  PuppetMock,
} from 'wechaty-puppet-mock'

test('wechaty-puppet-mock scan', { timeout: 120_000 }, async (t) => {
  const mocker = new mock.Mocker()
  mocker.use(mock.SimpleEnvironment())
  const puppetMock = new PuppetMock({ mocker })

  const bot = new Wechaty({
    puppet: puppetMock,
  })

  t.after(async () => {
    await bot.stop().catch(() => undefined)
  })

  const future = bot.next('scan')
  await bot.start()
  await future

  assert.ok(bot.puppet, `Puppet ${bot.puppet} v${bot.puppet.version()} smoke testing passed.`)
})

test('wechaty-puppet-mock ding-dong', { timeout: 120_000 }, async (t) => {
  const mocker = new mock.Mocker()
  const puppetMock = new PuppetMock({ mocker })

  const bot = new Wechaty({
    puppet: puppetMock,
  })

  t.after(async () => {
    await bot.stop().catch(() => undefined)
  })

  const botContact = mocker.createContact({ name: 'Bot' })
  const userContact = mocker.createContact({ name: 'User' })

  const replyFuture = new Promise<string>((resolve) => {
    userContact.on('message', (msg) => {
      if (msg.text() === 'dong') {
        resolve(msg.text() ?? '')
      }
    })
  })

  bot.addEventListener('message', async ({ detail: msg }) => {
    if (msg.text() === 'ding') {
      await msg.say('dong')
    }
  })

  const loginFuture = bot.next('login')
  await bot.start()
  mocker.login(botContact)
  await loginFuture

  userContact.say('ding').to(botContact)
  const reply = await replyFuture

  assert.equal(reply, 'dong')
})
