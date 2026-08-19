import esbuild from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const docsSrcDir = path.join(rootDir, "docs-src");
const docsDir = path.join(rootDir, "docs");

await fs.rm(docsDir, { recursive: true, force: true });
await fs.mkdir(docsDir, { recursive: true });

await esbuild.build({
  entryPoints: [path.join(docsSrcDir, "main.ts")],
  bundle: true,
  format: "esm",
  minify: true,
  sourcemap: false,
  target: "es2019",
  outfile: path.join(docsDir, "main.js")
});

await fs.copyFile(path.join(docsSrcDir, "index.html"), path.join(docsDir, "index.html"));
await fs.copyFile(path.join(docsSrcDir, "styles", "site.css"), path.join(docsDir, "site.css"));
await Promise.all(
  ["llms.txt", "llms-full.txt"].map((fileName) =>
    fs.copyFile(path.join(docsSrcDir, fileName), path.join(docsDir, fileName))
  )
);

console.log("Built docs into docs/.");
