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
import qrTerm from 'qrcode-terminal'

import {
  log,
  WechatyBuilder,
}           from 'wechaty'

const welcome = `
=============== Powered by Wechaty ===============
-------- https://github.com/Chatie/wechaty --------

I can list all your contacts with weixn id & name
__________________________________________________

Please wait... I'm trying to login in...
`

console.log(welcome)
const bot = WechatyBuilder.build()

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('error',   onError)

bot.start()
.catch(console.error)

function onScan (qrcode, status) {
  qrTerm.generate(qrcode, { small: true })  // show qrcode on console
}

function onLogin (user) {
  console.log(`${user} login`)
  main()
}

function onLogout (user) {
  console.log(`${user} logout`)
}

function onError (e) {
  console.error(e)
}

/**
 * Main Contact Bot
 */
async function main() {
  const contactList = await bot.Contact.findAll()

  log.info('Bot', '#######################')
  log.info('Bot', 'Contact number: %d\n', contactList.length)

  /**
   * official contacts list
   */
  for (let i = 0; i < contactList.length; i++) {
    const contact = contactList[i]
    if (contact.type() === bot.Contact.Type.Official) {
      log.info('Bot', `official ${i}: ${contact}`)
    }
  }

  /**
   *  personal contact list
   */

  for (let i = 0; i < contactList.length; i++) {
    const contact = contactList[i]
    if (contact.type() === bot.Contact.Type.Personal) {
      log.info('Bot', `personal ${i}: ${contact.name()} : ${contact.id}`)
    }
  }

  const MAX = 17
  for (let i = 0; i < contactList.length; i++ ) {
    const contact = contactList[i]

    /**
     * Save avatar to file like: "1-name.jpg"
     */
    const file = await contact.avatar()
    const name = file.name
    await file.toFile(name, true)

    log.info('Bot', 'Contact: "%s" with avatar file: "%s"',
                    contact.name(),
                    name,
            )

    if (i > MAX) {
      log.info('Bot', 'Contacts too many, I only show you the first %d ... ', MAX)
      break
    }
  }

  const SLEEP = 7
  log.info('Bot', 'I will re-dump contact weixin id & names after %d second... ', SLEEP)
  setTimeout(main, SLEEP * 1000)

}
