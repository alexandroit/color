import type { ColorInput, ColorSnapshot, HslaColor, HsvaColor, RgbaColor } from "../types";
import { hexToRgba, hslaToHsva, rgbaToHsva } from "./convert";
import { normalizeHsla, normalizeHsva, normalizeRgba } from "./normalize";
import { wrapHue } from "./math";

const HEX_PATTERN = /^#?([\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i;

type FunctionalColorKind = "rgb" | "angle";
type FunctionalColorToken = { raw: string; percentage: boolean; unit?: string };

const isDigitCode = (code: number): boolean => code >= 48 && code <= 57;
const isWhitespace = (character: string): boolean => character !== "" && character.trim() === "";

const readNumberToken = (
  input: string,
  start: number,
  allowPercentage: boolean,
  allowAngleUnit: boolean
): { next: number; token: FunctionalColorToken } | null => {
  let index = start;
  const numberStart = index;

  if (input.charCodeAt(index) === 45) index += 1;

  let wholeDigits = 0;
  while (isDigitCode(input.charCodeAt(index))) {
    wholeDigits += 1;
    index += 1;
  }

  if (input.charCodeAt(index) === 46) {
    index += 1;
    const fractionStart = index;
    while (isDigitCode(input.charCodeAt(index))) index += 1;
    if (index === fractionStart) return null;
  } else if (wholeDigits === 0) {
    return null;
  }

  const raw = input.slice(numberStart, index);
  let unit: string | undefined;

  if (allowAngleUnit) {
    const unitStart = index;
    while (true) {
      const code = input.charCodeAt(index);
      if (!((code >= 65 && code <= 90) || (code >= 97 && code <= 122))) break;
      index += 1;
    }
    if (index > unitStart) {
      unit = input.slice(unitStart, index).toLowerCase();
      if (!Object.prototype.hasOwnProperty.call(angleUnits, unit)) return null;
    }
  }

  const percentage = allowPercentage && input.charCodeAt(index) === 37;
  if (percentage) index += 1;

  const token: FunctionalColorToken = { raw, percentage };
  if (unit !== undefined) token.unit = unit;

  return { next: index, token };
};

const parseFunctionalColor = (
  value: string,
  names: readonly string[],
  kind: FunctionalColorKind
): FunctionalColorToken[] | null => {
  const input = value.trim();
  const openParenthesis = input.indexOf("(");

  if (openParenthesis <= 0 || input.charAt(input.length - 1) !== ")") return null;
  if (!names.includes(input.slice(0, openParenthesis).toLowerCase())) return null;

  const body = input.slice(openParenthesis + 1, -1);
  const tokens: FunctionalColorToken[] = [];
  let index = 0;

  const skipWhitespace = (): void => {
    while (isWhitespace(body.charAt(index))) index += 1;
  };

  skipWhitespace();
  for (let component = 0; component < 3; component += 1) {
    const parsed = readNumberToken(
      body,
      index,
      kind === "rgb" || component > 0,
      kind === "angle" && component === 0
    );
    if (!parsed) return null;

    tokens.push(parsed.token);
    index = parsed.next;

    if (component < 2) {
      let hasSeparator = false;
      while (isWhitespace(body.charAt(index)) || body.charAt(index) === ",") {
        hasSeparator = true;
        index += 1;
      }
      if (!hasSeparator) return null;
    }
  }

  skipWhitespace();
  if (body.charAt(index) === "," || body.charAt(index) === "/") {
    index += 1;
    skipWhitespace();
    const alpha = readNumberToken(body, index, true, false);
    if (!alpha) return null;
    tokens.push(alpha.token);
    index = alpha.next;
  }

  skipWhitespace();
  return index === body.length ? tokens : null;
};

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
  const match = parseFunctionalColor(value, ["rgb", "rgba"], "rgb");

  if (!match) {
    throw new TypeError(`Invalid RGB color: ${value}`);
  }

  return normalizeRgba({
    r: Number(match[0]!.raw) / (match[0]!.percentage ? 100 / 255 : 1),
    g: Number(match[1]!.raw) / (match[1]!.percentage ? 100 / 255 : 1),
    b: Number(match[2]!.raw) / (match[2]!.percentage ? 100 / 255 : 1),
    a: match[3] === undefined ? 1 : Number(match[3]!.raw) / (match[3]!.percentage ? 100 : 1)
  });
};

export const parseHslString = (value: string): HslaColor => {
  const match = parseFunctionalColor(value, ["hsl", "hsla"], "angle");

  if (!match) {
    throw new TypeError(`Invalid HSL color: ${value}`);
  }

  return normalizeHsla({
    h: parseHue(match[0]!.raw, match[0]!.unit ?? "deg"),
    s: Number(match[1]!.raw),
    l: Number(match[2]!.raw),
    a: match[3] === undefined ? 1 : Number(match[3]!.raw) / (match[3]!.percentage ? 100 : 1)
  });
};

export const parseHsvString = (value: string): HsvaColor => {
  const match = parseFunctionalColor(value, ["hsv", "hsva"], "angle");

  if (!match) {
    throw new TypeError(`Invalid HSV color: ${value}`);
  }

  return normalizeHsva({
    h: parseHue(match[0]!.raw, match[0]!.unit ?? "deg"),
    s: Number(match[1]!.raw),
    v: Number(match[2]!.raw),
    a: match[3] === undefined ? 1 : Number(match[3]!.raw) / (match[3]!.percentage ? 100 : 1)
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
