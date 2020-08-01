const qrTerm = require('qrcode-terminal')
const {
  Wechaty,
  log,
} = require('wechaty')

const welcome = `
Hello,
Please wait...
I'm trying to login in...
`
console.log(welcome)
const bot = new Wechaty({ name: process.env.WECHATY_PROFILE || "wechaty" })
bot
  .on('scan', (qrcode, status) => {
    qrTerm.generate(qrcode, { small: true })
    console.log(`${qrcode}\n[${status}] Scan QR Code in above url to login: `)
  })
  .on('logout', user => log.info('Bot', `"${user.name()}" logouted`))
  .on('error', e => log.info('Bot', 'error: %s', e))
  .on('login', function (user) {
    let msg = `${user.name()} logined`
    log.info('Bot', msg)

    // Print Room List after 10s
    setTimeout(async function(){
      await printRoomList()
    }, 10000)
  })

bot.start()

async function printRoomList() {
  const roomList = await bot.Room.findAll()
  for (const r of roomList) {
    console.log("Room ID: %s, Room Name: %s", r.id, r.topic())
  }
  console.log("That's all !!!!!!!")
}
