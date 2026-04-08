const STYLE_ID = "stackline-color-styles";

// Keep this string compact because it ships inside the runtime bundle.
export const COLOR_PICKER_STYLES: string = ".rv-color{--rv-color-max-width:320px;--rv-color-radius:14px;--rv-color-panel-height:228px;--rv-color-slider-height:16px;--rv-color-handle-size:18px;--rv-color-line-handle-width:14px;--rv-color-line-handle-height:24px;--rv-color-gap:12px;--rv-color-surface:#ffffff;--rv-color-border:rgba(15,23,42,.08);--rv-color-focus:#2563eb;--rv-color-shadow:0 10px 28px rgba(15,23,42,.08);--rv-color-checker-light:#ffffff;--rv-color-checker-dark:#d7deea;width:min(100%,var(--rv-color-max-width));display:grid;gap:var(--rv-color-gap);color:#0f172a;font:500 14px/1.2 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;user-select:none}.rv-color,.rv-color *{box-sizing:border-box}.rv-color__surface{display:grid;gap:var(--rv-color-gap);padding:14px;border-radius:calc(var(--rv-color-radius) + 4px);background:var(--rv-color-surface);box-shadow:var(--rv-color-shadow);border:1px solid var(--rv-color-border)}.rv-color__area,.rv-color__slider{position:relative;touch-action:none;outline:none}.rv-color__area{height:var(--rv-color-panel-height);border-radius:var(--rv-color-radius);border:1px solid var(--rv-color-border);background:var(--rv-color-area-hue,hsl(0 100% 50%))}.rv-color__area::before,.rv-color__area::after{content:\"\";position:absolute;inset:0;border-radius:inherit}.rv-color__area::before{background:linear-gradient(90deg,#ffffff,rgba(255,255,255,0))}.rv-color__area::after{background:linear-gradient(0deg,#000000,rgba(0,0,0,0))}.rv-color__slider{height:var(--rv-color-slider-height);border-radius:999px;border:1px solid var(--rv-color-border)}.rv-color__slider--hue{background:linear-gradient(90deg,rgb(255,0,0) 0%,rgb(255,255,0) 16.66%,rgb(0,255,0) 33.33%,rgb(0,255,255) 50%,rgb(0,0,255) 66.66%,rgb(255,0,255) 83.33%,rgb(255,0,0) 100%)}.rv-color__slider--alpha{background-image:linear-gradient(45deg,var(--rv-color-checker-dark) 25%,transparent 25%),linear-gradient(-45deg,var(--rv-color-checker-dark) 25%,transparent 25%),linear-gradient(45deg,transparent 75%,var(--rv-color-checker-dark) 75%),linear-gradient(-45deg,transparent 75%,var(--rv-color-checker-dark) 75%),linear-gradient(90deg,var(--rv-color-alpha-from),var(--rv-color-alpha-to));background-position:0 0,0 6px,6px -6px,-6px 0,0 0;background-size:12px 12px,12px 12px,12px 12px,12px 12px,100% 100%;background-color:var(--rv-color-checker-light)}.rv-color__handle{position:absolute;top:50%;left:50%;width:var(--rv-color-handle-size);height:var(--rv-color-handle-size);border:2px solid #ffffff;border-radius:999px;background:var(--rv-color-handle-color,#ffffff);box-shadow:0 0 0 1px rgba(15,23,42,.18),0 4px 16px rgba(15,23,42,.18);transform:translate(-50%,-50%);pointer-events:none}.rv-color__handle--line{width:var(--rv-color-line-handle-width);height:var(--rv-color-line-handle-height)}.rv-color__interactive:focus-visible{outline:2px solid var(--rv-color-focus);outline-offset:2px}";

export const ensureColorPickerStyles = (nonce?: string): void => {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = COLOR_PICKER_STYLES;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }

  document.head.append(style);
};
