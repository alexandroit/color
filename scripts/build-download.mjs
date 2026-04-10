import esbuild from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const packageJson = JSON.parse(await fs.readFile(path.join(rootDir, "package.json"), "utf8"));
const version = packageJson.version;
const downloadRootDir = path.join(rootDir, "downloads");
const bundleDirName = `stackline-color-${version}`;
const bundleDir = path.join(downloadRootDir, bundleDirName);
const zipPath = path.join(downloadRootDir, `${bundleDirName}.zip`);
const browserBundlePath = path.join(bundleDir, "color.browser.js");

const installGuide = `@stackline/color ${version}

Browser bundle download
=======================

This folder is for browser applications that do not install packages from npm.

Files
-----
- color.browser.js
- LICENSE
- README.md

Script tag usage
----------------
<div id="picker"></div>
<script src="./color.browser.js"></script>
<script>
  const picker = StacklineColor.createColorPicker({
    el: "#picker",
    color: "#7c3aed",
    hue: true,
    alpha: true
  });
</script>

Global name
-----------
window.StacklineColor
`;

const downloadReadme = `# GitHub Downloads

This directory contains browser-ready downloads for developers who want to use \`@stackline/color\` with plain JavaScript.

Current version:

- [${bundleDirName}.zip](./${bundleDirName}.zip)

Inside the archive:

- \`color.browser.js\`
- \`README.md\`
- \`LICENSE\`
- \`INSTALLATION.txt\`
`;

await fs.rm(downloadRootDir, { recursive: true, force: true });
await fs.mkdir(bundleDir, { recursive: true });

await esbuild.build({
  entryPoints: [path.join(rootDir, "src/index.ts")],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2019",
  platform: "browser",
  globalName: "StacklineColor",
  outfile: browserBundlePath
});

await fs.copyFile(path.join(rootDir, "README.md"), path.join(bundleDir, "README.md"));
await fs.copyFile(path.join(rootDir, "LICENSE"), path.join(bundleDir, "LICENSE"));
await fs.writeFile(path.join(bundleDir, "INSTALLATION.txt"), installGuide, "utf8");
await fs.writeFile(path.join(downloadRootDir, "README.md"), downloadReadme, "utf8");

await execFileAsync("zip", ["-rq", zipPath, bundleDirName], {
  cwd: downloadRootDir
});

console.log(`Built GitHub download bundle into ${path.relative(rootDir, downloadRootDir)}/`);
