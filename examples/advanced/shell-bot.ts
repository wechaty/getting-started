#!/usr/bin/env node
import repl from 'node:repl'

import { WechatyBuilder } from 'wechaty'

async function main () {
  const wechaty = WechatyBuilder.build({
    name: 'shell-bot',
  })

  console.info('Starting...')

  await wechaty.start()

  const shell = repl.start('wechaty> ')
  shell.context['wechaty'] = wechaty
  shell.on('exit', () => wechaty.stop())
}

main()
  .catch(console.error)
