/**
 *   Wechaty Chatbot SDK - https://github.com/wechaty/wechaty
 *
 *   @copyright 2016 Huan LI (李卓桓) <https://github.com/huan>, and
 *                   Wechaty Contributors <https://github.com/wechaty>.
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
import {
  WechatyBuilder,
  type,
}               from 'wechaty'

/**
 * Wechaty Plugin Support with Kickout Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  QRCodeTerminal,
  EventLogger,
  DingDong,
  OneToManyRoomConnector,
  ManyToOneRoomConnector,
  ManyToManyRoomConnector,
}                           from 'wechaty-plugin-contrib'
/**
 *
 * 1. Declare your Bot!
 *
 */
const bot = WechatyBuilder.build({
  name : 'ding-dong-bot',
})

/**
 *
 * 2. Register event handlers for Bot
 *
 */
bot.use(
  QRCodeTerminal(),
  EventLogger(),
  DingDong(),
  OneToManyRoomConnector({
    blacklist: [async () => true],
    many: [
      '20049383519@chatroom',     // 小句子测试
      '5611663299@chatroom',      // 'ChatOps - Mike BO'
    ],
    map: async message => message.from()?.name() + '(one to many): ' + message.text(),
    one: '17237607145@chatroom',  // PreAngel 动态
    whitelist: [async message => message.type() === type.Message.Text],
  }),
  ManyToOneRoomConnector({
    blacklist: [async () => true],
    many: [
      '20049383519@chatroom',     // 小句子测试
      '5611663299@chatroom',      // 'ChatOps - Mike BO'
    ],
    map: async message => message.from()?.name() + '(many to one): ' + message.text(),
    one: '17237607145@chatroom',  // PreAngel 动态
    whitelist: [async message => message.type() === type.Message.Text],
  }),
  ManyToManyRoomConnector({
    blacklist: [async () => true],
    many: [
      '20049383519@chatroom',     // 小句子测试
      '5611663299@chatroom',      // 'ChatOps - Mike BO'
    ],
    map: async message => message.from()?.name() + '(many to many): ' + message.text(),
    whitelist: [async message => message.type() === type.Message.Text],
  }),

)

/**
 *
 * 3. Start the bot!
 *
 */
bot.start()
  .catch(async e => {
    console.error('Bot start() fail:', e)
    await bot.stop()
    process.exit(-1)
  })

bot.once('login', () => {
  bot.Room.findAll().then(async roomList => {
    for (const room of roomList) {
      console.info(room.id, await room.topic())
    }
    return undefined
  }).catch(console.error)
})
