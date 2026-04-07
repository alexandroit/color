export interface DocsPage {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  body: string;
}

export const pages: DocsPage[] = [
  {
    id: "overview",
    title: "Overview",
    eyebrow: "Foundation package",
    description: "A compact core for color parsing, conversion, state, and a vanilla picker UI.",
    body: `
      <p><strong>@revivejs/color</strong> is designed as the foundation package for the future ReviveJS color ecosystem. The core logic stays framework-agnostic and reusable, while the current vanilla layer provides a clean DOM implementation for real browser usage.</p>
      <p>The goal is simple: do a few things very well, keep the runtime tiny, and make future wrappers adapt the same engine instead of replacing it.</p>
    `
  },
  {
    id: "installation",
    title: "Installation",
    eyebrow: "Get started",
    description: "Install the package and mount a picker in any DOM container.",
    body: `
      <pre><code>npm install @revivejs/color</code></pre>
      <pre><code>import { createColorPicker } from "@revivejs/color";

const picker = createColorPicker({
  el: "#picker",
  color: "#7c3aed",
  alpha: true,
  hue: true
});</code></pre>
    `
  },
  {
    id: "api",
    title: "API",
    eyebrow: "Small surface",
    description: "A minimal API with clean upgrade paths for controlled patterns later.",
    body: `
      <pre><code>const picker = createColorPicker({
  el: "#picker",
  color: "#7c3aed",
  alpha: true,
  hue: true,
  onChange: (color) => {
    console.log(color.hex, color.rgb, color.hsl);
  }
});

picker.getColor();
picker.setColor("rgba(124, 58, 237, 0.7)");
picker.update({ alpha: false });
picker.destroy();</code></pre>
      <p>The snapshot always includes normalized <code>hex</code>, <code>hexa</code>, <code>rgb</code>, <code>rgba</code>, <code>hsl</code>, <code>hsla</code>, <code>hsv</code>, and <code>hsva</code> values.</p>
    `
  }
];
