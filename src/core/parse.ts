import type { ColorInput, ColorSnapshot, HslaColor, HsvaColor, RgbaColor } from "../types";
import { hexToRgba, hslaToHsva, rgbaToHsva } from "./convert";
import { normalizeHsla, normalizeHsva, normalizeRgba } from "./normalize";
import { wrapHue } from "./math";

const HEX_PATTERN = /^#?([\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i;
const RGB_PATTERN =
  /^rgba?\(\s*(-?\d*\.?\d+)(%)?[\s,]+(-?\d*\.?\d+)(%)?[\s,]+(-?\d*\.?\d+)(%)?(?:\s*[,/]\s*(-?\d*\.?\d+)(%)?)?\s*\)$/i;
const HSL_PATTERN =
  /^hsla?\(\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[\s,]+(-?\d*\.?\d+)%?[\s,]+(-?\d*\.?\d+)%?(?:\s*[,/]\s*(-?\d*\.?\d+)(%)?)?\s*\)$/i;
const HSV_PATTERN =
  /^hsva?\(\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[\s,]+(-?\d*\.?\d+)%?[\s,]+(-?\d*\.?\d+)%?(?:\s*[,/]\s*(-?\d*\.?\d+)(%)?)?\s*\)$/i;

const angleUnits: Record<string, number> = {
  deg: 1,
  grad: 360 / 400,
  turn: 360,
  rad: 360 / (Math.PI * 2)
};

const parseHue = (value: string, unit = "deg"): number => wrapHue(Number(value) * (angleUnits[unit] ?? 1));

const isColorSnapshot = (value: unknown): value is ColorSnapshot => {
  return typeof value === "object" && value !== null && "hsva" in value;
};

const isRgbaObject = (value: unknown): value is RgbaColor => {
  return typeof value === "object" && value !== null && "r" in value && "g" in value && "b" in value;
};

const isHslaObject = (value: unknown): value is HslaColor => {
  return typeof value === "object" && value !== null && "h" in value && "s" in value && "l" in value;
};

const isHsvaObject = (value: unknown): value is HsvaColor => {
  return typeof value === "object" && value !== null && "h" in value && "s" in value && "v" in value;
};

export const parseRgbString = (value: string): RgbaColor => {
  const match = RGB_PATTERN.exec(value.trim());

  if (!match) {
    throw new TypeError(`Invalid RGB color: ${value}`);
  }

  return normalizeRgba({
    r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
    g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
    b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
    a: match[7] === undefined ? 1 : Number(match[7]) / (match[8] ? 100 : 1)
  });
};

export const parseHslString = (value: string): HslaColor => {
  const match = HSL_PATTERN.exec(value.trim());

  if (!match) {
    throw new TypeError(`Invalid HSL color: ${value}`);
  }

  return normalizeHsla({
    h: parseHue(match[1]!, match[2] ?? "deg"),
    s: Number(match[3]),
    l: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1)
  });
};

export const parseHsvString = (value: string): HsvaColor => {
  const match = HSV_PATTERN.exec(value.trim());

  if (!match) {
    throw new TypeError(`Invalid HSV color: ${value}`);
  }

  return normalizeHsva({
    h: parseHue(match[1]!, match[2] ?? "deg"),
    s: Number(match[3]),
    v: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1)
  });
};

export const parseColor = (input: ColorInput): HsvaColor => {
  if (typeof input === "string") {
    const value = input.trim();

    if (HEX_PATTERN.test(value)) {
      return rgbaToHsva(hexToRgba(value));
    }

    if (value.startsWith("rgb")) {
      return rgbaToHsva(parseRgbString(value));
    }

    if (value.startsWith("hsl")) {
      return hslaToHsva(parseHslString(value));
    }

    if (value.startsWith("hsv")) {
      return parseHsvString(value);
    }

    throw new TypeError(`Unsupported color string: ${input}`);
  }

  if (isColorSnapshot(input)) {
    return normalizeHsva(input.hsva);
  }

  if (isRgbaObject(input)) {
    return rgbaToHsva(
      normalizeRgba({
        r: input.r,
        g: input.g,
        b: input.b,
        a: "a" in input ? input.a : 1
      })
    );
  }

  if (isHslaObject(input)) {
    return hslaToHsva(
      normalizeHsla({
        h: input.h,
        s: input.s,
        l: input.l,
        a: "a" in input ? input.a : 1
      })
    );
  }

  if (isHsvaObject(input)) {
    return normalizeHsva({
      h: input.h,
      s: input.s,
      v: input.v,
      a: "a" in input ? input.a : 1
    });
  }

  throw new TypeError("Unsupported color input");
};
