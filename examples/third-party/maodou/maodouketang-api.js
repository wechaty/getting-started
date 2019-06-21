const parseTime = require('./time-nlp')
const getTimeInResults = require('./maodou-time-nlp')

const NLP = require('chi-time-nlp')
var nlp = new NLP();

var bosonnlp = require('bosonnlp');
var b_nlp = new bosonnlp.BosonNLP('6wXvIkZk.35344.lbaaVKiTzyh6');

const debug = require("debug")("maodou-classes-bot.js");
const fetch = require('node-fetch')

function createCourse(originalText, createCallback) {
    // get rid of html tags like <img class="qqemoji qqemoji0"> in case someone use emoji input
    var msgText = originalText.replace(/<[^>]*>?/gm, '')
    debug("[-emoji]", {msgText})

    // get rid of blank space in the left
    msgText = msgText.replace(/(^\s*)/g, '')
    debug("[-space]", {msgText})

    var results = parseTime(msgText);
    var time
//    const time = nlp.parse(msgText)   // no longer to using ChiTimeNlp

    if (results.length > 0) {
        // before filter
        debug('results before filter', results)

        // for better knowing of nlp, we do not debug this
        results.forEach(function (result) {
            console.log(JSON.stringify(result, null, "\t"));
        });

        // we only pick up those item which has datetime or time
        //results = results.filter(r => r.typeName === 'datetimeV2.date' || r.typeName === 'datetimeV2.datetime' || r.typeName === 'datetimeV2.time' || r.typeName === 'datetimeV2.timerange' || r.typeName === 'datetimeV2.datetimerange')
        //debug('results after filter', results)

        if (results.length > 0) {
            var start_time = getTimeInResults(results)
            debug('start_time: ', start_time && start_time.toLocaleString())

            // start_time = getTimeInResult(results[1])
            // console.log('start_time 1: ', start_time.toLocaleString())
            time = start_time
        }
    }

    console.log({time})

    // now we have 'time', next we use bosonnlp to parse for 'title' and 'location'
    if (time) {
        var title = msgText.substring(0, 16)
        var location = 'beijing'

        b_nlp.ner(msgText, function (result) {
                debug('result:', result);

                var b_result = JSON.parse(result)
                debug('result[0]:', b_result[0]);
                if (b_result[0]) {
                    const length = b_result[0]["word"].length
                    for (var i = 0; i < length; i++)
                        debug('->', i, b_result[0]["word"][i], b_result[0]["tag"][i])

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
                            debug(l)

                            // make the new location value
                            location += l
                        }
                    }

                    console.log('消息原文: ', originalText)
                    console.log('==> Time: ', time.toLocaleString())
                    console.log('==> Title: ', title)
                    console.log('==> Location: ', location)

                    const start_time = time
                    const notes = originalText
                    createMaodouCourse(title, start_time, location, notes, createCallback)
                }
            });
    }
}

/**
 * query xiaoli's api for news related to the keyword
 * @param keyword: search keyword
 */
async function createMaodouCourse(title, start_time, location, notes, createMaodouCourseCallback) {
    debug('createCourse params:', {title}, {start_time}, {location}, {notes})

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

/**
 * Fetch response from Maodou API
 * @param URL
 * @param postBody
 * @param fetchCallback: covert json to msg text when fetch succeeds
 */
async function fetchMaodouAPI(path, postBody, fetchCallback) {
    let resText = null
    const url = 'https://api.maodouketang.com/api/v1' + path
    const options = {
                method: "POST",
                body: JSON.stringify(postBody), // put keywords and token in the body
                // If you want to get alert by your own phone, replace with your own 'authorization'
                // To get your own 'authorization', please see it in README.md
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDA5ZjcxYTQyOTg4YjAwMTI2ZmYxYmMiLCJvcGVuSWQiOiJvRHprWTBUTjlfTmNLdXZCYVo1SzhzeE1NZHNzIiwiaWF0IjoxNTYwOTM0MTcwLCJleHAiOjE1NjYxMTgxNzB9.-NtfK62Y1S_EHAkA2Y0j5BW4qtb7IdH2mpq85NUqPuA"
                }
            }
    debug('fetchMaodouAPI: ', {url}, {options})

    try {
        let resp = await fetch( url, options )
        let resp_json = await resp.json()
        if (resp.ok) {
            // status code = 200, we got it!
            debug('[resp_json.data]', resp_json['data'])
            resText = fetchCallback(resp_json['data'])
        } else {
            // status code = 4XX/5XX, sth wrong with API
            debug('[resp_json.msg]', resp_json['msg'])
            resText = 'API ERROR: ' + resp_json['msg']
        }
    } catch (err) {
        debug('[err]', err)
        resText = 'NETWORK ERROR: ' + err
    }
    return resText
}

module.exports = createCourse
