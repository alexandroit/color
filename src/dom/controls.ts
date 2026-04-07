import type { ColorSnapshot } from "../types";
import { formatColor } from "../core/format";
import { clamp } from "../core/math";
import { bindInteractive } from "./interactive";

export interface Control {
  element: HTMLElement;
  render(color: ColorSnapshot): void;
  destroy(): void;
}

interface AreaOptions {
  label: string;
  onChange: (saturation: number, value: number) => void;
}

interface SliderOptions {
  className: string;
  label: string;
  min: number;
  max: number;
  step: number;
  pageStep: number;
  getValue: (color: ColorSnapshot) => number;
  onChange: (value: number) => void;
  getValueText: (color: ColorSnapshot) => string;
  paint?: (element: HTMLElement, color: ColorSnapshot) => void;
  handleColor: (color: ColorSnapshot) => string;
}

const setHandlePosition = (handle: HTMLElement, x: number, y = 0.5): void => {
  handle.style.left = `${x * 100}%`;
  handle.style.top = `${y * 100}%`;
};

export const createAreaControl = (options: AreaOptions): Control => {
  const element = document.createElement("div");
  const handle = document.createElement("div");
  element.className = "rv-color__area rv-color__interactive";
  element.tabIndex = 0;
  element.setAttribute("role", "slider");
  element.setAttribute("aria-label", options.label);
  handle.className = "rv-color__handle";
  element.append(handle);

  const cleanup = bindInteractive(element, {
    onPointer(point) {
      options.onChange(point.x * 100, (1 - point.y) * 100);
    },
    onKey(event) {
      const step = event.shiftKey || event.key === "PageUp" || event.key === "PageDown" ? 10 : 1;
      let nextSaturationDelta = 0;
      let nextValueDelta = 0;

      if (event.key === "ArrowLeft") {
        nextSaturationDelta = -step;
      } else if (event.key === "ArrowRight") {
        nextSaturationDelta = step;
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        nextValueDelta = step;
      } else if (event.key === "ArrowDown" || event.key === "PageDown") {
        nextValueDelta = -step;
      } else {
        return;
      }

      const currentSaturation = Number(element.dataset.saturation ?? "0");
      const currentValue = Number(element.dataset.value ?? "0");
      options.onChange(currentSaturation + nextSaturationDelta, currentValue + nextValueDelta);
    }
  });

  return {
    element,
    render(color) {
      element.dataset.saturation = `${color.hsv.s}`;
      element.dataset.value = `${color.hsv.v}`;
      element.style.setProperty("--rv-color-area-hue", `hsl(${color.hsv.h} 100% 50%)`);
      handle.style.setProperty("--rv-color-handle-color", color.hex);
      setHandlePosition(handle, color.hsv.s / 100, 1 - color.hsv.v / 100);
      element.setAttribute(
        "aria-valuetext",
        `Saturation ${color.hsv.s} percent, value ${color.hsv.v} percent`
      );
    },
    destroy() {
      cleanup();
    }
  };
};

export const createSliderControl = (options: SliderOptions): Control => {
  const element = document.createElement("div");
  const handle = document.createElement("div");
  element.className = `${options.className} rv-color__interactive`;
  element.tabIndex = 0;
  element.setAttribute("role", "slider");
  element.setAttribute("aria-label", options.label);
  element.setAttribute("aria-orientation", "horizontal");
  handle.className = "rv-color__handle rv-color__handle--line";
  element.append(handle);

  const cleanup = bindInteractive(element, {
    onPointer(point) {
      const nextValue = options.min + point.x * (options.max - options.min);
      options.onChange(nextValue);
    },
    onKey(event) {
      const currentValue = Number(element.dataset.value ?? `${options.min}`);
      const pageStep = event.shiftKey ? options.pageStep : options.step;

      if (event.key === "Home") {
        options.onChange(options.min);
        return;
      }

      if (event.key === "End") {
        options.onChange(options.max);
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "PageDown") {
        options.onChange(currentValue - pageStep);
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "PageUp") {
        options.onChange(currentValue + pageStep);
      }
    }
  });

  return {
    element,
    render(color) {
      const value = clamp(
        (options.getValue(color) - options.min) / (options.max - options.min),
        0,
        1
      );
      element.dataset.value = `${options.getValue(color)}`;
      handle.style.setProperty("--rv-color-handle-color", options.handleColor(color));
      setHandlePosition(handle, value);
      element.setAttribute("aria-valuemin", `${options.min}`);
      element.setAttribute("aria-valuemax", `${options.max}`);
      element.setAttribute("aria-valuenow", `${options.getValue(color)}`);
      element.setAttribute("aria-valuetext", options.getValueText(color));

      options.paint?.(element, color);
    },
    destroy() {
      cleanup();
    }
  };
};

export const createHueControl = (label: string, onChange: (value: number) => void): Control => {
  return createSliderControl({
    className: "rv-color__slider rv-color__slider--hue",
    label,
    min: 0,
    max: 360,
    step: 1,
    pageStep: 10,
    getValue: (color) => color.hsv.h,
    getValueText: (color) => `${color.hsv.h} degrees`,
    onChange,
    handleColor: (color) => `hsl(${color.hsv.h} 100% 50%)`
  });
};

export const createAlphaControl = (label: string, onChange: (value: number) => void): Control => {
  return createSliderControl({
    className: "rv-color__slider rv-color__slider--alpha",
    label,
    min: 0,
    max: 1,
    step: 0.01,
    pageStep: 0.1,
    getValue: (color) => color.alpha,
    getValueText: (color) => `${Math.round(color.alpha * 100)} percent`,
    onChange,
    handleColor: (color) => color.hexa,
    paint: (element, color) => {
      const hsva = { ...color.hsva, a: 0 };
      element.style.setProperty("--rv-color-alpha-from", formatColor(hsva, "rgba"));
      element.style.setProperty("--rv-color-alpha-to", formatColor(color, "rgba"));
    }
  });
};
