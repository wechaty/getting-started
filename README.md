# Wechaty Getting Started [![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://wechaty.js.org)

[![Node.js CI](https://github.com/wechaty/getting-started/workflows/Node.js%20CI/badge.svg)](https://github.com/wechaty/getting-started/actions?query=workflow%3A%22Node.js+CI%22)
![Node.js v16](https://img.shields.io/badge/node-%3E%3D16-green.svg)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![ES Modules](https://img.shields.io/badge/ES-Modules-brightgreen)](https://github.com/Chatie/tsconfig/issues/16)

## About Wechaty

[Wechaty](https://github.com/wechaty/wechaty/) is a Conversational RPA(Robotic Process Automation) SDK(Software Development Kit) for Chatbot Makers. It's well designed with an easy to use API. It supports all operating systems including Linux, OSX, Win32, Docker, and lots of IMs(Instant Messaging services) including WeChat, WeCom, Whatsapp, Lark, Gitter, etc.

As a developer, you can use Wechaty to easily build your bot, effectively manage message sending and receiving, room creation and sending out invitations, contact friends, and delightfully add artificial intelligence between users and your bot.

## About Wechaty Getting Started Project

If you are a total beginner to Wechaty, this project is the best starting point for you. You can run it on a Cloud IDE in a couple of steps or on a local setup on your machine as described in the sections below.

If you encounter difficulties or have any questions, you are welcome to ask for help in our Gitter room at <https://gitter.im/wechaty/wechaty>.

Notice: the current active version of Wechaty is v1.x which is not compatible with most of the v0.x modules.

- **`wechaty@0.x`** - To use the Wechaty v0.x, please visit the [Wechaty Getting Started v0.x](https://github.com/wechaty/getting-started/tree/v0.x) branch.

### Features of Wechaty Getting Started project

1. It works out of the box on Linux, Mac or Windows.
1. Supports all puppets like Web, Pad, Windows, and Mac.
1. It replies with a `dong` message when it receives a `ding` message.

### Running Wechaty Getting Started Project on a cloud based IDE

The fastest way to getting started with Wechaty is to use a Cloud based IDE for running the Wechaty Getting Started Project. You can either use Gitpod or Google Cloud Shell.

If you are a total beginner, then we recommed Gitpod.

#### Using [Gitpod ❤️ Wechaty](docs/gitpod.md)

Gitpod  is an online and open source platform for automated and ready-to-code development environments. You can click the button below to access a complete setup of [Wechaty Getting Started ding-dong BOT](examples/ding-dong-bot.ts) project on gitpod. If you have never used gitpod before, you will be required to login using your gitHub account.

[![GitPod Ready-to-Code][gitpod_img]][gitpod_link]

You can learn more about [Gitpod ❤️ Wechaty](docs/gitpod.md) from our blog: [Getting Started Without Leaving Your Browser: Wechaty ❤️ Gitpod, @huan, Feb 06, 2021](https://wechaty.js.org/2021/02/06/wechaty-getting-started-without-leave-your-browser/)

#### Using Google Cloud Shell

Google Cloud Shell is an online development and operations environment accessible anywhere with your browser. You can run this project on Google Cloud Shell by clicking the button below.

[![Open in Cloud Shell][shell_img]][shell_link]

> Generated via [open-in-cloud-shell](https://cloud.google.com/shell/docs/open-in-cloud-shell)

After opening the Google Cloud Shell editor, there should be an open tutorial in the right panel which you can follow to learn more about Wechaty.

Learn more about running this project on Google Cloud Shell from our blog: [Google Cloud Shell Tutorials for Wechaty, @huan, Feb 20, 2021](https://wechaty.js.org/2021/02/20/google-cloud-shell-tutorials/)

### Running Wechaty Getting Started project on your local machine

#### Prerequisites

For you to run this project on your local machine, you need to:

1. Have [Node.js](https://nodejs.dev/) v16+ installed on your machine. You can run the command `node -v` on the terminal to check whether you have `Node.js` installed. If you have it, you should be able to see the version printed on the terminal  like `v16.13.0`. Your version might be different from `v16.13.0`. If it is not installed or your version is below 16, You need to install the latest version by following the links below:
    - [Windows](https://nodejs.org/en/download/package-manager/#windows)
    - [Linux(Debian/Ubuntu)](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
    - [macOS](https://nodejs.org/en/download/package-manager/#macos)
    > Node.js for other platforms can be found at <https://nodejs.org/en/download/package-manager/>

2. Have [Wechaty Puppet Service TOKEN](https://wechaty.js.org/docs/puppet-services/) if you want to use RPA protocols other than Web

#### Step 1: Clone this Repository

You need to clone this repository to your local machine and then switch to `wechaty-getting-started` directory by running the commands below.

```sh
git clone https://github.com/wechaty/getting-started.git
cd getting-started
```

#### Step 2: Install Dependencies

You need to install dependencies by running the command below.

```sh
npm install
```

#### Step 3: Run the Bot

You can use `export` to set environment variables in Linux, and use `set` in Windows. If you run into errors while running this command, check the troubleshooting tips in step 4.

##### Linux

```shell
export WECHATY_LOG=verbose
export WECHATY_PUPPET=wechaty-puppet-wechat
npm start
# the above is equals to the below command:
# npx ts-node examples/ding-dong-bot.ts
```

##### Windows

```shell
set WECHATY_LOG=verbose
set WECHATY_PUPPET=wechaty-puppet-wechat
npm start
# the above is equals to the below command:
# npx ts-node examples/ding-dong-bot.ts
```

You are all set!

#### Step 4: Troubleshooting

If you run into problems while following the above steps, try the options below. You are also welcome to ask questions in our [gitter chatroom](https://gitter.im/wechaty/wechaty).

1. You might also need [windows-build-tool](https://www.npmjs.com/package/windows-build-tool) if you are using windows:

    ```sh
    npm install windows-build-tools
    ```

## Working with Different Puppets

In our getting started example, the ding-dong BOT uses [wechaty-puppet-wechat4u](https://github.com/wechaty/wechaty-puppet-wechat4u) when `WECHATY_PUPPET` is not set, which is just for newcomer's convenience.

By default, Wechaty will use the [Puppet Service](https://wechaty.js.org/docs/puppet-services/) for logging in your bot. You can use other [Puppet Provider](https://github.com/wechaty/wechaty-puppet/wiki/Directory) like Whatsapp Web protocol( [wechaty-puppet-whatsapp](https://github.com/wechaty/wechaty-puppet-whatsapp)).

If you want to use a Wechaty Puppet Provider for a different protocol, then you need to specify a puppet service provider name (the same as its NPM name) by setting the `WECHATY_PUPPET` environment variable.

Thanks to the great contributions from our community, there are many Wechaty Puppets which can be used by Wechaty. They have helped us use protocols like Web, Pad, Mac, and Windows.

### Wechaty Puppets

| Protocol | NPM |
| :--- | :--- |
| Puppet Service | `wechaty-puppet-service` |
| Whatsapp Web | `wechaty-puppet-whatsapp` |
| WeChat Web | `wechaty-puppet-wechat` |
| WeChat Pad | `wechaty-puppet-padlocal` |

> Visit our website to learn more about [Wechaty Puppet Service Providers](https://wechaty.js.org/docs/puppet-services/)

For example, if you want to use the `padlocal` puppet, you should set `WECHATY_PUPPET=wechaty-puppet-padlocal` before you run `npm start`. You also need a TOKEN for `wechaty-puppet-padlocal` which you need to set to the `WECHATY_PUPPET_PADLOCAL_TOKEN` environment variable. You can apply for the PadLocal TOKEN from [here](https://wechaty.js.org/docs/puppet-services/padlocal/). The code snippets below illustrate what has been described above on Linux/ MacOS and on Windows.

### On Linux / macOS

```sh
export WECHATY_PUPPET=wechaty-puppet-padlocal
export WECHATY_PUPPET_PADLOCAL_TOKEN='puppet_padlocal_your-token-here'
npm start
```

### On Windows

```sh
set WECHATY_PUPPET=wechaty-puppet-padlocal
set WECHATY_PUPPET_PADLOCAL_TOKEN='puppet_padlocal_your-token-here'
npm start
```

Learn more about installing Wechaty on windows from this [blog post](https://wechaty.js.org/2018/07/24/wechaty-installation-in-windows-10/).

## Advanced tutorials

### 1. Wechaty Tutorial

<div align="center">
<a target="_blank" href="https://wechaty.js.org/2017/01/01/getting-started-wechaty/"><img src="https://cloud.githubusercontent.com/assets/1361891/21722581/3ec957d0-d468-11e6-8888-a91c236e0ba2.jpg" border=0 width="60%"></a>
</div>

Above is a 10 minute video tutorial. It is using version 0.14 or older versions of Wechaty therefore it is also outdated. It is a good way to start if you are new to Wechaty.

### 2. More Examples

> Note: Before you attempt more examples, make sure you have tried out the wechaty getting started project in this repository.

- [Official Wechaty Examples Directory](https://github.com/wechaty/getting-started/tree/master/examples)

## API REFERENCE

1. Official API Docs: <https://wechaty.js.org/docs/api>

## MORE RESOURCES

### 1. Docker Wechaty Getting Started

[![Docker](https://avatars0.githubusercontent.com/u/5429470?s=200)](https://github.com/wechaty/docker-wechaty-getting-started)

<https://github.com/wechaty/docker-wechaty-getting-started>

### 2. Heroku Wechaty Getting Started

[![Heroku](https://avatars3.githubusercontent.com/u/23211?s=200)](https://github.com/wechaty/heroku-wechaty-getting-started)

<https://github.com/wechaty/heroku-wechaty-getting-started>

### 3. Wechaty Home

<https://wechaty.github.io>

## FAQ

### 1. I can not login with my Wechat account

WeChat account registered after 2017 will not be able to login via Web API.  Learn more about it at <https://github.com/Chatie/wechaty/issues/872>

Solution: You can use Wechaty support protocols other than Web API, such as pad. Learn more at <https://github.com/Chatie/wechaty/issues/1296>

### 2. What is a `Puppet` in Wechaty

The term [Puppet](https://github.com/Chatie/wechaty/wiki/Puppet) in Wechaty is an Abstract Class for implementing protocol plugins. The plugins are the components that help Wechaty to control Wechat and that's the reason why we call it puppet.

The plugins are named `PuppetXXX`, for example [PuppetWeChat](https://github.com/Chatie/wechaty-puppet-wechat) is using the [google puppeteer](https://github.com/GoogleChrome/puppeteer) to control the [WeChat Web API](https://wx.qq.com) via a chrome browser, [PuppetPadchat](https://github.com/lijiarui/wechaty-puppet-padchat) uses the WebSocket protocol to connect with a Protocol Server for controlling the iPad Wechat program. For more details you can go to [Puppet in wiki](https://github.com/Chatie/wechaty/wiki/Puppet).

Learn more about Wechaty Puppet from our documentation at [Wechaty Puppet](https://wechaty.js.org/docs/specifications/puppet)

## Wechaty Getting Started in Multiple Languages

[![Wechaty in Python](https://img.shields.io/badge/Wechaty-Python-blue)](https://github.com/wechaty/python-wechaty)
[![Wechaty in Go](https://img.shields.io/badge/Wechaty-Go-7de)](https://github.com/wechaty/go-wechaty)
[![Wechaty in Java](https://img.shields.io/badge/Wechaty-Java-f80)](https://github.com/wechaty/java-wechaty)
[![Wechaty in Scala](https://img.shields.io/badge/Wechaty-Scala-890)](https://github.com/wechaty/scala-wechaty)
[![Wechaty in PHP](https://img.shields.io/badge/Wechaty-PHP-99c)](https://github.com/wechaty/php-wechaty)
[![Wechaty in .NET(C#)](https://img.shields.io/badge/Wechaty-.NET-629)](https://github.com/wechaty/dotnet-wechaty)

- [TypeScript Wechaty Getting Started](https://github.com/wechaty/getting-started)
- [Python Wechaty Getting Started](https://github.com/wechaty/python-wechaty-getting-started)
- [Go Wechaty Getting Started](https://github.com/wechaty/go-wechaty-getting-started)
- [Java Wechaty Getting Started](https://github.com/wechaty/java-wechaty-getting-started)
- [Scala Wechaty Getting Started](https://github.com/wechaty/scala-wechaty-getting-started)
- [PHP Wechaty Getting Started](https://github.com/wechaty/php-wechaty-getting-started)
- [.NET(C#) Wechaty Getting Started](https://github.com/wechaty/dotnet-wechaty-getting-started)

## History

### main v1.18 (Mar 14, 2022)

Add CQRS Wechaty examples.

### v1.11 (Oct 30, 2021)

Branch: [v1.11](https://github.com/wechaty/getting-started/tree/v1.11): release v1.11 of Wechaty.

1. v0.13: Enable ESM (ES Module) support ([chatie/tsconfig#16](https://github.com/Chatie/tsconfig/issues/16))

### v0.8 (Feb 20, 2021)

[![Open in Cloud Shell][shell_img]][shell_link]

Using Google Cloud Shell for a quick setup!

### v0.6 (Feb 11, 2021)

[![GitPod Ready-to-Code][gitpod_img]][gitpod_link]

Using Gitpod for a quick setup!

### v0.0.1 (Jan 12, 2017)

Init version

## Contributors

[![contributor](https://sourcerer.io/fame/huan/wechaty/getting-started/images/0)](https://sourcerer.io/fame/huan/wechaty/getting-started/links/0)
[![contributor](https://sourcerer.io/fame/huan/wechaty/getting-started/images/1)](https://sourcerer.io/fame/huan/wechaty/getting-started/links/1)
[![contributor](https://sourcerer.io/fame/huan/wechaty/getting-started/images/2)](https://sourcerer.io/fame/huan/wechaty/getting-started/links/2)
[![contributor](https://sourcerer.io/fame/huan/wechaty/getting-started/images/3)](https://sourcerer.io/fame/huan/wechaty/getting-started/links/3)
[![contributor](https://sourcerer.io/fame/huan/wechaty/getting-started/images/4)](https://sourcerer.io/fame/huan/wechaty/getting-started/links/4)
[![contributor](https://sourcerer.io/fame/huan/wechaty/getting-started/images/5)](https://sourcerer.io/fame/huan/wechaty/getting-started/links/5)
[![contributor](https://sourcerer.io/fame/huan/wechaty/getting-started/images/6)](https://sourcerer.io/fame/huan/wechaty/getting-started/links/6)
[![contributor](https://sourcerer.io/fame/huan/wechaty/getting-started/images/7)](https://sourcerer.io/fame/huan/wechaty/getting-started/links/7)

## Maintainers

[@wechaty/contributors](https://github.com/orgs/wechaty/teams/contributors/members)

## Copyright & License

- Code & Docs © 2018-now Huan and [Wechaty Contributors](https://wechaty.js.org/contributors/)
- Code released under the Apache-2.0 License
- Docs released under Creative Commons

[gitpod_img]: https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod
[gitpod_link]: https://gitpod.io/#https://github.com/wechaty/getting-started

[shell_img]: https://gstatic.com/cloudssh/images/open-btn.svg
[shell_link]: https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Fwechaty%2Fgetting-started&cloudshell_open_in_editor=examples/ding-dong-bot.ts&cloudshell_workspace=.&cloudshell_tutorial=examples/tutorials/google-cloud-shell-tutorial.md
