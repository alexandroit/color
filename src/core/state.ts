import type { ColorInput, ColorSnapshot, HsvaColor } from "../types";
import { createColorSnapshot } from "./snapshot";
import { normalizeHsva } from "./normalize";
import { parseColor } from "./parse";

type Listener = (color: ColorSnapshot) => void;

const hasChanged = (current: HsvaColor, next: HsvaColor): boolean => {
  return current.h !== next.h || current.s !== next.s || current.v !== next.v || current.a !== next.a;
};

export const createColorStore = (initialColor: ColorInput = "#000000") => {
  let hsva = normalizeHsva(parseColor(initialColor));
  const listeners = new Set<Listener>();

  const emit = (): ColorSnapshot => {
    const snapshot = createColorSnapshot(hsva);

    for (const listener of listeners) {
      listener(snapshot);
    }

    return snapshot;
  };

  const apply = (next: HsvaColor): ColorSnapshot => {
    const normalized = normalizeHsva(next);

    if (!hasChanged(hsva, normalized)) {
      return createColorSnapshot(hsva);
    }

    hsva = normalized;
    return emit();
  };

  return {
    subscribe(listener: Listener) {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
    getHsva(): HsvaColor {
      return { ...hsva };
    },
    getSnapshot(): ColorSnapshot {
      return createColorSnapshot(hsva);
    },
    setColor(color: ColorInput): ColorSnapshot {
      return apply(parseColor(color));
    },
    setArea(s: number, v: number): ColorSnapshot {
      return apply({ ...hsva, s, v });
    },
    setHue(h: number): ColorSnapshot {
      return apply({ ...hsva, h });
    },
    setAlpha(a: number): ColorSnapshot {
      return apply({ ...hsva, a });
    }
  };
};
