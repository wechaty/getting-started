import { Wechaty } from 'wechaty'

const bot = WechatyBuilder.build({
  puppet: 'wechaty-puppet-service',
  puppetOptions: {
    token: 'puppet_hostie_gdg_zhengzhou',
  },
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
