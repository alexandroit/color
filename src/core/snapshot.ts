import type { ColorSnapshot, HslaColor, HslColor, HsvaColor, HsvColor, RgbaColor, RgbColor } from "../types";
import { hsvaToHsla, hsvaToRgba, rgbaToHex } from "./convert";
import { normalizeHsva } from "./normalize";
import { round } from "./math";

const roundRgb = (value: RgbaColor): RgbaColor => ({
  r: round(value.r),
  g: round(value.g),
  b: round(value.b),
  a: round(value.a, 3)
});

const roundHsl = (value: HslaColor): HslaColor => ({
  h: round(value.h),
  s: round(value.s),
  l: round(value.l),
  a: round(value.a, 3)
});

const roundHsv = (value: HsvaColor): HsvaColor => ({
  h: round(value.h),
  s: round(value.s),
  v: round(value.v),
  a: round(value.a, 3)
});

export const createColorSnapshot = (input: HsvaColor): ColorSnapshot => {
  const normalizedHsva = normalizeHsva(input);
  const hsva = roundHsv(normalizedHsva);
  const rgba = roundRgb(hsvaToRgba(normalizedHsva));
  const hsla = roundHsl(hsvaToHsla(normalizedHsva));
  const rgb: RgbColor = { r: rgba.r, g: rgba.g, b: rgba.b };
  const hsl: HslColor = { h: hsla.h, s: hsla.s, l: hsla.l };
  const hsv: HsvColor = { h: hsva.h, s: hsva.s, v: hsva.v };

  return {
    hex: rgbaToHex(rgba, false),
    hexa: rgbaToHex(rgba, true),
    rgb,
    rgba,
    hsl,
    hsla,
    hsv,
    hsva,
    alpha: rgba.a
  };
};
