#!/usr/bin/env node
/**
 * Wechaty - Conversational RPA SDK for Chatbot Makers.
 *  - https://github.com/wechaty/wechaty
 *
 * Starter ding-dong bot using `PuppetNeo`. Prints a terminal QR code on `scan`
 * and replies `dong` to incoming `ding` messages.
 */
import 'dotenv/config.js'

import {
  ScanStatus,
  WechatyBuilder,
  helpers,
  log,
  type Contact,
  type Message,
} from 'wechaty'
import { PuppetNeo } from 'wechaty-puppet-neo'
import qrcodeTerminal from 'qrcode-terminal'

/**
 * Renders the login QR code in the terminal when waiting for a scan.
 */
function onScan (qrcode: string, status: ScanStatus): void {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')
    log.info('StarterBot', 'onScan: %s(%s) - %s', helpers.typeName(ScanStatus, status), status, qrcodeImageUrl)

    qrcodeTerminal.generate(qrcode, { small: true })
  } else {
    log.info('StarterBot', 'onScan: %s(%s)', helpers.typeName(ScanStatus, status), status)
  }
}

/**
 * Logs when the bot account signs in.
 */
function onLogin (user: Contact): void {
  log.info('StarterBot', '%s login', user)
}

/**
 * Logs when the bot account signs out.
 */
function onLogout (user: Contact): void {
  log.info('StarterBot', '%s logout', user)
}

/**
 * Replies `dong` when an incoming text message equals `ding`.
 */
async function onMessage (msg: Message): Promise<void> {
  log.info('StarterBot', msg.toString())

  if (msg.text() === 'ding') {
    await msg.say('dong')
  }
}

/**
 * Puppet Neo keeps the login in memory and prints a new QR code on every start.
 * Scan that code with WeChat.
 */
const bot = WechatyBuilder.build({
  name: 'ding-dong-bot',
  // wechaty-puppet-neo@0.1.1 still bundles wechaty-puppet@1.x types
  puppet: new PuppetNeo() as unknown as Exclude<NonNullable<Parameters<typeof WechatyBuilder.build>[0]>['puppet'], string | undefined>,
})

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)

bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch((e) => log.error('StarterBot', e))
