import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const source = path.join(root, "src");
const assets = path.join(root, ".open-next", "assets");
const staticOutput = path.join(root, "dist");

fs.mkdirSync(assets, { recursive: true });
fs.mkdirSync(staticOutput, { recursive: true });
for (const name of ["index.html", "styles.css", "app.js", "checklist-data.js"]) {
  fs.copyFileSync(path.join(source, name), path.join(assets, name));
  fs.copyFileSync(path.join(source, name), path.join(staticOutput, name));
}

console.log(`built static assets → ${assets} and ${staticOutput}`);
