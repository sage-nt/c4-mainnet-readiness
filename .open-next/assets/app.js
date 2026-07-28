(() => {
  "use strict";

  const data = window.C4_CHECKLIST;
  if (!data?.items?.length) {
    document.body.innerHTML =
      '<main class="empty-state"><h1>Checklist data unavailable.</h1></main>';
    return;
  }

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${data.sheet.id}/edit?usp=sharing`;
  const sheetTabs = {
    checklist: data.sheet.checklistGid,
    dashboard: data.sheet.dashboardGid,
    guide: data.sheet.guideGid,
  };

  const state = {
    query: "",
    priority: "ALL",
    section: null,
    density: localStorage.getItem("c4-density") || "comfortable",
    surface: window.location.hash === "#tracker" ? "tracker" : "board",
    trackerTab: "checklist",
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const groupsEl = $("#checklist-groups");
  const emptyEl = $("#empty-state");
  const boardEl = $(".board");
  const contextEl = $("#active-context");
  const contextLabelEl = $("#active-context-label");
  const boardView = $("#board-view");
  const trackerView = $("#tracker-view");
  const trackerFrameShell = $("#tracker-frame-shell");
  const trackerLoading = $("#tracker-loading");
  const sheetFrame = $("#sheet-frame");
  const toast = $("#toast");

  function escapeHtml(value) {
    return String(value)
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
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function sheetViewUrl(tab = "checklist", row = null) {
    const gid = sheetTabs[tab] ?? sheetTabs.checklist;
    const range = row ? `&range=A${row}:K${row}` : "";
    return (
      `https://docs.google.com/spreadsheets/d/${data.sheet.id}/edit` +
      `#gid=${gid}${range}`
    );
  }

  function sheetEmbedUrl(tab = "checklist", row = null) {
    const gid = sheetTabs[tab] ?? sheetTabs.checklist;
    const range = row ? `&range=A${row}:K${row}` : "";
    return (
      `https://docs.google.com/spreadsheets/d/${data.sheet.id}/edit` +
      `?rm=minimal&single=true&gid=${gid}&widget=true&headers=false&embedded=true` +
      `#gid=${gid}${range}`
    );
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(
      () => toast.classList.remove("visible"),
      2200,
    );
  }

  const sections = [...new Set(data.items.map((item) => item.section))];
  const counts = Object.fromEntries(
    sections.map((section) => [
      section,
      data.items.filter((item) => item.section === section).length,
    ]),
  );

  function renderMetrics() {
    $("#metric-total").textContent = data.items.length;
    $("#metric-p0").textContent = data.items.filter(
      (item) => item.priority === "P0",
    ).length;
    $("#metric-decisions").textContent = data.items.filter(
      (item) => item.priority === "DECISION",
    ).length;
    $("#metric-sections").textContent = sections.length;
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
      if (state.priority !== "ALL" && item.priority !== state.priority) {
        return false;
      }
      if (state.section && item.section !== state.section) return false;
      if (!query) return true;
      const haystack = [
        item.id,
        item.section,
        item.priority,
        item.title,
        item.detail,
        ...item.links.map((link) => `${link.label} ${link.url}`),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }

  function gateMarkup(item) {
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

    return `
      <article class="gate" id="${escapeHtml(item.id)}">
        <span class="gate-index">${String(item.ordinal).padStart(3, "0")}</span>
        <div class="gate-body">
          <div class="gate-meta">
            <span class="priority priority-${item.priority.toLowerCase()}">${escapeHtml(item.priority)}</span>
            <span class="gate-id">${escapeHtml(item.id)}</span>
          </div>
          <h4 class="gate-title">${escapeHtml(item.title)}</h4>
          ${item.detail ? `<p class="gate-detail">${escapeHtml(item.detail)}</p>` : ""}
          ${links ? `<div class="gate-links">${links}</div>` : ""}
        </div>
        <a
          class="edit-row"
          href="#tracker"
          data-sheet-row="${item.sheetRow}"
          data-gate-id="${escapeHtml(item.id)}"
          title="Edit this gate in the collaborative tracker"
        >
          <span>Update live</span><span aria-hidden="true">→</span>
        </a>
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

    $$(".edit-row").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openTracker(Number(link.dataset.sheetRow));
      });
    });
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
    boardEl.classList.toggle("compact", state.density === "compact");
  }

  function render() {
    renderSectionNav();
    renderChecklist();
    renderControls();
  }

  function resetFilters() {
    state.query = "";
    state.priority = "ALL";
    state.section = null;
    $("#search-input").value = "";
    render();
  }

  function renderTrackerTabs() {
    $$("[data-sheet-tab]").forEach((button) => {
      const active = button.dataset.sheetTab === state.trackerTab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
  }

  function loadTracker(tab = state.trackerTab, row = null) {
    state.trackerTab = sheetTabs[tab] ? tab : "checklist";
    const nextUrl = sheetEmbedUrl(state.trackerTab, row);
    $("#open-sheet-external").href = sheetViewUrl(state.trackerTab, row);
    renderTrackerTabs();

    if (sheetFrame.dataset.currentUrl !== nextUrl) {
      trackerFrameShell.classList.remove("loaded");
      trackerLoading.hidden = false;
      sheetFrame.dataset.currentUrl = nextUrl;
      sheetFrame.src = nextUrl;
    }
  }

  function updateSurfaceControls() {
    $$("[data-surface]").forEach((button) => {
      const active = button.dataset.surface === state.surface;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
  }

  function setSurface(
    surface,
    { row = null, updateUrl = true, scroll = true } = {},
  ) {
    state.surface = surface === "tracker" ? "tracker" : "board";
    boardView.hidden = state.surface !== "board";
    trackerView.hidden = state.surface !== "tracker";
    document.body.classList.toggle(
      "tracker-active",
      state.surface === "tracker",
    );
    updateSurfaceControls();

    if (state.surface === "tracker") {
      loadTracker(row ? "checklist" : state.trackerTab, row);
    }

    if (updateUrl) {
      const next =
        state.surface === "tracker"
          ? `${window.location.pathname}${window.location.search}#tracker`
          : `${window.location.pathname}${window.location.search}`;
      if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== next) {
        window.history.pushState({ surface: state.surface }, "", next);
      }
    }
    if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openTracker(row = null) {
    setSurface("tracker", { row });
  }

  renderMetrics();
  render();

  $("#open-sheet-external").href = sheetUrl;
  setSurface(state.surface, { updateUrl: false, scroll: false });

  $("#open-collab").addEventListener("click", () => openTracker());
  $("#preview-sheet").addEventListener("click", () => openTracker());
  $("#show-tracker-top").addEventListener("click", () => openTracker());
  $("#show-board-top").addEventListener("click", () => setSurface("board"));
  $("#back-to-board").addEventListener("click", () => setSurface("board"));

  $$("#tracker-view [data-sheet-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      loadTracker(button.dataset.sheetTab);
    });
  });

  sheetFrame.addEventListener("load", () => {
    trackerFrameShell.classList.add("loaded");
    window.setTimeout(() => {
      trackerLoading.hidden = true;
    }, 220);
  });

  window.addEventListener("popstate", () => {
    const surface = window.location.hash === "#tracker" ? "tracker" : "board";
    setSurface(surface, { updateUrl: false, scroll: false });
  });

  $("#jump-checklist").addEventListener("click", () => {
    $("#checklist").scrollIntoView({ behavior: "smooth" });
  });

  $("#search-input").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderChecklist();
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
      showToast("Copy failed — use the address bar");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "/" &&
      state.surface === "board" &&
      !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
    ) {
      event.preventDefault();
      $("#search-input").focus();
    }
  });
})();
