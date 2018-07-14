const qrTerm = require('qrcode-terminal')

const { 
  Wechaty, 
  Room 
} = require('wechaty')

// Use another puppet: const bot = new Wechaty({puppet: 'wechat4u'})
// 'puppeteer', 'wechat4u', 'padchat', 'mock'
// Default is 'puppeteer', if you can't start the bot, please try 'wechat4u' or others
const bot = new Wechaty()

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
.catch(console.error)

function onScan (qrcode, status) {
  qrTerm.generate(qrcode, { small: true })  // show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(qrcodeImageUrl)
}

function onLogin (user) {
  console.log(`${user} login`)
}

function onLogout(user) {
  console.log(`${user} logout`)
}

async function onMessage (msg) {
  console.log(msg.toString())

  const contact = msg.from()
  console.log(`Message is from ${contact.name()}`)

  const msgContent = msg.text()
  console.log(`The content of message is: ${msgContent}`)

  if (msg.type() === bot.Message.Type.Text) {
    console.log('This is a text message')

    if (msg.room()) {
      console.log('This room is from a group room')
    } else {
      // if you say 'hi' it should answer you
      if (msgContent === 'hi') {
        await contact.say('hello, I am wechat bot')
      }
    }

  }

}
