import { parseTime, parseTitleAndLocation } from './maodou-nlp.js'

import debug from 'debug'
import fetch from 'node-fetch'

function createCourse(originalText, createCallback) {
    // get rid of html tags like <img class="qqemoji qqemoji0"> in case someone use emoji input
    var msgText = originalText.replace(/<[^>]*>?/gm, '')
    debug("[-emoji]", {msgText})

    // get rid of blank space in the left
    msgText = msgText.replace(/(^\s*)/g, '')
    debug("[-space]", {msgText})

    const time = parseTime(msgText)
    console.log('[parser] ==> Time: ', {time})

    // now we have 'time', next we use bosonnlp to parse for 'title' and 'location'
    if (time) {
        parseTitleAndLocation(msgText, function(title, location) {
            console.log('[parser] ==> Title: ', {title})
            console.log('[parser] ==> Location: ', {location})

            // title, start_time, location, notes is 4 params to create a new maodou course
            const start_time = time
            const notes = originalText
            createMaodouCourse(title, start_time, location, notes, createCallback)
        })
    }
}

/**
 * query Maodou api to create a new course
 * @param title: required
 * @param start_time, location, notes: options
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
