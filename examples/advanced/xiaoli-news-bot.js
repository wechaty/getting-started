#!/usr/bin/env node
/**
 *   Powered by Wechaty - https://github.com/chatie/wechaty
 *
 *   @author judaschrist <operaphantom.zhang@gmail.com>
 *
 *   This is a simple news wechat bot.
 *   It can tell you the latest news about anything you're interested in.
 *   It can also send you news briefings on a daily basis.
 *   The bot is implemented using Wechaty and xiaoli news API - https://xiaoli.ai
 */
const {
    Wechaty,
    config,
} = require('wechaty')
const fetch = require('node-fetch')
const {FileBox} = require('file-box')
const qrTerm = require('qrcode-terminal')

/**
 *
 * 1. Declare your Bot!
 *
 */
const bot = new Wechaty({
    profile: config.default.DEFAULT_PROFILE,
})

/**
 *
 * 2. Register event handlers for Bot
 *
 */
bot
    .on('logout', onLogout)
    .on('login', onLogin)
    .on('scan', onScan)
    .on('error', onError)
    .on('message', onMessage)

/**
 *
 * 3. Start the bot!
 *
 */
bot.start()
    .catch(async e => {
        console.error('Bot start() fail:', e);
        await bot.stop();
        process.exit(-1)
    })

/**
 *
 * 4. You are all set. ;-]
 *
 */

/**
 *
 * 5. Define Event Handler Functions for:
 *  `scan`, `login`, `logout`, `error`, and `message`
 *
 */
function onScan(qrcode, status) {
    qrTerm.generate(qrcode, {small: true})

    // Generate a QR Code online via
    // http://goqr.me/api/doc/create-qr-code/
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('')

    console.log(`[${status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
}

function onLogin(user) {
    console.log(`${user.name()} login`)
}

function onLogout(user) {
    console.log(`${user.name()} logouted`)
}

function onError(e) {
    console.error('Bot error:', e)
}

/**
 *
 * 6. The most important handler is for:
 *    dealing with Messages.
 *
 */
async function onMessage(msg) {
    console.log(msg.toString())

    if (msg.type() !== bot.Message.Type.Text) {
        console.log('Message discarded because it is not a text message')
        return
    }

    let msgText = msg.text()

    if (msgText.endsWith("最新消息") && msgText.length > 4) {
        respText = await searchNews(msgText.substring(0, msgText.length-4))
        await msg.say(respText)
    }

}

function makeText(json_obj) {
    let newsList = json_obj.contents
    let newsText = ''
    for (let i = 0; i < newsList.length; i++) {
        newsText += (i+1) + '. ' + newsList[i].title + '\n'
    }
    return newsText
}


async function searchNews(keyword) {
    let resText = null
    try {
        let resp = await fetch(
            'https://api.xiaoli.ai/v1/api/search/basic',
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify({
                    "keywords": [keyword],
                    "token": "45d898b459b4a739474175657556249a"
                }), // body data type must match "Content-Type" header
            }
        )
        let resp_json = await resp.json()
        if (resp.ok) {
            resText = makeText(resp_json['data'])
        } else {
            resText = 'API ERROR: ' + resp_json['msg']
        }
    } catch (err) {
        resText = 'NETWORK ERROR: ' + err
    }
    return resText
}