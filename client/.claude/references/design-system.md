# captures_it Design System

Derived from the implemented home and about pages. All new pages and components should follow this reference.

---

## Core Philosophy

**Dark editorial minimalism.** Pure black backgrounds, large uppercase typography left-anchored, a dramatic portrait image right-bleeding into the black. Motion is restrained — text animates in word-by-word on load, nothing else moves. The palette is near-monochrome with a single electric blue accent (`#607AFB`).

---

## Layout Shell

Every full-page route uses this structure:

```tsx
<div className="container bg-black overflow-clip">
  <div className="font-sans mx-[4dvw] h-[84dvh] text-white flex justify-between items-center">
    {/* Left column */}
    {/* Right column */}
  </div>
</div>
```

### `.container` (globals.css)
```css
.container {
  min-height: calc(100dvh - 16dvh);
  max-height: calc(100dvh - 16dvh);
  min-width: 100dvw;
}
```
- Always paired with `bg-black overflow-clip`
- Inner wrapper uses `h-[84dvh]` (slightly shorter than container — accounts for navbar)
- `mx-[4dvw]` is the canonical horizontal gutter

### Two-column split
- `flex justify-between items-center`
- Left: stacked text content, `flex flex-col items-start`
- Right: `pointer-events-none select-none` image div, no wrapper, no card

---

## Color Tokens (globals.css `@theme inline`)

| Token | Value | Usage |
|---|---|---|
| `text-primary-accent` / `bg-primary-accent` | `#607AFB` | Labels, accent rules, year markers, links |
| `text-white` | `#ffffff` | Headings, primary body copy |
| `text-white/70` | 70% white | Secondary body copy (bio paragraphs) |
| `text-white/40` | 40% white | Tertiary detail text (experience descriptions) |
| `text-white/30` | 30% white | Footer/contact metadata |
| `text-white/25` | 25% white | Furthest-receding UI chrome |
| `bg-black` | `#000000` | Page background — always |
| `--color-text-secondary` | `#6B6B6B` | (reserved, not used on dark pages) |
| `--color-focus` | `#9942f0` | Focus rings only |

**Rule:** never introduce a new color. Use white opacity steps or `primary-accent`.

---

## Typography

### Fonts
| Variable | Font | Usage |
|---|---|---|
| `font-sans` (`--font-inter`) | Inter | All page text — default for dark pages |
| `font-serif` (`--font-noto-serif`) | Noto Serif | Not used on dark pages; legacy/light pages only |
| `font-mono` (`--font-geist-mono`) | Geist Mono | Year markers, metadata codes |

### Type Scale (dark pages)

| Role | Classes | Notes |
|---|---|---|
| Page hero / name | `text-5xl uppercase font-bold` | Animated via `SplitText splitType="words"` |
| Section label | `text-xs uppercase tracking-[0.3em] text-primary-accent` | All-caps, wide tracking |
| Body / bio | `text-lg font-semibold text-white/70 max-w-[50dvw]` | max-width prevents full-bleed sprawl |
| List title | `text-sm font-semibold text-white` | Experience / feature item name |
| List detail | `text-xs text-white/40` | Experience description, sub-info |
| Footer / contact | `text-xs text-white/30 uppercase tracking-widest` | Lowest hierarchy |
| Year / code marker | `text-primary-accent font-mono text-xs` | Always accent color |

---

## Animation

### SplitText (`components/SplitText.tsx`)
GSAP-powered word/line/char reveal. Waits for fonts to load, fires once on scroll entry.

**Canonical usage (hero heading):**
```tsx
<SplitText
  text="Your Heading Here"
  className="text-5xl uppercase font-bold"
  splitType="words"
  duration={2}
/>
```

**Canonical usage (body paragraph):**
```tsx
<SplitText
  text="Long body copy..."
  className="text-lg font-semibold"
  splitType="lines"
  textAlign="start"
  duration={2}
/>
```

**Props cheat-sheet:**

| Prop | Default | Notes |
|---|---|---|
| `splitType` | `"chars"` | Use `"words"` for headings, `"lines"` for paragraphs |
| `duration` | `1.25` | Use `2` for primary hero text |
| `delay` | `50` | Stagger in ms between units |
| `ease` | `"power3.out"` | Don't change |
| `from` | `{ opacity: 0, y: 40 }` | Don't change |
| `tag` | `"p"` | Change to `"h1"` etc. for semantics |
| `textAlign` | `"center"` | Use `"start"` for left-aligned content |

**Rule:** `SplitText` is a `"use client"` component. Pages are async server components — this is fine since Next.js handles the boundary automatically.

---

## Accent Rule

A thin horizontal line used to separate the label from the heading or body:

```tsx
<div className="w-8 h-px bg-primary-accent mt-4 mb-6" />
```

- Width: `w-8` (2rem)
- Height: `h-px` (1px)
- Always `bg-primary-accent`
- Margins: `mt-4 mb-6` standard; adjust to context

---

## Images (dark pages)

- **No card wrapper, no rotation, no drop shadow**
- **Border-radius:** none for standalone editorial images (they bleed into the black background). Use `rounded-lg` for interactive image cards (carousel items, clickable thumbnails) — the subtle rounding signals interactivity and looks clean against dark backgrounds.
- Image sits directly in a `pointer-events-none select-none` div
- Use explicit `width` + `height` (not `fill`) so the subject floats in space
- Dark-toned portrait subjects bleed naturally into the black background — this is intentional
- Canonical right-column image:
  ```tsx
  <div className="pointer-events-none select-none">
    <Image
      src="/images/home.jpeg"
      alt="..."
      width={550}
      height={680}
      className="mt-[10dvh]"
      priority
    />
  </div>
  ```
- `mt-[10dvh]` shifts the image slightly down to create a grounded, off-center composition

---

## Conditional Data Rendering

When pulling from Sanity, always guard lists and contact info:

```tsx
{/* Only render if data exists */}
{info?.experience && info.experience.length > 0 && (
  <div>...</div>
)}

{(info?.email || info?.telephone) && (
  <div>...</div>
)}

{/* Fallback for strings */}
{info?.professionalSummary ?? "Hardcoded fallback text..."}
```

---

## Spacing Rhythm

| Use | Class |
|---|---|
| Page horizontal gutter | `mx-[4dvw]` |
| Section gap (label → heading) | `mb-4` |
| After accent rule | `mb-6` |
| Between experience entries | `gap-4` |
| Before contact row | `mt-8` |
| Image vertical offset | `mt-[10dvh]` |

---

## What to Avoid

- `font-serif` on dark pages
- Card components with backgrounds, borders, or shadows behind images
- Centered text alignment for page content (left-anchor everything)
- Introducing new brand colors
- Scroll on full-page layouts — use `overflow-clip` and keep content within `h-[84dvh]`
- Animated elements other than `SplitText` on page load
