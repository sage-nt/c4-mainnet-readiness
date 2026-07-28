import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseChecklist } from "./parse-checklist.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const source =
  process.argv[2] ??
  path.resolve(root, "..", "docs", "c4-mainnet-readiness-checklist.md");
const output = path.resolve(root, "src", "checklist-data.js");

const parsed = parseChecklist(fs.readFileSync(source, "utf8"));
fs.writeFileSync(
  output,
  `window.C4_CHECKLIST = ${JSON.stringify(parsed, null, 2)};\n`,
);

console.log(`generated ${parsed.items.length} checklist gates → ${output}`);
