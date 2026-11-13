# Design Tokens (Style Dictionary v5 & DTCG Standard)

This project uses **Style Dictionary v5** configured according to **W3C Design Tokens Community Group (DTCG)** industry best practices and integrated with **Tailwind CSS v4** and **Next.js**.

---

## 🏗️ 3-Tier Token Architecture

Tokens are organized into three clear abstraction tiers:

```
tokens/
├── 01-primitive/              # Tier 1: Raw foundation scales (un-opinionated values)
│   ├── color.tokens.json      # Base palette (brand, neutral, success, warning, danger)
│   ├── dimension.tokens.json  # Spacing scale, border radiuses, border widths
│   ├── font.tokens.json       # Font families, font sizes, font weights, line heights
│   └── shadow.tokens.json     # Box shadow elevation scales
├── 02-semantic/               # Tier 2: Intent & context (theme-aware aliases)
│   ├── color-light.tokens.json# Default light theme mappings (surfaces, text, borders, actions)
│   ├── color-dark.tokens.json # Dark theme mappings (overriding surfaces, text, borders)
│   └── elevation.tokens.json  # Semantic elevations (card, dropdown, modal)
└── 03-component/              # Tier 3: Component-scoped bindings
    ├── button.tokens.json     # Button variant colors, padding, and radiuses
    ├── card.tokens.json       # Card padding, background, border, and shadow
    └── input.tokens.json      # Input form controls sizing, padding, and states
```

---

## 📐 DTCG Standard Format

All token files adhere to the official W3C Design Tokens specification:
- **`$value`**: The raw value or token alias reference (e.g. `"{color.brand.500}"`).
- **`$type`**: The token data type (`"color"`, `"dimension"`, `"fontFamily"`, `"fontWeight"`, `"shadow"`, etc.).
- **`$description`**: Optional documentation string displayed in JSDoc tooltips and design tools.

```json
{
  "semantic": {
    "interactive": {
      "primary": {
        "$value": "{color.brand.600}",
        "$type": "color",
        "$description": "Primary action background"
      }
    }
  }
}
```

---

## ⚙️ Available Scripts

| Command | Purpose |
| :--- | :--- |
| `pnpm run tokens:build` | Compiles tokens into CSS variables and pure TypeScript definitions. |
| `pnpm run tokens:watch` | Watches the `tokens/` directory and hot-recompiles on change. |
| `pnpm run dev` | Automatically builds tokens (`predev`) before starting Next.js dev server. |
| `pnpm run build` | Automatically builds tokens (`prebuild`) before production Next.js build. |

---

## 🚀 How to Consume Tokens

### 1. In CSS / Tailwind CSS v4
Generated CSS variables are imported in `src/app/globals.css`:
- Root & Light theme: `src/styles/tokens.css`
- Dark theme: `src/styles/tokens-dark.css` (scoped to `[data-theme="dark"]` and `.dark`)

Tailwind classes mapped in `@theme inline`:
```tsx
// Using semantic tokens as Tailwind utility classes
<div className="bg-canvas text-text-primary border border-border-subtle p-6 rounded-xl shadow-sm">
  <button className="bg-primary hover:bg-primary-hover text-primary-contrast px-4 py-2 rounded-md font-medium">
    Action Button
  </button>
</div>
```

### 2. In TypeScript / JavaScript Components
Import strongly typed constants or the nested JSON tree directly from `@/tokens`:
```tsx
import { tokens, ColorBrand500 } from "@/tokens";

console.log(ColorBrand500); // "#3b82f6"
console.log(tokens.space[4]); // "1rem"
console.log(tokens.font.family.sans); // Font stack
```

