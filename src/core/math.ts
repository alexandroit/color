export const clamp = (value: number, min = 0, max = 1): number => {
  if (Number.isNaN(value)) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
};

export const round = (value: number, precision = 0): number => {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
};

export const wrapHue = (value: number): number => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const normalized = value % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

export const clampByte = (value: number): number => round(clamp(value, 0, 255));

export const clampPercent = (value: number): number => clamp(value, 0, 100);

export const clampAlpha = (value: number): number => clamp(value, 0, 1);

