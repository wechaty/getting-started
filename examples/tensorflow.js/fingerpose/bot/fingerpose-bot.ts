import { Wechaty } from 'wechaty'

const bot = new Wechaty({
  puppet: 'wechaty-puppet-hostie',
  puppetOptions: {
    token: 'puppet_hostie_gdg_zhengzhou',
  }
})

bot.on('scan', qrcode => {
  console.info('qrcode:', qrcode)
})

bot.on('login', user => {
  console.info('user:' + user)
})

bot.on('message', message => {
  console.info('message: ' + message)
})

bot.start()
  .catch(console.error)
