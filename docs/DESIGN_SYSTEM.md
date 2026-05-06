# Kodara white-label — design system

This document describes the design tokens and patterns implemented in this repository. The **canonical source** for app styling is [`src/index.css`](../src/index.css). A separate legacy stylesheet, [`styles.css`](../styles.css), defines an older parallel token set (`--font-family`, `--radius-8`, etc.) used by static markup in that file; prefer the `index.css` variables for new React work.

---

## Stack

- **CSS variables** on `:root` and `[data-theme="dark"]`
- **Tailwind CSS v4** via `@import "tailwindcss"` and `@theme` in `index.css`
- **Instrument Sans** as the primary typeface (also set on `html, body, #root` and forced on form controls)

---

## Theming

- Theme is applied by setting **`data-theme="light"`** or **`data-theme="dark"`** on the document root (`<html>`).
- Implemented in [`src/lib/ThemeContext.tsx`](../src/lib/ThemeContext.tsx): `ThemeProvider` syncs theme to `document.documentElement` and `localStorage` key `kodara-theme`.
- **Semantic tokens** (`--surface-*`, `--text-*`, `--border-*`, etc.) are the best choice for layout chrome that must read correctly in both modes.
- **`--alpha-light-*` scale** is remapped in dark mode to white-based alphas so the **same variable names** stay valid for borders, muted text, and icons on dark backgrounds. Use these for UI that should stay consistent with the Figma “alpha/light” naming.

---

## Typography

| Token | Value (light) | Use |
|-------|-----------------|-----|
| `--font-primary` | `'Instrument Sans', sans-serif` | All UI text |
| `--weight-regular` | `400` | Body |
| `--weight-medium` | `500` | Labels, emphasis |
| `--body-3-size` | `14px` | Primary body |
| `--body-3-line` | `20px` | Body line height |
| `--body-3-spacing` | `-0.15px` | Body letter-spacing |
| `--body-4-size` | `12px` | Secondary / captions |
| `--body-4-line` | `16px` | Secondary line height |
| `--heading-h4-size` | `32px` | Large headings (where used) |
| `--heading-h4-line` | `40px` | |
| `--heading-h1-spacing` | `-0.5px` | Heading tracking |

**Tailwind:** `@theme` sets `--font-sans` to Instrument Sans for utility classes that use the sans stack.

**Patterns in code**

- Prefer `fontFamily: 'var(--font-primary)'` with `fontSize` / `lineHeight` / `letterSpacing` from the body tokens above.
- Use `className="font-medium"` where Tailwind weight is enough.

---

## Border radius

| Token | Value |
|-------|--------|
| `--radius-full` | `999px` (pills, circular controls) |

**Common pixel radii in components** (not all are tokenized): `6px`, `8px`, `12px`, `16px`, `24px` (e.g. chat shell, inputs).

Legacy file `styles.css` also defines `--radius-8`, `--radius-16`, `--radius-24` for non-React layouts.

---

## Color — base & brand

Defined in `:root`; some values change in dark mode.

| Token | Role |
|-------|------|
| `--color-white` | Semantic “white” surface (maps to dark gray in dark theme) |
| `--color-neutral-50`, `--color-neutral-600` | Neutrals |
| `--color-pelorous-50`, `--color-pelorous-600` | Brand cyan (accents, links, roadmap nodes) |
| `--alpha-pelorous-50`, `--alpha-pelorous-200` | Transparent cyan washes |
| `--color-skill-green` | `#2E8B57` — agentic / skill UI |
| `--alpha-brand-50`, `--alpha-brand-950` | Brand green wash + strong green text (e.g. “Leanne AI” chip) |

---

## Color — alpha scales

**Light mode (`:root`):** `--alpha-light-*` are tints of **#1a1a1a** (foreground on light backgrounds). Steps: `25`, `50`, `100`, `200`, `300`, `400`, `600`, `900`.

**`--alpha-dark-*`** are tints of **#ffffff** (fills and glassy surfaces on dark content): `100`, `300`, `600`, `800`, `900`.

**Dark mode (`[data-theme="dark"]`):** `--alpha-light-*` is **redefined** to white-based alphas so borders, secondary text, and icons remain legible. `--alpha-dark-*` is adjusted for dark surfaces.

**Usage guidance**

- **Text:** `--alpha-light-900` (strong), `--alpha-light-600` (body secondary), `--alpha-light-400` / `--alpha-light-200` (muted, disabled).
- **Borders / dividers:** `--alpha-light-50`, `100`, `200`.
- **Glass / cards:** `--alpha-dark-300`, `--alpha-dark-600`, `--alpha-dark-800` as appropriate.

---

## Semantic surfaces & text (prefer for chrome)

| Token | Light (typical) | Dark (typical) |
|-------|------------------|----------------|
| `--surface-primary` | `#ffffff` | `#161616` |
| `--surface-secondary` | `#fafafa` | `#1e1e1e` |
| `--surface-elevated` | Translucent white | Translucent dark |
| `--surface-overlay` | Modal scrim | Darker scrim |
| `--surface-inset` | Subtle inset well | Light-tint inset |
| `--surface-sidebar` | Cyan-tint sidebar | Adjusted cyan tint |
| `--text-primary` | Near-black | Near-white |
| `--text-heading` | | |
| `--text-body` | | |
| `--text-muted` | | |
| `--border-default` | | |
| `--border-subtle` | | |
| `--border-strong` | | |

Supporting tokens include `--gradient-fade`, `--btn-gradient`, `--btn-text-color`, connector/modal toggles, `--icon-filter` (dark), etc. See `index.css` for the full list.

---

## Icons

- Shared components live in [`src/components/Icons.tsx`](../src/components/Icons.tsx).
- Default stroke color in many icons is a **hardcoded** `rgba(26,26,26,0.6)` (Figma alpha/light/600). That does **not** follow dark mode.
- **Rule:** pass explicit colors for theme-safe icons, e.g. `color="var(--alpha-light-600)"`, `var(--alpha-light-900)`, or disabled `var(--alpha-light-200)`.

---

## Layout & content width

- Chat and home content often use **max width `704px`** for the main column.
- User message bubbles cap around **`480px`**.
- Shell uses **rounded outer container** (e.g. `rounded-3xl`) in the main app layout.

---

## Tailwind usage

- Use utilities for **flex, gap, sizing, overflow, responsive behavior**.
- Prefer **CSS variables** for colors and typography in inline `style` when matching Figma tokens exactly (this codebase mixes both).
- Reusable interaction states are often in **`index.css`** (e.g. `.chat-input`, `.send-btn`, `.suggestion-card`).

---

## Key component classes (`src/index.css`)

| Class | Purpose |
|-------|---------|
| `.chat-input` | Composer: border, shadow, hover/focus/disabled |
| `.send-btn` / `.send-btn-gradient` | Send control with gradient and inset shadow |
| `.suggestion-card` | Home suggestion tiles |
| `.plus-dropdown` / `.plus-dropdown-item` | Attach menu and items |
| `.connector-card` | Connector grid cards |
| `.connector-modal-overlay` / `.connector-modal` | Connector modal |
| `.settings-modal-overlay` / `.settings-modal` | Settings modal |
| `.sidebar-root` / `.sidebar-inner` / `.sidebar-nav-item` | Sidebar layout and nav |
| `.smooth-scroll` | Scroll area + thin scrollbar |
| `.scroll-to-bottom-btn` | Chat scroll affordance |
| `.chat-bubble-enter`, `.chat-card-enter` | Message/card entrance |
| `.typing-cursor`, `.typing-indicator` | Streaming states |
| `.thinking-*`, `.chat-divider` | Agentic steps and separators |
| `.skeleton-bar`, `.table-row-enter` | Loading tables |
| `.roadmap-stage-enter`, `.roadmap-line-draw` | Roadmap blocks |
| `.scorecard-row-hover` | Scorecard rows |
| `.audio-volume-slider`, `.waveform-bar`, `.audio-player-enter` | Voice player |
| `.account-input`, `.account-submit-btn` | Account creation flow |

---

## Motion & easing

Common curves:

- **`cubic-bezier(0.16, 1, 0.3, 1)`** — entrances (dropdowns, modals, bubbles)
- **`cubic-bezier(0.25, 0.1, 0.25, 1)`** — send button, sidebar width
- **150–300ms** for hovers and small UI; **400–600ms** for larger reveals

**Accessibility:** `prefers-reduced-motion: reduce` trims thinking-step shimmer animations (see `.thinking-shimmer-text` rules).

---

## Shadows

Chat input and several controls use **layered soft shadows** (multiple `0px … rgba(0,0,0,…)` stops) defined in `index.css`. Dropdowns use a **stacked shadow** string for depth. Prefer copying existing shadow blocks when adding similar surfaces.

---

## Implementation checklist (new UI)

1. Use **`var(--font-primary)`** and body/heading tokens for type.
2. Use **`var(--surface-*)`** and **`var(--text-*)`** for page-level chrome; use **`var(--alpha-light-*)`** for borders and secondary text on components.
3. **Icons:** always pass **`color={`var(--alpha-light-600)`}`** (or another token), not the default hardcoded stroke.
4. Confirm both **`data-theme="light"`** and **`data-theme="dark"`** (contrast targets for dark theme are documented in comments above `[data-theme="dark"]` in `index.css`).
5. Add durable styles to **`index.css`** if multiple elements share the same states (hover/focus/disabled).

---

## File reference

| File | Role |
|------|------|
| [`src/index.css`](../src/index.css) | Tokens, dark overrides, component classes, animations |
| [`src/lib/ThemeContext.tsx`](../src/lib/ThemeContext.tsx) | Theme state and `data-theme` on `<html>` |
| [`src/components/Icons.tsx`](../src/components/Icons.tsx) | Icon components; pass theme-aware `color` |
| [`styles.css`](../styles.css) | Legacy standalone layout tokens (parallel naming) |

---

*Generated from the codebase; when tokens change in `index.css`, update this document or regenerate the relevant sections.*
