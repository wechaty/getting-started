#!/usr/bin/env node
/**
 *   Powered by Wechaty - https://github.com/chatie/wechaty
 *
 *   @author judaschrist <operaphantom.zhang@gmail.com>
 *
 *   This is a simple news wechat bot.
 *   It can tell you the latest news about anything you're interested in.
 *   It can also send you news briefings on a daily basis.
 *   Read more about this bot in https://blog.chatie.io/wechaty-xiaoli/
 *   The bot is implemented using Wechaty and xiaoli news API - https://xiaoli.ai
 */
import {
    Wechaty,
    config,
}               from 'wechaty'
import qrTerm from 'qrcode-terminal'
import fetch from 'node-fetch'
import schedule from 'node-schedule'

/**
 *
 * Declare the Bot
 *
 */
const bot = WechatyBuilder.build({
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
// getDaily()
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
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
    ].join('')

    console.log(`[${status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
}

async function onLogin(user) {
    console.log(`${user.name()} login`)
    schedule.scheduleJob('40 50 16 * * 1-5', sendDaily); //send daily on 16:50:40 every weekday
}

function onLogout(user) {
    console.log(`${user.name()} logouted`)
}

function onError(e) {
    console.error('Bot error:', e)
}

/**
 * send a daily
 */
async function sendDaily() {
    const room = await bot.Room.find({topic: '小桔和小理'}) //get the room by topic
    console.log('Sending daily to room ' + room.id)
    let dailyText = await getDaily()
    room.say(dailyText)
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
 * query xiaoli's api for news related to the keyword
 * @param keyword: search keyword
 */
async function searchNews(keyword) {
    let searchURL = 'https://api.xiaoli.ai/v1/api/search/basic'
    let postBody = {
        "keywords": [keyword],
        "token": "45d898b459b4a739474175657556249a"
    }
    let okCallback = makeSearchResponseText
    let resText = await fetchXiaoliAPI(searchURL, postBody, okCallback)
    return resText
}

/**
 * parse the returned json for a list of news titles
 */
function makeSearchResponseText(json_obj) {
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
 * query xiaoli's api for a daily news brief
 */
async function getDaily() {
    const dailyUuid = 'e02e6f14-3212-4d44-9f3d-1d79538c38f6'
    let dailyURL = 'https://api.xiaoli.ai/v1/api/briefing/' + dailyUuid
    let postBody = {
        "token": "45d898b459b4a739474175657556249a"
    }
    let okCallback = makeDailyResponseText
    let resText = await fetchXiaoliAPI(dailyURL, postBody, okCallback)
    return resText
}


function makeDailyResponseText(json_obj) {
    let secList = json_obj.sections
    let newsText = '今日' + json_obj.title + '\n\n'
    for (let i = 0; i < Math.min(secList.length, 5); i++) {
        newsText += secList[i].title + '\n'
        let newsList = secList[i].contents
        for (let j = 0; j < Math.min(newsList.length, 3); j++) {
            newsText += (j+1) + '. ' + newsList[j].title + '\n'
        }
        newsText += '\n'
    }
    return newsText
}


/**
 * Fetch response from xiaoli API
 * @param URL
 * @param postBody
 * @param okCallback: covert json to msg text when fetch succeeds
 */
async function fetchXiaoliAPI(URL, postBody, okCallback) {
    let resText = null
    try {
        let resp = await fetch(
            URL,
            {
                method: "POST",
                body: JSON.stringify(postBody), // put keywords and token in the body
            }
        )
        let resp_json = await resp.json()
        if (resp.ok) {
            // status code = 200, we got it!
            resText = okCallback(resp_json['data'])
        } else {
            // status code = 4XX/5XX, sth wrong with API
            resText = 'API ERROR: ' + resp_json['msg']
        }
    } catch (err) {
        resText = 'NETWORK ERROR: ' + err
    }
    return resText
}
