## Connecting ChatBots.

Wechaty is a Bot Framework for Wechat **Personal** Account which can help you create a bot in 6 lines of javascript by easy to use API, with cross-platform support include [Linux](https://travis-ci.org/wechaty/wechaty), [Windows](https://ci.appveyor.com/project/wechaty/wechaty), [Darwin(OSX/Mac)](https://travis-ci.org/wechaty/wechaty) and [Docker](https://circleci.com/gh/wechaty/wechaty).

[![Join the chat at https://gitter.im/zixia/wechaty](https://badges.gitter.im/zixia/wechaty.svg)](https://gitter.im/zixia/wechaty?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![node](https://img.shields.io/node/v/wechaty.svg?maxAge=604800)](https://nodejs.org/) [![Repo Size](https://reposs.herokuapp.com/?path=wechaty/wechaty)](https://github.com/wechaty/wechaty)

:octocat: <https://github.com/wechaty/wechaty>  
:beetle: <https://github.com/wechaty/wechaty/issues>  
:book: <https://github.com/wechaty/wechaty/wiki>  
:whale: <https://hub.docker.com/r/zixia/wechaty>  

## wechaty-getting-started

Wechaty is super easy to use, especially when you are using Docker.   
This repo contains the code about the video tutorial.   

<div align="center">
<a target="_blank" href="https://blog.wechaty.io/guide/2017/01/01/getting-started-wechaty.html"><img src="https://cloud.githubusercontent.com/assets/1361891/21722581/3ec957d0-d468-11e6-8888-a91c236e0ba2.jpg" border=0 width="60%"></a>
</div>

The above 10 minutes video tutorial, which is a good start if you are new to Wechaty.

Learn more about wechaty: [Wechaty](https://github.com/wechaty/wechaty "Wechaty")


## run  

### docker

```sh
git clone https://github.com/lijiarui/wechaty-getting-started.git
docker run -ti --volume="$(pwd)":/bot --rm zixia/wechaty mybot.ts
```

### npm

```sh
git clone https://github.com/lijiarui/wechaty-getting-started.git
npm install
node mybot.js
```

