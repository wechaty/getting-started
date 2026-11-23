/**
 * Optional example dependencies. They are not installed by the root
 * package so that `npm install` stays the starter set. These declarations
 * let `npm run lint:ts` check the examples that import them.
 */

declare module 'apiai' {
  interface TextRequest {
    on (event: 'response', cb: (response: { result?: { fulfillment?: { speech?: string } } }) => void): this
    on (event: 'error', cb: (error: Error) => void): this
    end (): void
  }
  interface Client {
    textRequest (text: string): TextRequest
  }
  function ApiAi (key: string): Client
  export default ApiAi
}

declare module 'finis' {
  export function finis (
    callback: (code: number, signal: NodeJS.Signals | undefined) => void | Promise<void>,
  ): void
}

declare module 'request' {
  interface RequestCallback {
    (err: Error | null, response: unknown, body: string): void
  }
  interface RequestApi {
    post (url: string, options: { headers: Record<string, string> }, cb: RequestCallback): NodeJS.ReadWriteStream
  }
  const request: RequestApi
  export default request
}

declare module 'fluent-ffmpeg' {
  import type { Readable } from 'node:stream'
  interface Command {
    fromFormat (format: string): Command
    toFormat (format: string): Command
    pipe (dest: NodeJS.WritableStream): Command
    on (event: 'error', cb: (err: Error) => void): Command
  }
  function Ffmpeg (input: Readable): Command
  export default Ffmpeg
}

declare module 'tuling123-client' {
  export default class Tuling123 {
    constructor (apiKey: string)
    ask (text: string, options: { userid: unknown }): Promise<{ text: string }>
  }
}

declare module 'node-telegram-bot-api' {
  interface TelegramMessage {
    chat: { id: number }
  }
  export default class TelegramBot {
    constructor (token: string, options?: Record<string, unknown>)
    on (event: 'message', listener: (msg: TelegramMessage) => void): void
    onText (regexp: RegExp, listener: (msg: TelegramMessage, match: RegExpExecArray | null) => void): void
    sendMessage (chatId: number, text: string): void
  }
}

declare module 'wechaty-telegram' {
  import TelegramBot from 'node-telegram-bot-api'
  export default TelegramBot
}

declare module 'wechaty-puppet-padchat' {
  export class PuppetPadchat {
    constructor ()
  }
}

declare module 'blessed' {
  interface Blessed {
    screen (options: Record<string, unknown>): any
  }
  const blessed: Blessed
  export default blessed
}

declare module 'blessed-contrib' {
  const contrib: any
  export default contrib
}
