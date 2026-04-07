# @revivejs/color

> A maintained **framework-agnostic color picker foundation** for modern web applications, with a precise TypeScript color engine, a lightweight vanilla UI layer, and a documentation site centered on a live playground.

[![license](https://img.shields.io/npm/l/@revivejs/color.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Build](https://img.shields.io/badge/Build-ESM%20%2B%20CJS-111827?style=flat-square)](https://github.com/alexandroit/color)
[![Docs](https://img.shields.io/badge/Docs-Live%20Playground%20%26%20Guides-0f172a?style=flat-square)](https://alexandroit.github.io/color/)
[![Zero Runtime Deps](https://img.shields.io/badge/Runtime-0%20Dependencies-0f766e?style=flat-square)](https://github.com/alexandroit/color)

**[Documentation & Playground](https://alexandroit.github.io/color/)** | **[npm](https://www.npmjs.com/package/@revivejs/color)** | **[Issues](https://github.com/alexandroit/color/issues)** | **[Repository](https://github.com/alexandroit/color)**

**Latest version:** `0.1.1`

---

## Why this library?

Most color picker packages solve the visible UI, but not always the long-term foundation:

- pure color parsing and conversion are often coupled too tightly to one framework
- APIs can feel heavier than they need to for simple DOM use
- accessibility, keyboard support, and alpha handling are not always polished
- future wrappers often end up re-implementing the engine instead of sharing one core

`@revivejs/color` is built as a clean TypeScript-first foundation package. The core stays framework-agnostic, the vanilla DOM layer stays light, and future React, Vue, and Angular wrappers can reuse the same engine instead of replacing it.

## Features

| Feature | Supported |
| :--- | :---: |
| TypeScript-first core library | ✅ |
| Framework-agnostic runtime | ✅ |
| ESM + CJS + bundled types | ✅ |
| Zero runtime dependencies | ✅ |
| 2D saturation/value area | ✅ |
| Hue slider | ✅ |
| Alpha slider | ✅ |
| HEX, RGB, HSL, and HSV input support | ✅ |
| Rich normalized color snapshots | ✅ |
| Keyboard and pointer interaction | ✅ |
| CSS variable theming | ✅ |
| Mobile-friendly pointer events | ✅ |
| Documentation site with live playground | ✅ |
| Future wrapper-ready architecture | ✅ |

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [API Overview](#api-overview)
4. [Color Snapshot Output](#color-snapshot-output)
5. [Customization](#customization)
6. [Accessibility and Interaction](#accessibility-and-interaction)
7. [Documentation and Playground](#documentation-and-playground)
8. [Run Locally](#run-locally)
9. [License](#license)

## Installation

```bash
npm install @revivejs/color
```

## Quick Start

```ts
import { createColorPicker } from "@revivejs/color";

const picker = createColorPicker({
  el: "#picker",
  color: "#7c3aed",
  hue: true,
  alpha: true,
  onChange: (color) => {
    console.log(color.hex, color.rgb, color.hsl);
  }
});
```

## API Overview

The package is centered around a small public surface:

```ts
import {
  createColorPicker,
  createColorSnapshot,
  formatColor,
  parseColor
} from "@revivejs/color";
```

Core runtime capabilities:

- `createColorPicker(options)` mounts a picker into a selector or DOM element
- `picker.getColor()` returns the current normalized snapshot
- `picker.setColor(input)` updates from HEX, RGB, HSL, HSV, or structured color input
- `picker.update(options)` changes runtime options such as `alpha`, `hue`, or labels
- `picker.destroy()` removes the picker cleanly

Useful core helpers:

- `parseColor(input)`
- `createColorSnapshot(hsva)`
- `formatColor(input, format)`
- `hexToRgba(value)`
- `rgbaToHex(value, includeAlpha?)`
- `rgbaToHsva(value)`
- `hsvaToRgba(value)`
- `hsvaToHsla(value)`
- `hslaToHsva(value)`

## Color Snapshot Output

Every color change returns a normalized snapshot:

```ts
{
  hex: "#7c3aed",
  hexa: "#7c3aedff",
  rgb: { r: 124, g: 58, b: 237 },
  rgba: { r: 124, g: 58, b: 237, a: 1 },
  hsl: { h: 262, s: 83, l: 58 },
  hsla: { h: 262, s: 83, l: 58, a: 1 },
  hsv: { h: 262, s: 76, v: 93 },
  hsva: { h: 262, s: 76, v: 93, a: 1 },
  alpha: 1
}
```

## Customization

The default UI is intentionally minimal and controlled through CSS variables.

Size is customizable too, so the picker can scale from compact utility usage to roomier settings panels.

```css
.my-picker {
  --rv-color-max-width: 360px;
  --rv-color-panel-height: 256px;
  --rv-color-slider-height: 18px;
  --rv-color-handle-size: 20px;
  --rv-color-line-handle-width: 16px;
  --rv-color-line-handle-height: 26px;
  --rv-color-radius: 18px;
  --rv-color-focus: #0f766e;
  --rv-color-surface: #f8fafc;
}
```

If you prefer to manage styles yourself, disable auto-injection:

```ts
createColorPicker({
  el: "#picker",
  injectStyles: false
});
```

Then inject the exported base styles manually:

```ts
import { COLOR_PICKER_STYLES } from "@revivejs/color";
```

## Accessibility and Interaction

The vanilla picker already ships with practical defaults:

- keyboard support for the main area, hue slider, and alpha slider
- visible `:focus-visible` outlines
- `role="slider"` with descriptive `aria-valuetext`
- pointer events for mouse, touch, and pen
- mobile-friendly interaction without extra runtime dependencies

## Documentation and Playground

The docs site includes:

- a live playground as the main entry
- installation and quick start guidance
- API usage examples
- real vanilla setup code
- live snapshot output and theming examples

Docs: `https://alexandroit.github.io/color/`

## Run Locally

```bash
npm install
npm run build:all
```

Verification:

```bash
npm run typecheck
npm test
```

Minimal browser example:

- [examples/basic/index.html](/storage/data/github/revivejs/color/color/examples/basic/index.html)

## License

MIT
