# @stackline/color project memory

Last updated: 2026-05-22

## Current release

- Package: `@stackline/color`
- Stable version: `1.0.0`
- npm registry: `https://registry.npmjs.org/`
- Local Verdaccio registry: `http://192.168.3.52:4873/`
- Public docs: `https://alexandro.net/docs/vanilla/color/`
- Repository: `https://github.com/alexandroit/color`

## What was done for 1.0.0

- Set `package.json` and `package-lock.json` to `1.0.0`.
- Updated `README.md`, `docs-src/main.ts`, and `docs-src/content/pages.ts`.
- Rebuilt generated docs and direct download assets.
- Published `@stackline/color@1.0.0` to public npm.
- Published the same version to the local Verdaccio registry.
- Published static docs to the production docs root on `codex-server`:
  - source staging: `/storage/data/build/alexandro.net-docs`
  - production target: `/var/www/html/alexandro.net_docs`
- Updated the `alexandro.net` public catalog so `/projects/color/` shows `1.0.0`.

## Verification commands

Run these from `/storage/data/github/revivejs/color/color`:

```bash
npm run check
npm view @stackline/color version --registry https://registry.npmjs.org/
npm view @stackline/color versions --registry http://192.168.3.52:4873/
```

Expected public npm version:

```text
1.0.0
```

## Local test app

Test app path:

```text
/storage/data/github/tests/stackline-color-test
```

The app installs `@stackline/color@1.0.0` from local Verdaccio and runs with Vite.

Useful commands:

```bash
cd /storage/data/github/tests/stackline-color-test
npm ls @stackline/color --depth=0
npm run build
npm run dev -- --host 0.0.0.0
```

Expected package check:

```text
@stackline/color@1.0.0
```

Current local test URL:

```text
http://192.168.3.52:5173/
```

## Git state

Final package repository commit:

```text
803c4cc release @stackline/color 1.0.0
```

The `main` branch was pushed to GitHub after the package-lock-only follow-up.

## Notes for future releases

- Keep docs source changes in `docs-src`, then rebuild generated `docs`.
- Re-run the shared docs staging script before publishing docs:

```bash
node /storage/data/github/revivejs/tools/stage-alexandro-docs.mjs
```

- Sync staged docs to the production server with the existing `codex-server` SSH target.
- Keep the local Verdaccio package updated before testing in downstream apps.
