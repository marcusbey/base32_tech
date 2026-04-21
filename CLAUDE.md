# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # local dev server
npm run build     # static export → out/
npm run lint      # ESLint
ANALYZE=true npm run build  # bundle analyzer
```

No test suite configured.

## Architecture

**BASE32** is a static marketing site for an AI consulting company. Next.js App Router with `output: 'export'` — no SSR, no dynamic server features.

### Pages (`app/`)
Five routes: `/` (home), `/about`, `/services`, `/pricing`, `/contact`. All page-level files are thin shells — they render components from `components/`.

The home `page.tsx` is `"use client"` and assembles all sections in order: `Hero → Navigation → Services → Brands → Values → Testimonials → Pricing → About → CreativeContact → Footer`. `BackgroundEffects` is fixed-position behind everything.

### Provider tree
```
RootLayout (server)
  └─ ScrollProvider       ← context/scroll-context.tsx (gradient progress state)
       └─ ClientLayout    ← components/client-layout.tsx
            └─ CompanyProvider  ← lib/company-context.tsx (fixed "tech" type)
```

### Key directories
- `components/` — one file per page section; `components/ui/` holds shadcn/ui primitives
- `components/hero/` and `components/shapes/` — Three.js / React Three Fiber 3D assets
- `lib/` — `utils.ts` (`cn` helper), `company-context.tsx`, `performance.ts` (scroll/animation utilities)
- `context/scroll-context.tsx` — `gradientProgress` value shared across sections for scroll-driven color transitions
- `config/site.ts` — canonical URL, site name, social links
- `hooks/` — `use-device.ts`, `use-toast.ts`

### 3D / performance
Home page detects device capabilities (`hardwareConcurrency`, `deviceMemory`) and sets `shouldDisable3D` to skip Three.js scenes on low-end devices. `lib/performance.ts` exports `debounce`, `throttle`, `useOptimizeAnimations`, and `useThrottledCallback` for animation-heavy components.

### Contact API
`app/api/send/` — sends email via **Resend**. Requires `RESEND_API_KEY` env var.

### Styling
Tailwind CSS v3 (`tailwind.config.js` + `tailwind.config.ts` both present — `tailwind.config.ts` takes precedence). `cn()` from `lib/utils.ts` merges classes. `globals.css` defines z-index layers: `background-layer → hero-layer → content-layer`.

### Static export constraints
- `next/image` runs with `unoptimized: true`
- No `useSearchParams`, server actions, or streaming — all unsupported in static export
- API routes work at build time only (contact form needs a separate deployment or serverless adapter)
