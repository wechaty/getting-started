const debug = require("debug")("maodou-time-nlp.js");

function getTimeInResults(results) {
    debug('getTimeInResult()', results)
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
    debug({timeStr})

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
    debug({dateStr})

    start_time = new Date(dateStr + ' ' + timeStr)
    return start_time
}

module.exports = getTimeInResults