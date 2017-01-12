# Getting-Started-with-Wechaty---Live-Coding-Tutorial

Wechaty is super easy to use, especially when you are using Docker.   
This repo contains the code about the video tutorial.   

[Click here](https://blog.wechaty.io/guide/2017/01/01/getting-started-wechaty.html "Click here") to watch the wechaty tutorial video

# run  

```sh
git clone https://github.com/lijiarui/Getting-Started-with-Wechaty---Live-Coding-Tutorial.git
docker run -ti --volume="$(pwd)":/bot --rm zixia/wechaty mybot.ts
```