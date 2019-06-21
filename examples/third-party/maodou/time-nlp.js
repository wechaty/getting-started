
var Recognizers = require('@microsoft/recognizers-text-suite');
const defaultCulture = Recognizers.Culture.Chinese;

function parseTime(input) {
    return Recognizers.recognizeDateTime(input, defaultCulture)
}

module.exports = parseTime
