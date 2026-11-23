<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# DSCA — agent entrypoint

Any AI coding agent working in this repo should start here.

## Required reading (in order)

1. **This file** — Next.js 16 warning above + links below.
2. **[`docs/agent-guide.md`](docs/agent-guide.md)** — project mission, map, non-negotiables, home workflow, coding standards, decision tree.
3. **[`docs/home.md`](docs/home.md)** — home section order, enrol/Turnstile, responsive notes.

## Hard constraints (summary)

- Port home UI from the reference static site; **do not invent** copy, prices, or sections.
- Prefer **CSS Modules** + existing tokens; do not restyle the brand into generic AI themes.
- **Do not commit** unless the user explicitly asks.
- Keep this Next.js rules block intact (`BEGIN`/`END` markers).
- Values/commitments band after enrol was **intentionally removed** — do not re-add unless asked.

## Quick commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

Env names: `.env.example` (Turnstile for `/api/enrol`).
