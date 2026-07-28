# C4 Mainnet Readiness

Internal launch-control page for the Star Atlas C4 mainnet readiness checklist.

- The site is a fast, filterable read-only view of the launch baseline.
- The linked Google Sheet is the collaborative source for status, owner, dates,
  evidence, and notes.
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
