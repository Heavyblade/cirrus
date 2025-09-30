# Repository Guidelines

## Project Structure & Module Organization
- `libs/` contains the core HTTP server implementation; keep new modules small and export them through `cirrus.js`.
- `libs/entries/` holds bundler adapters (e.g., Node-friendly entrypoints) consumed by the build.
- `builds/` stores generated bundles (e.g., `cirrus.min.js`) consumed by `server.js`; update these via the build task, never by hand.
- `spec/` holds Jasmine specs plus `spec/fixtures/` helpers; mirror the runtime folder layout when adding tests.
- `docs/` and `release_notes.md` capture user-facing reference material—refresh them whenever behavior changes.

## Build, Test, and Development Commands
- `npm install` installs the modern toolchain (Node 18+ recommended).
- `npm run build` generates both the browser (`builds/cirrus.min.js`) and Node test (`builds/cirrus.min.test.js`) bundles via Vite.
- `npm run lint` runs JSHint across the core libraries and helpers.
- `npm run test` executes the Jasmine suite (`jasmine-node spec`).
- `node server.js` boots the sample TCP server on port 5000 for manual smoke testing.

## Coding Style & Naming Conventions
- Stick to two-space indentation, single quotes, and trailing commas omitted, matching `libs/cirrus.js`.
- Name controllers and modules in camelCase (`usersController`), and favor verb-based method names (`renderQuery`).
- Keep core logic in `libs/` and expose only public API surface; helper scripts belong in `bin/`.
- Run `npm run lint` before opening a PR to ensure style consistency.

## Testing Guidelines
- Specs live beside their subjects using `*.spec.js` names (e.g., `router.spec.js`); follow the `describe/it` structure already in place.
- Use Jasmine spies instead of touching the filesystem; inline fixtures in `spec/fixtures` when necessary.
- Every new route or controller should ship with request/response coverage and at least one negative case.
- Execute `npx jasmine-node spec` locally and attach the command output to your PR description.

## Commit & Pull Request Guidelines
- Follow the existing Git history: concise, imperative commit subjects such as `Add router param guard`.
- Squash noisy dependency bumps; keep feature work in logical commits with meaningful scopes.
- Pull requests must include a summary, test evidence, and links to any issue tracker entries; add GIFs or curl traces for API changes.
- Mark breaking changes prominently in the description and update `release_notes.md` within the same PR.

## Security & Configuration Tips
- Never commit credentials; reference external config through environment variables read inside Velneo.
- Audit dependencies after updates by running `npm audit --legacy-peer-deps` and documenting notable findings in the PR.
