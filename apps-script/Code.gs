const CHECKLIST_SHEET = "Checklist";
const ACTIVITY_SHEET = "Activity";
const ARCHIVE_COLUMN = 12;
const ALLOWED_PRIORITIES = new Set([
  "P0",
  "P1",
  "DECISION",
  "VERIFY",
  "GATE",
]);
const ALLOWED_STATUSES = new Set([
  "Not started",
  "In progress",
  "Blocked",
  "Needs decision",
  "Verify",
  "Waived",
  "Done",
]);

function doGet(event) {
  const requestId = clean_(event && event.parameter.requestId, 100);
  try {
    const token = issueRequestToken_();
    return bridgeResponse_(requestId, true, {
      items: getAllGates(),
      token,
      editor: Session.getActiveUser().getEmail() || "",
    });
  } catch (error) {
    return bridgeResponse_(requestId, false, null, error.message || error);
  }
}

function doPost(event) {
  const requestId = clean_(event && event.parameter.requestId, 100);
  try {
    const token = clean_(event && event.parameter.token, 100);
    validateRequestToken_(token);
    const payload = JSON.parse(
      (event && event.parameter.payload) || "{}",
    );
    const action = clean_(payload.action || "update", 20);
    let result;
    if (action === "update") result = updateGate(payload);
    else if (action === "create") result = createGate(payload);
    else if (action === "archive") result = archiveGate(payload);
    else throw new Error(`Unsupported tracker action: ${action}`);
    return bridgeResponse_(requestId, true, result);
  } catch (error) {
    return bridgeResponse_(requestId, false, null, error.message || error);
  }
}

function getAllGates() {
  const sheet = getChecklistSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  return sheet
    .getRange(2, 1, lastRow - 1, ARCHIVE_COLUMN)
    .getDisplayValues()
    .map((row, index) => ({ row, rowNumber: index + 2 }))
    .filter(({ row }) => row[0] && !isArchived_(row[11]))
    .map(({ row, rowNumber }) => rowToGate_(row, rowNumber));
}

function updateGate(input) {
  const payload = normalizePayload_(input);
  const lock = LockService.getDocumentLock();
  lock.waitLock(10000);

  try {
    const sheet = getChecklistSheet_();
    const rowNumber = findGateRow_(sheet, payload.id);
    const current = sheet
      .getRange(rowNumber, 1, 1, ARCHIVE_COLUMN)
      .getDisplayValues()[0];
    const currentGate = rowToGate_(current, rowNumber);
    if (currentGate.archived) {
      throw new Error("This task is archived and can no longer be edited.");
    }

    assertFresh_(payload, currentGate);

    const before = {
      status: currentGate.status,
      owner: currentGate.owner,
      targetDate: currentGate.targetDate,
      evidence: currentGate.evidence,
      notes: currentGate.notes,
    };
    const after = {
      status: payload.status,
      owner: payload.owner,
      targetDate: payload.targetDate,
      evidence: payload.evidence,
      notes: payload.notes,
    };
    if (JSON.stringify(before) === JSON.stringify(after)) {
      return currentGate;
    }
    const targetDate = payload.targetDate
      ? new Date(`${payload.targetDate}T12:00:00`)
      : "";
    const updatedAt = new Date();

    sheet
      .getRange(rowNumber, 6, 1, 5)
      .setValues([
        [
          payload.status,
          cellText_(payload.owner),
          targetDate,
          cellText_(payload.evidence),
          cellText_(payload.notes),
        ],
      ]);
    sheet.getRange(rowNumber, 8).setNumberFormat("yyyy-mm-dd");
    sheet.getRange(rowNumber, 11).setValue(updatedAt);
    sheet.getRange(rowNumber, 11).setNumberFormat("yyyy-mm-dd HH:mm");
    SpreadsheetApp.flush();

    appendActivity_(payload.id, before, after, updatedAt, "update");
    const updated = sheet
      .getRange(rowNumber, 1, 1, ARCHIVE_COLUMN)
      .getDisplayValues()[0];
    return rowToGate_(updated, rowNumber);
  } finally {
    lock.releaseLock();
  }
}

function createGate(input) {
  const payload = normalizeCreatePayload_(input);
  const lock = LockService.getDocumentLock();
  lock.waitLock(10000);

  try {
    const sheet = getChecklistSheet_();
    const identity = nextGateIdentity_(sheet);
    const rowNumber = sheet.getLastRow() + 1;
    const targetDate = payload.targetDate
      ? new Date(`${payload.targetDate}T12:00:00`)
      : "";
    const updatedAt = new Date();

    sheet
      .getRange(rowNumber, 1, 1, ARCHIVE_COLUMN)
      .setValues([
        [
          identity.id,
          cellText_(payload.area),
          payload.priority,
          cellText_(payload.title),
          cellText_(payload.detail),
          payload.status,
          cellText_(payload.owner),
          targetDate,
          cellText_(payload.evidence),
          cellText_(payload.notes),
          updatedAt,
          false,
        ],
      ]);
    sheet.getRange(rowNumber, 8).setNumberFormat("yyyy-mm-dd");
    sheet.getRange(rowNumber, 11).setNumberFormat("yyyy-mm-dd HH:mm");
    SpreadsheetApp.flush();

    const created = rowToGate_(
      sheet
        .getRange(rowNumber, 1, 1, ARCHIVE_COLUMN)
        .getDisplayValues()[0],
      rowNumber,
    );
    appendActivity_(created.id, null, created, updatedAt, "create");
    return created;
  } finally {
    lock.releaseLock();
  }
}

function archiveGate(input) {
  const payload = normalizeIdentityPayload_(input);
  const lock = LockService.getDocumentLock();
  lock.waitLock(10000);

  try {
    const sheet = getChecklistSheet_();
    const rowNumber = findGateRow_(sheet, payload.id);
    const current = sheet
      .getRange(rowNumber, 1, 1, ARCHIVE_COLUMN)
      .getDisplayValues()[0];
    const currentGate = rowToGate_(current, rowNumber);
    if (currentGate.archived) return currentGate;
    assertFresh_(payload, currentGate);

    const updatedAt = new Date();
    sheet.getRange(rowNumber, 11).setValue(updatedAt);
    sheet.getRange(rowNumber, 11).setNumberFormat("yyyy-mm-dd HH:mm");
    sheet.getRange(rowNumber, ARCHIVE_COLUMN).setValue(true);
    SpreadsheetApp.flush();

    const archived = rowToGate_(
      sheet
        .getRange(rowNumber, 1, 1, ARCHIVE_COLUMN)
        .getDisplayValues()[0],
      rowNumber,
    );
    appendActivity_(
      payload.id,
      currentGate,
      archived,
      updatedAt,
      "archive",
    );
    return archived;
  } finally {
    lock.releaseLock();
  }
}

function getChecklistSheet_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    CHECKLIST_SHEET,
  );
  if (!sheet) throw new Error(`Missing ${CHECKLIST_SHEET} sheet.`);
  ensureArchiveColumn_(sheet);
  return sheet;
}

function ensureArchiveColumn_(sheet) {
  const header = String(
    sheet.getRange(1, ARCHIVE_COLUMN).getValue() || "",
  ).trim();
  if (header && header !== "Archived") {
    throw new Error(
      "Checklist column L is already in use; expected the Archived field.",
    );
  }
  if (!header) {
    sheet.getRange(1, ARCHIVE_COLUMN).setValue("Archived");
    sheet.getRange(1, ARCHIVE_COLUMN).setFontWeight("bold");
  }
}

function findGateRow_(sheet, id) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) throw new Error("The checklist is empty.");
  const match = sheet
    .getRange(2, 1, lastRow - 1, 1)
    .createTextFinder(id)
    .matchEntireCell(true)
    .findNext();
  if (!match) throw new Error(`Unknown gate ID: ${id}`);
  return match.getRow();
}

function rowToGate_(row, rowNumber) {
  return {
    row: rowNumber,
    id: row[0],
    area: row[1],
    priority: row[2],
    title: row[3],
    detail: row[4],
    status: row[5] || "Not started",
    owner: row[6] || "",
    targetDate: normalizeDisplayDate_(row[7]),
    evidence: row[8] || "",
    notes: row[9] || "",
    lastUpdated: row[10] || "",
    archived: isArchived_(row[11]),
  };
}

function isArchived_(value) {
  return ["true", "yes", "1", "archived"].includes(
    String(value || "").trim().toLowerCase(),
  );
}

function normalizePayload_(input) {
  if (!input || typeof input !== "object") {
    throw new Error("Missing gate update.");
  }

  const payload = {
    id: clean_(input.id, 80),
    status: clean_(input.status, 40),
    owner: clean_(input.owner, 120),
    targetDate: normalizeDate_(input.targetDate),
    evidence: clean_(input.evidence, 3000),
    notes: clean_(input.notes, 6000),
    expectedLastUpdated: clean_(input.expectedLastUpdated, 40),
  };

  if (!payload.id) throw new Error("Missing gate ID.");
  if (!ALLOWED_STATUSES.has(payload.status)) {
    throw new Error(`Invalid status: ${payload.status}`);
  }
  return payload;
}

function normalizeCreatePayload_(input) {
  if (!input || typeof input !== "object") {
    throw new Error("Missing new task.");
  }
  const payload = {
    area: clean_(input.area, 160),
    priority: clean_(input.priority, 20),
    title: clean_(input.title, 240),
    detail: clean_(input.detail, 3000),
    status: clean_(input.status || "Not started", 40),
    owner: clean_(input.owner, 120),
    targetDate: normalizeDate_(input.targetDate),
    evidence: clean_(input.evidence, 3000),
    notes: clean_(input.notes, 6000),
  };
  if (!payload.area) throw new Error("A mission area is required.");
  if (!payload.title) throw new Error("A task title is required.");
  if (!ALLOWED_PRIORITIES.has(payload.priority)) {
    throw new Error(`Invalid priority: ${payload.priority}`);
  }
  if (!ALLOWED_STATUSES.has(payload.status)) {
    throw new Error(`Invalid status: ${payload.status}`);
  }
  return payload;
}

function normalizeIdentityPayload_(input) {
  if (!input || typeof input !== "object") {
    throw new Error("Missing task identity.");
  }
  const payload = {
    id: clean_(input.id, 80),
    expectedLastUpdated: clean_(input.expectedLastUpdated, 40),
  };
  if (!payload.id) throw new Error("Missing gate ID.");
  return payload;
}

function normalizeDate_(value) {
  const text = clean_(value, 10);
  if (!text) return "";
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) throw new Error("Target date must use YYYY-MM-DD.");
  const date = new Date(`${text}T12:00:00`);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== Number(match[1]) ||
    date.getMonth() + 1 !== Number(match[2]) ||
    date.getDate() !== Number(match[3])
  ) {
    throw new Error("Target date is not a valid calendar date.");
  }
  return text;
}

function assertFresh_(payload, currentGate) {
  if (
    payload.expectedLastUpdated &&
    currentGate.lastUpdated &&
    payload.expectedLastUpdated !== currentGate.lastUpdated
  ) {
    throw new Error(
      "This gate changed after you opened it. Refresh the gate before saving.",
    );
  }
}

function nextGateIdentity_(sheet) {
  const lastRow = sheet.getLastRow();
  const ids =
    lastRow < 2
      ? []
      : sheet
          .getRange(2, 1, lastRow - 1, 1)
          .getDisplayValues()
          .flat();
  const ordinal =
    ids.reduce((max, id) => {
      const match = String(id).match(/^C4-(\d+)-/);
      return match ? Math.max(max, Number(match[1])) : max;
    }, 0) + 1;
  let id;
  do {
    const suffix = Utilities.getUuid()
      .replace(/-/g, "")
      .slice(0, 8)
      .toUpperCase();
    id = `C4-${String(ordinal).padStart(3, "0")}-${suffix}`;
  } while (ids.includes(id));
  return { id, ordinal };
}

function cellText_(value) {
  const text = String(value == null ? "" : value);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function clean_(value, maxLength) {
  const text = String(value == null ? "" : value).trim();
  if (text.length > maxLength) {
    throw new Error(
      "A field exceeds its " + maxLength + "-character limit.",
    );
  }
  return text;
}

function issueRequestToken_() {
  const userKey = Session.getTemporaryActiveUserKey();
  if (!userKey) throw new Error("Could not establish your Google session.");
  const token = Utilities.getUuid() + Utilities.getUuid();
  CacheService.getScriptCache().put("request:" + userKey, token, 21600);
  return token;
}

function validateRequestToken_(token) {
  const userKey = Session.getTemporaryActiveUserKey();
  const expected = userKey
    ? CacheService.getScriptCache().get("request:" + userKey)
    : "";
  if (!token || !expected || token !== expected) {
    throw new Error(
      "Your editor session expired. Refresh the tracker and try again.",
    );
  }
}

function bridgeResponse_(requestId, ok, result, error) {
  const template = HtmlService.createTemplateFromFile("Bridge");
  template.messageJson = JSON.stringify({
    channel: "c4-readiness-tracker",
    requestId: requestId || "",
    ok,
    ...(ok ? { result } : { error: String(error || "Unknown error.") }),
  }).replace(/</g, "\\u003c");
  return template
    .evaluate()
    .setTitle("C4 Readiness Tracker Bridge")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function normalizeDisplayDate_(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return text;
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return text;
  return Utilities.formatDate(
    parsed,
    SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(),
    "yyyy-MM-dd",
  );
}

function appendActivity_(id, before, after, timestamp, operation) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(ACTIVITY_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(ACTIVITY_SHEET);
    sheet
      .getRange(1, 1, 1, 6)
      .setValues([
        ["Timestamp", "Editor", "Gate ID", "Previous", "Updated", "Source"],
      ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
  }

  sheet.appendRow([
    timestamp,
    Session.getActiveUser().getEmail() || "Star Atlas collaborator",
    id,
    JSON.stringify(before),
    JSON.stringify(after),
    `C4 readiness dashboard · ${operation || "update"}`,
  ]);
}
