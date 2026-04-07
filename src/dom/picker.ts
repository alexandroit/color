import { createColorStore } from "../core/state";
import type { ColorPicker, ColorPickerLabels, ColorPickerOptions, ColorSnapshot } from "../types";
import { createAlphaControl, createAreaControl, createHueControl, type Control } from "./controls";
import { resolveElement } from "./resolve";
import { ensureColorPickerStyles } from "./styles";

const DEFAULT_LABELS: ColorPickerLabels = {
  area: "Saturation and value",
  hue: "Hue",
  alpha: "Alpha"
};

interface PickerRuntimeOptions {
  alpha: boolean;
  hue: boolean;
  injectStyles: boolean;
  className: string | undefined;
  onChange: ((color: ColorSnapshot) => void) | undefined;
  styleNonce: string | undefined;
  labels: ColorPickerLabels;
}

const createSurface = (): HTMLElement => {
  const surface = document.createElement("div");
  surface.className = "rv-color__surface";
  return surface;
};

export const createColorPicker = (inputOptions: ColorPickerOptions): ColorPicker => {
  const target = resolveElement(inputOptions.el);

  if (inputOptions.injectStyles !== false) {
    ensureColorPickerStyles(inputOptions.styleNonce);
  }

  let options: PickerRuntimeOptions = {
      alpha: inputOptions.alpha ?? true,
      hue: inputOptions.hue ?? true,
      injectStyles: inputOptions.injectStyles ?? true,
      className: inputOptions.className,
      onChange: inputOptions.onChange,
      styleNonce: inputOptions.styleNonce,
      labels: { ...DEFAULT_LABELS, ...inputOptions.labels }
    };

  const store = createColorStore(inputOptions.color ?? "#7c3aed");
  const root = document.createElement("div");
  root.className = "rv-color";
  root.setAttribute("data-revivejs-color", "");

  if (options.className) {
    root.classList.add(...options.className.split(/\s+/).filter(Boolean));
  }

  let surface = createSurface();
  let controls: Control[] = [];

  const teardownControls = (): void => {
    for (const control of controls) {
      control.destroy();
    }

    controls = [];
    surface.remove();
  };

  const renderControls = (): void => {
    teardownControls();
    surface = createSurface();
    controls.push(
      createAreaControl({
        label: options.labels.area,
        onChange: (saturation, value) => {
        store.setArea(saturation, value);
        }
      })
    );

    if (options.hue) {
      controls.push(
        createHueControl(options.labels.hue, (value) => {
          store.setHue(value);
        })
      );
    }

    if (options.alpha) {
      controls.push(
        createAlphaControl(options.labels.alpha, (value) => {
          store.setAlpha(value);
        })
      );
    }

    for (const control of controls) {
      surface.append(control.element);
    }

    root.append(surface);
  };

  const render = (color: ColorSnapshot): void => {
    for (const control of controls) {
      control.render(color);
    }
  };

  const unsubscribe = store.subscribe((color) => {
    render(color);
    options.onChange?.(color);
  });

  renderControls();
  render(store.getSnapshot());
  target.append(root);

  const updateRootClass = (nextClassName?: string): void => {
    root.className = "rv-color";

    if (nextClassName) {
      root.classList.add(...nextClassName.split(/\s+/).filter(Boolean));
    }
  };

  return {
    element: root,
    destroy() {
      unsubscribe();
      teardownControls();
      root.remove();
    },
    getColor() {
      return store.getSnapshot();
    },
    setColor(color) {
      return store.setColor(color);
    },
    update(nextOptions) {
      options = {
        ...options,
        ...nextOptions,
        labels: { ...options.labels, ...nextOptions.labels }
      };

      updateRootClass(options.className);

      if (options.injectStyles !== false) {
        ensureColorPickerStyles(options.styleNonce);
      }

      if (
        nextOptions.alpha !== undefined ||
        nextOptions.hue !== undefined ||
        nextOptions.className !== undefined ||
        nextOptions.labels !== undefined
      ) {
        renderControls();
        render(store.getSnapshot());
      }

      if (nextOptions.color !== undefined) {
        store.setColor(nextOptions.color);
      }
    }
  };
};
