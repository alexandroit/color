import type { HslColor, HslaColor, HsvColor, HsvaColor, RgbColor, RgbaColor } from "../types";
import { clampAlpha, clampByte, clampPercent, wrapHue } from "./math";

export const normalizeRgb = (value: RgbColor): RgbColor => ({
  r: clampByte(value.r),
  g: clampByte(value.g),
  b: clampByte(value.b)
});

export const normalizeRgba = (value: RgbaColor): RgbaColor => ({
  ...normalizeRgb(value),
  a: clampAlpha(value.a)
});

export const normalizeHsl = (value: HslColor): HslColor => ({
  h: wrapHue(value.h),
  s: clampPercent(value.s),
  l: clampPercent(value.l)
});

export const normalizeHsla = (value: HslaColor): HslaColor => ({
  ...normalizeHsl(value),
  a: clampAlpha(value.a)
});

export const normalizeHsv = (value: HsvColor): HsvColor => ({
  h: wrapHue(value.h),
  s: clampPercent(value.s),
  v: clampPercent(value.v)
});

export const normalizeHsva = (value: HsvaColor): HsvaColor => ({
  ...normalizeHsv(value),
  a: clampAlpha(value.a)
});

