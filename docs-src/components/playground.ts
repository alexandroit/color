import { createColorPicker } from "../../src/index";

export const mountPlayground = (element: HTMLElement): void => {
  element.innerHTML = `
    <section class="playground">
      <div class="playground__header">
        <div>
          <span class="eyebrow">Live playground</span>
          <h2>Vanilla color picker</h2>
          <p>Change the inputs and the docs page rebuilds the picker using the real package runtime.</p>
        </div>
      </div>
      <div class="playground__grid">
        <div class="playground__panel">
          <label class="field">
            <span>Initial color</span>
            <input id="playground-color" type="text" value="#7c3aed" />
          </label>
          <label class="field field--inline">
            <input id="playground-hue" type="checkbox" checked />
            <span>Show hue slider</span>
          </label>
          <label class="field field--inline">
            <input id="playground-alpha" type="checkbox" checked />
            <span>Show alpha slider</span>
          </label>
          <button id="playground-reset" class="button" type="button">Rebuild picker</button>
        </div>
        <div class="playground__preview">
          <div class="preview-card">
            <div id="playground-picker"></div>
          </div>
          <div class="preview-meta">
            <div class="preview-swatch" id="playground-swatch"></div>
            <pre><code id="playground-output"></code></pre>
          </div>
        </div>
      </div>
      <div class="snippet playground__setup">
        <h3>Vanilla setup</h3>
        <pre><code id="playground-source"></code></pre>
      </div>
    </section>
  `;

  const colorInput = element.querySelector<HTMLInputElement>("#playground-color");
  const hueInput = element.querySelector<HTMLInputElement>("#playground-hue");
  const alphaInput = element.querySelector<HTMLInputElement>("#playground-alpha");
  const resetButton = element.querySelector<HTMLButtonElement>("#playground-reset");
  const pickerTarget = element.querySelector<HTMLElement>("#playground-picker");
  const swatch = element.querySelector<HTMLElement>("#playground-swatch");
  const output = element.querySelector<HTMLElement>("#playground-output");
  const source = element.querySelector<HTMLElement>("#playground-source");

  if (!colorInput || !hueInput || !alphaInput || !resetButton || !pickerTarget || !swatch || !output || !source) {
    return;
  }

  let picker: ReturnType<typeof createColorPicker> | null = null;

  const renderSnippet = (): void => {
    source.textContent = `import { createColorPicker } from "@revivejs/color";

const picker = createColorPicker({
  el: "#picker",
  color: "${colorInput.value}",
  hue: ${hueInput.checked},
  alpha: ${alphaInput.checked},
  onChange: (color) => {
    console.log(color.hex, color.rgb, color.hsl);
  }
});`;
  };

  const renderPicker = (): void => {
    picker?.destroy();
    pickerTarget.innerHTML = "";
    renderSnippet();

    picker = createColorPicker({
      el: pickerTarget,
      color: colorInput.value,
      hue: hueInput.checked,
      alpha: alphaInput.checked,
      onChange: (color) => {
        swatch.style.background = color.hexa;
        output.textContent = JSON.stringify(color, null, 2);
        document.body.style.background = `linear-gradient(180deg, rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.10), rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.28))`;
      }
    });

    const snapshot = picker.getColor();
    swatch.style.background = snapshot.hexa;
    output.textContent = JSON.stringify(snapshot, null, 2);
  };

  resetButton.addEventListener("click", renderPicker);
  renderPicker();
};
