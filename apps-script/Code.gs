const CHECKLIST_SHEET = "Checklist";
const ACTIVITY_SHEET = "Activity";
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
    return bridgeResponse_(requestId, true, updateGate(payload));
  } catch (error) {
    return bridgeResponse_(requestId, false, null, error.message || error);
  }
}

function getAllGates() {
  const sheet = getChecklistSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  return sheet
    .getRange(2, 1, lastRow - 1, 11)
    .getDisplayValues()
    .filter((row) => row[0])
    .map((row, index) => rowToGate_(row, index + 2));
}

function updateGate(input) {
  const payload = normalizePayload_(input);
  const lock = LockService.getDocumentLock();
  lock.waitLock(10000);

  try {
    const sheet = getChecklistSheet_();
    const rowNumber = findGateRow_(sheet, payload.id);
    const current = sheet.getRange(rowNumber, 1, 1, 11).getDisplayValues()[0];
    const currentGate = rowToGate_(current, rowNumber);

    if (
      payload.expectedLastUpdated &&
      currentGate.lastUpdated &&
      payload.expectedLastUpdated !== currentGate.lastUpdated
    ) {
      throw new Error(
        "This gate changed after you opened it. Refresh the gate before saving.",
      );
    }

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
          payload.owner,
          targetDate,
          payload.evidence,
          payload.notes,
        ],
      ]);
    sheet.getRange(rowNumber, 8).setNumberFormat("yyyy-mm-dd");
    sheet.getRange(rowNumber, 11).setValue(updatedAt);
    sheet.getRange(rowNumber, 11).setNumberFormat("yyyy-mm-dd HH:mm");
    SpreadsheetApp.flush();

    appendActivity_(payload.id, before, payload, updatedAt);
    const updated = sheet
      .getRange(rowNumber, 1, 1, 11)
      .getDisplayValues()[0];
    return rowToGate_(updated, rowNumber);
  } finally {
    lock.releaseLock();
  }
}

function getChecklistSheet_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    CHECKLIST_SHEET,
  );
  if (!sheet) throw new Error(`Missing ${CHECKLIST_SHEET} sheet.`);
  return sheet;
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
  };
}

function normalizePayload_(input) {
  if (!input || typeof input !== "object") {
    throw new Error("Missing gate update.");
  }

  const payload = {
    id: clean_(input.id, 80),
    status: clean_(input.status, 40),
    owner: clean_(input.owner, 120),
    targetDate: clean_(input.targetDate, 10),
    evidence: clean_(input.evidence, 3000),
    notes: clean_(input.notes, 6000),
    expectedLastUpdated: clean_(input.expectedLastUpdated, 40),
  };

  if (!payload.id) throw new Error("Missing gate ID.");
  if (!ALLOWED_STATUSES.has(payload.status)) {
    throw new Error(`Invalid status: ${payload.status}`);
  }
  if (
    payload.targetDate &&
    !/^\d{4}-\d{2}-\d{2}$/.test(payload.targetDate)
  ) {
    throw new Error("Target date must use YYYY-MM-DD.");
  }
  return payload;
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

function appendActivity_(id, before, after, timestamp) {
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
    JSON.stringify({
      status: after.status,
      owner: after.owner,
      targetDate: after.targetDate,
      evidence: after.evidence,
      notes: after.notes,
    }),
    "C4 readiness dashboard",
  ]);
}
