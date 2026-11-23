# DSCA website

Next.js site for **Dhaka Specialty Coffee Academy** — ISO-certified barista training in Farmgate, Dhaka.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- CSS Modules · GSAP · Style Dictionary tokens
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm lint
pnpm build
pnpm tokens:build   # design tokens (also runs on predev / prebuild)
```

## Env

Copy `.env.example` → `.env` when you need production captcha keys:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (enrol form) |
| `TURNSTILE_SECRET_KEY` | Turnstile server verify secret |

Unset locally → Cloudflare always-pass test keys are used.

## Docs

- **[AI agent guide](docs/agent-guide.md)** — how any coding agent should work in this repo (also linked from `AGENTS.md`)
- **[Home page](docs/home.md)** — section order, enrol + Turnstile, hero/Why responsive notes, conventions
- **[AGENTS.md](AGENTS.md)** — agent entrypoint + Next.js 16 warning (keep the generated block intact)

## Project layout

```
src/
  app/                 # App Router routes + api/enrol
  features/home/       # Home landing feature
  components/          # Shared UI (button, page-cta, …)
  styles/              # Shared layout / globals
tokens/                # Style Dictionary source
```

## Agents

This repo uses a Next.js version with breaking changes vs older docs. Read `AGENTS.md` and `node_modules/next/dist/docs/` before changing framework APIs.
