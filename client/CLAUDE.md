# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev          # Start Next.js dev server
pnpm build        # Production build
pnpm lint         # ESLint

# Sanity Studio (../sanity_studio/)
pnpm dev          # Start Sanity Studio locally
pnpm deploy       # Deploy studio to Sanity hosted
```

After adding or modifying Sanity schema types, the GraphQL API must be redeployed from the studio:
`sanity graphql deploy` (or via the Sanity dashboard).

## Architecture

This is a **Next.js 16 / React 19** portfolio site for a photographer. Data is served from **Sanity CMS** via its **GraphQL API** (not GROQ). The Sanity Studio lives in the sibling directory `../sanity_studio/`.

### Data flow

```
Sanity Studio (../sanity_studio/)
  └── schemaTypes/       ← define document + object types
        └── index.ts     ← registers all types

Client (this repo)
  └── lib/sanity/client.ts   ← GraphQLClient pointed at SANITY_GRAPHQL_URL env var
  └── queries/               ← raw GraphQL query strings
  └── services/              ← fetch functions that call graphqlClient and shape the response
  └── app/**/page.tsx        ← async server components that call service functions directly
```

### Key conventions

- **All Sanity array members must be named top-level types** (not anonymous inline `object`) to be compatible with the GraphQL API. Create a dedicated file in `schemaTypes/` and register it in `index.ts`.
- **Services** (`services/<domain>/<domain>.service.ts`) own the GraphQL call and data mapping. Pages only call the service function.
- Pages are **async server components** — no client-side data fetching.
- Styles use **Tailwind v4** with custom design tokens defined in `styles/globals.css` under `@theme inline`. Key tokens: `--color-primary-accent: #607AFB`, `--color-text-secondary: #6B6B6B`, `--font-serif` (Noto Serif), `--font-sans` (Inter).
- The `container` CSS class (defined in globals.css) sets `min/max-height: calc(100dvh - 16dvh)` and `min-width: 100dvw` — use it for full-viewport page wrappers.

### App structure

- `app/layout.tsx` — **client component** (uses state for the loading animation gate). Shows a 3D Spline camera animation (`Camera` component) for ~2.5s before revealing Navbar + page content.
- `app/page.tsx` — Home: black bg, `SplitText` GSAP word/line animations.
- `app/about/page.tsx` — About: editorial split layout, fetches `personalInfo` from Sanity.
- `app/work/page.tsx` — Work: fetches all albums + their image content.
- `app/contact/page.tsx` — Contact page.

### Environment

`SANITY_GRAPHQL_URL` must be set in `.env`. Format: `https://<projectId>.api.sanity.io/v1/graphql/<dataset>/default`
