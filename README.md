# WECHATY-GETTING-STARTED

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![中文版本](https://img.shields.io/badge/-%E4%B8%AD%E6%96%87%E7%89%88-lightgrey.svg)](https://github.com/chatie/wechaty-getting-started/blob/master/README-zh.md)

[Wechaty](https://github.com/Chatie/wechaty/) is a Wechat Bot SDK for Personal Account that lets you create software to extend the functionality of the Wechat, writen in Node.js with TypeScript, Support all platforms including Linux, OSX, Win32, and Docker.

As a developer, you can use Wechaty to easily build your bot on top of Wechat Personal Account, effectively manage message sending/receiving, room creating/inviting, contact friendship, and delightful add artificial intellengence between users and your bot.

This repository should work out-of-the-box, and is the best start point for Wechaty beginners.

## GETTING STARTED

### 1. Clone this Repository

```sh
git clone https://github.com/lijiarui/wechaty-getting-started.git
cd wechaty-getting-started
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Run the Bot

```sh
npm start

# Or use node to run bot directly

node examples/starter-bot.js
```

You are all set!

## ADVANCED

### 1. Wechaty Tutorial

<div align="center">
<a target="_blank" href="https://blog.chatie.io/getting-started-wechaty/"><img src="https://cloud.githubusercontent.com/assets/1361891/21722581/3ec957d0-d468-11e6-8888-a91c236e0ba2.jpg" border=0 width="60%"></a>
</div>

Above is a 10 minute video tutorial(a little outdated, it's running under v0.14 or older versions of Wechaty), which is a good way to start if you are new to Wechaty.

### 2. More Examples

You can get all of the following examples at our [Official Wechaty Examples Directory](https://github.com/Chatie/wechaty/tree/master/examples)

| File Name        | Description |
| ---                 | ---         |
| gist-bot/           | Decouple functions to different files |
| hot-reload-bot/     | Update code without restart program. @deprecated, see `hot-import-bot` instead |
| api-ai-bot.ts       | Integrate with api.ai for Intents & Entities |
| contact-bot.ts      | List All Contacts by Wechat ID & Name |
| ding-dong-bot.ts    | Auto Reply Message |
| friend-bot.ts       | Auto Accept Friend Request |
| media-file-bot.ts   | Save Media Attachment in Message to Local File |
| room-bot.ts         | Manage Chat Room |
| speech-to-text-bot.ts | Convert Voice Message to Text |
| tuling123-bot.ts    | Answer Any Question |
| hot-import-bot      | Use hot-import for updating code without restarting program |
| blessed-twins-bot/  | Multi-Instance Twins Bot Powered by Blessed |
| busy-bot.ts         | Enter Auto Response Mode when you are BUSY |

## API REFERENCE

1. JSDoc: <https://chatie.io/wechaty/>

## FAQ

### 1. I can not login with my Wechat account

Wechat account that registered after 2017 will not be able to login via Web API.  Learn more at <https://github.com/Chatie/wechaty/issues/872>

Solution: Wechaty support protocols other than Web API, such as pad. Learn more at <https://github.com/Chatie/wechaty/issues/1296>

### 2. What is a `Puppet` in Wechaty

The term `Puppet` in Wechaty is an Abstract Class for implementing protocol plugins. The plugins are the component that helps Wechaty to control the Wechat(that's the reason we call it puppet).

The plugins are named `XXXPuppet`, like `PuppetPuppeteer` is using the chrome puppeteer to control the WeChat Web API via a chrome browser, `PuppetPadchat` is using the WebSocket protocol to connect with a Protocol Server for controlling the iPad Wechat program.
