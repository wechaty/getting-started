import { Wechaty, Room } from 'wechaty'

const bot = Wechaty.instance()

bot
	.on('scan', (url, code) => {
		if (!/201|200/.test(String(code))) {
			const loginUrl = url.replace(/\/qrcode\//, '/l/')
			require('qrcode-terminal').generate(loginUrl)
		}
		console.log(url)
	})

	.on('login', user => {
		console.log(`${user} login`)
	})

	.on('friend', async function (contact, request) {
		if (request) {
			await request.accept()
			console.log(`Contact: ${contact.name()} send request ${request.hello}`)
		}
	})

	.on('message', async function (m) {
		const contact = m.from()
		const content = m.content()
		const room = m.room()

		if (room) {
			console.log(`Room: ${room.topic()} Contact: ${contact.name()} Content: ${content}`)
		} else {
			console.log(`Contact: ${contact.name()} Content: ${content}`)
		}

		if (m.self()) {
			return
		}

		if (/hello/.test(content)) {
			m.say("hello how are you")
		}

		if (/room/.test(content)) {
			let keyroom = await Room.find({ topic: "test" })
			if (keyroom) {
				await keyroom.add(contact)
				await keyroom.say("welcome!", contact)
			}
		}

		if (/out/.test(content)) {
			let keyroom = await Room.find({ topic: "test" })
			if (keyroom) {
				await keyroom.say("Remove from the room", contact)
				await keyroom.del(contact)
			}
		}
	})

	.init()
