#!/usr/bin/env node
/**
 * Wechaty - Conversational RPA SDK for Chatbot Makers.
 *  - https://github.com/wechaty/wechaty
 *
 * Starter ding-dong bot using `PuppetNeo`. Prints a terminal QR code on `scan`
 * and replies `dong` to incoming `ding` messages.
 */
import 'dotenv/config'

import {
  ScanStatus,
  Wechaty,
  helpers,
  log,
  type Contact,
  type Message,
} from 'wechaty'
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
const bot = new Wechaty({
  name: 'ding-dong-bot',
})

bot.addEventListener('scan', ({ detail: { qrcode, status } }) => onScan(qrcode, status))
bot.addEventListener('login', ({ detail: user }) => onLogin(user))
bot.addEventListener('logout', ({ detail: { contact } }) => onLogout(contact))
bot.addEventListener('message', ({ detail: msg }) => onMessage(msg))

bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch((e) => log.error('StarterBot', e))
