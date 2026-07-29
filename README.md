# C4 Mainnet Readiness

Internal launch-control page for the Star Atlas C4 mainnet readiness checklist.

- The Board view is a fast, filterable view of the launch baseline.
- Every gate opens a native dashboard drawer with its full context and live
  status, owner, target date, evidence, and notes.
- Signed-in Star Atlas teammates can save those fields directly to the shared
  Google Sheet without leaving the dashboard.
- Teammates can create new readiness tasks in the same drawer and remove tasks
  through a recoverable archive confirmation. Archived rows stay in the Sheet
  for audit and recovery but no longer render on the board.
- The Sheet-backed Apps Script bridge validates editor sessions, detects stale
  rows before overwriting, serializes create/update/archive operations, and
  keeps an activity log for every actual change.
- The sheet is shared as editor with the `staratlas.com` domain.

## Local workflow

```sh
npm run sync:data
npm run build
npm run check
npm run serve
npm run smoke:ui
```

`sync:data` reads `../docs/c4-mainnet-readiness-checklist.md`.
`sync:sheet` updates the team tracker and requires the authenticated `gog` CLI.
`smoke:ui` runs headless desktop/mobile load, update, create, confirmation, and
archive flows against the local build.

The deployment artifact is `.open-next/`: a minimal Cloudflare-compatible worker
plus static assets, with no runtime package dependencies.

For Sites releases, save a `git archive` produced from the exact pushed commit.
The archive preserves the prebuilt `.open-next/worker.js` entrypoint and avoids
falling back to the generic source builder.
