# Repository Guidelines

## Project Structure & Module Organization
- `libs/` contains the core HTTP server implementation; keep new modules small and export them through `cirrus.js`.
- `builds/` stores generated bundles (e.g., `cirrus.min.js`) consumed by `server.js`; update these via the build task, never by hand.
- `spec/` holds Jasmine specs plus `spec/fixtures/` helpers; mirror the runtime folder layout when adding tests.
- `docs/` and `release_notes.md` capture user-facing reference material—refresh them whenever behavior changes.

## Build, Test, and Development Commands
- `npm install` installs the legacy toolchain (Node 0.10 era); use `nvm use` to match if you see ABI errors.
- `npx grunt` runs the default `uglify` build, emitting `cirrus.min.js` at the repository root.
- `npx grunt jshint` lints `libs/cirrus.js`; extend the target list when introducing new source files.
- `node server.js` boots the sample TCP server on port 5000 for manual smoke testing.

## Coding Style & Naming Conventions
- Stick to two-space indentation, single quotes, and trailing commas omitted, matching `libs/cirrus.js`.
- Name controllers and modules in camelCase (`usersController`), and favor verb-based method names (`renderQuery`).
- Keep core logic in `libs/` and expose only public API surface; helper scripts belong in `bin/`.
- Run `npx grunt jshint` before opening a PR to ensure style consistency.

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
