import { pages } from "./content/pages";
import { mountPlayground } from "./components/playground";

const app = document.querySelector<HTMLElement>("#app");

if (!app) {
  throw new TypeError("Docs app root was not found.");
}

const pageMarkup = pages
  .map(
    (page) => `
      <section id="${page.id}" class="panel">
        <div class="page__head">
          <span class="eyebrow">${page.eyebrow}</span>
          <h3>${page.title}</h3>
          <p>${page.description}</p>
        </div>
        <div>${page.body}</div>
      </section>
    `
  )
  .join("");

const navMarkup = [
  `<a href="#playground">Live Playground</a>`,
  ...pages.map((page) => `<a href="#${page.id}">${page.title}</a>`)
].join("");

app.innerHTML = `
  <div class="layout">
    <aside class="sidebar">
      <a class="brand" href="#playground">
        <span class="eyebrow">ReviveJS</span>
        <h1>@revivejs/color</h1>
        <p>A tiny, framework-agnostic color picker foundation built for future wrappers and long-term ecosystem growth.</p>
      </a>
      <nav class="nav">
        ${navMarkup}
      </nav>
    </aside>
    <main class="content">
      <div id="playground"></div>
      <section class="hero">
        <span class="eyebrow">Core + vanilla layer</span>
        <h2>Small, precise, and ready for wrappers.</h2>
        <p>The first version of <strong>@revivejs/color</strong> focuses on a polished HSV-based engine, a modern vanilla picker, strong typing, accessible controls, and a clean path to React, Vue, and Angular wrappers later.</p>
        <div class="hero__meta">
          <span>Zero runtime dependencies</span>
          <span>HEX, RGB, HSL, HSV</span>
          <span>Keyboard and pointer support</span>
          <span>CSS variables theming</span>
        </div>
      </section>
      ${pageMarkup}
    </main>
  </div>
`;

const playgroundRoot = document.querySelector<HTMLElement>("#playground");

if (playgroundRoot) {
  mountPlayground(playgroundRoot);
}
