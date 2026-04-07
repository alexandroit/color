import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const redundantFiles = [
  path.join(rootDir, "dist", "index.d.cts")
];

await Promise.all(
  redundantFiles.map(async (filePath) => {
    try {
      await fs.rm(filePath, { force: true });
    } catch {
      // Ignore missing files so repeated runs stay safe.
    }
  })
);
