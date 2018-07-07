# WECHATY-GETTING-STARTED
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![English Version](https://img.shields.io/badge/-English%20Version-lightgrey.svg)](https://github.com/chatie/wechaty-getting-started/blob/master/README.md)

[Wechaty](https://github.com/Chatie/wechaty/) 是一个开源的的个人号微信机器人接口，是一个使用Typescript 构建的Node.js 应用。支持多种微信接入方案，包括网页，ipad，ios，windows， android 等。同时支持Linux, OSX, Win32 和 Docker 等多个平台。

只需要6行代码，你就可以搭建你的个人号微信机器人，用来管理微信消息。

更多功能，包括消息处理，群管理，好友请求以及加入智能对话功能，可以仔细看[Wechaty](https://github.com/chatie/wechaty)项目。这个项目是 wechaty 初学者的入门教程。

## 简单入门

### 1. 下载代码
```sh
git clone https://github.com/lijiarui/wechaty-getting-started.git
cd wechaty-getting-started
```

### 2. 安装依赖
> 注意: Wechaty 需要 Node.js 的版本 >= 10, 建议运行 `node -v` 进行确认

```sh
npm install
```

如果安装速度很慢，建议[设置中国代理npm源](https://github.com/Chatie/wechaty/wiki/NPM#use-npm-in-china)

### 3. 运行机器人
```sh
node examples/starter-bot.js
```

运行成功后可以看到如下截图:

![demo-png](https://chatie.io/wechaty-getting-started/demo.png)

截图展示二维码，扫码登陆后，这个微信号就会变成机器人，并在命令行显示机器人登陆信息： `Contact<李佳芮>login`       
之后，你就可以在命令行看到这个微信收到的所有消息了。

## 注意事项
从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆Web 微信，但不影响手机等其他平台。
验证是否被限制登陆： https://wx.qq.com 上扫码查看是否能登陆。
更多内容详见： 
- [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/Chatie/wechaty/issues/603)
- [[RUMOR] wechat will close webapi for wechat](https://github.com/Chatie/wechaty/issues/990)
- [New account login issue](https://github.com/Chatie/wechaty/issues/872)
- [wechaty-puppet-puppeteer](https://github.com/chatie/wechaty-puppet-puppeteer)

**解决方案：我们提供了非web 版本的解决方案，正在进行alpha 测试，[点击申请测试token](https://github.com/Chatie/wechaty/issues/1296)，技术细节及实现请查看[wechaty-puppet-padchat](https://github.com/lijiarui/wechaty-puppet-padchat)**

## 进阶学习

### 1. Wechaty 视频教学课程

<div align="center">
<a target="_blank" href="https://blog.chatie.io/getting-started-wechaty/"><img src="https://cloud.githubusercontent.com/assets/1361891/21722581/3ec957d0-d468-11e6-8888-a91c236e0ba2.jpg" border=0 width="60%"></a>
</div>

请观看这个1分钟的教学视频，帮助你快速了解如何使用wechaty

### 2. 示例代码

[点击这里查看 Wechaty 官方 示例代码](https://github.com/Chatie/wechaty/tree/master/examples)

| 文件名称        | 描述 |
| ---                 | ---         |
| contact-bot.ts      | 展示微信号下所有联系的人微信ID和昵称。|
| ding-dong-bot.ts    | 自动回复消息 |
| friend-bot.ts       | 自动通过好友请求 |
| media-file-bot.ts   | 将消息中的文件、图片、视频等非文本信息存到本地。 |
| room-bot.ts         | 微信群管理。 |
| speech-to-text-bot.ts | 将微信中的语音消息转换成文字消息。 |
| tuling123-bot.ts    | 接入tuling123 机器人，可以回答任何消息。 |
| hot-import-bot      | 热加载代码，无需重启可以运行修改的代码。 |
| blessed-twins-bot/  | 启动多个wechaty bot 实例 |
| busy-bot.ts         | 当微信号处于BUSY模式的时候进行自动回复。 |
| gist-bot/           | 将不同的wechaty 函数拆分到不同的文件中 |
| hot-reload-bot/     | 热加载代码，无需重启可以运行修改的代码 @deprecated,  详见`hot-import-bot.ts`  |
| api-ai-bot.ts       | 集成了api.ai 的功能，提取意图和实体。|

## 接口文档

1. JSDoc: <https://chatie.io/wechaty/>

## 常见问题 FAQ

### 1. 每次登陆都要扫码么？
默认情况下，系统可以自动登陆，信息保存在 *.memory-card.json 中

### 2. 支持 红包、转账、朋友圈… 吗？
以下功能目前 均不支持

支付相关 - 红包、转账、收款 等都不支持
在群聊中@他人 - 是的，Web 微信中被人@后也不会提醒
发送名片
发送分享链接
发送语音消息 - 后续会支持
朋友圈相关 - 后续会支持

更多详见 [wiki](https://github.com/chatie/wechaty/wiki)