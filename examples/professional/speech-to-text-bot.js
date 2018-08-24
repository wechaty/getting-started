const { createReadStream } = require('fs')
const { PassThrough } = require('stream')
const Ffmpeg = require('fluent-ffmpeg')
const FfmpegPath = require('@ffmpeg-installer/ffmpeg').path
const { Message } = require('wechaty')
const AipSpeech = require('baidu-aip-sdk').speech
const StreamToArray = require('stream-to-array')


Ffmpeg.setFfmpegPath(FfmpegPath)
const baiduSpeechConfig = {
    app_id: 11698602,
    api_id: 'iYpEVZmeVGqy8yCS1F5uGrcz',
    secret_id: 'BfSGCuTXShS0poNs1XkE4898eL10GFRu'
}

if (baiduSpeechConfig.api_id === 'APP_ID') {
    throw TypeError(`you must set your baidu config`)
}

const speechClient = new AipSpeech(baiduSpeechConfig.app_id, baiduSpeechConfig.api_id, baiduSpeechConfig.secrt_id)
const Bot = Wechaty.instance()


Bot
    .on('scan', (qrcode, status) => {
        qrcodeTerminal.generate(qrcode)
        console.log(`${qrcode}\n[${status}] Scan QR Code in above url to login: `)
    })
    .on('login'	  , user => console.log(`${user} logined`))
    .on('message', async function(msg) {
    console.log(`RECV: ${msg}`)

        if (msg.type() !== Message.Type.Audio) {
            return // skip no-VOICE message
        }

        const msgFile = await msg.file()
        const filename = msgFile.name
        msgFile.toFile(filename)

        const mp3Stream = createReadStream(filename)
        const text = await speechToText(mp3Stream)
        console.log('VOICE TO TEXT: ' + text)

        if (msg.self()) {
            await Bot.say(text)  // send text to 'filehelper'
        } else {
            await msg.say(text)     // to original sender
        }

    })
    .start()
    .catch(e => console.error('bot.start() error: ' + e))



async function speechToText(mp3Stream) {

    try {
        const wavStream = mp3ToWav(mp3Stream)
        const text = await wavToText(wavStream)

        return text

    } catch (e) {
        console.log(`speech to text error`, e)
        return ''
    }
}


function mp3ToWav(mp3Stream) {
    const wavStream = new PassThrough()

    Ffmpeg(mp3Stream)
        .fromFormat('mp3')
        .toFormat('wav')
        .pipe(wavStream)
        .on('error', (error) => {
            console.log('Cannot process audio: ', error)
        })

    return wavStream
}


async function wavToText(wavStream) {
    return new Promise(async (resolve, reject) =>{
        try {
            const wavArray = await StreamToArray(wavStream)
            const wavBuffer = Buffer.concat(wavArray.map(v => Buffer.isBuffer(v) ? v : Buffer.from(v)))

            const result = await speechClient.recognize(wavBuffer, 'wav', 8000)
            
            if (result.err_no === 0) {
                resolve(result.result[0])
            } else {
                resolve('')
            }            
        } catch (error) {
            console.log(`Bot: wav to text error`, error)
            resolve('')
        }
    })
}



