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

/**
 *
 * Declare the Bot
 *
 */
const bot = new Wechaty({
    //profile: config.default.DEFAULT_PROFILE,
    profile: 'liming',
    //profile: 'maodou',
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
async function sendReport(course) {
    const room_topic = '毛豆少儿课堂产品开发组'
    const room = await bot.Room.find({topic: room_topic}) //get the room by topic
    if (room)
        console.log('Sending daily to room ', room.id)
    else
        console.log('room_topic ', room_topic, '不存在')

    let news = '[课程创建成功通知] \n'

    let title = '\n标题:' + course.title + '\n'
    let time = '时间:' + new Date(course.start_time).toLocaleString() + '\n'
    let location = '地点:' + course.location + '\n'
    let notes = '备注:' + course.notes + '\n'

    let url = '\n课程链接: https://kid.maodouketang.com/course/' + course._id + '\n'
    let report = news + title + time + location + notes + url

    console.log(report)
    room.say(report)
}

/**
 *
 * Dealing with Messages
 *
 */
async function onMessage(msg) {
    console.log(msg.toString())
    // Skip message from self
    if (msg.self() || msg.from().name() === '微信团队')
        return


    if (msg.type() !== bot.Message.Type.Text) {
        console.log('Message discarded because it is not a text message')
        return
    }

    let msgText = msg.text()

    const time = nlp.parse(msgText)

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

// Message#Text[🗣Contact<毛豆课堂小助手>] 上午9点清华东门集合，在科技大厦一楼会议室吃早饭
// { time: '2019-07-19 09:00:00' }
// result: [{"word": ["上午", "9点", "清华", "东门", "集合", "，", "在", "科技", "大厦", "一", "楼", "会议室", "吃", "早饭"], "tag": ["t", "t", "nt", "s", "v", "wd", "p", "n", "n", "m", "n", "n", "v", "n"], "entity": [[0, 2, "time"], [2, 4, "location"], [7, 9, "location"]]}]
// result[0]: { word:
//    [ '上午',
//      '9点',
//      '清华',
//      '东门',
//      '集合',
//      '，',
//      '在',
//      '科技',
//      '大厦',
//      '一',
//      '楼',
//      '会议室',
//      '吃',
//      '早饭' ],
//   tag:
//    [ 't', 't', 'nt', 's', 'v', 'wd', 'p', 'n', 'n', 'm', 'n', 'n', 'v', 'n' ],
//   entity:
//    [ [ 0, 2, 'time' ], [ 2, 4, 'location' ], [ 7, 9, 'location' ] ] }
// -> 0 上午 t
// -> 1 9点 t
// -> 2 清华 nt
// -> 3 东门 s
// -> 4 集合 v
// -> 5 ， wd
// -> 6 在 p
// -> 7 科技 n
// -> 8 大厦 n
// -> 9 一 m
// -> 10 楼 n
// -> 11 会议室 n
// -> 12 吃 v
// -> 13 早饭 n
// 消息原文:  上午9点清华东门集合，在科技大厦一楼会议室吃早饭

                    // [2, 9, "location"]
                    var location_array = b_result[0].entity.filter(item => item.indexOf("location")>=0)

                    if (location_array.length > 0) {
                        var l = ""
                        for (var i = 0; i < location_array.length; i++) {
                            const from = location_array[i][0]
                            const to = location_array[i][1]
                            //console.log(from, to)

                            l += b_result[0]["word"].slice(from, to).join('')
                            console.log(l)
                        }
                        location = l
                    }

                    console.log('消息原文: ', msgText)
                    console.log('==> Time: ', time.toLocaleString())
                    console.log('==> Title: ', title)
                    console.log('==> Location: ', location)

                    const start_time = time
                    console.log('createCourse params:', {title}, {start_time}, {location}, {msgText})
                    createCourse(title, start_time, location, msgText)
                }
            });
    }
}

/**
 * parse the returned json for a list of news titles
 */
function createCourseCallback(newCourse) {
    console.log('createCourseCallback(), newCourse:', newCourse)

    // send new course info to admin group
    if (newCourse)
        sendReport(newCourse)

    return
}

/**
 * query xiaoli's api for news related to the keyword
 * @param keyword: search keyword
 */
async function createCourse(title, start_time, location, notes) {
    let path = '/courses'
    let postBody = {
        "title": title,
        "start_time": start_time,
        "location": location,
        "duration": 1800,
        "count": 1,
        "freq": "NONE",
        "alerts": [
            {
                "at": -1800, // 提前多少秒进行提醒，参考日历从 0, 5, 15, 30,
                "by": "call", // 通过何种方式进行提醒？["wxmsg", "sms", "call", "email"]，可以选多种方式
            }, {
                "at": -300,
                "by": "sms",
            },
        ],
        "notes": notes
    }

    // call maodou api
    await fetchMaodouAPI(path, postBody, createCourseCallback)
    return
}


function getCoursesCallback(json_obj) {
    console.log(json_obj)
    return
}

/**
 * query xiaoli's api for a daily news brief
 */
async function getCourses() {
    let path = '/courses'
    let postBody = {
    }

    // call maodou api
    fetchMaodouAPI(path, postBody, getCoursesCallback)
    return res
}

/**
 * Fetch response from xiaoli API
 * @param URL
 * @param postBody
 * @param okCallback: covert json to msg text when fetch succeeds
 */
async function fetchMaodouAPI(path, postBody, okCallback) {
    let resText = null
    //const url = 'http://localhost:4000/api/v1' + path
    const url = 'https://api.maodouketang.com/api/v1' + path
    const options = {
                method: "POST",
                body: JSON.stringify(postBody), // put keywords and token in the body
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDAzNTE4ZWI5MDJiMjAwMTE0NmFkMDQiLCJvcGVuSWQiOiJvRHprWTBkN0RxWjA0aUJzMDN6UzM0RjJBOGFrIiwiaWF0IjoxNTYwNDk4NTc0LCJleHAiOjE1NjU2ODI1NzR9.nPCBSX9qElM3bnxEo9cni5x5I5rphIPTue_-V4BHU-c"
                }
            }
    console.log('fetchMaodouAPI: ', url, options)

    try {
        let resp = await fetch( url, options )
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
