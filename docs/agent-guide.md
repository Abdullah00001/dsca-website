# AI agent guide — DSCA website

Industry-oriented operating manual for any coding agent (Cursor, Codex, Claude Code, Copilot, etc.) working in this repository.

Read this **before** changing product UI, home sections, APIs, or tokens. For Next.js APIs specifically, also obey root `AGENTS.md` (Next 16 docs under `node_modules/next/dist/docs/`).

---

## 1. Mission

Build and maintain the **Dhaka Specialty Coffee Academy** marketing site. The home page is a section-by-section port of a reference static site. Prefer fidelity to that reference over inventing layout, copy, or pricing.

**Reference (local):** `dsca-barista-academy/dsca/` (`app.js`, `styles.css`).

---

## 2. Stack (source of truth)

| Layer | Choice |
|-------|--------|
| Framework | Next.js **16.4.x** App Router |
| UI | React **19** + TypeScript (strict) |
| Styling | **CSS Modules** for features/sections; design tokens via Style Dictionary |
| Motion | **GSAP** + ScrollTrigger |
| Validation | **Zod** on API routes |
| Package manager | **pnpm** |
| Path alias | `@/*` → `src/*` |

Do **not** assume classic Pages Router, Pages `_app`, or older Next image/font APIs. Check installed docs first.

---

## 3. Repository map

```
src/
  app/                 # Routes, layouts, route handlers (e.g. api/enrol)
  features/<name>/     # Feature modules (home is the main one)
    components/        # Views + section components
    lib/               # Content + utils
    styles/            # Feature-level CSS modules
  components/          # Shared UI + layout shell
  libs/                # Cross-cutting helpers (seo, page-cta, …)
  styles/              # globals, layout.module.css
  tokens/              # Generated CSS variable consumers (if present)
tokens/                # Style Dictionary source
docs/                  # Human + agent documentation
scripts/               # tokens:build, create:feature
```

Scaffold a new feature with:

```bash
pnpm create:feature <feature-name>
```

---

## 4. Non-negotiable rules

1. **Do not invent marketing copy, course prices, or sections** when porting the home page. Match the reference.
2. **Do not commit** unless the user explicitly asks.
3. **Do not force-push**, amend others’ commits, or skip hooks unless explicitly requested.
4. **Do not put secrets** in the repo. Use `.env` / `.env.example` only for names, never real keys.
5. **Preserve Next’s `AGENTS.md` nextjs block** (`<!-- BEGIN:nextjs-agent-rules -->` …). `next dev` rewrites it.
6. **Scope diffs tightly** — no drive-by refactors, no unrelated files, no unsolicited markdown unless asked (this guide is an exception when requested).
7. **Respect `prefers-reduced-motion`** for GSAP / pin journeys.
8. Shared **`Button` is Link-oriented**. Form submits use `button.module.css` on a native `<button>`.

---

## 5. Home feature workflow

Full section table and env notes: [`docs/home.md`](./home.md).

### When adding or changing a home section

1. Extract copy into `src/features/home/lib/<section>-content.ts`.
2. Implement `src/features/home/components/<section>-section.tsx` + `.module.css`.
3. Wire into `home-view.tsx` in the correct order (see home.md).
4. Export from `components/index.ts` and `lib/index.ts` if other modules need them.
5. Verify in the browser (desktop + mobile). Pin/scrub sections need scroll verification.

### Styling patterns

- Gutters: `layout.g` + `layout.in` from `@/styles/layout.module.css`.
- Dark bands: forest green gradients (match Areas / Courses / Enrol).
- Light bands: `var(--bg)`, `var(--fg)`, `var(--muted)`, `var(--card)`.
- Titles: display font, uppercase; accent in `em` with serif italic.
- Prefer CSS variables already on `:root` (`--gold`, `--ait`, `--gt`, `--forest`, …). Avoid one-off purple/AI-slop themes.

### Motion patterns

- Default entrance: IntersectionObserver + GSAP `fromTo` with `immediateRender: false`.
- Pin/scrub only for journeys that require it (Hero logo flight, Why FLIP/carousel).
- Avoid Lenis unless the project already depends on it (home does not).

### Enrol form

- UI: `#enrol` in `EnrolSection` (custom course listbox + Turnstile).
- API: `POST /api/enrol` — Zod body + Cloudflare Turnstile `siteverify`.
- Env: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` (test keys if unset).

---

## 6. Coding standards

### TypeScript / React

- Prefer explicit types at module boundaries; avoid `any`.
- Client sections that use hooks/GSAP: `"use client"`.
- Follow existing `"use no memo"` only where already used for React Compiler edge cases — don’t sprinkle it randomly.
- Don’t add `useMemo` / `useCallback` by default; this project uses React Compiler.

### CSS Modules

- One module per component file.
- Class names: camelCase in TS (`styles.title`), matching `.title` in CSS.
- No `composes` across unrelated modules if it fights CSS Modules / CSP — follow neighbors.

### APIs

- App Router `route.ts` handlers.
- Validate with Zod; return JSON errors with sensible status codes.
- Never log secrets or Turnstile tokens.

### Imports

- Use `@/` alias.
- Feature-internal imports may use `@/features/home/...`.
- Keep public barrels (`index.ts`) updated when exporting new symbols.

---

## 7. Commands agents should run

```bash
pnpm install
pnpm dev          # also runs tokens:build via predev
pnpm lint
pnpm build
pnpm tokens:build
```

After substantive UI work: check the running app in the browser (and mobile width when the change is responsive).

---

## 8. Decision tree (quick)

| Task | Do this |
|------|---------|
| New home section | Content file → section component/CSS → `home-view` → exports → browser check |
| Copy change | Edit `*-content.ts` only when possible |
| Visual/spacing tweak | Prefer CSS module; match reference screenshots |
| New feature area | `pnpm create:feature …` then fill in |
| Next.js API uncertainty | Read `node_modules/next/dist/docs/` |
| Captcha / enrol | Turnstile only unless user asks otherwise; keep `/api/enrol` verify |
| Values / commitments band | Do **not** re-add unless user asks (explicitly removed) |

---

## 9. What “done” looks like

- Matches reference (or user’s screenshot) for the touched section.
- No invented content or prices.
- Lint clean on touched files.
- Motion respects reduced-motion.
- Docs updated only when the user asks or when the change alters agent-facing contracts (env, section order, APIs).

---

## 10. Related docs

| Doc | Purpose |
|-----|---------|
| [`AGENTS.md`](../AGENTS.md) | Entry point + Next.js version warning |
| [`docs/home.md`](./home.md) | Home section inventory + enrol/Turnstile |
| [`README.md`](../README.md) | Human setup |
| [`tokens/README.md`](../tokens/README.md) | Design token pipeline |
| `.env.example` | Env var names |
