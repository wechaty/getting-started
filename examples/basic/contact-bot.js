const qrTerm = require('qrcode-terminal')

const { 
  Contact,
  log,
  Wechaty, 
}           = require('wechaty')

const welcome = `
=============== Powered by Wechaty ===============
-------- https://github.com/Chatie/wechaty --------

I can list all your contacts with weixn id & name
__________________________________________________

Please wait... I'm trying to login in...
`

console.log(welcome)
const bot = new Wechaty()

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
    if (contact.type() === Contact.Type.Official) {
      log.info('Bot', `official ${i}: ${contact}`)
    }
  }

  /**
   *  personal contact list
   */

  for (let i = 0; i < contactList.length; i++) {
    const contact = contactList[i]
    if (contact.type() === Contact.Type.Personal) {
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
