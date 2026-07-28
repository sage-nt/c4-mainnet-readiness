import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseChecklist } from "./parse-checklist.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const source =
  process.argv[2] ??
  path.resolve(root, "..", "docs", "c4-mainnet-readiness-checklist.md");
const data = parseChecklist(fs.readFileSync(source, "utf8"));
const sheetId = data.sheet.id;
const account = "sage@staratlas.com";

function gog(args) {
  const result = spawnSync("gog", [...args, "--account", account, "--no-input"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `gog exited ${result.status}`);
  }
  return result.stdout;
}

const header = [
  "ID",
  "Area",
  "Priority",
  "Gate",
  "Details",
  "Status",
  "Owner",
  "Target date",
  "Evidence / link",
  "Notes",
  "Last updated",
];
const rows = data.items.map((item) => [
  item.id,
  item.section,
  item.priority,
  item.title,
  item.detail,
  item.baselineChecked ? "Done" : "Not started",
  "",
  "",
  item.links.map((link) => link.url).join("\n"),
  "",
  "",
]);

gog([
  "sheets",
  "update",
  sheetId,
  `Checklist!A1:K${rows.length + 1}`,
  "--values-json",
  JSON.stringify([header, ...rows]),
  "--input",
  "USER_ENTERED",
]);

const summary = [
  ["STAR ATLAS C4 — MAINNET READINESS", ""],
  ["Live launch-control summary", ""],
  ["Total gates", "=COUNTA(Checklist!A2:A)"],
  ["Done", '=COUNTIF(Checklist!F2:F,"Done")'],
  ["In progress", '=COUNTIF(Checklist!F2:F,"In progress")'],
  ["Blocked", '=COUNTIF(Checklist!F2:F,"Blocked")'],
  ["Not started", '=COUNTIF(Checklist!F2:F,"Not started")'],
  ["Unowned", '=COUNTIFS(Checklist!A2:A,"<>",Checklist!G2:G,"")'],
  ["P0 remaining", '=COUNTIFS(Checklist!C2:C,"P0",Checklist!F2:F,"<>Done")'],
  ["Last baseline sync", data.generatedAt],
  ["Rule", "A gate is closed only with owner, exact artifact, and evidence."],
];
gog([
  "sheets",
  "update",
  sheetId,
  "Dashboard!A1:B11",
  "--values-json",
  JSON.stringify(summary),
  "--input",
  "USER_ENTERED",
]);

const guide = [
  ["HOW TO USE THIS TRACKER", ""],
  ["Field", "Rule"],
  ["Status", "Use: Not started, In progress, Blocked, Needs decision, Verify, Waived, Done."],
  ["Owner", "One accountable DRI; supporting people belong in Notes."],
  ["Target date", "Required for P0 and P1 items once work begins."],
  ["Evidence / link", "Commit, config hash, deployment, test output, PR, issue, screenshot, or transaction signature."],
  ["Done", "Only after evidence exists against the pinned release candidate."],
  ["Waived", "Requires a written scope disable or release-group exception linked in Evidence."],
  ["Source baseline", data.source],
  ["HTML board", "Use the linked board for search, filters, section navigation, and direct row links."],
];
gog([
  "sheets",
  "update",
  sheetId,
  "Guide!A1:B10",
  "--values-json",
  JSON.stringify(guide),
  "--input",
  "USER_ENTERED",
]);

gog([
  "sheets",
  "format",
  sheetId,
  "Checklist!A1:K1",
  "--format-json",
  JSON.stringify({
    backgroundColor: { red: 0.035, green: 0.153, blue: 0.2 },
    textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
    horizontalAlignment: "CENTER",
  }),
  "--format-fields",
  "backgroundColor,textFormat,horizontalAlignment",
]);
gog([
  "sheets",
  "format",
  sheetId,
  "Dashboard!A1:B2",
  "--format-json",
  JSON.stringify({
    backgroundColor: { red: 0.035, green: 0.153, blue: 0.2 },
    textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
  }),
  "--format-fields",
  "backgroundColor,textFormat",
]);
gog([
  "sheets",
  "format",
  sheetId,
  "Guide!A1:B2",
  "--format-json",
  JSON.stringify({
    backgroundColor: { red: 0.035, green: 0.153, blue: 0.2 },
    textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
  }),
  "--format-fields",
  "backgroundColor,textFormat",
]);

console.log(`synced ${rows.length} gates to ${sheetId}`);
