# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Peterborough Plumbers — a static, file-based plumbing business website. Next.js 16 App Router + TypeScript + Tailwind CSS v4, deployed on Vercel.

All content is stored in TypeScript data files inside `/content`. No database. No admin dashboard. Adding services/areas is as simple as adding an object to a content file.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript check
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SITE_URL` — Canonical site URL (defaults to https://peterboroughplumbers.com)

## Architecture

### Route Groups
- `app/(public)/` — All public-facing pages (server components by default)
- `app/layout.tsx` — Root layout (global CSS, Header, Footer, StickyCtaBar)
- `app/sitemap.ts`, `app/robots.ts` — SEO routes (Next.js conventions)

### Content (File-Based CMS)
- `content/services.ts` — All 11 services with slugs, descriptions, FAQs, SEO metadata
- `content/areas.ts` — All 8 areas with postcodes, landmarks, SEO metadata
- `content/reviews.ts` — Customer reviews
- `content/blog.ts` — Blog posts with categories and publication status
- `content/settings.ts` — Site-wide settings (company info, CTAs, phone, etc.)

Adding a new service or area only requires adding an object to the content file — no route changes needed.

### Key Directories
- `components/blocks/` — Reusable page sections (Hero, ServiceGrid, ReviewsGrid, AreaGrid, FaqAccordion, CTASection)
- `components/layout/` — Header (client, scroll-aware), Footer, StickyCtaBar, Breadcrumbs
- `components/forms/` — BookingForm (client component with validation)
- `lib/seo/` — Metadata builders, JSON-LD schema generators, internal link helpers
- `lib/validations/` — Zod schemas for booking form
- `lib/utils/` — Utility functions (cn for class merging)

### Brand Colors (locked — do not change)
- `pp-yellow`: #ffd800
- `pp-dark`: #242424
- `pp-offwhite`: #fbfff4
- `pp-accent`: #f81b50

Defined as `@theme` tokens in `app/globals.css`, used as Tailwind classes like `bg-pp-yellow`, `text-pp-accent`.

### CTA Rules
- Primary CTA: "Book Now" (pp-accent bg) → `/book`
- Secondary CTA: "WhatsApp Chat" (green bg) → `https://wa.me/{number}`
- Mobile: bottom sticky bar with both CTAs
- Desktop: CTAs in header

### Header Behavior
- Transparent initially → solid translucent on scroll (backdrop-blur)
- Desktop: centered logo, nav with Services dropdown, right-side CTAs
- Mobile: burger left, logo beside, CTAs right; drawer menu

### SEO
- `generateMetadata()` on every dynamic page via `lib/seo/metadata.ts`
- JSON-LD schemas: LocalBusiness (sitewide), Service, FAQPage, BreadcrumbList
- Static sitemap from content files
- Canonical URLs via `NEXT_PUBLIC_SITE_URL`

## Conventions

- Server components by default; `"use client"` only for interactivity
- Pages are thin: import content data → render block components
- Use `cn()` from `lib/utils/cn.ts` for conditional class merging
- No database, no Prisma, no server actions for DB writes
