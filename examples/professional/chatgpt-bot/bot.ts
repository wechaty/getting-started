// Importing the Wechaty npm package
import { Wechaty,WechatyBuilder, Contact, Message, ScanStatus, log } from "wechaty";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { PuppetPadlocal } from "wechaty-puppet-padlocal";
import { onScan, onLogin, onLogout, onMessage, onFriendship } from "./utils";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.OPENAI_API_KEY)


export function createBot(): Wechaty {
  const token: string = process.env.WECHATY_PUPPET_SERVICE_TOKEN!
  const puppet = new PuppetPadlocal({
    token,
  });

  return WechatyBuilder.build({
    name: "chatgpt-bot",
    puppet,
  });
}


// config openAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

// Initializing the bot
export const bot = createBot();

// Keep the conversation state
export const initState: Array<ChatCompletionRequestMessage> = new Array({ "role": "system", "content": "You are a helpful assistant." })

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)
bot.on('friendship', onFriendship)

bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch(e => log.error('StarterBot', e))

bot.ready()
  .then(() => log.info('StarterBot', 'Starter Bot Ready.'))
  .catch(e => log.error('StarterBot', e))