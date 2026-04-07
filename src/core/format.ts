import type { ColorFormat, ColorInput, ColorSnapshot, HslaColor, HsvColor, HsvaColor, RgbaColor } from "../types";
import { hsvaToHsla, hsvaToRgba, rgbaToHex } from "./convert";
import { parseColor } from "./parse";
import { round } from "./math";

const formatAlpha = (value: number): string => {
  const rounded = round(value, 3);
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded}`.replace(/0+$/, "").replace(/\.$/, "");
};

export const formatRgbString = (value: RgbaColor, includeAlpha = false): string => {
  if (!includeAlpha) {
    return `rgb(${value.r}, ${value.g}, ${value.b})`;
  }

  return `rgba(${value.r}, ${value.g}, ${value.b}, ${formatAlpha(value.a)})`;
};

export const formatHslString = (value: HslaColor, includeAlpha = false): string => {
  if (!includeAlpha) {
    return `hsl(${value.h}, ${value.s}%, ${value.l}%)`;
  }

  return `hsla(${value.h}, ${value.s}%, ${value.l}%, ${formatAlpha(value.a)})`;
};

export const formatHsvString = (value: HsvColor | HsvaColor, includeAlpha = false): string => {
  if (!includeAlpha) {
    return `hsv(${value.h}, ${value.s}%, ${value.v}%)`;
  }

  const alpha = "a" in value ? value.a : 1;
  return `hsva(${value.h}, ${value.s}%, ${value.v}%, ${formatAlpha(alpha)})`;
};

export const formatColor = (input: ColorInput | ColorSnapshot, format: ColorFormat = "hex"): string => {
  const snapshot =
    typeof input === "object" && input !== null && "hex" in input && "rgba" in input ? input : null;
  const hsva = snapshot ? snapshot.hsva : parseColor(input);
  const rgba = snapshot ? snapshot.rgba : hsvaToRgba(hsva);
  const hsla = snapshot ? snapshot.hsla : hsvaToHsla(hsva);
  const hsv = snapshot ? snapshot.hsv : hsva;

  switch (format) {
    case "hex":
      return rgbaToHex(rgba, false);
    case "hexa":
      return rgbaToHex(rgba, true);
    case "rgb":
      return formatRgbString(rgba, false);
    case "rgba":
      return formatRgbString(rgba, true);
    case "hsl":
      return formatHslString(hsla, false);
    case "hsla":
      return formatHslString(hsla, true);
    case "hsv":
      return formatHsvString(hsv, false);
    case "hsva":
      return formatHsvString(hsva, true);
    default:
      return rgbaToHex(rgba, false);
  }
};
