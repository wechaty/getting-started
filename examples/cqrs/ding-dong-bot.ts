#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
/**
 *   Wechaty Open Source Software - https://github.com/wechaty
 *
 *   @copyright 2016 Huan LI (李卓桓) <https://github.com/huan>, and
 *                   Wechaty Contributors <https://github.com/wechaty>.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import * as WECHATY from 'wechaty'
import * as CQRS    from 'wechaty-cqrs'

import {
  of,
  merge,
  defer,
}                   from 'rxjs'
import {
  filter,
  ignoreElements,
  map,
  mergeMap,
  takeUntil,
  tap,
  finalize,
  switchMap,
}                   from 'rxjs/operators'


const onScan$ = (source$: CQRS.BusObs) => CQRS.events$.scanReceivedEvent$(source$).pipe(
  map(scanReceivedEvent => scanReceivedEvent.payload),
  tap(({ qrcode, status }) => {
    const qrStatusList = [
      WECHATY.types.ScanStatus.Waiting,
      WECHATY.types.ScanStatus.Timeout,
    ]
    if (qrcode && qrStatusList.includes(status)) {
      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')

      console.info('onScan: %s(%s) - %s', WECHATY.types.ScanStatus[status], status, qrcodeImageUrl)
    } else {
      console.info('onScan: %s(%s)', WECHATY.types.ScanStatus[status], status)
    }
  }),
)

const onMessage$ = (bus$: CQRS.Bus) => CQRS.events$.messageReceivedEvent$(bus$).pipe(
  tap(messageReceivedEvent => console.info('messageReceivedEvent', messageReceivedEvent)),
  mergeMap(messageReceivedEvent => of(messageReceivedEvent.payload.messageId).pipe(
    /**
     * message -> sayable
     */
    map(messageId => CQRS.duck.actions.getSayablePayloadQuery(
      messageReceivedEvent.meta.puppetId,
      messageId,
    )),
    mergeMap(CQRS.execute$(bus$)(CQRS.duck.actions.getSayablePayloadQuery)),
    map(sayablePayloadGotMessage => sayablePayloadGotMessage.payload),
    filter(Boolean),
    tap(sayable => console.info('sayable:', sayable)),

    /**
     * sayable -> ding
     */
    filter(CQRS.sayables.isText),
    map(sayable => sayable.payload.text),
    filter(text => text === 'ding'),
    tap(text => console.info('text:', text)),

    mergeMap(() => of(messageReceivedEvent).pipe(
      /**
       * ding -> talkerId
       */
      map(messageReceivedEvent => CQRS.duck.actions.getMessagePayloadQuery(messageReceivedEvent.meta.puppetId, messageReceivedEvent.payload.messageId)),
      mergeMap(CQRS.execute$(bus$)(CQRS.duck.actions.getMessagePayloadQuery)),
      /**
       * Huan(202203): `.fromId` deprecated, will be removed after v2.0
       */
      map(messagePayloadGotMmessage => messagePayloadGotMmessage.payload?.talkerId || messagePayloadGotMmessage.payload?.fromId),
      filter(Boolean),
      tap(talkerId => console.info('talkerId:', talkerId)),

      /**
       * talkerId -> command
       */
      map(talkerId => CQRS.duck.actions.sendMessageCommand(
        messageReceivedEvent.meta.puppetId,
        talkerId,
        CQRS.sayables.text('dong'),
      )),
      tap(command => console.info('sendMessageCommand:', command)),

      /**
       * execute command (return MessageSentMessage)
       */
      mergeMap(CQRS.execute$(bus$)(CQRS.duck.actions.sendMessageCommand)),
    )),
  )),
)

async function cqrsWechaty () {
  const wechaty = WECHATY.WechatyBuilder.build({ name: 'ding-dong-bot' })
  await wechaty.init()

  // wechaty.on('message', m => console.info('message:', String(m)))

  const bus$ = CQRS.from(wechaty)

  return {
    bus$,
    puppetId: wechaty.puppet.id,
  }
}

async function main () {
  const {
    bus$,
    puppetId,
  }             = await cqrsWechaty()

  const onStartedEvent$ = (bus$: CQRS.Bus) => CQRS.events$.startedEvent$(bus$).pipe(
    switchMap(() => merge(
      onScan$(bus$),
      onMessage$(bus$),
    ).pipe(
      takeUntil(CQRS.events$.stoppedEvent$(bus$)),
    )),
  )

  const main$ = defer(() => of(CQRS.duck.actions.startCommand(puppetId))).pipe(
    mergeMap(startCommand => merge(
      onStartedEvent$(bus$),
      CQRS.execute$(bus$)(CQRS.duck.actions.startCommand)(startCommand),
    )),
    ignoreElements(),
    finalize(() => bus$.next(CQRS.duck.actions.stopCommand(puppetId))),
  )

  /**
   * Enable logging all bus events to console
   */
  // bus$.subscribe(event => console.info('bus$ event:', event))

  /**
   * Bootstrap the main system
   */
  main$.subscribe()
}

/**
 * No top-level await here: for CJS compatible when building Dual-ESM-CJS module
 */
main()
  .catch(console.error)
