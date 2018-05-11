## Connecting ChatBots.

Wechaty is a Bot Framework for Wechat **Personal** Accounts which can help you create a bot in 6 lines of javascript by an easy to use API, with cross-platform support including [Linux](https://travis-ci.org/wechaty/wechaty), [Windows](https://ci.appveyor.com/project/wechaty/wechaty), [Darwin(OSX/Mac)](https://travis-ci.org/wechaty/wechaty) and [Docker](https://circleci.com/gh/wechaty/wechaty).

[![Join the chat at https://gitter.im/zixia/wechaty](https://badges.gitter.im/zixia/wechaty.svg)](https://gitter.im/zixia/wechaty?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![node](https://img.shields.io/node/v/wechaty.svg?maxAge=604800)](https://nodejs.org/) [![Repo Size](https://reposs.herokuapp.com/?path=wechaty/wechaty)](https://github.com/wechaty/wechaty)

:octocat: <https://github.com/wechaty/wechaty>  
:beetle: <https://github.com/wechaty/wechaty/issues>  
:book: <https://github.com/wechaty/wechaty/wiki>  
:whale: <https://hub.docker.com/r/zixia/wechaty>  

## wechaty-getting-started

Wechaty is super easy to use, especially when you are using Docker.   
This repo contains the code for the video tutorial.   

### Functions as follows:
* If you send 'hello' to the bot, the bot will reply 'hello how are you'  
* If you send 'test' to the bot, the bot will add you to the room 'test' (You should create a room called test before)
* If you send 'out' to the bot, the bot will remove you from the room 'test'

<div align="center">
<a target="_blank" href="https://blog.wechaty.io/guide/2017/01/01/getting-started-wechaty.html"><img src="https://cloud.githubusercontent.com/assets/1361891/21722581/3ec957d0-d468-11e6-8888-a91c236e0ba2.jpg" border=0 width="60%"></a>
</div>

Above is a 10 minute video tutorial, which is a good way to start if you are new to Wechaty.

Learn more about wechaty: [Wechaty](https://github.com/wechaty/wechaty "Wechaty")


## Run  

### docker

```sh
git clone https://github.com/lijiarui/wechaty-getting-started.git
cd wechaty-getting-started
docker run -ti --volume="$(pwd)":/bot --rm zixia/wechaty mybot.ts
```

### npm

```sh
git clone https://github.com/lijiarui/wechaty-getting-started.git
npm install
node mybot.js
```

