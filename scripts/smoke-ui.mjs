import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const chrome =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9300 + Math.floor(Math.random() * 500);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "c4-ui-smoke-"));
const screenshot =
  process.env.C4_SMOKE_SCREENSHOT ||
  path.join(os.tmpdir(), "c4-drawer-smoke.png");
const mobileScreenshot = screenshot.replace(/\.png$/i, "-mobile.png");
const browser = spawn(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "--window-size=1440,1100",
    "about:blank",
  ],
  { stdio: "ignore" },
);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForEndpoint() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      // Chrome is still starting.
    }
    await delay(100);
  }
  throw new Error("Chrome debugging endpoint did not start.");
}

function cdp(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  let nextId = 0;
  const pending = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });

  return {
    ready: new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    }),
    call(method, params = {}) {
      const id = ++nextId;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
      });
    },
    close() {
      socket.close();
    },
  };
}

async function main() {
  await waitForEndpoint();
  const target = await fetch(
    `http://127.0.0.1:${port}/json/new?${encodeURIComponent("http://127.0.0.1:4173/?smoke=1")}`,
    { method: "PUT" },
  ).then((response) => response.json());
  const client = cdp(target.webSocketDebuggerUrl);
  await client.ready;
  await client.call("Page.enable");
  await client.call("Runtime.enable");
  await client.call("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1100,
    deviceScaleFactor: 1,
    mobile: false,
  });

  async function evaluate(expression) {
    const response = await client.call("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (response.exceptionDetails) {
      throw new Error(
        response.exceptionDetails.exception?.description ||
          response.exceptionDetails.text,
      );
    }
    return response.result.value;
  }

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if ((await evaluate("document.querySelectorAll('.gate').length")) === 245) {
      break;
    }
    await delay(100);
  }
  assert.equal(
    await evaluate("document.querySelectorAll('.gate').length"),
    245,
    "all readiness gates should render",
  );

  const loadRequestId = await evaluate(
    `new URL(document.querySelector('#tracker-bridge').src).searchParams.get('requestId')`,
  );
  assert.ok(loadRequestId, "bridge load request should be issued");
  await evaluate(`
    window.dispatchEvent(new MessageEvent("message", {
      origin: "https://smoke-script.googleusercontent.com",
      data: {
        channel: "c4-readiness-tracker",
        requestId: ${JSON.stringify(loadRequestId)},
        ok: true,
        result: {
          token: "smoke-token",
          editor: "smoke@staratlas.com",
          items: [{
            row: 2,
            id: "C4-001-923CE8BC",
            area: "Release definition",
            priority: "P0",
            title: "Name the launch candidate precisely",
            detail: "pin commits",
            status: "In progress",
            owner: "Release group",
            targetDate: "2026-08-04",
            evidence: "https://example.com/proof",
            notes: "Browser smoke fixture",
            lastUpdated: "2026-07-28 17:40"
          }]
        }
      }
    }));
  `);
  assert.equal(
    await evaluate(
      `document.querySelector('[data-gate-id="C4-001-923CE8BC"] .status-pill').textContent`,
    ),
    "In progress",
    "live status should hydrate into the card",
  );

  await evaluate(
    `document.querySelector('[data-gate-id="C4-001-923CE8BC"]').click()`,
  );
  await delay(100);
  assert.equal(
    await evaluate("document.querySelector('#gate-drawer').classList.contains('open')"),
    true,
    "clicking a gate should open the editor drawer",
  );
  assert.equal(
    await evaluate("document.querySelector('#gate-fields').disabled"),
    false,
    "connected collaborators should be able to edit",
  );
  assert.equal(
    await evaluate("document.querySelector('#gate-owner').value"),
    "Release group",
    "drawer should expose live tracker values",
  );

  await evaluate(`
    HTMLFormElement.prototype.submit = function () {
      window.__bridgeSubmit = Object.fromEntries(new FormData(this));
    };
    document.querySelector("#gate-owner").value = "Mainnet release group";
    document.querySelector("#gate-form").requestSubmit();
  `);
  const submitted = await evaluate("window.__bridgeSubmit");
  assert.ok(submitted?.requestId, "save should issue a bridge request");
  assert.equal(
    JSON.parse(submitted.payload).owner,
    "Mainnet release group",
    "save should carry edited fields",
  );

  await evaluate(`
    window.dispatchEvent(new MessageEvent("message", {
      origin: "https://smoke-script.googleusercontent.com",
      data: {
        channel: "c4-readiness-tracker",
        requestId: ${JSON.stringify(submitted.requestId)},
        ok: true,
        result: {
          row: 2,
          id: "C4-001-923CE8BC",
          status: "Done",
          owner: "Mainnet release group",
          targetDate: "2026-08-04",
          evidence: "https://example.com/proof",
          notes: "Browser smoke fixture",
          lastUpdated: "2026-07-28 17:45"
        }
      }
    }));
  `);
  assert.equal(
    await evaluate("document.querySelector('#drawer-current-status').textContent"),
    "Done",
    "successful saves should refresh the drawer",
  );
  assert.equal(
    await evaluate(
      `document.querySelector('[data-gate-id="C4-001-923CE8BC"] .status-pill').textContent`,
    ),
    "Done",
    "successful saves should refresh the card",
  );

  const image = await client.call("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  fs.writeFileSync(screenshot, Buffer.from(image.data, "base64"));
  await client.call("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await delay(100);
  assert.equal(
    await evaluate(
      "document.documentElement.scrollWidth <= window.innerWidth && document.querySelector('#gate-drawer').getBoundingClientRect().width === window.innerWidth",
    ),
    true,
    "the editor drawer should fit a mobile viewport",
  );
  const mobileImage = await client.call("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  fs.writeFileSync(
    mobileScreenshot,
    Buffer.from(mobileImage.data, "base64"),
  );
  client.close();
  console.log(
    `browser smoke passed — drawer screenshots → ${screenshot}, ${mobileScreenshot}`,
  );
}

try {
  await main();
} finally {
  browser.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => browser.once("exit", resolve)),
    delay(2000),
  ]);
  fs.rmSync(profile, {
    recursive: true,
    force: true,
    maxRetries: 8,
    retryDelay: 150,
  });
}
