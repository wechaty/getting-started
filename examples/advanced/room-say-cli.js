#!/usr/bin/env node
/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
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

/* tslint:disable:variable-name */
import qrTerm from 'qrcode-terminal'

import {
  config,
  Wechaty,
  log,
}             from '../mod.js'

async function main () {
  const bot = Wechaty.instance({ profile: config.default.DEFAULT_PROFILE })

  bot
  .on('scan', (qrcode, status) => {
    qrTerm.generate(qrcode, { small: true })
    // Generate a QR Code online via
    // http://goqr.me/api/doc/create-qr-code/
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')
    console.log(`[${status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
  })
  .on('logout'  , user => log.info('Bot', `"${user.name()}" logouted`))
  .on('error'   , e => log.info('Bot', 'error: %s', e))

  /**
   * Global Event: login
   *
   * do initialization inside this event.
   * (better to set a timeout, for browser need time to download other data)
   */
  .on('login', user => {
    console.log(`${user} logined`)
  })

  /**
   * Global Event: message
   */
  .on('message', async function(msg) {
    console.log(msg.toString())
  })

  await bot.start()

  const searchTopic = process.argv[2]
  if (!searchTopic) {
    throw new Error('no arg 1 defined as search topic!')
  }

  const sayText = process.argv[3]
  if (!sayText) {
    throw new Error('no arg 2 defined as say text!')
  }

  console.log('searching topic: ', searchTopic)

  const searchRegex = new RegExp(searchTopic)

  // wait the bot for logging in
  while (!bot.logonoff()) {
    await new Promise(r => setTimeout(r, 100))
  }

  const room = await bot.Room.find({ topic: searchRegex })

  console.log(searchRegex)

  if (!room) {
    console.log('not found')
    return
  }

  console.log(await room.topic(), 'found')
  await room.say(sayText)

  return 0
}

main()
.then(process.exit)
.catch(e => {
  console.error(e)
  process.exit(1)
})
