import test from "node:test";
import assert from "node:assert/strict";

import {
  createColorSnapshot,
  formatColor,
  hexToRgba,
  hslaToHsva,
  hsvaToHsla,
  hsvaToRgba,
  parseColor,
  parseHslString,
  parseHsvString,
  parseRgbString,
  rgbaToHex,
  rgbaToHsva
} from "../dist/index.js";

test("parses HEX, RGB, HSL, and HSV inputs into HSVA", () => {
  assert.deepEqual(parseColor("#7c3aed"), { h: 262, s: 75.53, v: 92.94, a: 1 });
  assert.deepEqual(parseColor("rgb(124, 58, 237)"), { h: 262, s: 75.53, v: 92.94, a: 1 });
  assert.deepEqual(parseColor("hsl(262 83% 58%)"), { h: 262, s: 75.0807667456386, v: 92.86, a: 1 });
  assert.deepEqual(parseColor("hsv(263 76% 93%)"), { h: 263, s: 76, v: 93, a: 1 });
});

test("normalizes object inputs and supports snapshots as input", () => {
  const snapshot = createColorSnapshot(parseColor("#000000"));
  snapshot.hsva.h = 480;
  snapshot.hsva.s = 120;
  snapshot.hsva.v = -20;
  snapshot.hsva.a = 2;

  assert.deepEqual(parseColor(snapshot), { h: 120, s: 100, v: 0, a: 1 });
  assert.deepEqual(parseColor({ r: 500, g: -10, b: 127, a: 1.5 }), { h: 330, s: 100, v: 100, a: 1 });
  assert.deepEqual(parseColor({ h: -90, s: 40, l: 30, a: 0.5 }), hslaToHsva({ h: 270, s: 40, l: 30, a: 0.5 }));
});

test("round-trips conversion helpers", () => {
  const hsva = rgbaToHsva({ r: 124, g: 58, b: 237, a: 0.42 });
  const rgba = hsvaToRgba(hsva);
  const hsla = hsvaToHsla(hsva);

  assert.deepEqual(rgba, { r: 124, g: 58, b: 237, a: 0.42 });
  assert.deepEqual(hsla, { h: 262, s: 83.25378922749468, l: 57.841209, a: 0.42 });
  assert.deepEqual(rgbaToHsva(rgba), { h: 262, s: 75.53, v: 92.94, a: 0.42 });
  assert.deepEqual(hslaToHsva(hsla), { h: 262, s: 75.53, v: 92.94, a: 0.42 });
});

test("parses standalone color strings with alpha and angle units", () => {
  assert.deepEqual(parseRgbString("rgba(23.9% 34.5% 40% / 99%)"), { r: 61, g: 88, b: 102, a: 0.99 });
  assert.deepEqual(parseHslString("hsla(.5turn 25% 32% / 50%)"), { h: 180, s: 25, l: 32, a: 0.5 });
  assert.deepEqual(parseHsvString("hsv(1.5708rad 20% 10% / 40%)"), { h: 90.00021045914971, s: 20, v: 10, a: 0.4 });
});

test("formats color snapshots consistently", () => {
  const snapshot = createColorSnapshot(parseColor("#7c3aed80"));

  assert.equal(snapshot.hex, "#7c3aed");
  assert.equal(snapshot.hexa, "#7c3aed80");
  assert.equal(snapshot.alpha, 0.502);
  assert.equal(formatColor(snapshot, "hex"), "#7c3aed");
  assert.equal(formatColor(snapshot, "hexa"), "#7c3aed80");
  assert.equal(formatColor(snapshot, "rgb"), "rgb(124, 58, 237)");
  assert.equal(formatColor(snapshot, "rgba"), "rgba(124, 58, 237, 0.502)");
  assert.equal(formatColor(snapshot, "hsl"), "hsl(262, 83%, 58%)");
  assert.equal(formatColor(snapshot, "hsla"), "hsla(262, 83%, 58%, 0.502)");
});

test("converts HEX strings with and without alpha", () => {
  assert.deepEqual(hexToRgba("#abc"), { r: 170, g: 187, b: 204, a: 1 });
  assert.deepEqual(hexToRgba("#7c3aed80"), { r: 124, g: 58, b: 237, a: 0.5019607843137255 });
  assert.equal(rgbaToHex({ r: 124, g: 58, b: 237, a: 1 }, false), "#7c3aed");
  assert.equal(rgbaToHex({ r: 124, g: 58, b: 237, a: 0.5 }, true), "#7c3aed80");
});

test("throws on unsupported input", () => {
  assert.throws(() => parseColor("not-a-color"), /Unsupported color string/);
  assert.throws(() => parseHslString("rgb(0,0,0)"), /Invalid HSL color/);
  assert.throws(() => hexToRgba("#12"), /Invalid HEX color/);
});
