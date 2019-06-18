/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
const { Wechaty } = require('wechaty')

function onScan (qrcode) {
  require('qrcode-terminal').generate(qrcode)  // show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.info(qrcodeImageUrl)
}

function onLogin (user) {
  console.info(`${user} login`)
}

function onLogout (user) {
  console.info(`${user} logout`)
}

async function onMessage (msg) {
  console.info(msg.toString())
}

const bot = new Wechaty({ name: 'wechaty' })

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
  .then(() => console.info('Starter Bot Started.'))
  .catch(e => console.error(e))
