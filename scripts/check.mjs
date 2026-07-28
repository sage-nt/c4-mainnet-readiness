import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const assets = path.join(root, ".open-next", "assets");
const required = [
  "index.html",
  "styles.css",
  "app.js",
  "checklist-data.js",
];

for (const file of required) {
  const full = path.join(assets, file);
  if (!fs.existsSync(full) || fs.statSync(full).size === 0) {
    throw new Error(`missing deployment asset: ${file}`);
  }
}

const sandbox = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(assets, "checklist-data.js"), "utf8"),
  sandbox,
);
const data = sandbox.window.C4_CHECKLIST;
if (!data || data.items.length !== 245) {
  throw new Error(`expected 245 gates, found ${data?.items?.length ?? "none"}`);
}
if (new Set(data.items.map((item) => item.id)).size !== data.items.length) {
  throw new Error("checklist IDs are not unique");
}

console.log(
  `validated ${data.items.length} unique gates across ${new Set(data.items.map((item) => item.section)).size} sections`,
);
