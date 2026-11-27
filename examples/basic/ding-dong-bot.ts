#!/usr/bin/env node
/**
 *   Wechaty - https://github.com/wechaty/wechaty
 *
 *   @copyright 2016-now Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import 'dotenv/config.js'

import {
  ScanStatus,
  WechatyBuilder,
  helpers,
  log,
  type Contact,
  type Message,
}                     from 'wechaty'
import { PuppetNeo }  from 'wechaty-puppet-neo'
import qrcodeTerminal from 'qrcode-terminal'

function onScan (qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console

    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')

    log.info('StarterBot', 'onScan: %s(%s) - %s', helpers.typeName(ScanStatus, status), status, qrcodeImageUrl)

  } else {
    log.info('StarterBot', 'onScan: %s(%s)', helpers.typeName(ScanStatus, status), status)
  }
}

function onLogin (user: Contact) {
  log.info('StarterBot', '%s login', user)
}

function onLogout (user: Contact) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage (msg: Message) {
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

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch(e => log.error('StarterBot', e))
