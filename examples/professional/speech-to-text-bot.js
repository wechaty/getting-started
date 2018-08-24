const { createReadStream } = require('fs')
const { PassThrough } = require('stream')
const Ffmpeg = require('fluent-ffmpeg')
const FfmpegPath = require('@ffmpeg-installer/ffmpeg').path
const { Message, Wechaty } = require('wechaty')
const AipSpeech = require('baidu-aip-sdk').speech
const StreamToArray = require('stream-to-array')
const qrcodeTerminal = require('qrcode-terminal')

Ffmpeg.setFfmpegPath(FfmpegPath)
const baiduSpeechConfig = {
    app_id: 'APP_ID',
    api_id: 'API_ID',
    secret_id: 'SECRET_ID'
}

if (baiduSpeechConfig.api_id === 'APP_ID') {
    throw TypeError(`you must set your baidu config`)
}

const speechClient = new AipSpeech(baiduSpeechConfig.app_id, baiduSpeechConfig.api_id, baiduSpeechConfig.secret_id)
const Bot = Wechaty.instance()


Bot
    .on('scan', (qrcode, status) => {
        qrcodeTerminal.generate(qrcode)
        console.log(`${qrcode}\n[${status}] Scan QR Code in above url to login: `)
    })
    .on('login', user => console.log(`${user} logined`))
    .on('message', async function(msg) {
        try {
            console.log(`RECV: ${msg}`)

            if (msg.type() !== Message.Type.Audio) {
                return // skip no-VOICE message
            }
    
            const msgFile = await msg.toFileBox()
            const filename = msgFile.name
            await msgFile.toFile(filename)
    
            const mp3Stream = createReadStream(filename)
            const text = await speechToText(mp3Stream)
            console.log('VOICE TO TEXT: ' + text)
    
            if (msg.self()) {
                await Bot.say(text)  // send text to 'filehelper'
            } else {
                await msg.say(text)     // to original sender
            }
    
        } catch (e) {
            console.log('Bot error: ', e)
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



