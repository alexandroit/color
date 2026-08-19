# @stackline/color project memory

Last updated: 2026-08-19

## Current release

- Package: `@stackline/color`
- Stable version: `1.0.1`
- Public npm: `https://www.npmjs.com/package/@stackline/color`
- Local Verdaccio: `http://127.0.0.1:4873/`
- Public docs: `https://alexandro.net/docs/vanilla/color/`
- Repository: `https://github.com/alexandroit/color`
- GitHub release: `https://github.com/alexandroit/color/releases/tag/v1.0.1`

## Release evidence for 1.0.1

- Release source commit: `a9a2f7c9a2ecd1ef17cc6e73e440e53d4fde1fc9`
- Git tag: `v1.0.1`
- GitHub Actions run: `https://github.com/alexandroit/color/actions/runs/32310931136`
- CI result: passed on Node.js `22.22.0`.
- CI artifact path: `/storage/data/releases/stackline-color/1.0.1-ci-32310931136/`
- Package filename: `stackline-color-1.0.1.tgz`
- Package size: `11700` bytes.
- npm shasum: `6b05bbae3652eb552354b691375906b9e21b6056`
- SHA-512: `61e6d860cffd28e6319a0141f880c2158710d117f7be65d87215de93f6f085b9401daf4475567e5b3c7311f0297c09bef11e815a5863578bb3d9d3684da6b215`
- npm integrity: `sha512-YebYYM/9KOYxmgFB+IDCFYcQ0Rf3vmXYchXek/bwhblAHa9EdVZ+WzxzEfApfAm+8R6BWlhjV4uz2dNoTaayFQ==`
- The CI artifact, anonymous Verdaccio download, and anonymous public npm download had the same SHA-512.

## What changed in 1.0.1

- Updated the direct esbuild build dependency to `0.28.2`.
- Forced tsup's nested esbuild onto the patched `0.28.2` line.
- Updated Node.js 22 development types while retaining TypeScript `5.9.3` for the build.
- Corrected ESM and CommonJS declaration routing with `index.d.ts` and `index.d.cts`.
- Added declaration normalization and a real TypeScript `3.9.10` compatibility check.
- Preserved the complete public JavaScript API and the zero-runtime-dependency model.
- Added `CHANGELOG.md` to the npm package.
- Added pinned GitHub Actions CI with tests, audit, packaging, and SHA-512 generation.
- Made `llms.txt` and `llms-full.txt` source-controlled build inputs so documentation builds cannot remove them.
- Updated README, generated docs, AI guides, direct browser download, GitHub releases, Verdaccio, and public npm.

## Verification completed

- `npm ci`: passed with zero vulnerabilities.
- `npm run check`: passed.
- Runtime tests: `7/7` passed.
- TypeScript `5.9.3` typecheck: passed.
- TypeScript `3.9.10` declaration parse: passed.
- ESM import smoke test: passed.
- CommonJS require smoke test: passed.
- `publint 0.3.23`: no errors; only the intentionally omitted Node engine suggestion.
- `@arethetypeswrong/cli 0.18.5`: no problems for Node 10, Node 16 CJS, Node 16 ESM, or bundlers.
- `npm audit signatures`: all 52 dependencies had verified registry signatures; 10 had verified attestations.
- Public npm consumer install: passed with zero vulnerabilities.
- Production docs: desktop and mobile rendering checked, and all deployed file hashes matched local output.

The package intentionally does not declare `engines.node`. It is a browser-capable, ES2019-targeted library and the omission preserves installation compatibility for older consumers. Build tooling requirements do not become runtime requirements for consumers.

## Documentation deployment

- Local source: `/storage/data/github/revivejs/color/color/docs/`
- Production target: `/var/www/html/alexandro.net_docs/vanilla/color/`
- SSH target: `codex-server`
- Deploy only this package route. Do not run a full docs-root `--delete` synchronization.
- Current production guides expose `1.0.1` in both `llms.txt` and `llms-full.txt`.

## Local integration app

Test app path:

```text
/storage/data/github/tests/stackline-color-test
```

Current validated dependencies:

```text
@stackline/color@1.0.1
vite@8.2.1
typescript@5.9.3
```

The app resolves the Stackline scope from Verdaccio, builds successfully, uses esbuild `0.28.2`, and has a zero-vulnerability audit.

Useful commands:

```bash
cd /storage/data/github/tests/stackline-color-test
npm ls @stackline/color vite typescript --depth=0
npm audit --audit-level=low
npm run build
```

## Release procedure for the next version

1. Preserve the public API and TypeScript 3.9 declaration compatibility unless a documented major release changes the support policy.
2. Update sources in `docs-src`, then run `npm run check` to regenerate `docs` and `downloads`.
3. Run `npm ci`, `npm run check`, `npm audit --audit-level=low`, `publint`, `arethetypeswrong`, and tarball smoke tests.
4. Push the release commit and wait for GitHub Actions to pass.
5. Publish the exact CI tarball to Verdaccio first and compare its SHA-512 after anonymous download.
6. Publish the same tarball to public npm and compare its SHA-512 after anonymous download.
7. Create the annotated tag and GitHub release with the tarball, checksum file, and browser bundle.
8. Deploy only `docs/vanilla/color/`, verify production content and hashes, then update this memory.
