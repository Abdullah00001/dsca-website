# Home page

DSCA marketing home — ported section-by-section from the reference static site (`dsca-barista-academy`). Composition lives in `src/features/home/`.

Agents: start at [`AGENTS.md`](../AGENTS.md) and [`docs/agent-guide.md`](./agent-guide.md).

## Stack

- Next.js 16 App Router + React 19
- CSS Modules (no Tailwind in section UI)
- GSAP + ScrollTrigger for entrance / pin journeys
- Design tokens via Style Dictionary (`pnpm tokens:build`)

## Section order

Wired in `src/features/home/components/home-view.tsx`:

| # | Section | Component | Content |
|---|---------|-----------|---------|
| 1 | Hero | `HeroSection` | `hero-content.ts` |
| 2 | Marquee | `HomeMarquee` | `marquee-content.ts` |
| 3 | ISO | `IsoSection` | `iso-content.ts` |
| 4 | Onboard | `OnboardSection` | `onboard-content.ts` |
| 5 | Courses | `CoursesSection` | `courses-content.ts` |
| 6 | Trainers | `TrainersSection` | `trainers-content.ts` |
| 7 | Why DSCA | `WhySection` | `why-content.ts` |
| 8 | Trust | `TrustSection` | `trust-content.ts` |
| 9 | Reviews | `ReviewsSection` | `reviews-content.ts` |
| 10 | Gallery | `GallerySection` | `gallery-content.ts` |
| 11 | Areas | `AreasSection` | `areas-content.ts` |
| 12 | Map | `MapSection` | `map-content.ts` |
| 13 | Video | `VideoSection` | `video-content.ts` |
| 14 | Blog | `BlogSection` | `blog-content.ts` |
| 15 | Enrol | `EnrolSection` | `enrol-content.ts` |
| 16 | Page CTA | `PageCta` | `@/libs/page-cta` |

**Not shipped:** reference “Our Commitments / values” band after enrol — intentionally omitted.

## Conventions

- **Copy** → `src/features/home/lib/*-content.ts` (no invented marketing text; match reference).
- **UI** → `*-section.tsx` + `*-section.module.css`.
- **Exports** → `components/index.ts`, `lib/index.ts`.
- **Layout gutters** → `@/styles/layout.module.css` (`.g` / `.in`).
- **Title accent** → display uppercase + Instrument Serif italic (`em.accent`).
- **Dark bands** → forest green gradients (`#066b44` family); light bands use `--bg` / `--fg` / `--muted`.
- **Motion** → prefer IntersectionObserver + paused GSAP (`immediateRender: false`) for entrances; pin/scrub only where the reference journey requires it (hero logo flight, Why FLIP/carousel). Respect `prefers-reduced-motion`.

---

## Sections (recent work)

### Map (`MapSection`)

- Light section background (`--bg`).
- Lazy Google Maps iframe + visit panel.
- **Get Direction** CTA: content-width pill (not full card width) using shared `Button` styles.

### Video (`VideoSection`)

- Dark band after map.
- 16:9 YouTube Shorts embed (`7Ey5SAtQvNg`): autoplay, mute, loop.
- Title split across lines; accent “Dhaka” on its own line styling.
- IO entrance (not scroll-scrub).

### Blog (`BlogSection`)

- Light band after video.
- Order: eyebrow → title → **All guides** CTA under title → lead → photo cards.
- Stronger GSAP entrance (`fromTo` + shine).

### Enrol (`EnrolSection`) — `#enrol`

Dark forest band + light form card.

**Title (inside card)**

- Line 1: `Enrol in a Barista`
- Line 2: `Course in Dhaka`
- Line 3: dark em-dash + gold italic `Start This Week`

**Form**

- Full name, email, WhatsApp/phone, course, optional note.
- Course picker is a **custom listbox** (not native `<select>`) so open menu matches the card theme.
- Submit button uses `button.module.css` on a real `<button>` (shared `Button` is Link-only).

**Captcha — Cloudflare Turnstile**

- Client: explicit render via Turnstile script; site key from `NEXT_PUBLIC_TURNSTILE_SITE_KEY` or Cloudflare always-pass test key locally.
- Server: `POST /api/enrol` verifies token with `TURNSTILE_SECRET_KEY` (or test secret), validates body with Zod, returns `{ ok: true }`.

Env (see `.env.example`):

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

---

## Responsive notes

### Hero (`hero-section.module.css`)

Breakpoints: mobile `<768`, tablet `768–1023`, laptop `1024–1279`, desktop `≥1280` (absolute split).

**Mobile / tablet packing**

- Copy row is `auto` (not `1fr`) so the block does not stretch across the full viewport.
- `align-content: center` packs logo → copy → CTAs → location as one group.
- Grid gap ~`1.15rem` between blocks (breathing room without huge empty bands).

**Mobile / tablet scroll**

- Pin + scrub logo flight is **disabled** at `max-width: 1023px` (URL-bar resize was rebuilding pin spacers and yanking scroll up).
- In-slot logo shows; header logo stays docked (`data-hero-logo="docked"`).

### Why (`WhySection`)

Pinned FLIP + center-focus card track (**desktop ≥1024 only**).

**Phone / tablet (`≤1023`)**

- Static final layout (no pin/scrub) so touch scroll is not fought.
- Resize rebuilds only on **width** change (`onHomeViewportWidthChange`) — ignores chrome height flicker.

**Tablet `768–1100` (desktop pin path / static metrics)**

- `.copyFinal` parks top-left (`top: 11vh`, no mid-viewport translate) so text is not vertically stranded.
- Metrics use a smaller focus card and slightly lower center (`cy`).
- Measure pass keeps a real `copyRight` so the focus card is pushed clear of the copy (avoids center-over-text overlap).

---

## File map

```
src/features/home/
  components/
    home-view.tsx          # section composition
    *-section.tsx|css      # one folder pair per band
    index.ts
  lib/
    *-content.ts           # copy + static data
    index.ts
  styles/
    home-view.module.css

src/app/api/enrol/route.ts # Turnstile + Zod enrol endpoint
```

## Local commands

```bash
pnpm install
pnpm dev          # predev builds tokens
pnpm lint
pnpm build
```

Open [http://localhost:3000](http://localhost:3000). Deep links: `#enrol`, `#home-areas`, `#why-headline` (Why uses `aria-labelledby`).

## Reference

Static HTML/CSS/JS: local `dsca-barista-academy/dsca/` (app.js section builders + styles.css tokens `.dkband`, `.chk`, `.it`). Port behavior and copy from there; do not invent sections or pricing.
