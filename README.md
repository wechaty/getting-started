# WECHATY-GETTING-STARTED

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/chatie/wechaty)
[![中文版本](https://img.shields.io/badge/-%E4%B8%AD%E6%96%87%E7%89%88-red.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAAAyCAIAAACrjaCVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gcHAzAxNHF8EAAAA7dJREFUaN7tmU9oXFUUxr/v3PveZF7eNDON0UYrQihYIWitVVApCCJ0KwguRKi6qiv/gIJudCcu3YqCiFtBEDfiRqVdCQoFG9GKQUksiZlMk/nz3rvnuJhUmrTWRCO8Sd5ZDMMshvnNud9533cuL87OaJYb9kWJwWIv2H+1e8y2/5iLSKl+HzHbwNJnar2J3kgw+//+n/UnC39MDzxxGa2x7ldF+E6idQH3bp8NYObSh1xyOLv1dEdS8d1SA+9Cnw2QFWQ/ycKHB2r3eJ0TF2BuTzMDkJj9z+C6cY8miRNYgO5xZii4ChgEtEGeRXRKgIANX0ZczwrcjkLC1Z8RcEZuvBcXpLiJAxHLg5XS8uzgRxHQftF4zngnUFzfkRhhA/Aox1/qJs8zpDbafTZofrObONlNn1TL/ubrFLhbDp3JDz/dcbMMiwZylJlzqT9gcbo6+bAOGka9DowReiFbeMet/dLIloK/v4YQRm2G1cGWEqRYrjxwKpca4uZy8vghnIVIUAWCC0v4S+OOLp8LC6+n8bmuJJk5z5KNcd4oSxr0oCXP5q2T6wwoItanNKr3DFxvJ7ZCZ2GQR5c+SPVz87nw6nYHQ/nc9zBL+htPLfmD3ff9IBqfOb2medcpYEbYeGuNk77faay8keBr9ZnbJFuWEXjbeib8CvSt+McXWtpLcOWUUmx1rjn/VJx/YexHLLfZ3PEMUwgBfqnt84QDhnbD+cuf5jovXp3YNXItEKaZxwHKkWTeIJ+SieMBznd+TbOsBkHyIH3qtj5/DZqKO2HNV/LaKeht1PKdgW3Jjsrovjyuy+InjfX3EkyHqZez5IQtTfSkU9+iBRsY7tXWo21/S/r7BfqF4cEYNWY1TR+Ti28384/E9czmZPH7qPlmER1zYZ7gplZzrfB+fOHj0DzCcD74WgwrlxfjdvaeBstma2Pf9FkzhQOgRA7Dkaj2Q7GliwqEhkZt7U27uEPfZ3n85/BZxe3uegvAb05JBuo1Udk2AhUIKqxk53qHu16PrbGQV4AJC2bBMg3aFNrGnsQE5VyY7IJ1MFUcjwrD2COB50zPAtFe35MQrr9YzLy7nNyhPy8f7H+bx2GMWl6bsguh3qDRFPKVCMHVj1rtrgRhz/dZ6Fblt9cm8hfl0qvdcRlOu/IWd+eOTmEGTBJtZYk3vdvIVTuRCAG0DRiBtFHdS1bMFXPFXDFXzBVzxVwxV8wVc8VcMVfMFfM/VamvTP+HUsC43/pMgPDmnanaaN0g/2slq8H5PwGImJ2/F4S+9AAAAABJRU5ErkJggg==)](README-zh.md)

[Wechaty](https://github.com/Chatie/wechaty/) is a Wechat Bot SDK for Personal Account that lets you create software to extend the functionality of the Wechat, writen in Node.js with TypeScript, Support all platforms including Linux, OSX, Win32, and Docker.

As a developer, you can use Wechaty to easily build your bot on top of Wechat Personal Account, effectively manage message sending/receiving, room creating/inviting, contact friendship, and delightful add artificial intellengence between users and your bot.

This repository should work out-of-the-box, and is the best start point for Wechaty beginners.

## GETTING STARTED

### 0. Install Node.js

You can install Node.js in your environment by following the links below:

* [Windows](https://nodejs.org/en/download/package-manager/#windows)
* [Linux(Debian/Ubuntu)](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
* [macOS](https://nodejs.org/en/download/package-manager/#macos)

> Installing Node.js for other platform can be found at <https://nodejs.org/en/download/package-manager/>

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

The term [Puppet](https://github.com/Chatie/wechaty/wiki/Puppet) in Wechaty is an Abstract Class for implementing protocol plugins. The plugins are the component that helps Wechaty to control the Wechat(that's the reason we call it puppet).

The plugins are named `XXXPuppet`, like [PuppetPuppeteer](https://github.com/Chatie/wechaty-puppet-puppeteer) is using the [google puppeteer](https://github.com/GoogleChrome/puppeteer) to control the [WeChat Web API](https://wx.qq.com) via a chrome browser, [PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat) is using the WebSocket protocol to connect with a Protocol Server for controlling the iPad Wechat program.
