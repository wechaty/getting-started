const { Wechaty } = require('wechaty') // import { Wechaty } from 'wechaty'
Wechaty.instance() // Global Instance
.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\n${qrcode}`))
.on('login',            user => console.log(`User ${user} logined`))
.on('message',       message => console.log(`Message: ${message}`))
.start()