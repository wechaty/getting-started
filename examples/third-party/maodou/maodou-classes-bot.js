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
const {
    Wechaty,
    Message,
    config,
} = require('wechaty')
const qrTerm = require('qrcode-terminal')
const fetch = require('node-fetch')

const NLP = require('chi-time-nlp')
var nlp = new NLP();

var bosonnlp = require('bosonnlp');
var b_nlp = new bosonnlp.BosonNLP('6wXvIkZk.35344.lbaaVKiTzyh6');

var Recognizers = require('@microsoft/recognizers-text-suite');
const defaultCulture = Recognizers.Culture.Chinese;

function getTimeInResults(results) {
    console.log('getTimeInResult()', results)
    var start_time
    var result
    var date
    var time

    // if results have date and time, just return value
    result = results.find(x => x.typeName === 'datetimeV2.datetime')
    if (result) {
        if (result.resolution.values[1])
            start_time = new Date(result.resolution.values[1].value)
        else
            start_time = new Date(result.resolution.values[0].value)

        return start_time
    }

    // first deal with time
    time = results.find(x => x.typeName === 'datetimeV2.time')
    var timeStr
    if (time) {
        timeStr = time.resolution.values[0].value
        if (time.resolution.values[1])  // we prefer the later time for kid's class
            timeStr = time.resolution.values[1].value
    } else {
        time = results.find(x => x.typeName === 'datetimeV2.timerange')
        if (time) {
            timeStr = time.resolution.values[0].start
        } else {
            // do nothing with timeStr
        }
    }
    console.log({timeStr})

    if (!timeStr) {
        // if results have date and time range, we return start
        result = results.find(x => x.typeName === 'datetimeV2.datetimerange')
        if (result) {
            start_time = new Date(result.resolution.values[0].start)
            return start_time
        } else
            return // undefined
    }

    // then deal with date
    date = results.find(x => x.typeName === 'datetimeV2.date')
    var dateStr
    if (date) {
        dateStr = date.resolution.values[0].value
    } else {
        date = results.find(x => x.typeName === 'datetimeV2.daterange')
        if (date) {
            dateStr = date.resolution.values[0].start
        } else {
            dateStr = new Date().toDateString()
        }
    }
    console.log({dateStr})

    start_time = new Date(dateStr + ' ' + timeStr)
    return start_time
}

function parseAll(input, culture) {
    return Recognizers.recognizeDateTime(input, culture)
}

// const puppet = 'wechaty-puppet-padchat'

// const puppetOptions = {
//   token: WECHATY_PUPPET_PADCHAT_TOKEN,
// }

/*
 * Declare the Bot
 *
 */

const bot = new Wechaty({
    //profile: config.default.DEFAULT_PROFILE,
    profile: 'liming',
    //profile: 'maodou',
})

// const bot = new Wechaty({
//   puppet,
//   puppetOptions,
// })

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
    //qrTerm.generate(qrcode, {small: true})
    qrTerm.generate(qrcode)

    // Generate a QR Code online via
    // http://goqr.me/api/doc/create-qr-code/
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('')

    console.log(`[${status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
}

async function onLogin(user) {
    console.log(`${user.name()} login`)
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
async function sendReportToRoom(course, room_topic) {
    const room = await bot.Room.find({topic: room_topic}) //get the room by topic
    if (room)
        console.log('Sending daily to room ', room_topic, 'id:', room.id)
    else
        console.log('room_topic ', room_topic, '不存在')

    let news = '[课程创建成功通知]\n'

    let title = '\n标题:' + course.title + '\n'
    let time = '时间:' + new Date(course.start_time).toLocaleString() + '\n'
    let location = '地点:' + course.location + '\n'
    let notes = '备注:' + course.notes + '\n'

    let url = '\n课程链接: https://kid.maodouketang.com/course/' + course._id + '\n'
    let report = news + title + time + location + notes + url + '\n- microsoft nlp powered'

    console.log(report)
    room.say(report)
}

function createCourse(msgText, createCallback) {
//    const time = nlp.parse(msgText)   // no longer to using ChiTimeNlp
    var results = parseAll(msgText, defaultCulture);
    var time
    if (results.length > 0) {
        console.log('we only take datetimeV type', results)
        results.forEach(function (result) {
            console.log(JSON.stringify(result, null, "\t"));
        });

        // we only pick up those item which has datetime or time
        //results = results.filter(r => r.typeName === 'datetimeV2.date' || r.typeName === 'datetimeV2.datetime' || r.typeName === 'datetimeV2.time' || r.typeName === 'datetimeV2.timerange' || r.typeName === 'datetimeV2.datetimerange')
        console.log('results without filter', results)

        if (results.length > 0) {
            var start_time = getTimeInResults(results)
            console.log('start_time: ', start_time && start_time.toLocaleString())

            // start_time = getTimeInResult(results[1])
            // console.log('start_time 1: ', start_time.toLocaleString())
            time = start_time
        }
    }

    console.log({time})

    if (time) {
        var title = msgText.substring(0, 16)
        var location = 'beijing'

        b_nlp.ner(msgText, function (result) {
                console.log('result:', result);

                var b_result = JSON.parse(result)

                console.log('result[0]:', b_result[0]);
                if (b_result[0]) {
                    const length = b_result[0]["word"].length
                    for (var i = 0; i < length; i++)
                        console.log('->', i, b_result[0]["word"][i], b_result[0]["tag"][i])

                    //console.log('result[0]["word"]', b_result[0]["word"])
                    title = b_result[0]["word"].filter((x,index) =>
                        b_result[0]["tag"][index] === 'n' ||
                        b_result[0]["tag"][index] === 'nl' ||
                        b_result[0]["tag"][index] === 'nz' ||
                        b_result[0]["tag"][index] === 'v' ||
                        b_result[0]["tag"][index] === 'vi' ||
                        b_result[0]["tag"][index] === 's')
                        .slice(0, 3)
                        .join('')

                    location = b_result[0]["word"].filter((x,index) =>
                        b_result[0]["tag"][index] === 'ns' ||
                        b_result[0]["tag"][index] === 'nt' ||
                        b_result[0]["tag"][index] === 'nz' ||
                        b_result[0]["tag"][index] === 'an' ||
                        b_result[0]["tag"][index] === 'n' ||
                        b_result[0]["tag"][index] === 'm' ||
                        b_result[0]["tag"][index] === 'q' ||
                        b_result[0]["tag"][index] === 's')
                        .slice(0, 5)
                        .join('')

                    // [2, 9, "location"]
                    var location_array = b_result[0].entity.filter(item => item.indexOf("location")>=0)

                    if (location_array.length > 0) {
                        // clear the old location value
                        location = ""

                        for (var i = 0; i < location_array.length; i++) {
                            const from = location_array[i][0]
                            const to = location_array[i][1]
                            //console.log(from, to)

                            const l = b_result[0]["word"].slice(from, to).join('')
                            console.log(l)

                            // make the new location value
                            location += l
                        }
                    }

                    console.log('消息原文: ', msgText)
                    console.log('==> Time: ', time.toLocaleString())
                    console.log('==> Title: ', title)
                    console.log('==> Location: ', location)

                    const start_time = time
                    console.log('createCourse params:', {title}, {start_time}, {location}, {msgText})
                    createMaodouCourse(title, start_time, location, msgText, createCallback)
                }
            });
    }
}
/**
 *
 * Dealing with Messages
 *
 */
async function onMessage(msg) {
    const room = msg.room()
    const from = msg.from()

    if (!from) {
        return
    }
    //console.log('room', room)

    console.log((room ? '[' + await room.topic() + ']' : '')
              + '<' + from.name() + '>'
              + ':' + msg,
    )

    // Skip message from self
    if (msg.self() || from.name() === '微信团队' || from.name() === '毛豆课堂小助手' ) {
        console.log('Message discarded because it is from self or 毛豆课堂小助手')
        return
    }

    if (msg.type() !== bot.Message.Type.Text) {
        console.log('Message discarded because it is not a text message')
        return
    }

    let msgText = msg.text()
    console.log({msgText})

    // get rid of html tags like <img class="qqemoji qqemoji0"> in case someone use emoji input
    msgText = msgText.replace(/<[^>]*>?/gm, '')

    console.log("----------get rid of emoji--------")
    console.log(msgText)

    msgText = msgText.replace(/(^\s*)/g, '')

    console.log("----------get rid of left whitespace--------")
    console.log(msgText)

    const room_topic = await room.topic()
    // create course using msgText, and send report to wechat admin group
    createCourse(msgText, function(newCourse) {
        if (room_topic === '毛豆少儿课堂产品开发组')
            sendReportToRoom(newCourse, '毛豆少儿课堂产品开发组')

        if (room_topic === 'Wechaty LiLiLi')
            sendReportToRoom(newCourse, 'Wechaty LiLiLi')
    })
}

/**
 * query xiaoli's api for news related to the keyword
 * @param keyword: search keyword
 */
async function createMaodouCourse(title, start_time, location, notes, createMaodouCourseCallback) {
    let path = '/courses'
    let postBody = {
        "title": title,
        "start_time": start_time,
        "location": location,
        "duration": 3600,
        "count": 1,
        "freq": "NONE",
        "alerts": [
            // {
            //   at: -3600, //单位s
            //   by: 'sms',
            // },
            {
              at: -1800,
              by: 'wxmsg',
            },
            {
              at: -900,
              by: 'call',
            },
        ],
        "notes": notes
    }

    // call maodou api
    await fetchMaodouAPI(path, postBody, createMaodouCourseCallback)
    return
}


function getMaodouCoursesCallback(json_obj) {
    console.log(json_obj)
    return
}

/**
 * query xiaoli's api for a daily news brief
 */
async function getMaodouCourses() {
    let path = '/courses'
    let postBody = {
    }

    // call maodou api
    fetchMaodouAPI(path, postBody, getMaodouCoursesCallback)
    return res
}

/**
 * Fetch response from xiaoli API
 * @param URL
 * @param postBody
 * @param fetchCallback: covert json to msg text when fetch succeeds
 */
async function fetchMaodouAPI(path, postBody, fetchCallback) {
    let resText = null
    //const url = 'http://localhost:4000/api/v1' + path
    const url = 'https://api.maodouketang.com/api/v1' + path
    const options = {
                method: "POST",
                body: JSON.stringify(postBody), // put keywords and token in the body
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDA5ZjcxYTQyOTg4YjAwMTI2ZmYxYmMiLCJvcGVuSWQiOiJvRHprWTBUTjlfTmNLdXZCYVo1SzhzeE1NZHNzIiwiaWF0IjoxNTYwOTM0MTcwLCJleHAiOjE1NjYxMTgxNzB9.-NtfK62Y1S_EHAkA2Y0j5BW4qtb7IdH2mpq85NUqPuA"
                }
            }
    console.log('fetchMaodouAPI: ', url, options)

    try {
        let resp = await fetch( url, options )
        let resp_json = await resp.json()
        if (resp.ok) {
            // status code = 200, we got it!
            resText = fetchCallback(resp_json['data'])
        } else {
            // status code = 4XX/5XX, sth wrong with API
            resText = 'API ERROR: ' + resp_json['msg']
        }
    } catch (err) {
        resText = 'NETWORK ERROR: ' + err
    }
    return resText
}
