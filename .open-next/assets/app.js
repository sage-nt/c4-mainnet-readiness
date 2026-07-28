(() => {
  "use strict";

  const data = window.C4_CHECKLIST;
  if (!data?.items?.length) {
    document.body.innerHTML =
      '<main class="empty-state"><h1>Checklist data unavailable.</h1></main>';
    return;
  }

  const BRIDGE_URL =
    "https://script.google.com/a/macros/staratlas.com/s/AKfycbxESbHQyXuAEHgxNRhTeGRw6MWKy10XFHRG2jYwH6Dafa8k5M-4AIG305-A0o4v0VXq/exec";
  const BRIDGE_CHANNEL = "c4-readiness-tracker";
  const STATUS_VALUES = [
    "Not started",
    "In progress",
    "Blocked",
    "Needs decision",
    "Verify",
    "Waived",
    "Done",
  ];
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${data.sheet.id}/edit?usp=sharing`;

  const state = {
    query: "",
    priority: "ALL",
    status: "ALL",
    section: null,
    density: localStorage.getItem("c4-density") || "comfortable",
    tracker: new Map(),
    token: "",
    editor: "",
    connection: "loading",
    activeGate: null,
    saving: false,
    lastSync: 0,
    returnFocus: null,
  };

  const pendingBridgeRequests = new Map();
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const groupsEl = $("#checklist-groups");
  const emptyEl = $("#empty-state");
  const boardEl = $(".board");
  const contextEl = $("#active-context");
  const contextLabelEl = $("#active-context-label");
  const drawerEl = $("#gate-drawer");
  const backdropEl = $("#drawer-backdrop");
  const gateForm = $("#gate-form");
  const gateFields = $("#gate-fields");
  const saveButton = $("#save-gate");
  const toast = $("#toast");

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function safeUrl(value) {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
    } catch {
      return "#";
    }
  }

  function slug(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function statusClass(value) {
    return `status-${slug(value || "not-started")}`;
  }

  function sheetViewUrl(row = null) {
    const range = row ? `&range=A${row}:K${row}` : "";
    return (
      `https://docs.google.com/spreadsheets/d/${data.sheet.id}/edit` +
      `#gid=${data.sheet.checklistGid}${range}`
    );
  }

  function showToast(message, kind = "success") {
    toast.textContent = message;
    toast.dataset.kind = kind;
    toast.classList.add("visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(
      () => toast.classList.remove("visible"),
      2600,
    );
  }

  function liveFor(item) {
    return (
      state.tracker.get(item.id) || {
        row: item.sheetRow,
        id: item.id,
        area: item.section,
        priority: item.priority,
        title: item.title,
        detail: item.detail,
        status: "Not started",
        owner: "",
        targetDate: "",
        evidence: "",
        notes: "",
        lastUpdated: "",
      }
    );
  }

  function itemForId(id) {
    return data.items.find((item) => item.id === id) || null;
  }

  function formatDate(value) {
    if (!value) return "No target";
    const parsed = new Date(`${value}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) return value;
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(parsed);
  }

  function formatLastUpdated(value) {
    if (!value) return "Not yet updated";
    const parsed = new Date(value.replace(" ", "T"));
    if (Number.isNaN(parsed.getTime())) return `Updated ${value}`;
    return `Updated ${new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(parsed)}`;
  }

  const sections = [...new Set(data.items.map((item) => item.section))];
  const counts = Object.fromEntries(
    sections.map((section) => [
      section,
      data.items.filter((item) => item.section === section).length,
    ]),
  );

  function renderMetrics() {
    const liveItems = data.items.map((item) => ({
      item,
      live: liveFor(item),
    }));
    $("#metric-total").textContent = data.items.length;
    $("#metric-p0").textContent = liveItems.filter(
      ({ item, live }) => item.priority === "P0" && live.status !== "Done",
    ).length;
    $("#metric-progress").textContent = liveItems.filter(
      ({ live }) => live.status === "In progress",
    ).length;
    $("#metric-done").textContent = liveItems.filter(
      ({ live }) => live.status === "Done",
    ).length;
  }

  function renderSectionNav() {
    $("#section-nav").innerHTML = sections
      .map(
        (section) => `
          <button
            class="section-nav-button${state.section === section ? " active" : ""}"
            data-section="${escapeHtml(section)}"
            title="${escapeHtml(section)}"
          >
            <span>${escapeHtml(section)}</span>
            <span>${counts[section]}</span>
          </button>
        `,
      )
      .join("");

    $$(".section-nav-button").forEach((button) => {
      button.addEventListener("click", () => {
        const section = button.dataset.section;
        state.section = state.section === section ? null : section;
        render();
        if (window.innerWidth < 761) {
          $("#checklist").scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  function filteredItems() {
    const query = state.query.trim().toLowerCase();
    return data.items.filter((item) => {
      const live = liveFor(item);
      if (state.priority !== "ALL" && item.priority !== state.priority) {
        return false;
      }
      if (state.status !== "ALL" && live.status !== state.status) return false;
      if (state.section && item.section !== state.section) return false;
      if (!query) return true;
      const haystack = [
        item.id,
        item.section,
        item.priority,
        item.title,
        item.detail,
        live.status,
        live.owner,
        live.targetDate,
        live.evidence,
        live.notes,
        ...item.links.map((link) => `${link.label} ${link.url}`),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }

  function gateMarkup(item) {
    const live = liveFor(item);
    const links = item.links
      .map(
        (link) => `
          <a
            class="source-link"
            href="${escapeHtml(safeUrl(link.url))}"
            target="_blank"
            rel="noreferrer"
          >${escapeHtml(link.label)} ↗</a>
        `,
      )
      .join("");
    const owner = live.owner || "Unassigned";

    return `
      <article
        class="gate"
        id="${escapeHtml(item.id)}"
        data-gate-id="${escapeHtml(item.id)}"
        role="button"
        tabindex="0"
        aria-label="Open ${escapeHtml(item.title)}"
      >
        <span class="gate-index">${String(item.ordinal).padStart(3, "0")}</span>
        <div class="gate-body">
          <div class="gate-meta">
            <span class="priority priority-${item.priority.toLowerCase()}">${escapeHtml(item.priority)}</span>
            <span class="gate-id">${escapeHtml(item.id)}</span>
            <span class="status-pill ${statusClass(live.status)}">${escapeHtml(live.status)}</span>
          </div>
          <h4 class="gate-title">${escapeHtml(item.title)}</h4>
          ${item.detail ? `<p class="gate-detail">${escapeHtml(item.detail)}</p>` : ""}
          <div class="gate-live-meta">
            <span class="${live.owner ? "has-value" : ""}">${escapeHtml(owner)}</span>
            <span class="${live.targetDate ? "has-value" : ""}">${escapeHtml(formatDate(live.targetDate))}</span>
          </div>
          ${links ? `<div class="gate-links">${links}</div>` : ""}
        </div>
        <button
          class="edit-row"
          type="button"
          data-open-gate="${escapeHtml(item.id)}"
          title="Open this readiness gate"
        >
          <span>Open gate</span><span aria-hidden="true">→</span>
        </button>
      </article>
    `;
  }

  function renderChecklist() {
    const filtered = filteredItems();
    const visibleSections = sections.filter((section) =>
      filtered.some((item) => item.section === section),
    );

    groupsEl.innerHTML = visibleSections
      .map((section) => {
        const items = filtered.filter((item) => item.section === section);
        return `
          <section class="checklist-section" id="section-${slug(section)}">
            <div class="group-heading">
              <h3>${escapeHtml(section)}</h3>
              <span>${items.length} ${items.length === 1 ? "gate" : "gates"}</span>
            </div>
            <div class="gate-list">${items.map(gateMarkup).join("")}</div>
          </section>
        `;
      })
      .join("");

    groupsEl.hidden = filtered.length === 0;
    emptyEl.hidden = filtered.length !== 0;
    $("#result-summary").textContent =
      filtered.length === data.items.length
        ? `${filtered.length} gates across ${sections.length} system areas`
        : `${filtered.length} of ${data.items.length} gates shown`;

    if (state.section) {
      contextEl.hidden = false;
      contextLabelEl.textContent = state.section;
    } else {
      contextEl.hidden = true;
    }
  }

  function renderControls() {
    $$("#priority-filter button").forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.priority === state.priority,
      );
    });
    $$(".view-toggle button").forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.density === state.density,
      );
    });
    $("#status-filter").value = state.status;
    boardEl.classList.toggle("compact", state.density === "compact");
  }

  function render() {
    renderMetrics();
    renderSectionNav();
    renderChecklist();
    renderControls();
  }

  function resetFilters() {
    state.query = "";
    state.priority = "ALL";
    state.status = "ALL";
    state.section = null;
    $("#search-input").value = "";
    render();
  }

  function renderSyncState() {
    const label = $("#sync-state");
    label.classList.remove("is-loading", "is-ready", "is-error");
    const text = label.querySelector("span");
    if (state.saving) {
      label.classList.add("is-loading");
      text.textContent = "Saving to tracker…";
      return;
    }
    if (state.connection === "ready") {
      label.classList.add("is-ready");
      text.textContent = state.editor
        ? `Live · ${state.editor}`
        : "Live tracker";
      return;
    }
    if (state.connection === "error") {
      label.classList.add("is-error");
      text.textContent = "View-only · connect to edit";
      return;
    }
    label.classList.add("is-loading");
    text.textContent = "Connecting tracker…";
  }

  function renderEditorState(message = "") {
    const editorState = $("#editor-state");
    editorState.classList.remove("is-ready", "is-error", "is-saving");
    if (state.saving) {
      editorState.classList.add("is-saving");
      editorState.querySelector("span").textContent =
        "Saving your changes to the live tracker…";
    } else if (state.connection === "ready" && state.token) {
      editorState.classList.add("is-ready");
      editorState.querySelector("span").textContent = state.editor
        ? `Editing live as ${state.editor}`
        : "Connected to the live Star Atlas tracker";
    } else if (state.connection === "error") {
      editorState.classList.add("is-error");
      editorState.querySelector("span").innerHTML =
        `${escapeHtml(message || "Editing is unavailable in this browser session.")} ` +
        `<a href="${escapeHtml(BRIDGE_URL)}" target="_blank" rel="noreferrer">Enable editing ↗</a>`;
    } else {
      editorState.querySelector("span").textContent =
        "Connecting to the live tracker…";
    }

    const canEdit =
      state.connection === "ready" && Boolean(state.token) && !state.saving;
    gateFields.disabled = !canEdit;
    saveButton.disabled = !canEdit;
    saveButton.textContent = state.saving ? "Saving…" : "Save to tracker";
  }

  function renderDrawer() {
    const item = itemForId(state.activeGate);
    if (!item) return;
    const live = liveFor(item);
    $("#drawer-id").textContent = item.id;
    $("#drawer-title").textContent = item.title;
    const priority = $("#drawer-priority");
    priority.textContent = item.priority;
    priority.className = `priority priority-${item.priority.toLowerCase()}`;
    $("#drawer-area").textContent = item.section;
    const status = $("#drawer-current-status");
    status.textContent = live.status;
    status.className = `status-pill ${statusClass(live.status)}`;
    $("#drawer-detail").textContent = item.detail || "No additional detail.";
    $("#drawer-links").innerHTML = item.links
      .map(
        (link) => `
          <a class="source-link" href="${escapeHtml(safeUrl(link.url))}"
             target="_blank" rel="noreferrer">${escapeHtml(link.label)} ↗</a>
        `,
      )
      .join("");
    $("#drawer-links").hidden = item.links.length === 0;

    $("#gate-status").value = STATUS_VALUES.includes(live.status)
      ? live.status
      : "Not started";
    $("#gate-owner").value = live.owner || "";
    $("#gate-target-date").value = live.targetDate || "";
    $("#gate-evidence").value = live.evidence || "";
    $("#gate-notes").value = live.notes || "";
    $("#drawer-last-updated").textContent = formatLastUpdated(
      live.lastUpdated,
    );
    $("#drawer-sheet-link").href = sheetViewUrl(item.sheetRow);
    renderEditorState();
  }

  function openDrawer(id, trigger = document.activeElement) {
    const item = itemForId(id);
    if (!item) return;
    state.activeGate = id;
    state.returnFocus = trigger;
    renderDrawer();
    document.body.classList.add("drawer-open");
    backdropEl.hidden = false;
    drawerEl.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
      backdropEl.classList.add("visible");
      drawerEl.classList.add("open");
      $("#drawer-close").focus();
    });
  }

  function closeDrawer() {
    drawerEl.classList.remove("open");
    backdropEl.classList.remove("visible");
    drawerEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");
    window.setTimeout(() => {
      backdropEl.hidden = true;
    }, 220);
    if (state.returnFocus instanceof HTMLElement) state.returnFocus.focus();
    state.returnFocus = null;
  }

  function requestId(prefix) {
    const value =
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `${prefix}-${value}`;
  }

  function bridgeOriginAllowed(origin) {
    try {
      const url = new URL(origin);
      return (
        url.protocol === "https:" &&
        (url.hostname === "script.googleusercontent.com" ||
          url.hostname.endsWith(".script.googleusercontent.com") ||
          url.hostname.endsWith("-script.googleusercontent.com"))
      );
    } catch {
      return false;
    }
  }

  function trackBridgeRequest(id, type, timeoutMs = 20000) {
    const timer = window.setTimeout(() => {
      pendingBridgeRequests.delete(id);
      if (type === "load") {
        state.connection = "error";
        state.token = "";
        renderSyncState();
        if (state.activeGate) {
          renderEditorState(
            "The tracker did not connect. Sign in with your Star Atlas Google account, then refresh.",
          );
        }
      } else {
        state.saving = false;
        renderSyncState();
        renderEditorState(
          "The save timed out. Refresh before trying again.",
        );
        showToast("Save timed out — no change confirmed", "error");
      }
    }, timeoutMs);
    pendingBridgeRequests.set(id, { type, timer });
  }

  function loadTracker() {
    for (const [id, pending] of pendingBridgeRequests) {
      if (pending.type === "load") {
        clearTimeout(pending.timer);
        pendingBridgeRequests.delete(id);
      }
    }
    state.connection = "loading";
    state.token = "";
    renderSyncState();
    if (state.activeGate) renderEditorState();

    const id = requestId("load");
    trackBridgeRequest(id, "load");
    const url = new URL(BRIDGE_URL);
    url.searchParams.set("requestId", id);
    url.searchParams.set("_", String(Date.now()));
    $("#tracker-bridge").src = url.href;
  }

  function saveTracker(payload) {
    if (!state.token || state.connection !== "ready" || state.saving) return;
    state.saving = true;
    renderSyncState();
    renderEditorState();

    const id = requestId("save");
    trackBridgeRequest(id, "save");
    const form = $("#tracker-bridge-form");
    form.action = BRIDGE_URL;
    form.elements.namedItem("requestId").value = id;
    form.elements.namedItem("token").value = state.token;
    form.elements.namedItem("payload").value = JSON.stringify(payload);
    form.submit();
  }

  window.addEventListener("message", (event) => {
    if (!bridgeOriginAllowed(event.origin)) return;
    const message = event.data;
    if (!message || message.channel !== BRIDGE_CHANNEL) return;
    const pending = pendingBridgeRequests.get(message.requestId);
    if (!pending) return;
    clearTimeout(pending.timer);
    pendingBridgeRequests.delete(message.requestId);

    if (!message.ok) {
      if (pending.type === "load") {
        state.connection = "error";
        state.token = "";
        renderSyncState();
        if (state.activeGate) renderEditorState(message.error);
        return;
      }
      state.saving = false;
      renderSyncState();
      renderEditorState(message.error);
      showToast(message.error || "The tracker rejected this save", "error");
      return;
    }

    if (pending.type === "load") {
      const result = message.result || {};
      state.tracker = new Map(
        (result.items || []).map((item) => [item.id, item]),
      );
      state.token = result.token || "";
      state.editor = result.editor || "";
      state.connection = "ready";
      state.lastSync = Date.now();
      renderSyncState();
      render();
      if (state.activeGate) renderDrawer();
      return;
    }

    state.saving = false;
    if (message.result?.id) {
      state.tracker.set(message.result.id, message.result);
    }
    state.lastSync = Date.now();
    renderSyncState();
    render();
    renderDrawer();
    showToast("Gate saved to the live tracker");
  });

  groupsEl.addEventListener("click", (event) => {
    if (event.target.closest(".source-link")) return;
    const trigger = event.target.closest("[data-gate-id], [data-open-gate]");
    if (!trigger) return;
    const id = trigger.dataset.openGate || trigger.dataset.gateId;
    openDrawer(id, trigger);
  });

  groupsEl.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const gate = event.target.closest(".gate[data-gate-id]");
    if (!gate || event.target.closest("a, button")) return;
    event.preventDefault();
    openDrawer(gate.dataset.gateId, gate);
  });

  gateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const item = itemForId(state.activeGate);
    if (!item) return;
    const live = liveFor(item);
    saveTracker({
      id: item.id,
      status: $("#gate-status").value,
      owner: $("#gate-owner").value,
      targetDate: $("#gate-target-date").value,
      evidence: $("#gate-evidence").value,
      notes: $("#gate-notes").value,
      expectedLastUpdated: live.lastUpdated || "",
    });
  });

  $("#open-sheet-top").href = sheetUrl;
  $("#drawer-close").addEventListener("click", closeDrawer);
  backdropEl.addEventListener("click", closeDrawer);
  $("#refresh-tracker").addEventListener("click", loadTracker);
  $("#refresh-gate").addEventListener("click", loadTracker);

  $("#open-collab").addEventListener("click", () => {
    $("#checklist").scrollIntoView({ behavior: "smooth" });
  });
  $("#preview-sheet").addEventListener("click", () => {
    $("#checklist").scrollIntoView({ behavior: "smooth" });
  });
  $("#jump-checklist").addEventListener("click", () => {
    $("#checklist").scrollIntoView({ behavior: "smooth" });
  });

  $("#search-input").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderChecklist();
  });
  $("#status-filter").addEventListener("change", (event) => {
    state.status = event.target.value;
    render();
  });
  $$("#priority-filter button").forEach((button) => {
    button.addEventListener("click", () => {
      state.priority = button.dataset.priority;
      render();
    });
  });
  $$(".view-toggle button").forEach((button) => {
    button.addEventListener("click", () => {
      state.density = button.dataset.density;
      localStorage.setItem("c4-density", state.density);
      renderControls();
    });
  });

  $("#clear-filters").addEventListener("click", resetFilters);
  $("#clear-context").addEventListener("click", () => {
    state.section = null;
    render();
  });
  $("#empty-reset").addEventListener("click", resetFilters);
  $("#copy-page-link").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Page link copied");
    } catch {
      showToast("Copy failed — use the address bar", "error");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawerEl.classList.contains("open")) {
      closeDrawer();
      return;
    }
    if (
      event.key === "/" &&
      !drawerEl.classList.contains("open") &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(
        document.activeElement?.tagName,
      )
    ) {
      event.preventDefault();
      $("#search-input").focus();
    }
  });

  render();
  renderSyncState();
  loadTracker();
})();
