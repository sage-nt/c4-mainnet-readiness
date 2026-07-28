# C4 Mainnet Readiness

Internal launch-control page for the Star Atlas C4 mainnet readiness checklist.

- The Board view is a fast, filterable view of the launch baseline.
- The Live Tracker view embeds the shared Google Sheet, so signed-in Star Atlas
  teammates can update status, owner, dates, evidence, and notes without leaving
  the page.
- Every gate's **Update live** control opens its exact tracker row.
- The sheet is shared as editor with the `staratlas.com` domain.

## Local workflow

```sh
npm run sync:data
npm run build
npm run check
npm run serve
```

`sync:data` reads `../docs/c4-mainnet-readiness-checklist.md`.
`sync:sheet` updates the team tracker and requires the authenticated `gog` CLI.

The deployment artifact is `.open-next/`: a minimal Cloudflare-compatible worker
plus static assets, with no runtime package dependencies.
