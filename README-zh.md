# WECHATY-GETTING-STARTED
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![English Version](https://img.shields.io/badge/-English%20Version-blue.svg)](README.md)

[Wechaty](https://github.com/Chatie/wechaty/) 是一个开源的的 **个人号** 微信机器人接口，是一个使用Typescript 构建的Node.js 应用。支持多种微信接入方案，包括网页，ipad，ios，windows， android 等。同时支持Linux, OSX, Win32 和 Docker 等多个平台。

只需要6行代码，你就可以 **通过个人号** 搭建一个 **微信机器人功能** ，用来自动管理微信消息。

更多功能包括：
- 消息处理：关键词回复
- 群管理：自动入群，拉人，踢人
- 自动处理好友请求
- 智能对话：通过简单配置，即可加入智能对话系统，完成指定任务
- ... 请自行开脑洞

详情请看[Wechaty](https://github.com/chatie/wechaty)项目。这个项目是 wechaty 初学者的入门教程, 进阶请查看[文档](http://wechaty.botorange.com)

## 快速开始

### 1. 下载代码
```sh
git clone https://github.com/chatie/wechaty-getting-started.git
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

![demo](https://chatie.io/wechaty-getting-started/demo.gif)

截图展示二维码，扫码登陆后，这个微信号就会变成机器人。
> 某些情况下因为字体问题，导致无法扫码，你也可以复制二维码下面的链接到浏览器里面打开，然后扫码

成功登录后，命令行会显示账号的登陆信息，你应该可以在中括号里看到你的微信名字。
```
Contact<李佳芮> login
```
除此之外，还能看到你的好友给你发送的消息，比如例子中收到了一条文字(`Text`)类型的消息(`Message`)
```
Message#Text(Contact<高原> Contact<李佳芮>)<你好>
```

### 4. Web 限制登陆的解决办法：

从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆Web 微信，但不影响手机等其他平台。验证是否被限制登陆： https://wx.qq.com 上扫码查看是否能登陆。

如果还希望接入，推荐你切换到非WEB的接入方式，我们现在提供一个ipad 的接入方式，只需要下面2条命令就可以切换成功：

```shell
# 1. 安装 wechaty-puppet-padchat
npm install wechaty-puppet-padchat

# 2. 通过环境变量设置接入方式并设置token 运行
WECHATY_PUPPET_PADCHAT_TOKEN=your_padchat_token WECHATY_PUPPET=padchat node examples/ding-dong-bot.js
```

**说明**
1. [点击查看获取token的方法](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/%E8%B4%AD%E4%B9%B0token)
2. 具体实现请看：具体细节请看[puppet-padchat](https://github.com/lijiarui/wechaty-puppet-padchat)


## 试一试
![Wechaty Developers' Home](https://chatie.io/wechaty-getting-started/bot-qr-code.png)

回复 'wechaty' 加入 Wechaty 开发者群。
> 群内均为wechaty 的开发者，如果仅是为了测试功能，请测试后自动退群。为了避免广告及不看文档用户，群主及机器人会T人，不喜勿加。群内发言之前请先阅读文档，谢谢！

## 进阶学习

### 1. Wechaty 视频教学课程

<div align="center">
<a target="_blank" href="https://v.qq.com/x/page/k0726ho4rce.html"><img src="https://cloud.githubusercontent.com/assets/1361891/21722581/3ec957d0-d468-11e6-8888-a91c236e0ba2.jpg" border=0 width="60%"></a>
</div>

请观看这个1分钟的教学视频，帮助你快速了解如何使用wechaty

### 2. 示例代码
下面的表格解释了examples目录下各个代码的功能

| 文件名称        | 描述 |
| ---                 | ---         |
| contact-bot.js      | 展示微信号下所有联系的人微信ID和昵称。|
| media-file-bot.js   | 将消息中的文件、图片、视频等非文本信息存到本地。 |
| tuling123-bot.ts    | 接入tuling123 机器人，可以回答任何消息。 |

[点击这里查看 更多Wechaty 官方 示例代码](https://github.com/Chatie/wechaty/tree/master/examples)

### 3. 什么是 WECHATY_PUPPET

不同的Puppet是代表的我们对微信协议的不同实现方式，所以请选择一种适合您的选择，本项目默认使用web 协议实现，更详细的介绍参考[Puppet的详情](https://wechaty.botorange.com/puppet)

同时我们提供 ipad实现方式, 请查看 [puppet-padchat](https://github.com/lijiarui/wechaty-puppet-padchat) 介绍并获取[token](https://github.com/lijiarui/wechaty-puppet-padchat/wiki/%E8%B4%AD%E4%B9%B0token)

## 中文文档

<https://docs.chatie.io/wechaty>

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

更多详见 [FAQ-ZH](https://wechaty.botorange.com/faq)
