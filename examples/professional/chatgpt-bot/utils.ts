import { Contact, Message, ScanStatus, log, Friendship } from "wechaty";
import { bot, openai, initState } from "./bot";
import markdownIt from 'markdown-it';
import { ChatCompletionRequestMessage } from "openai";
import { FileBox } from "file-box";
import qrTerm from "qrcode-terminal";
import nodeHtmlToImage from 'node-html-to-image';

const MEMORY_LIMIT = 50; // max memory
let conversation: Array<ChatCompletionRequestMessage> = new Array();
conversation.forEach(val => initState.push(Object.assign({}, val)));

function convertMarkdownToHtml(markdown: string): string {
    const md = new markdownIt();
    return md.render(markdown);
}

export function onScan (qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      qrTerm.generate(qrcode, { small: true })  // show qrcode on console
  
      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')
  
      log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
    } else {
      log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
    }
  }
  
export function onLogin(user: Contact) {
    log.info('StarterBot', '%s login', user)
}

export function onLogout(user: Contact) {
    log.info('StarterBot', '%s logout', user)
}
  
export async function onMessage(msg: Message) {
    log.info('StarterBot', msg.toString())

    const contact = msg.talker();
    const content = msg.text();
    const isText = msg.type() === bot.Message.Type.Text;
    if (msg.self() || !isText) { // msg.self() check if the message is sent from the bot itself
        return;
    }
    if (content === 'ding') {
        await contact.say('dong');
    }
    // return image
    if (content.startsWith("/img ")) {
        if (conversation.length === MEMORY_LIMIT) {
            // reset to initial state when reach the memory limit
            log.info("Resetting memory");
            conversation = new Array();
            conversation.forEach(val => initState.push(Object.assign({}, val)));
        }
        conversation.push({ "role": "user", "content": content.replace("/i", "") })
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: conversation,
        });

        try {
            const replyContent = response.data.choices[0].message!.content!
            const html = convertMarkdownToHtml(replyContent);
            await nodeHtmlToImage({
                output: './output.png',
                html: html
            })

            log.info('The image was created successfully!')
            const fileBox = FileBox.fromFile("./output.png");
            await contact.say(fileBox)

            // record reply
            const reply: ChatCompletionRequestMessage = { "role": "assistant", "content": replyContent };
            conversation.push(reply);
        } catch (e) {
            console.error(e)
        }
    } else {
        // return text if no slash command is specified
        if (conversation.length === MEMORY_LIMIT) {
            // reset to initial state when reach the memory limit
            log.info("Resetting memory");
            conversation = new Array();
            conversation.forEach(val => initState.push(Object.assign({}, val)));
        }
        conversation.push({ "role": "user", "content": content.replace("/t", "") })
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: conversation,
        });

        try {
            const replyContent = response.data.choices[0].message!.content!
            await contact.say(replyContent);
            
            // record reply
            const reply: ChatCompletionRequestMessage = { "role": "assistant", "content": replyContent };
            conversation.push(reply);
        } catch (e) {
            console.error(e);
        }
    }
}

export async function onFriendship(friendship: Friendship) {
    let logMsg;

    try {
        logMsg = "received `friend` event from " + friendship.contact().name();
        log.info(logMsg);

        switch (friendship.type()) {
            /**
             *
             * 1. New Friend Request
             *
             * when request is set, we can get verify message from `request.hello`,
             * and accept this request by `request.accept()`
             */

            case bot.Friendship.Type.Receive:
                logMsg = 'accepted automatically';
                log.info("before accept");
                await friendship.accept();

                // if want to send msg , you need to delay sometimes
                await new Promise((r) => setTimeout(r, 1000));
                await friendship.contact().say(`Hi ${friendship.contact().name()} from FreeChatGPT, I am your person asistant!\n你好 ${friendship.contact().name()} 我是你的私人助理FreeChatGPT!`);
                console.log("after accept");
                break;

            /**
             *
             * 2. Friend Ship Confirmed
             *
             */
            case bot.Friendship.Type.Confirm:
                logMsg = "friendship confirmed with " + friendship.contact().name();
                break;

            default:
                break;
        }
    } catch (e) {
        console.error(e);
        logMsg = "Friendship try catch failed";
    }

    log.info(logMsg);
}