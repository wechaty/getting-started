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
const qrTerm = require('qrcode-terminal')

/**
 *
 * Declare the Bot
 *
 */
const bot = new Wechaty({
    profile: config.default.DEFAULT_PROFILE,
})

/**
 *
 * Register event handlers for Bot
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
 * Start the bot!
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
 * Define Event Handler Functions for:
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
 * list of the news details
 * @type {Array}
 */
let preNewsList = []
/**
 *
 * Dealing with Messages
 *
 */
async function onMessage(msg) {
    console.log(msg.toString())

    if (msg.type() !== bot.Message.Type.Text) {
        console.log('Message discarded because it is not a text message')
        return
    }

    let msgText = msg.text()

    // A super naive implementation of intent detection for news query
    if (msgText.endsWith("最新消息") && msgText.length > 4) {
        respText = await searchNews(msgText.substring(0, msgText.length-4))
        await msg.say(respText)
    }

    // query for news details
    if (msgText.startsWith('#')) {
        newsNum = parseInt((msgText.substring(1)), 10) - 1
        if (newsNum < preNewsList.length && newsNum >= 0) {
            await msg.say(preNewsList[newsNum])
        }
    }

}


/**
 * parse the returned json for a list of news titles
 */
function makeText(json_obj) {
    preNewsList = []
    let newsList = json_obj.contents
    if (newsList.length === 0) {
        return "暂无相关新闻"
    }
    let newsText = ''
    for (let i = 0; i < newsList.length; i++) {
        newsText += (i+1) + '. ' + newsList[i].title + '\n'
        preNewsList.push(newsList[i].news_abstract) // Save the news details for later queries
    }
    newsText += "\n回复\"#+数字\"(例如\"#1\")看详情"
    return newsText
}


/**
 * query xiaoli's api for news related to the keyword
 * @param keyword: search keyword
 */
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
            // status code = 200, we got it!
            resText = makeText(resp_json['data'])
        } else {
            // status code = 4XX, sth wrong with API
            resText = 'API ERROR: ' + resp_json['msg']
        }
    } catch (err) {
        resText = 'NETWORK ERROR: ' + err
    }
    return resText
}