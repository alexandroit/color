export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface RgbaColor extends RgbColor {
  a: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HslaColor extends HslColor {
  a: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

export interface HsvaColor extends HsvColor {
  a: number;
}

export interface ColorSnapshot {
  hex: string;
  hexa: string;
  rgb: RgbColor;
  rgba: RgbaColor;
  hsl: HslColor;
  hsla: HslaColor;
  hsv: HsvColor;
  hsva: HsvaColor;
  alpha: number;
}

export type ColorInput =
  | string
  | RgbColor
  | RgbaColor
  | HslColor
  | HslaColor
  | HsvColor
  | HsvaColor
  | ColorSnapshot;

export type ColorFormat = "hex" | "hexa" | "rgb" | "rgba" | "hsl" | "hsla" | "hsv" | "hsva";

export interface ColorPickerLabels {
  area: string;
  hue: string;
  alpha: string;
}

export interface ColorPickerOptions {
  el: string | HTMLElement;
  color?: ColorInput;
  hue?: boolean;
  alpha?: boolean;
  className?: string;
  injectStyles?: boolean;
  styleNonce?: string;
  labels?: Partial<ColorPickerLabels>;
  onChange?: (color: ColorSnapshot) => void;
}

export interface ColorPicker {
  readonly element: HTMLElement;
  destroy(): void;
  getColor(): ColorSnapshot;
  setColor(color: ColorInput): ColorSnapshot;
  update(options: Partial<Omit<ColorPickerOptions, "el">>): void;
}

