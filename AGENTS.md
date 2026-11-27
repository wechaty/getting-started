# Instructions for coding agents

- This repository is ESM-only (`"type": "module"`) and targets Node.js 26+ and npm 10+ via `engines`. Do not add `package-lock.json` (see `DEVELOPMENT.md`).
- Node.js runs `.ts` sources directly with built-in type stripping; compilation to `dist/` happens only via `npm run build`.
- Relative imports must end in `.ts`, type-only imports must use `import type` or inline `type` modifiers (`verbatimModuleSyntax`), and only erasable TypeScript syntax is allowed (`erasableSyntaxOnly`: no enums, value namespaces, or constructor parameter properties).
- Prefer WinterTC web-standard APIs (`fetch`, `URL`, `URLSearchParams`, `AbortController`, `EventTarget`) over Node-only legacy packages when writing or updating examples and tests.
- Write portable smoke tests using `node:test` and `node:assert/strict` in `tests/*.test.ts`. Register `t.after()` cleanup before starting bots.
- Keep `npm run lint` (`lint:biome`, `lint:ts`, `lint:md`), `npm run build`, and `npm test` passing.
- Reference GitHub Actions by version tags (for example, `@v7`), not commit hashes.

### Source Code Documentation (AI-First)

- Begin each source and test file with a concise header comment explaining why it exists and what it owns.
- Document exported functions and nontrivial helpers with TSDoc-compatible `/** ... */` comments.
- Keep documentation accurate and concise; update comments whenever code changes.
