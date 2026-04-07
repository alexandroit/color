import type { HslaColor, HsvaColor, RgbaColor } from "../types";
import { round } from "./math";
import { normalizeHsla, normalizeHsva, normalizeRgba } from "./normalize";

const toHexChannel = (value: number): string => value.toString(16).padStart(2, "0");

export const hexToRgba = (value: string): RgbaColor => {
  const input = value.trim().replace(/^#/, "");

  if (![3, 4, 6, 8].includes(input.length)) {
    throw new TypeError(`Invalid HEX color: ${value}`);
  }

  const normalized =
    input.length === 3 || input.length === 4
      ? input
          .split("")
          .map((part) => part + part)
          .join("")
      : input;

  const withAlpha = normalized.length === 8 ? normalized : `${normalized}ff`;

  return normalizeRgba({
    r: Number.parseInt(withAlpha.slice(0, 2), 16),
    g: Number.parseInt(withAlpha.slice(2, 4), 16),
    b: Number.parseInt(withAlpha.slice(4, 6), 16),
    a: Number.parseInt(withAlpha.slice(6, 8), 16) / 255
  });
};

export const rgbaToHex = (value: RgbaColor, includeAlpha = false): string => {
  const rgba = normalizeRgba(value);
  const alpha = includeAlpha ? toHexChannel(round(rgba.a * 255)) : "";
  return `#${toHexChannel(rgba.r)}${toHexChannel(rgba.g)}${toHexChannel(rgba.b)}${alpha}`;
};

export const rgbaToHsva = (value: RgbaColor): HsvaColor => {
  const rgba = normalizeRgba(value);
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;

  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
  }

  return normalizeHsva({
    h: round(hue * 60),
    s: round(max === 0 ? 0 : (delta / max) * 100, 2),
    v: round(max * 100, 2),
    a: round(rgba.a, 4)
  });
};

export const hsvaToRgba = (value: HsvaColor): RgbaColor => {
  const hsva = normalizeHsva(value);
  const hue = (hsva.h / 360) * 6;
  const saturation = hsva.s / 100;
  const brightness = hsva.v / 100;
  const sector = Math.floor(hue) % 6;
  const factor = hue - Math.floor(hue);
  const p = brightness * (1 - saturation);
  const q = brightness * (1 - factor * saturation);
  const t = brightness * (1 - (1 - factor) * saturation);

  let red = brightness;
  let green = p;
  let blue = q;

  if (sector === 0) {
    red = brightness;
    green = t;
    blue = p;
  } else if (sector === 1) {
    red = q;
    green = brightness;
    blue = p;
  } else if (sector === 2) {
    red = p;
    green = brightness;
    blue = t;
  } else if (sector === 3) {
    red = p;
    green = q;
    blue = brightness;
  } else if (sector === 4) {
    red = t;
    green = p;
    blue = brightness;
  }

  return normalizeRgba({
    r: round(red * 255),
    g: round(green * 255),
    b: round(blue * 255),
    a: round(hsva.a, 4)
  });
};

export const hslaToHsva = (value: HslaColor): HsvaColor => {
  const hsla = normalizeHsla(value);
  const saturation = (hsla.s * (hsla.l < 50 ? hsla.l : 100 - hsla.l)) / 100;

  return normalizeHsva({
    h: hsla.h,
    s: saturation === 0 ? 0 : ((2 * saturation) / (hsla.l + saturation)) * 100,
    v: hsla.l + saturation,
    a: hsla.a
  });
};

export const hsvaToHsla = (value: HsvaColor): HslaColor => {
  const hsva = normalizeHsva(value);
  const l = ((200 - hsva.s) * hsva.v) / 100;

  return normalizeHsla({
    h: hsva.h,
    s: l > 0 && l < 200 ? ((hsva.s * hsva.v) / 100 / (l <= 100 ? l : 200 - l)) * 100 : 0,
    l: l / 2,
    a: hsva.a
  });
};
