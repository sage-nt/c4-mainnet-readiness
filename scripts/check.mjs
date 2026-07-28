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
const sheetRows = data.items.map((item) => item.sheetRow);
if (!sheetRows.every(Number.isInteger)) {
  throw new Error("every checklist gate must map to an integer tracker row");
}
if (new Set(sheetRows).size !== data.items.length) {
  throw new Error("tracker row mappings are not unique");
}

const html = fs.readFileSync(path.join(assets, "index.html"), "utf8");
for (const marker of [
  'id="gate-drawer"',
  'id="gate-form"',
  'id="gate-status"',
  'id="gate-owner"',
  'id="tracker-bridge"',
  'id="tracker-bridge-form"',
]) {
  if (!html.includes(marker)) {
    throw new Error(`native tracker markup missing: ${marker}`);
  }
}

const app = fs.readFileSync(path.join(assets, "app.js"), "utf8");
for (const marker of [
  "AKfycbxESbHQyXuAEHgxNRhTeGRw6MWKy10XFHRG2jYwH6Dafa8k5M-4AIG305-A0o4v0VXq",
  "expectedLastUpdated",
  "function openDrawer",
  "tracker-bridge-form",
  "Gate saved to the live tracker",
]) {
  if (!app.includes(marker)) {
    throw new Error(`native tracker behavior missing: ${marker}`);
  }
}

const statuses = [
  "Not started",
  "In progress",
  "Blocked",
  "Needs decision",
  "Verify",
  "Waived",
  "Done",
];
for (const status of statuses) {
  if (!html.includes(`<option>${status}</option>`)) {
    throw new Error(`tracker status missing from editor: ${status}`);
  }
}

const bridgeCode = fs.readFileSync(
  path.join(root, "apps-script", "Code.gs"),
  "utf8",
);
for (const marker of [
  "validateRequestToken_",
  "expectedLastUpdated",
  "LockService.getDocumentLock()",
  "JSON.stringify(before) === JSON.stringify(after)",
  "appendActivity_",
]) {
  if (!bridgeCode.includes(marker)) {
    throw new Error(`Apps Script bridge behavior missing: ${marker}`);
  }
}

console.log(
  `validated ${data.items.length} unique editable gates and tracker rows across ${new Set(data.items.map((item) => item.section)).size} sections`,
);
