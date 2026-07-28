import crypto from "node:crypto";

const TAGS = new Set(["P0", "P1", "DECISION", "VERIFY", "OPS"]);

function stripMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function extractLinks(value) {
  return [...value.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)].map(
    ([, label, url]) => ({ label, url }),
  );
}

function stableId(section, text, index) {
  const digest = crypto
    .createHash("sha256")
    .update(`${section}\n${text}`)
    .digest("hex")
    .slice(0, 8)
    .toUpperCase();
  return `C4-${String(index + 1).padStart(3, "0")}-${digest}`;
}

export function parseChecklist(markdown) {
  let section = "Overview";
  const items = [];

  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      section = stripMarkdown(heading[1]);
      continue;
    }

    const checkbox = line.match(/^- \[([ xX])\]\s+(.+?)\s*$/);
    if (!checkbox) continue;

    const raw = checkbox[2];
    const emphasized = raw.match(/^\*\*([^*]+)\*\*(.*)$/);
    let priority = "GATE";
    let title = raw;
    let detail = "";

    if (emphasized) {
      const lead = stripMarkdown(emphasized[1]).replace(/:$/, "");
      const separator = lead.match(/^([A-Z0-9]+)\s+[—-]\s+(.+)$/);
      if (separator && TAGS.has(separator[1])) {
        priority = separator[1];
        title = separator[2].replace(/:$/, "");
        detail = emphasized[2].replace(/^:\s*/, "").trim();
      } else {
        title = lead;
        detail = emphasized[2].replace(/^:\s*/, "").trim();
      }
    }

    const plainTitle = stripMarkdown(title);
    const plainDetail = stripMarkdown(detail);
    const plain = [plainTitle, plainDetail].filter(Boolean).join(": ");
    const index = items.length;

    items.push({
      id: stableId(section, plain, index),
      ordinal: index + 1,
      section,
      priority,
      title: plainTitle,
      detail: plainDetail,
      links: extractLinks(raw),
      baselineChecked: checkbox[1].toLowerCase() === "x",
      sheetRow: index + 2,
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    source: "C4 mainnet readiness checklist reconciled 2026-07-28",
    sheet: {
      id: "1vfdI69YwDDSyJ9AdFl6ULKc0C6qpoh8JzItaQvCNIt4",
      checklistGid: "2005833910",
      dashboardGid: "718941904",
      guideGid: "890645384"
    },
    items,
  };
}
