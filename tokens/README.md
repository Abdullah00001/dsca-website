# DSCA Barista Academy Design Tokens (Style Dictionary v5 & DTCG)

Design system and tokens for **Dhaka Specialty Coffee Academy (DSCA)**, structured following **W3C Design Tokens Community Group (DTCG)** standards and integrated with **Tailwind CSS v4** & **Next.js**.

---

## 🎨 DSCA Signature Design System

### 1. Color Foundations
* **Forest Greens:**
  * Main Brand: `#087548` (`--forest` / `bg-forest`)
  * Emerald: `#0a7a4b` (`--green` / `--gt`)
  * Ink Espresso: `#073b2b` (`--ink` / `text-ink`)
  * Mint Pill/Badge: `#c9efd9` (`--mint` / `bg-mint`)
* **Signature Accents:**
  * Warm Amber Gold: `#f2b84a` (`--gold` / `bg-gold` / signature button CTA)
  * Terracotta Coral: `#ef8a68` (`--coral` / punctuation)
  * Italic Text Accent: `#a23f16` (`--ait` light) / `#ffd666` (`--ait` dark)
  * Highlight Yellow: `#ffe08a` (`--highlight` text on dark bands)
* **Canvases:**
  * Light Mode: `#f3f9ee` (soft matcha/cream)
  * Dark Mode: `#0a1f16` (deep dark forest)
  * Dark Mode Card: `#123423`

### 2. Typography
* **Display (`--font-display`):** `Bricolage Grotesque` (800 weight, uppercase, line-height `0.82`–`0.9`, negative letter-spacing).
* **Serif Accent (`--font-serif`):** `Instrument Serif` (italic, editorial callout words via `.font-serif-italic`).
* **Body (`--font-body`):** `Figtree` (clean, highly legible UI and editorial body text).

### 3. Radiuses & Elevations
* **Pill:** `99px` (buttons, chips, tags, pills).
* **Cards:** `32px` with shadow `0 24px 50px -30px rgba(6, 37, 26, 0.5)`.
* **Gold Glow:** `0 18px 36px -14px rgba(242, 184, 74, 0.6)` on primary CTA buttons.

---

## 🏗️ 3-Tier DTCG Architecture

```
tokens/
├── 01-primitive/              # Raw foundation scales
│   ├── color.tokens.json      # Forest, Gold, Coral, Neutral, and Coffee palettes
│   ├── dimension.tokens.json  # Spacing, border radiuses, border widths
│   ├── font.tokens.json       # Bricolage Grotesque, Instrument Serif, Figtree
│   └── shadow.tokens.json     # Card, button glow, video, and focus shadows
├── 02-semantic/               # Theme-aware semantic bindings
│   ├── color-light.tokens.json# Default light theme mappings
│   ├── color-dark.tokens.json # Dark theme mappings (:root[data-theme="dark"], .dark)
│   └── elevation.tokens.json  # Contextual elevations
└── 03-component/              # Component-specific bindings
    ├── button.tokens.json     # Primary, dark, line, and ghost button tokens
    ├── card.tokens.json       # Card container tokens
    ├── badge.tokens.json      # Tag, chip, and eyebrow badge tokens
    └── input.tokens.json      # Form control tokens
```

---

## ⚙️ Commands

* `pnpm run tokens:build`: Recompiles all tokens to CSS variables and `src/tokens/index.ts`.
* `pnpm run tokens:watch`: Recompiles tokens on the fly during development.
* `pnpm run dev`: Automatically builds tokens before starting Next.js.
