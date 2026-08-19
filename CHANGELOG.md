# Changelog

All notable changes to `@stackline/color` are documented here.

## [1.0.1] - 2026-08-19

- Updated the release build to esbuild 0.28.2.
- Forced tsup's nested esbuild to the patched line covered by the build tests.
- Refreshed Node.js 22 development types.
- Preserved the public API, generated declarations, ESM and CommonJS entry points.
- Published format-specific declarations for both ESM and CommonJS consumers.
- Kept public declarations parseable by TypeScript 3.9 while retaining TypeScript 5.9 for builds.
- Added a reproducible GitHub Actions release artifact with a SHA-512 checksum.

## [1.0.0] - 2026-05-22

- Published the stable Stackline color engine and vanilla picker baseline.

[1.0.1]: https://github.com/alexandroit/color/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/alexandroit/color/releases/tag/v1.0.0
