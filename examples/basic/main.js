import { createColorPicker } from "../../dist/index.js";

const swatch = document.querySelector("#swatch");
const output = document.querySelector("#output");
const primaryValue = document.querySelector("#primaryValue");
const secondaryValue = document.querySelector("#secondaryValue");
const source = document.querySelector("#source");

const demoSource = `import { createColorPicker } from "@stackline/color";

const picker = createColorPicker({
  el: "#picker",
  color: "#7c3aed",
  alpha: true,
  hue: true,
  onChange: (color) => {
    console.log(color.hex, color.rgb, color.hsl);
  }
});`;

source.textContent = demoSource;

const render = (color) => {
  swatch.style.background = color.hexa;
  primaryValue.textContent = color.hexa;
  secondaryValue.textContent = `${color.hsla.h}deg / ${color.hsla.s}% / ${color.hsla.l}%`;
  document.body.style.background = `linear-gradient(180deg, rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.18), rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.36))`;
  output.textContent = JSON.stringify(color, null, 2);
};

const picker = createColorPicker({
  el: "#picker",
  color: "#7c3aed",
  alpha: true,
  hue: true,
  onChange: render
});

render(picker.getColor());
