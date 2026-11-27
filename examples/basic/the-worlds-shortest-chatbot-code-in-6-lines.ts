#!/usr/bin/env node
/**
 *   Wechaty - https://github.com/wechaty/wechaty
 *
 *   @copyright 2016-now Huan Li <huan@chatie.io>
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
import { Wechaty } from 'wechaty'

const bot = Wechaty.singleton()
bot.addEventListener('scan',    ({ detail: { qrcode, status } }) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
bot.addEventListener('login',   ({ detail: user }) => console.log(`User ${user} logined`))
bot.addEventListener('message', ({ detail: message }) => console.log(`Message: ${message}`))
bot.start().catch(console.error)
