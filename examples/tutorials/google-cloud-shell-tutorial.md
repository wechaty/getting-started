<!-- markdownlint-disable MD026 MD033 -->

# Getting Started with Wechaty

<walkthrough-tutorial-duration
  duration="10">
</walkthrough-tutorial-duration>

## Let's get started!

Get your up and running quickly with Wechaty by this interactive tutorial.

![Wechaty][wechaty_logo_url]

[wechaty_logo_url]: https://wechaty.js.org/img/wechaty-logo.svg

This guide will show you how to setup and run our Wechaty ding-dong BOT. It'll also walk you through install all dependencies, run your bot up, and add a new feature to it.

Click the **Start** button to move to the next step.

## What is Wechaty?

Before you get started, let's briefly go over what Wechaty can do.

Wechaty is a Conversational RPA SDK for Chatbot Makers. It's well designed with an easy to use API, supports all OSs including Linux, OSX, Win32, Docker, and lots of IMs including WeChat, Whatsapp, WeCom, Lark, Gitter, etc.

![Wechaty][wechaty_flyer_url]

[wechaty_flyer_url]: https://wechaty.js.org/assets/2021/01-wechaty-0.56-released/wechaty-flyer-2020.webp

As a developer, you can use Wechaty to easily build your bot, effectively manage message sending/receiving, room creating/inviting, contact friendship, and delightful add artificial intelligence between users and your bot.

This repository should work out-of-the-box, and is the best start point for Wechaty beginners. The starter bot uses Wechaty 2 with Puppet Neo.

Continue on to the **Next** step to start setting up your chatbot.

## Setting up developing environments

1. Install [Node.js](https://nodejs.org) v26+
1. Git clone [wechaty/getting-started](https://github.com/wechaty/getting-started) repo

### 1. Install Node.js

Node.js has been pre-installed in Google Cloud Shell.

This repository needs Node.js 26 or newer and npm 10 or newer:

```sh
nvm install 26
```

`node --version` should print v26 or newer, for example `v26.13.1`. `npm --version` should print 10 or newer.

### 2. Git clone `wechaty/getting-started` repo

The git repository has already been cloned in Google Cloud Shell.

Puppet Neo ships a prebuilt native addon. On Linux that addon needs glibc 2.38 or newer, which the current Google Cloud Shell image provides.

## NPM Install

Let's install NPM packages, run:

```sh
npm install
```

npm installs the newest Wechaty 2 release and `wechaty-puppet-neo`. It takes a few minutes.

After all dependencies have been resolved, we will be able to start our ding-dong BOT.

Click **Next**.

## NPM Start

Let's start our ding-dong BOT. Its source code [examples/ding-dong-bot.ts] should have already opened in the editor.

If it's not opened yet, click <walkthrough-editor-open-file filePath="examples/ding-dong-bot.ts">Open</walkthrough-editor-open-file> to open it now.

`npm start` runs `examples/ding-dong-bot.ts` with Node.js. The bot is built with `new Wechaty(...)` and `new PuppetNeo()`.

### 1. Get a WeChat login QR code

```sh
npm start
```

The bot prints logs and then a QR code. Scan it with WeChat and confirm the login on your phone.

Neo keeps the login in memory, so the next start prints a new QR code.

### 2. Play with your bot

Send `ding` to the bot from another WeChat account. The bot replies `dong`. **Next** we will add a new feature to the bot.

## Add a new feature

We received a new feature request!

_“reply `dongdong` for `dingding`”_

### 1. Requirement analysis

After you log in, the bot replies `dong` when it receives `ding`.

The new request is to reply `dongdong` for `dingding`.

### 2. Code explaination

In our `examples/ding-dong-bot.ts`, you can find the <walkthrough-editor-select-regex filePath="examples/ding-dong-bot.ts" regex="if \(msg.text\(\) === 'ding'\) {[^}]+}">onMessage</walkthrough-editor-select-regex> function:

```ts
async function onMessage (msg: Message) {
  log.info('StarterBot', msg.toString())

  if (msg.text() === 'ding') {
    await msg.say('dong')
  }
}
```

Let's start working on it now.

### 3. Developing new code

We need to check the `msg.text()` for `dingding` when receiving messages, and use `msg.say('dongdong')` to reply:

```ts
if (msg.text() === 'dingding') {
  await msg.say('dongdong')
}
```

### 4. Final `onMessage` function

Let's put our new code into the `onMessage` function:

```ts
async function onMessage (msg: Message) {
  log.info('StarterBot', msg.toString())

  if (msg.text() === 'ding') {
    await msg.say('dong')
  }
  if (msg.text() === 'dingding') {
    await msg.say('dongdong')
  }
}
```

That's it. We have added 3 lines of code to implement our new feature. Save the file.

**Next** up, starting our ding-dong BOT again.

## Test new feature

We will start our ding-dong BOT again.

### 1. Run

```sh
npm start
```

The bot prints logs and a new QR code. Scan it with WeChat, then send `dingding` to the bot. You should receive `dongdong`.

Enjoy your bot, and click **Next** when you like.

## Congratulations

<walkthrough-conclusion-trophy></walkthrough-conclusion-trophy>

You're all set!

You have finished the Wechaty Getting Started Tutorial. You can run Wechaty in TypeScript, with Puppet Neo, and receive and reply to WeChat messages.

Congratulations to be a Wechaty developer now!

You can now start adding more features to our ding-dong BOT and have the bot working for your users with ease.

For a complete list of Wechaty Examples, refer to the [Wechaty Examples Directory](https://github.com/wechaty/getting-started/blob/master/examples/README.md).

## Conclusion

Done!

Learn more about Wechaty from our [docs](https://wechaty.js.org/docs/) and [blog](https://wechaty.js.org/blog/), and [join our Gitter](https://gitter.im/wechaty/wechaty) network if you aren’t already a member!

<walkthrough-footnote>Wechaty © 2016 - 2026</walkthrough-footnote>
