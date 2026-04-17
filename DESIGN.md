# DESIGN.md — Camilo Henriquez · Dev Agency

> **Purpose:** This document is the single source of truth for the visual language of this project. Any agent (human or AI) generating UI MUST read this file first and respect its tokens, rules, and guardrails. No arbitrary colors, no arbitrary spacing, no off-scale typography.
>
> **Companion files:** `CLAUDE.md` (engineering rules) · `app/globals.css` / `@theme {}` block (runtime tokens).

---

## 1. Metadata

| Field | Value |
|-------|-------|
| Project | freelancer-page (camilohenriquez.com agency evolution) |
| Version | 1.0.0 |
| Last updated | 2026-04-17 |
| Owner | Camilo Henriquez |
| Stack | Next.js 16.2.4 App Router · React 19 · Tailwind v4 · TypeScript strict |
| Theme modes | Dark (primary) · Light (secondary — same tokens, inverted bindings) |
| Target platforms | Web · Mobile-web |

---

## 2. Brand Identity

### 2.1 Mood & Voice

- **Tone:** Technical, precise, results-oriented. Direct and confident — a team that ships, not an agency that pitches.
- **Inspiration:** Linear's density and precision · Vercel's dark-mode refinement · Raycast's neon-on-dark control panel feel
- **Anti-inspiration:** Generic SaaS purple-to-pink gradients · Agency stock-photo hero shots · Glassmorphism overuse · Rounded-everything bubbly UI · Corporate blue-and-grey

### 2.2 Design Principles

1. **Dark-first, always polished** — The dark theme is the canonical experience; the light theme is a high-contrast variant, not an afterthought.
2. **Neon as precision, not decoration** — Purple/violet accent exists to direct attention to a single interactive layer at a time, never as ambient ambiance.
3. **Systems thinking visible in the UI** — Bento-grid layouts, tight spacing, and monospace details signal that the team thinks in architectures, not pages.
4. **Motion earns attention** — Parallax and entrance animations reward scroll; they never play on repeat or block content.

### 2.3 Visual Anti-Patterns (never do)

- ❌ Arbitrary hex colors outside the palette below
- ❌ Font sizes outside the typography scale
- ❌ Padding/margin outside the 4px spacing scale
- ❌ Border radius outside the defined set
- ❌ Shadows outside the elevation system
- ❌ Diagonal purple→pink gradients (the logo/brand gradient is the only exception)
- ❌ `transition-all` when a specific property suffices
- ❌ Icon-only buttons without `aria-label`
- ❌ Light background sections "sandwiched" between dark sections (use a surface tier instead)
- ❌ More than one neon glow on the same viewport scroll position

---

## 3. Color System

All colors use **oklch** for perceptual uniformity and P3 wide-gamut support. Every color has a semantic role; raw hex values are forbidden in components.

The brand hue is **violet — oklch hue 280**. It reads as electric purple on dark surfaces; slightly deeper and richer on light. Neutrals are **cool-tinted** (hue 265, very low chroma) to harmonize with the brand without competing.

### 3.1 Primitive Palette

```css
@theme {
  /* ── Brand: Violet ──────────────────────────────────── */
  --color-brand-50:   oklch(0.97 0.02 280);
  --color-brand-100:  oklch(0.93 0.05 280);
  --color-brand-200:  oklch(0.86 0.09 280);
  --color-brand-300:  oklch(0.77 0.14 280);
  --color-brand-400:  oklch(0.68 0.18 280);
  --color-brand-500:  oklch(0.58 0.22 280);   /* PRIMARY */
  --color-brand-600:  oklch(0.50 0.22 280);
  --color-brand-700:  oklch(0.42 0.20 280);
  --color-brand-800:  oklch(0.33 0.16 280);
  --color-brand-900:  oklch(0.24 0.10 280);
  --color-brand-950:  oklch(0.15 0.06 280);

  /* ── Neutral: Cool-tinted (hue 265, near-achromatic) ── */
  --color-neutral-50:   oklch(0.985 0.003 265);
  --color-neutral-100:  oklch(0.960 0.005 265);
  --color-neutral-200:  oklch(0.910 0.007 265);
  --color-neutral-300:  oklch(0.820 0.008 265);
  --color-neutral-400:  oklch(0.660 0.008 265);
  --color-neutral-500:  oklch(0.520 0.008 265);
  --color-neutral-600:  oklch(0.400 0.007 265);
  --color-neutral-700:  oklch(0.290 0.007 265);
  --color-neutral-800:  oklch(0.200 0.006 265);
  --color-neutral-900:  oklch(0.130 0.005 265);
  --color-neutral-950:  oklch(0.080 0.004 265);

  /* ── Neon Glow (violet glow layer for shadows/rings) ── */
  --color-glow-violet: oklch(0.58 0.22 280 / 0.35);
  --color-glow-violet-sm: oklch(0.58 0.22 280 / 0.20);

  /* ── Status ────────────────────────────────────────── */
  --color-success-400: oklch(0.72 0.17 145);
  --color-success-500: oklch(0.62 0.18 145);
  --color-warning-400: oklch(0.82 0.17 75);
  --color-warning-500: oklch(0.72 0.18 75);
  --color-danger-400:  oklch(0.68 0.22 25);
  --color-danger-500:  oklch(0.58 0.24 25);
  --color-info-400:    oklch(0.70 0.14 230);
  --color-info-500:    oklch(0.60 0.16 230);
}
```

### 3.2 Semantic Tokens (dark ↔ light pairs)

Components MUST use semantic tokens, not primitives. Semantic tokens are bound in `@layer base` via `:root` (light) and `.dark` (dark). Dark is the default class on `<html>`.

| Token | Role | Dark value | Light value |
|-------|------|------------|-------------|
| `--surface-base` | App background | `neutral-950` | `neutral-50` |
| `--surface-raised` | Cards, panels | `neutral-900` | `neutral-100` |
| `--surface-overlay` | Modals, drawers | `neutral-800` | `white` |
| `--surface-sunken` | Input backgrounds | `neutral-900` | `neutral-100` |
| `--border-subtle` | Dividers, hairlines | `neutral-800` | `neutral-200` |
| `--border-default` | Input borders, card borders | `neutral-700` | `neutral-300` |
| `--border-strong` | Emphasis, focus-adjacent | `neutral-600` | `neutral-400` |
| `--border-brand` | Brand card outlines | `brand-800` | `brand-200` |
| `--text-primary` | Body, headings | `neutral-50` | `neutral-900` |
| `--text-secondary` | Captions, meta, labels | `neutral-400` | `neutral-600` |
| `--text-tertiary` | Placeholders, disabled | `neutral-600` | `neutral-400` |
| `--text-inverse` | On brand/filled surfaces | `neutral-950` | `white` |
| `--accent-primary` | Primary actions (CTA) | `brand-400` | `brand-600` |
| `--accent-hover` | Primary hover state | `brand-300` | `brand-700` |
| `--accent-muted` | Subtle brand fill | `brand-950` | `brand-50` |
| `--accent-text` | Brand-colored text on dark | `brand-400` | `brand-600` |

### 3.3 Brand Gradient

Used exclusively for the agency wordmark/logo badge, the hero heading highlight word, and CTA button on the hero section. Never as a full-section background.

```
background: linear-gradient(135deg, oklch(0.68 0.18 280), oklch(0.55 0.22 260));
```

Tailwind utility alias (define in `@layer components`): `bg-brand-gradient`.

### 3.4 Neon Glow Effect

Applied via `box-shadow` to interactive cards and the primary CTA. Only one element glowing per viewport section.

```css
/* Card hover glow */
box-shadow: 0 0 0 1px var(--color-brand-800), 0 0 24px 0 var(--color-glow-violet-sm);

/* CTA button glow */
box-shadow: 0 0 0 1px var(--color-brand-600), 0 0 20px 0 var(--color-glow-violet);
```

### 3.5 Contrast Contract (non-negotiable)

- Body text vs. surface: **≥ 4.5:1** (WCAG AA)
- Large text (≥18pt / 14pt bold): **≥ 3:1**
- Interactive elements vs. adjacent surface: **≥ 3:1**
- Focus ring vs. any background: **≥ 3:1**
- `brand-400` on `neutral-950`: passes at ~8:1 ✓
- `neutral-50` on `neutral-950`: passes at ~17:1 ✓
- `neutral-400` on `neutral-950`: passes at ~4.6:1 ✓ (secondary text)

Any token pair that fails these ratios is a bug — not a design choice.

### 3.6 Forbidden Color Uses

- Color as the **only** signal for state (always pair with icon/text)
- Pure black (`#000`) or pure white (`#fff`) — use `neutral-950` / `neutral-50`
- Red for non-destructive actions
- Green for non-successful states
- Saturated brand color > 20% area of any viewport
- Brand gradient on body/card backgrounds

---

## 4. Typography

### 4.1 Font Stack

The layout already loads **Geist Sans** and **Geist Mono** via `next/font/google`. These are the canonical fonts.

| Role | Family | Fallback | Variable | Weight range |
|------|--------|----------|----------|--------------|
| Sans (UI + body) | Geist | `ui-sans-serif, system-ui, sans-serif` | `--font-geist-sans` | 400 · 500 · 600 · 700 |
| Mono (code, tech badges) | Geist Mono | `ui-monospace, SFMono-Regular, monospace` | `--font-geist-mono` | 400 · 600 |
| Display (hero headings) | Geist | — (same family, heavier weight) | `--font-geist-sans` | 700 · 800 |

No additional font families. Do not load Google Fonts outside of what `next/font` already provides.

### 4.2 Type Scale (fluid, clamp-based)

Scale ratio: **1.250 (major third)**. Prefer `clamp()` for headings. All sizes map to Tailwind's default scale — custom display token added.

| Token | Size (min → max) | Line-height | Letter-spacing | Use |
|-------|-----------------|-------------|----------------|-----|
| `text-xs` | `0.75rem` (12px) | 1.5 | `0.02em` | Captions, labels, badges, mono tags |
| `text-sm` | `0.875rem` (14px) | 1.5 | `0` | Secondary UI, table body, nav items |
| `text-base` | `1rem` (16px) | 1.65 | `0` | Body copy, card descriptions |
| `text-lg` | `1.125rem` (18px) | 1.5 | `-0.01em` | Subhead, intro paragraph |
| `text-xl` | `clamp(1.25rem, 2vw, 1.5rem)` | 1.4 | `-0.01em` | H4, card titles |
| `text-2xl` | `clamp(1.5rem, 3vw, 1.875rem)` | 1.3 | `-0.02em` | H3, section card heads |
| `text-3xl` | `clamp(1.875rem, 4vw, 2.5rem)` | 1.2 | `-0.025em` | H2, section headings |
| `text-4xl` | `clamp(2.5rem, 6vw, 3.75rem)` | 1.1 | `-0.03em` | H1, page title |
| `text-display` | `clamp(3.5rem, 8vw, 6.5rem)` | 0.95 | `-0.04em` | Hero headline only |

`text-display` must be registered in `@theme`:

```css
@theme {
  --text-display: clamp(3.5rem, 8vw, 6.5rem);
  --leading-display: 0.95;
  --tracking-display: -0.04em;
}
```

### 4.3 Rules

- **Line length:** 45–75 characters for body copy (`max-w-[65ch]`)
- **Heading hierarchy:** never skip levels (`h1 → h2 → h3`)
- **All-caps:** only for `text-xs` badges/labels with `tracking-widest`
- **Numbers in tables:** `font-variant-numeric: tabular-nums` (`tabular-nums` utility)
- **No italic** for UI labels or buttons — reserved for editorial quotes only
- **Weights in a single view:** max 3 — 400 (body), 500 (emphasis/nav), 700 (headings)
- **Mono usage:** Technology stack tags, inline code snippets, version numbers, API endpoint paths
- **Hero headline:** `text-display font-bold tracking-tight`, optionally a gradient highlight on a single keyword via `bg-brand-gradient bg-clip-text text-transparent`

---

## 5. Spacing & Layout

### 5.1 Spacing Scale (4px base)

Only these values exist. Any `p-[13px]` is a bug.

`0 · 0.5 · 1 · 1.5 · 2 · 3 · 4 · 5 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64`

(`0.5 = 2px`, `1 = 4px`, `4 = 16px`, `8 = 32px`, `16 = 64px`)

### 5.2 Density Rules (comfortable)

| Context | Default gap | Default padding |
|---------|-------------|-----------------|
| Bento card | `gap-4` (grid) | `p-6` |
| Small bento card | — | `p-4` |
| List item | `gap-3` | `py-3 px-4` |
| Form field | `gap-1.5` label↔input | `py-2.5 px-3` |
| Button (md) | — | `py-2.5 px-5` |
| Button (lg, hero CTA) | — | `py-3.5 px-8` |
| Page gutter | — | `px-4 sm:px-6 lg:px-8` |
| Section vertical | — | `py-16 lg:py-28` |
| Nav bar | — | `px-6 lg:px-8 h-16` |

### 5.3 Container Widths

| Token | Max width | Use |
|-------|-----------|-----|
| `max-w-screen-sm` | `640px` | Narrow / focused copy |
| `max-w-screen-md` | `768px` | Contact form |
| `max-w-screen-lg` | `1024px` | Standard content |
| `max-w-screen-xl` | `1280px` | Landing page sections |
| `max-w-[65ch]` | `~65 chars` | Prose / long-form |

### 5.4 Bento Grid System

The primary layout primitive for services, features, and showcase sections.

```
Grid variants:
  2-column balanced:  grid-cols-1 md:grid-cols-2
  3-column balanced:  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  Bento asymmetric:   grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr]
  Mosaic (hero row):  grid-cols-1 lg:grid-cols-[1.5fr_1fr]

Always: gap-4 (16px)
Tall card (2 rows):   row-span-2
Wide card (2 cols):   col-span-2
```

### 5.5 Radius Scale

`0 · 2px · 4px · 6px · 8px · 12px · 16px · 24px · 9999px`

| Token | Value | Use |
|-------|-------|-----|
| `rounded-none` | 0 | Full-bleed images, dividers |
| `rounded-sm` | 2px | Tech stack micro-badges |
| `rounded` | 4px | Inputs (default) |
| `rounded-md` | 6px | Small buttons, tags |
| `rounded-lg` | 8px | Buttons (default) |
| `rounded-xl` | 12px | Cards (standard) |
| `rounded-2xl` | 16px | Bento cards, modals |
| `rounded-3xl` | 24px | Hero panels, large feature cards |
| `rounded-full` | 9999px | Avatars, pill badges |

---

## 6. Depth & Elevation

Shadows convey hierarchy. In dark mode, use colored/glowing shadows sparingly. Default surfaces use a `border-subtle` border instead of shadow for low hierarchy.

| Token | Value (dark) | Value (light) | Use |
|-------|-------------|---------------|-----|
| `shadow-none` | — | — | Flat elements |
| `shadow-xs` | `0 1px 2px oklch(0 0 0 / 0.4)` | `0 1px 2px oklch(0 0 0 / 0.05)` | Subtle separation |
| `shadow-sm` | `0 2px 6px oklch(0 0 0 / 0.5)` | `0 1px 3px oklch(0 0 0 / 0.10)` | Cards at rest |
| `shadow-md` | `0 4px 16px oklch(0 0 0 / 0.6)` | `0 4px 12px oklch(0 0 0 / 0.12)` | Cards on hover |
| `shadow-lg` | `0 8px 32px oklch(0 0 0 / 0.7)` | `0 12px 32px oklch(0 0 0 / 0.14)` | Popovers, dropdowns |
| `shadow-xl` | `0 20px 60px oklch(0 0 0 / 0.75)` | `0 24px 64px oklch(0 0 0 / 0.18)` | Modals |
| `shadow-inner` | `inset 0 1px 2px oklch(0 0 0 / 0.4)` | `inset 0 1px 2px oklch(0 0 0 / 0.06)` | Input depth |
| `shadow-glow-brand` | `0 0 24px 0 oklch(0.58 0.22 280 / 0.25)` | — | Brand CTA, active cards |

**Neon glow rule:** `shadow-glow-brand` is only applied on the single primary CTA and on an interacted (hovered/focused) card. Never apply to more than one element visible simultaneously.

---

## 7. Motion

Animation is a first-class feature. **Motion** (the library formerly known as Framer Motion, v12 with React 19 support) handles scroll-driven parallax, entrance sequences, and complex choreography. Tailwind utilities handle micro-interactions. **Lenis** handles smooth scrolling and exposes scroll progress for Motion's `useScroll` hook.

### 7.1 Durations

| Token | Value | Use |
|-------|-------|-----|
| `duration-75` | 75ms | Color state flips (active, checked) |
| `duration-150` | 150ms | Default hover transitions |
| `duration-200` | 200ms | Focus ring appearance |
| `duration-300` | 300ms | Card lift, drawer open |
| `duration-500` | 500ms | Page / section fade-in |
| `duration-700` | 700ms | Hero entrance (Motion) |
| `duration-1000` | 1000ms | Scroll-parallax segment (Motion) |

### 7.2 Easing

| Token | Curve | Use |
|-------|-------|-----|
| `ease-linear` | `linear` | Progress bars, loaders only |
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entering elements (expo-out feel) — DEFAULT |
| `ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | Exiting elements |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Loops, back-and-forth toggles |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Emphasized feedback (badge pop, modal scale-in) |

Register in `@theme`:

```css
@theme {
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-expo-in: cubic-bezier(0.7, 0, 0.84, 0);
}
```

### 7.3 Motion / Lenis Integration Rules

- **Lenis:** wrap the app in a `ReactLenis` provider (from `lenis/react`). Drive the document scroll. Motion's `useScroll` and `useTransform` read the native scroll values Lenis updates each frame — no extra bridge needed.
- **Hero parallax:** `y: "-20%"` on the hero visual layer as page scrolls past. Entrance: stagger `text-display` word-by-word, `opacity 0→1`, `y 40→0`, `duration: 0.8`, ease `--ease-expo-out`. Use Motion `<motion.span>` with `initial` / `animate` + `staggerChildren`.
- **Section reveals:** `opacity 0→1` + `y 24→0` on each section as it enters viewport. Use Motion's `whileInView` with `viewport={{ once: true, margin: "-20%" }}`.
- **Bento cards:** stagger reveal within each grid, delay `0.05s` between cards via `staggerChildren`.
- **Scroll speed never exceeds real scroll** — no negative z-depth parallax on text content.

### 7.4 Tailwind Motion Rules

- **Default micro-interaction:** `transition-colors duration-150 ease-out`
- **Lift effect:** `transition-transform duration-200 ease-out hover:-translate-y-1`
- **Never `transition-all`** — name the property
- **Always pair animations with `motion-reduce:`:**

```html
<!-- Pattern -->
<div class="animate-fade-in motion-reduce:animate-none">...</div>
<div class="transition-transform hover:-translate-y-1 motion-reduce:hover:translate-y-0">...</div>
```

- **Entrance:** fade + small translate-y (≤ 16px). Never enter from outside viewport.
- **Exit:** fade only.
- **Loading skeletons:** `animate-pulse`. Spinners: `animate-spin`. Never both simultaneously.

---

## 8. Components

Each spec is the **contract**. Agents must match these shapes exactly. All components are dark-first; add `dark:` pairs only where the light variant diverges.

### 8.1 Button

**Variants:** `primary · secondary · ghost · danger · link`
**Sizes:** `sm · md (default) · lg`
**States:** `default · hover · active · focus-visible · disabled · loading`

```
Primary (md) — hero CTA:
  bg:          brand-gradient (linear-gradient 135deg brand-400→brand-600)
  text:        neutral-950 (dark on gradient)
  padding:     py-2.5 px-5
  radius:      rounded-lg
  font:        text-sm font-semibold tracking-wide
  shadow:      shadow-glow-brand (brand neon glow)
  hover:       brightness-110 + shadow intensity up
  transition:  transition-[background,box-shadow,filter] duration-200 ease-out
  focus-vis:   ring-2 ring-offset-2 ring-offset-neutral-950 ring-brand-400
  disabled:    opacity-40 cursor-not-allowed shadow-none
  loading:     spinner (brand-400) replaces text, width locked

Primary (lg) — used ONLY in hero fold:
  padding: py-3.5 px-8
  font: text-base font-semibold

Secondary (md):
  bg:          transparent
  border:      1px border-default (neutral-700 dark / neutral-300 light)
  text:        text-primary
  hover:       bg-surface-raised border-brand-700 text-accent-text
  transition:  transition-[border-color,background,color] duration-150 ease-out
  focus-vis:   ring-2 ring-offset-2 ring-brand-500/50

Ghost (md):
  bg:          transparent, no border
  text:        text-secondary
  hover:       text-primary bg-surface-raised
  transition:  transition-[background,color] duration-150 ease-out

Danger (md):
  bg:          danger-500 (dark) / danger-600 (light)
  text:        neutral-50
  hover:       danger-400 (dark) / danger-700 (light)

Link:
  bg:          none, border: none
  text:        accent-text (brand-400)
  hover:       underline
  padding:     0
```

Required: always has accessible name (text or `aria-label` for icon-only variants).

### 8.2 Input

**Variants:** `text · email · password · number · search · textarea`
**States:** `default · focus · error · disabled · readonly`

```
Default:
  bg:          surface-sunken (neutral-900 dark / neutral-100 light)
  border:      1px border-default
  text:        text-primary
  placeholder: text-tertiary
  padding:     py-2.5 px-3
  radius:      rounded-lg
  font:        text-sm
  height:      h-10 (md) / h-12 (lg)

Focus:
  border:      border-brand-500
  ring:        ring-2 ring-brand-500/20
  outline:     none

Error:
  border:      border-danger-500
  ring:        ring-2 ring-danger-500/20
  + error message: text-xs text-danger-400 mt-1 role="alert"

Disabled:
  opacity-50 cursor-not-allowed
```

Every input has `<label>` (or `aria-label`). Error messages reference input via `aria-describedby`.

### 8.3 Badge / Tag

Used for technology stack labels, service categories, status indicators.

```
Default (tech tag):
  font:     font-mono text-xs font-medium
  padding:  py-0.5 px-2
  radius:   rounded-sm
  bg:       surface-raised (neutral-900 dark / neutral-100 light)
  border:   1px border-subtle
  text:     text-secondary

Brand variant:
  bg:       accent-muted (brand-950 dark / brand-50 light)
  border:   1px border-brand (brand-800 dark / brand-200 light)
  text:     accent-text (brand-400 dark / brand-600 light)

Status variants (success / warning / danger / info):
  bg/text follow status palette (success-500 bg at 15% opacity + success-400 text)
```

### 8.4 Card (Bento)

**Variants:** `flat · raised · interactive · featured`

```
Base (all cards):
  bg:       surface-raised (neutral-900 dark / neutral-100 light)
  border:   1px border-subtle
  radius:   rounded-2xl
  padding:  p-6

Flat:
  shadow:   none
  hover:    —

Raised:
  shadow:   shadow-sm
  hover:    shadow-md + transition-shadow duration-200 ease-out

Interactive:
  cursor:   pointer
  hover:    -translate-y-1 shadow-md border-brand-800
  focus-vis: ring-2 ring-brand-500/50 ring-offset-2 ring-offset-neutral-950
  transition: transition-[transform,box-shadow,border-color] duration-200 ease-out

Featured (hero bento, large card):
  border:   1px border-brand (brand-800 dark / brand-200 light)
  shadow:   shadow-glow-brand on hover
  radius:   rounded-3xl
  padding:  p-8
```

### 8.5 Navigation (Top Bar)

```
Height:      h-16
bg:          surface-base/80 with backdrop-blur-md (sticky)
border:      border-b border-subtle (appears on scroll)
padding:     px-6 lg:px-8

Logo:
  font:      font-sans font-semibold text-base text-primary
  accent:    single keyword in accent-text (brand-400)

Nav links:
  font:      text-sm font-medium text-secondary
  hover:     text-primary transition-colors duration-150
  active:    text-primary
  mobile:    collapse to hamburger below md:

CTA button:
  Primary secondary variant (not gradient — gradient reserved for hero)
  Switches to primary (gradient) when page is at top in hero section
```

### 8.6 Hero Section

```
Layout:      Two-column lg: [1.5fr text | 1fr visual] stacked below lg
bg:          surface-base (neutral-950 dark)
padding:     py-24 lg:py-40

Headline:
  size:      text-display
  weight:    font-bold
  color:     text-primary (neutral-50)
  keyword:   1-2 words in bg-brand-gradient bg-clip-text text-transparent
  animation: Motion word-by-word stagger (see §7.3)

Subhead:
  size:      text-lg lg:text-xl
  color:     text-secondary
  max-width: max-w-[55ch]

CTA row:
  Primary lg button (gradient) + Secondary md button, gap-4
  Both have Motion fade-in delay after headline

Visual (right column):
  Bento mini-grid of 3–4 cards showing live stats / tech logos / project thumbnails
  Parallax: y: "-10%" on scroll (Motion `useScroll` + `useTransform`)

Background:
  Subtle radial gradient: from brand-950/40 at center-left → transparent
  NOT a full-surface gradient. Max 40% opacity.
```

### 8.7 Service Card (Bento Cell)

Appears in a 3-column bento grid in the Services section.

```
Size:        Varies — 1×1, 1×2, 2×1 cells
bg:          surface-raised
border:      1px border-subtle → hover: border-brand-800
icon:        24×24 brand-400 stroke icon (heroicons/lucide)
title:       text-xl font-semibold text-primary
body:        text-sm text-secondary
tech tags:   Badge (mono) row, gap-2, flex-wrap
transition:  interactive card rules (§8.4)
```

### 8.8 Modal / Dialog

```
Overlay:    bg-neutral-950/70 backdrop-blur-sm
Container:  surface-overlay · rounded-2xl · shadow-xl · max-w-lg w-full · p-6
Entrance:   opacity 0→1 + scale 0.95→1 · duration-200 ease-spring
Exit:       opacity 1→0 + scale 1→0.97 · duration-150 ease-in
Focus trap: Yes — Tab/Shift+Tab cycles within modal
Dismiss:    Esc · overlay click · ✕ button (top-right, ghost icon-button with aria-label="Close")
Return:     Focus returns to trigger element on close
```

### 8.9 Toast / Notification

```
Position:   top-right (desktop, 16px inset) · top-center (mobile)
Duration:   5s (info/success) · 8s (warning/danger) · sticky for actions
Variants:   info · success · warning · danger
Layout:     icon (18px) + message text + optional link + × (dismiss)
Max stack:  3 visible, others queued
Motion:     slide-in from right, fade out
aria-live:  polite (info/success) · assertive (warning/danger)
```

### 8.10 Form Layout

- Labels: above inputs, `text-sm font-medium text-primary mb-1.5`
- Help text: `text-xs text-secondary mt-1`
- Error text: `text-xs text-danger-400 mt-1 role="alert"`
- Required indicator: `*` after label text in `text-danger-400`, with `aria-required="true"` on input
- Field groups: `<fieldset>` + `<legend>`, `gap-4` between fields
- Submit button: full-width on mobile (`w-full sm:w-auto`)

---

## 9. Responsive Strategy

### 9.1 Breakpoints (viewport — Tailwind defaults)

| Token | Min width | Target |
|-------|-----------|--------|
| `sm:` | 640px | Large phone landscape |
| `md:` | 768px | Tablet portrait |
| `lg:` | 1024px | Tablet landscape / small desktop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Large desktop |

### 9.2 Container Queries (preferred for bento cells)

Bento cells and service cards MUST use `@container` to adapt their internal layout when placed in different grid positions:

```html
<article class="@container rounded-2xl ...">
  <div class="flex flex-col @lg:flex-row gap-4">
    ...
  </div>
</article>
```

### 9.3 Mobile-First Rule

Base styles target the smallest screen. Use `sm: md: lg:` to scale up. **Never use `max-*:` prefixes** for layout — it reads backwards.

### 9.4 Touch Targets

Interactive elements: minimum **44×44px** hit area on touch. Use `min-h-[44px] min-w-[44px]` for buttons and nav items on mobile.

---

## 10. Accessibility Guardrails

Non-negotiable. Any violation is a ship-blocker.

- **Semantic HTML:** `<button>` for actions, `<a>` for navigation — never `<div onclick>`
- **Heading hierarchy:** sequential, never skip levels (`h1 → h2 → h3`)
- **Form labels:** every input has `<label for>` or `aria-label`
- **Focus visible:** every interactive element has a visible focus ring (`focus-visible:ring-2`)
- **Keyboard:** every interactive flow works without a mouse; Tab order follows DOM order
- **Escape key:** closes modals, dropdowns, mobile nav
- **Focus trap:** modals trap focus; return focus to trigger on close
- **ARIA:** `aria-label`, `aria-describedby`, `aria-expanded`, `aria-controls`, `role="alert"` as needed
- **Live regions:** dynamic content uses `aria-live="polite"` (or `assertive` for errors/warnings)
- **Contrast:** ≥ 4.5:1 body, ≥ 3:1 large/interactive (see §3.5)
- **Motion:** `motion-reduce:` variant disables or simplifies all non-essential Tailwind animation; Motion library uses `useReducedMotion()` to gate non-essential JS-driven animation
- **Alt text:** informative images have descriptive `alt`; decorative images have `alt=""`
- **Color independence:** never convey state by color alone — always pair with icon/text/shape
- **Language:** `lang="en"` on `<html>` (Next.js layout already sets this). Add `lang` attr to any embedded content in a different language.

---

## 11. Agent Prompt Guide

> This section is for AI agents generating UI from this document.

### 11.1 Read order

1. §2 Brand Identity → set tone and anti-patterns
2. §3 Color System → lock palette, use semantic tokens only
3. §4 Typography → lock scale; Geist only, no new fonts
4. §5 Spacing & Layout → lock rhythm; bento grid is the primary layout
5. §6–§7 Depth and Motion → apply glow sparingly; always include `motion-reduce:`
6. §8 Components → match specs exactly, all states required
7. §9–§10 Responsive + a11y → every component must pass

### 11.2 Hard rules when generating

- ✅ Use only tokens defined here (Tailwind utilities that map to `@theme`)
- ✅ Match component specs in §8 exactly — do not invent variants
- ✅ Include all required states (hover, focus-visible, disabled, loading)
- ✅ Include dark mode (`dark:` variant) for every color — dark is the default, light is opt-in
- ✅ Include `motion-reduce:` for every animation
- ✅ Use `font-mono` for tech stack tags and code references
- ✅ Use `rounded-2xl` for bento cards, `rounded-lg` for buttons, `rounded-xl` for standard cards
- ❌ Never invent colors, sizes, spacings, radii outside the scales
- ❌ Never skip a11y attributes (labels, roles, aria-*)
- ❌ Never use `transition-all`, `any`, inline styles, or hex values in components
- ❌ Never apply `shadow-glow-brand` to more than one element per viewport section
- ❌ Never use the brand gradient as a full background fill

### 11.3 When the doc is silent

If this document does not define a pattern you need:
1. Do not invent — propose an addition to this document
2. Once approved, update this file **before** writing the component

### 11.4 Validation hooks

- `audit-styles` — detects drift from tokens
- `audit-a11y` — validates accessibility contract
- `autofix` — corrects arbitrary values to tokens
- `frontend-design` — reads this file before generating new UI
- `design-md validate` — full audit against all sections

---

## 12. Changelog

| Date | Version | Change | Author |
|------|---------|--------|--------|
| 2026-04-17 | 1.0.0 | Initial design system — dark-first, violet brand, Geist typography, bento grid | Camilo Henriquez |

---

**End of DESIGN.md.** If you are an agent and reached here without reading the above, restart from §1.
