# Wechaty Getting Started [![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://wechaty.js.org)

[![Node.js CI](https://github.com/wechaty/wechaty-getting-started/workflows/Node.js%20CI/badge.svg)](https://github.com/wechaty/wechaty-getting-started/actions?query=workflow%3A%22Node.js+CI%22)
![Node.js v12](https://img.shields.io/badge/node-%3E%3D12-green.svg)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

[Wechaty](https://github.com/wechaty/wechaty/) is a Conversatioanl RPA SDK for Chatbot Makers. It's well designed with an easy to use API, supports all OSs including Linux, OSX, Win32, Docker, and lots of IMs including WeChat, WeCom, Whatsapp, Lark, Gitter, etc.

As a developer, you can use Wechaty to easily build your bot, effectively manage message sending/receiving, room creating/inviting, contact friendship, and delightful add artificial intelligence between users and your bot.

This repository should work out-of-the-box, and is the best start point for Wechaty beginners.

If you have any questions, please join our Gitter at <https://gitter.im/wechaty/wechaty>

## TL;DR

The fatest way to getting started with Wechaty is to use a Cloud IDE.

If you have no idea about anything, then you should try Gitpod first.

### [Gitpod ❤️  Wechaty](docs/gitpod.md)

[![GitPod Ready-to-Code][gitpod_img]][gitpod_link]

Use Gitpod to run our [Wechaty Getting Started ding-dong BOT](examples/ding-dong-bot.ts) instantly inside your browser!

Learn more about [Gitpod ❤️  Wechaty](docs/gitpod.md)

### Google Cloud Shell

[![Open in Cloud Shell][shell_img]][shell_link]

> Generated via [open-in-cloud-shell](https://cloud.google.com/shell/docs/open-in-cloud-shell)

The Google Cloud Shell should open our tutorial in the right panel for you, please follow it to finish the tutorials.

## Features

1. Works out-of-the-box under Linux/Mac/Windows.
1. Supports all puppets like Web, Pad, Windows, and Mac.
1. Reply a `dong` message when it received a `ding`.

## Requirements

1. [Node.js](https://nodejs.dev/) v12+
1. [Wechaty Puppet Service TOKEN](https://wechaty.js.org/docs/puppet-services/) (if you want to use RPA protocols other than Web)

## Getting Started

### 1 Install Node.js (>=12)

If you have not installed Node.js(or version is below 10),You need to install the latest version of Node.js first by following the links below:

- [Windows](https://nodejs.org/en/download/package-manager/#windows)
- [Linux(Debian/Ubuntu)](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
- [macOS](https://nodejs.org/en/download/package-manager/#macos)

> Instal Node.js for other platforms can be found at <https://nodejs.org/en/download/package-manager/>

### 2 Clone this Repository

```sh
git clone https://github.com/wechaty/wechaty-getting-started.git
cd wechaty-getting-started
```

### 3 Install Dependencies

```sh
npm install
```

#### Troubleshooting

1. You might want to use taobao registry mirror for NPM:

    ```sh
    npm --registry=https://registry.npm.taobao.org install
    ```

1. You mignt need [windows-build-tool](https://www.npmjs.com/package/windows-build-tool) if you are using windows:

    ```sh
    npm install windows-build-tool
    ```

### 4 Run the Bot

You can use `export` to set environment variables in Linux, and use `set` in Windows.

#### Linux

```shell
export WECHATY_LOG=verbose
export WECHATY_PUPPET=wechaty-puppet-wechat
npm start
# the above is equals to the below command:
# npx ts-node examples/ding-dong-bot.ts
```

#### Windows

```shell
set WECHATY_LOG=verbose
set WECHATY_PUPPET=wechaty-puppet-wechat
npm start
# the above is equals to the below command:
# npx ts-node examples/ding-dong-bot.ts
```

You are all set!

## Working with Different Puppets

In our getting started example, the ding-dong BOT is using [wechaty-puppet-wechat4u](https://github.com/wechaty/wechaty-puppet-wechat4u) when `WECHATY_PUPPET` is not set, which is just for newcomer's convenience.

By default, the Wechaty will use the [Puppet Service](https://wechaty.js.org/docs/puppet-services/) for logging in your bot. You can use other [Puppet Provider](https://github.com/wechaty/wechaty-puppet/wiki/Directory) like Whatsapp Web protocol([wechaty-puppet-whatsapp](https://github.com/wechaty/wechaty-puppet-whatsapp)).

If you want to use a Wechaty Puppet Provider for different protocols, then you need to specified a puppet service provider name (the same as its NPM name) by setting the `WECHATY_PUPPET` environment variable.

Thanks for the great contributions from our great community, there are many Wechaty Puppets can be used by Wechaty, which helps us to use protocols like Web, Pad, Mac, and Windows.

### Wechaty Puppets

| Protocol | NPM |
| :--- | :--- |
| Puppet Service | `wechaty-puppet-service` |
| Whatsapp Web | `wechaty-puppet-whatsapp` |
| WeChat Web | `wechaty-puppet-wechat` |
| WeChat Pad | `wechaty-puppet-padlocal` |

> Visit our website for learning more about [Wechaty Puppet Service Providers](https://wechaty.js.org/docs/puppet-services/)

For example, if you want to use the `padlocal` puppet, you should set `WECHATY_PUPPET=wechaty-puppet-padlocal` before you run `npm start`.

> You also need a TOKEN for the `wechaty-puppet-padlocal`, and set it to the `WECHATY_PUPPET_PADLOCAL_TOKEN` environment variable. Apply the PadLocal TOKEN from [here](https://wechaty.js.org/docs/puppet-services/padlocal/)

### Linux / macOS

```sh
export WECHATY_PUPPET=wechaty-puppet-padlocal
export WECHATY_PUPPET_PADLOCAL_TOKEN='puppet_padlocal_your-token-here'
npm start
```

### Windows

```sh
set WECHATY_PUPPET=wechaty-puppet-padlocal
set WECHATY_PUPPET_PADLOCAL_TOKEN='puppet_padlocal_your-token-here'
npm start
```

Learn more about how to install under windows from this [blog post](https://wechaty.js.org/2018/07/24/wechaty-installation-in-windows-10/).

## Advanced

### 1 Wechaty Tutorial

<div align="center">
<a target="_blank" href="https://wechaty.js.org/2017/01/01/getting-started-wechaty/"><img src="https://cloud.githubusercontent.com/assets/1361891/21722581/3ec957d0-d468-11e6-8888-a91c236e0ba2.jpg" border=0 width="60%"></a>
</div>

Above is a 10 minute video tutorial(a little outdated, it's running under v0.14 or older versions of Wechaty), which is a good way to start if you are new to Wechaty.

### 2 More Examples

> Note: Please make sure you can run `npm start` with this repository first before you go furture with more examples!

- [Official Wechaty Examples Directory](https://github.com/wechaty/wechaty-getting-started/tree/master/examples)

## API REFERENCE

1. GitBook: <https://wechaty.js.org/api>

## SEE ALSO

### 1 Docker Wechaty Getting Started

[![Docker](https://avatars0.githubusercontent.com/u/5429470?s=200)](https://github.com/Chatie/docker-wechaty-getting-started)

<https://github.com/Chatie/docker-wechaty-getting-started>

### 2 Heroku Wechaty Getting Started

[![Heroku](https://avatars3.githubusercontent.com/u/23211?s=200)](https://github.com/Chatie/heroku-wechaty-getting-started)

<https://github.com/Chatie/heroku-wechaty-getting-started>

### 3 Wechaty Home

<https://wechaty.github.io>

## FAQ

### 1. I can not login with my Wechat account

WeChat account that registered after 2017 will not be able to login via Web API.  Learn more at <https://github.com/Chatie/wechaty/issues/872>

Solution: Wechaty support protocols other than Web API, such as pad. Learn more at <https://github.com/Chatie/wechaty/issues/1296>

### 2. What is a `Puppet` in Wechaty

The term [Puppet](https://github.com/Chatie/wechaty/wiki/Puppet) in Wechaty is an Abstract Class for implementing protocol plugins. The plugins are the component that helps Wechaty to control the Wechat(that's the reason we call it puppet).

The plugins are named `PuppetXXX`, like [PuppetWeChat](https://github.com/Chatie/wechaty-puppet-wechat) is using the [google puppeteer](https://github.com/GoogleChrome/puppeteer) to control the [WeChat Web API](https://wx.qq.com) via a chrome browser, [PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat) is using the WebSocket protocol to connect with a Protocol Server for controlling the iPad Wechat program. More detail you could go [Puppet in wiki](https://github.com/Chatie/wechaty/wiki/Puppet).

Learn more about Wechaty Puppet from our documentation at [Wechaty Puppet](https://wechaty.js.org/docs/specifications/puppet)

## Wechaty Getting Started in Multiple Languages

[![Wechaty in Python](https://img.shields.io/badge/Wechaty-Python-blue)](https://github.com/wechaty/python-wechaty)
[![Wechaty in Go](https://img.shields.io/badge/Wechaty-Go-7de)](https://github.com/wechaty/go-wechaty)
[![Wechaty in Java](https://img.shields.io/badge/Wechaty-Java-f80)](https://github.com/wechaty/java-wechaty)
[![Wechaty in Scala](https://img.shields.io/badge/Wechaty-Scala-890)](https://github.com/wechaty/scala-wechaty)
[![Wechaty in PHP](https://img.shields.io/badge/Wechaty-PHP-99c)](https://github.com/wechaty/php-wechaty)
[![Wechaty in .NET(C#)](https://img.shields.io/badge/Wechaty-.NET-629)](https://github.com/wechaty/dotnet-wechaty)

- [TypeScript Wechaty Getting Started](https://github.com/wechaty/wechaty-getting-started)
- [Python Wechaty Getting Started](https://github.com/wechaty/python-wechaty-getting-started)
- [Go Wechaty Getting Started](https://github.com/wechaty/go-wechaty-getting-started)
- [Java Wechaty Getting Started](https://github.com/wechaty/java-wechaty-getting-started)
- [Scala Wechaty Getting Started](https://github.com/wechaty/scala-wechaty-getting-started)
- [PHP Wechaty Getting Started](https://github.com/wechaty/php-wechaty-getting-started)
- [.NET(C#) Wechaty Getting Started](https://github.com/wechaty/dotnet-wechaty-getting-started)

## History

### master

### v0.8 (Feb 20, 2021)

[![Open in Cloud Shell][shell_img]][shell_link]

Using Google Cloud Shell for easy getting started!

### v0.6 (Feb 11, 2021)

[![GitPod Ready-to-Code][gitpod_img]][gitpod_link]

Using Gitpod for easy getting started!

### v0.0.1 (Jan 12, 2017)

Init version

## Contributors

[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/images/0)](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/links/0)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/images/1)](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/links/1)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/images/2)](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/links/2)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/images/3)](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/links/3)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/images/4)](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/links/4)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/images/5)](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/links/5)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/images/6)](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/links/6)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/images/7)](https://sourcerer.io/fame/huan/wechaty/wechaty-getting-started/links/7)

## Maintainers

[@wechaty/contributors](https://github.com/orgs/wechaty/teams/contributors/members)

## Copyright & License

- Code & Docs © 2018-now Huan and [Wechaty Contributors](https://wechaty.js.org/contributors/)
- Code released under the Apache-2.0 License
- Docs released under Creative Commons

[gitpod_img]: https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod
[gitpod_link]: https://gitpod.io/#https://github.com/wechaty/wechaty-getting-started

[shell_img]: https://gstatic.com/cloudssh/images/open-btn.svg
[shell_link]: https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Fwechaty%2Fwechaty-getting-started&cloudshell_open_in_editor=examples/ding-dong-bot.ts&cloudshell_workspace=.&cloudshell_tutorial=examples/tutorials/google-cloud-shell-tutorial.md
