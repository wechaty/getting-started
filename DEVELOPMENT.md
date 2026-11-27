# DEVELOPMENT

This repository is the Wechaty getting-started tutorial. Its toolchain and
starter bots follow [wechaty/wechaty](https://github.com/wechaty/wechaty) 2.0
(`wechaty` `>=2.0.0-0 <3`). `examples/cqrs` is kept for a future Wechaty 2
upgrade and is excluded from the root `tsconfig.json`.

## Node, TypeScript, and modules

The project requires Node.js 26 and npm 10 or newer. Node.js runs the TypeScript
sources directly with its built-in type stripping. `npm start`, the other bot
scripts, and `npm run test:smoke` do not need a build step and do not use
`ts-node`.

`npm run build` and `npm run lint:ts` use TypeScript 7 via the
`@typescript/native` npm alias. Type-only dependencies must use `import type`
or inline `type` modifiers. `verbatimModuleSyntax` is enabled for both the
build and the semantic check. `npm run lint:biome` runs the TypeScript lint
rules without the TypeScript compiler API.

Type stripping imposes two rules, both enforced by `npm run lint:ts`:

- Relative imports use `.ts` extensions. `rewriteRelativeImportExtensions`
  rewrites them to `.js` in the compiled JavaScript.
- Only erasable syntax is allowed (`erasableSyntaxOnly`): no enums,
  namespaces with values, or constructor parameter properties.

TypeScript's semantic check remains required. Type stripping does not check
types, so a file that Node.js can execute is not a substitute for
`npm run lint:ts`. Deno runs with `--no-check` for the same reason.

`examples/cqrs` is excluded from `tsconfig.json` until its Wechaty 2 upgrade.

## Why `package-lock.json` is not committed

`package-lock.json` is deliberately listed in `.gitignore`. Do not add it.

A lockfile would hide dependency-range conflicts until a new user, without
that lockfile, ran `npm install`. This repository is the first project many
people install. It should fail here, on `npm install`, when a range breaks,
instead of passing in CI and failing for them later.

Wechaty itself commits its lockfile and uses `npm ci`. This repository does
not. CI installs with `npm install` and leaves the setup-node package cache
off, because there is no lockfile to cache from.

## Tests

Smoke tests use `node:test` and `node:assert/strict`, registering `t.after()`
cleanup before starting bots. `npm test` lints (`lint:biome`, `lint:ts`,
`lint:md`), then runs `tests/*.test.ts` with Node.js directly. The runner uses
`--test-timeout=180000` because a scan can take up to two minutes.

The same suite has an experimental Deno 2.9.8 job,
`npm run test:unit:deno`. Deno is not a supported runtime yet. That CI job
uses `continue-on-error: true`, so a Deno failure does not fail the workflow.
The command grants read, write, environment, network, system, and subprocess
access because the smoke tests start puppets and, for the web puppet, Chrome.
It also allows the `leveldown` prebuilt used by Wechaty's memory card and the Puppet Neo native addon.
It starts Deno with a sanitized environment containing only `PATH`, `HOME`,
`CI`, and `NODE_BINARY`.

`npm run lint:ts` remains the canonical TypeScript check. The test runner does
not replace it.
