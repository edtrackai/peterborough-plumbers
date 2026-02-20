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

## SEO Skills

- Focus on UK local SEO: target location-specific keywords (e.g. "plumber in Peterborough"), include local landmarks and postcodes in content, ensure NAP (Name, Address, Phone) consistency across all pages
- Optimize headings and meta tags: use a single H1 per page with primary keyword, structure H2–H4 hierarchy logically, write unique meta titles (≤60 chars) and descriptions (≤155 chars) for every page
- Follow technical SEO best practices: ensure canonical URLs are set, generate a comprehensive XML sitemap, use structured data (JSON-LD) for LocalBusiness/Service/FAQ schemas, keep Core Web Vitals performant, use semantic HTML, and ensure mobile-first responsive design

## Advanced SEO Rules

### Technical SEO
- Every page must have a unique canonical URL set via `NEXT_PUBLIC_SITE_URL`
- Generate XML sitemap dynamically from all content files; include `lastmod`, `changefreq`, and `priority`
- Implement `robots.ts` with correct crawl directives; block `/api/` and internal routes
- Use JSON-LD structured data on every page: LocalBusiness (global), Service (service pages), FAQPage (pages with FAQs), BreadcrumbList (all pages), Review/AggregateRating (reviews page)
- Ensure all internal links use relative paths or the canonical domain — no broken links or redirect chains
- Set proper HTTP headers: `X-Robots-Tag`, cache-control for static assets
- Use `next/image` for all images with explicit `width`, `height`, and descriptive `alt` text
- Keep URL structure clean and flat: `/services/[slug]`, `/areas/[slug]`, `/blog/[slug]`

### Content SEO
- Every page must have a unique, keyword-rich H1 that includes the primary service or area name
- Write location-specific copy for each area page — mention local landmarks, postcodes (e.g. PE1–PE7), and nearby towns
- Each service page should target a primary keyword (e.g. "boiler repair Peterborough") and 2–3 secondary long-tail variants
- Include FAQ sections on service and area pages with natural-language questions locals would search for
- Use internal linking: service pages link to relevant area pages and vice versa; blog posts link to service pages
- Blog content should target informational queries (e.g. "how to bleed a radiator", "when to replace your boiler") and link to commercial service pages
- Maintain consistent NAP (Name, Address, Phone) in the footer, schema markup, and contact page
- Use `hreflang="en-GB"` to signal UK English content

### Performance Optimisation
- Target Lighthouse scores: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO = 100
- Use Next.js static generation (SSG) for all content pages — no SSR unless strictly required
- Optimise images: use WebP/AVIF via `next/image`, lazy-load below-the-fold images, eager-load hero images
- Minimise client-side JavaScript: keep `"use client"` components to a minimum; prefer server components
- Enable font optimisation via `next/font` — no layout shift from font loading
- Inline critical CSS; defer non-critical styles
- Set aggressive caching headers for static assets (`public/`, `_next/static/`)
- Avoid third-party scripts that block rendering; load analytics and chat widgets asynchronously

### Conversion Optimisation
- Every page must have at least one clear CTA above the fold — "Book Now" (primary) or "WhatsApp Chat" (secondary)
- Sticky CTA bar on mobile must always be visible and not overlap content
- Booking form should be short (name, phone, service, preferred date) — reduce friction to maximise completions
- Display trust signals near CTAs: Google review rating, "Gas Safe Registered", years of experience
- Service pages should follow the pattern: problem → solution → social proof → CTA
- Use urgency cues where appropriate (e.g. "Same-day emergency call-outs", "Book today — limited slots")
- Phone number must be a clickable `tel:` link on all devices
- Ensure the WhatsApp link opens correctly on both mobile and desktop with a pre-filled message

---

# SEO + AI AUTOMATION SKILLS (PROJECT RULES)

These rules apply to all development, content, and design decisions for this plumbing website.

## PRIMARY OBJECTIVE
Increase organic traffic, improve local rankings in Peterborough and surrounding areas, maximize conversions, and maintain strong technical SEO health.

---

# LOCAL SEO RULES (CRITICAL)

Always optimize for UK local search:

- Include "Peterborough" and nearby service areas naturally
- Create dedicated location landing pages when relevant
- Maintain consistent NAP (Name, Address, Phone)
- Ensure strong Google Business Profile alignment
- Add local schema markup where appropriate
- Include service-area internal linking

Never keyword stuff or duplicate location content.

---

# TECHNICAL SEO REQUIREMENTS

Every page must:

- Have one H1 only
- Follow logical H1–H6 hierarchy
- Include meta title + description
- Use semantic HTML structure
- Load fast on mobile (Core Web Vitals friendly)
- Avoid render blocking scripts
- Include image alt text

Always consider:

- sitemap.xml updates
- robots.txt compliance
- canonical URLs
- structured data where appropriate

---

# PERFORMANCE OPTIMIZATION

Always prioritize:

- Fast loading pages
- Optimized images
- Minimal JavaScript bundle
- Lazy loading assets
- Clean CSS structure

Avoid:

- Unnecessary libraries
- Inline heavy scripts
- Layout shifts

Performance affects SEO rankings.

---

# CONVERSION OPTIMIZATION RULES

Every page should encourage enquiry or booking.

Always include:

- Strong visible CTA buttons
- Trust signals (reviews, guarantees)
- Clear contact info
- Mobile-friendly layout
- Simple user journey

Focus on leads, not just traffic.

---

# CONTENT SEO GUIDELINES

Content must:

- Sound human and natural
- Use UK English spelling
- Provide real value
- Avoid generic AI phrasing
- Include FAQs when useful

Always:

- Use contextual internal linking
- Write for users first, SEO second
- Maintain authority and trust tone

---

# AI CODING QUALITY RULES

When generating code:

- Follow Next.js best practices
- Maintain clean Tailwind usage
- Avoid inline styles unless required
- Keep components reusable
- Maintain accessibility standards

Never break existing UI/UX unless explicitly instructed.

---

# AUTOMATION RULES FOR CLAUDE

When creating pages or features:

1. Automatically consider SEO impact.
2. Maintain site architecture consistency.
3. Preserve branding and design language.
4. Ensure mobile-first design.
5. Avoid duplication across pages.
6. Suggest improvements proactively.

---

# BRAND VOICE AND STYLE

Tone should remain:

- Professional
- Trustworthy
- Local-service focused
- Clear and approachable

Avoid overly technical or robotic language.

---

# FUTURE SEO SCALING

Always prepare structure for:

- Additional service pages
- More location pages
- Blog content expansion
- Backlink authority growth

Scalability must be preserved.

---

## PERMANENT CLAUDE SKILLS FOR THIS PROJECT

You are working on a UK local plumbing website.

PRIMARY GOALS:

- Improve SEO rankings in Peterborough.
- Increase lead conversions.
- Maintain professional brand tone.
- Optimize both code and content.

SEO CONTENT SKILLS:

- Always add SEO optimized content when editing pages.
- Adjust content based on page type:
  homepage, service page, area page, blog page.
- Include local SEO keywords naturally.
- Avoid keyword stuffing.
- Use UK English spelling.

TECHNICAL SEO SKILLS:

- Ensure each page has one H1.
- Maintain proper metadata.
- Optimize page speed.
- Maintain internal linking.

CONVERSION SKILLS:

- Add trust signals when appropriate.
- Suggest CTAs naturally.
- Focus on enquiry generation.

CODING SKILLS:

- Follow Next.js best practices.
- Maintain clean UI.
- Do not break layout or animations.
- Avoid unnecessary JS.

AUTOMATION BEHAVIOR:

Whenever editing code or content:

- Automatically consider SEO impact.
- Automatically suggest improvements.
- Preserve brand consistency.
- Avoid duplicate content.
