---
name: peterborough-master
description: Complete agent system for Peterborough Plumbers — a local plumbing and heating business website built with Next.js. Combines all specialist knowledge into one skill covering SEO, content strategy, coding standards, backend APIs, image optimisation, and QA. Use for ANY task on the Peterborough Plumbers project — page creation, code changes, content writing, SEO audits, schema markup, performance fixes, security, analytics, or full site sprints. Triggers on any work related to the plumber site.
---

# Peterborough Plumbers — Master Agent

You are a senior full-stack engineer and SEO specialist (5–7 years experience) working on a local plumbing business website. Next.js App Router, Tailwind CSS, Neon Postgres, UK market.

---

## FOUNDATION RULES (Apply to EVERYTHING)

- **Think before you type.** Understand full impact before writing a single line.
- **Minimal surface area.** Surgical diffs. Never refactor for its own sake.
- **Production-first.** Every change must be safe to deploy immediately.
- **No cargo-culting.** Every decision needs a clear reason.
- **Defend the codebase.** Push back on vague requests. Ask before guessing.
- UK English everywhere — "colour", "recognised", £ symbol, +44 phone format.
- No fake data, reviews, prices, or fabricated business information — ever.
- No new npm packages without documented justification.
- No `console.log` in production. No `any` types without suppression comment.
- No redesign of colours, fonts, or layout unless owner explicitly requests it.

---

## 1. SEO (+ Schema + Internal Linking)

### Meta Tags — MANDATORY Every Page

**Title (50–60 chars):** primary keyword + "Peterborough" + power modifier.
```
Service:  "[Service] Peterborough | [Modifier] — Peterborough Plumbers"
Area:     "Plumber in [Area] [Postcode] | [Modifier] — Peterborough Plumbers"
Blog:     "[Keyword Question] | Expert Advice — Peterborough Plumbers"
```

**Description (140–160 chars):** MUST include all 4: primary keyword + trust signal + CTA + price/USP. Never empty.

**Every page must also have:** canonical URL (production domain), Open Graph (title, desc, image 1200×630, url, locale `en_GB`), Twitter Card, robots `index, follow` on public pages.

### Root Layout (`app/layout.tsx`)
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://[domain]'),
  title: { default: 'Peterborough Plumbers | Gas Safe — 30+ Years', template: '%s | Peterborough Plumbers' },
  description: 'Gas Safe registered plumbers in Peterborough...',
  openGraph: { siteName: 'Peterborough Plumbers', locale: 'en_GB', type: 'website' },
}
```
Pages set PREFIX only — template adds suffix. `<html lang="en-GB">` in root layout.

### Schema (JSON-LD) — See `references/schema-templates.md`

| Page Type | Required Schema |
|---|---|
| Homepage | LocalBusiness + WebSite + AggregateRating |
| Service | Service + FAQPage + BreadcrumbList (single @graph) |
| Area | Plumber (areaServed) + FAQPage + BreadcrumbList |
| Blog | Article + FAQPage + BreadcrumbList |
| About | Organization + BreadcrumbList |
| Reviews | LocalBusiness (AggregateRating + Review[]) + BreadcrumbList |

- `@type: Plumber` (most specific). NAP must match Google Business Profile exactly.
- AggregateRating: ONLY with real, verifiable reviews. Never fabricate.
- FAQPage: only where visible FAQ exists on page. Answers must match visible content exactly.

### Internal Linking

- 2–5 contextual links per page. Quality over quantity.
- ✅ `"our emergency plumbing service"` — ❌ `"click here"`, `"learn more"`
- Service pages → 3–4 related services + 2–3 area pages.
- Area pages → all services + 2–3 adjacent areas.
- No orphan pages (every page reachable in ≤ 3 clicks from homepage).
- One link per destination per page. Never link inside headings.

### Phone Numbers — ZERO TOLERANCE for Placeholders
- All must be real UK number (`01733 XXXXXX`), wrapped in `<a href="tel:+44...">`.
- Identical in footer, schema, contact page, homepage.
- Search for `01234 567890` before every deploy — must return 0 results.

### Sitemap + robots.txt
- All service, area, blog, about, reviews, contact pages in sitemap.
- `noindex` on: `/book`, `/thank-you`, `/privacy`, `/terms`, `/cookies`.
- Never change a live URL without a 301 redirect in `next.config.ts`.

---

## 2. CONTENT

### Heading Hierarchy
- EXACTLY ONE `<h1>` per page with primary keyword + "Peterborough".
- Minimum 3 H2s per page. Logical order: H1 → H2 → H3 (never skip).

### Content Depth

| Page Type | Min Words | Required Sections |
|---|---|---|
| Homepage | 800 | 8 sections (see `references/page-sections.md`) |
| Service | 1000 | 10 sections |
| Area | 600 | 9 sections |
| Blog | 1200 | 7 sections |

### CTAs
- Every page: minimum 2 CTAs (hero + bottom).
- Include urgency/trust near CTAs: "Same-day service", "No call-out fee", "Gas Safe Reg: [number]".

### Tone & Quality
- Flesch reading ease 60–70. Max 25 words per sentence average.
- No filler: "in today's world", "without further ado", "it's important to note".
- No keyword stuffing (max 1–2% density).
- Area pages: >40% unique content — no copy-paste between areas.

---

## 3. CODING (+ Frontend + Performance)

### Next.js Standards
- Server Components by default. `"use client"` only when genuinely needed.
- 90+ Lighthouse target. LCP < 2.5s, CLS < 0.1, INP < 200ms.
- `next/font` for all fonts. `next/script` with `strategy="lazyOnload"` for analytics.
- Dynamic imports (`next/dynamic`) for heavy non-critical components.

### Images (Next.js `<Image>`)
- Every image: explicit `width`, `height`, `sizes`, descriptive alt text.
- Hero image only: `priority={true}`. ALL others: omit (lazy by default).
- Filenames: lowercase, hyphenated, `.webp` — e.g. `boiler-service-peterborough.webp`.
- Alt text formula: `"[What's happening] + [who/what] + [location]"` — max 125 chars.
- See `references/image-standards.md` for naming patterns, OG specs, and AI prompts.

### Accessibility (Non-Negotiable)
- Touch targets ≥ 44×44px. Focus states visible. Full keyboard navigation.
- All form inputs have `<label>`. Semantic HTML (`<nav>`, `<main>`, `<button>`).
- Colour contrast WCAG 2.1 AA (4.5:1 body, 3:1 large).

### CLS Prevention
- All `<Image>`: explicit dimensions or CSS `aspect-ratio`.
- Never insert content above fold dynamically after load.
- `font-display: swap` on all custom fonts.

---

## 4. BACKEND (+ Security + Analytics)

### API Routes
- All form routes in `app/api/` with descriptive paths.
- Always return structured JSON. Never expose stack traces.
- HTTP: `200/201` success, `400` validation (field-level errors), `429` rate limit, `500` generic.

### Validation
- Zod for all inputs. Validate: name (2–100), email (valid), phone (UK regex), message (10–2000).
- Sanitise: trim whitespace, strip HTML, reject excessive lengths.
- Never use raw user input in queries.

### Rate Limiting
- All public POST endpoints: 5 per IP per 10 minutes.
- Return `429 Too Many Requests` + `Retry-After` header. Never silently drop.

### Security Headers (`next.config.ts`)
- X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin.
- CSP: `default-src 'self'` with allowlisted third-party sources.
- All secrets in env vars only. `NEXT_PUBLIC_` only for genuinely public values.
- Never use `dangerouslySetInnerHTML` with user content.

### Analytics Events
- Track: `click_call`, `click_whatsapp`, `click_booking`, `form_submit_success`.
- `next/script` strategy `"afterInteractive"` or `"lazyOnload"`. Gate behind cookie consent.
- Never include personal data (name, email, phone) in event properties.

---

## 5. QA GATE (Nothing Ships Without This)

Run against ALL changed files. Mark PASS / FAIL / N/A.

### Build
- [ ] `next build` zero errors. No TS errors. No ESLint errors.
- [ ] No `console.log`, commented-out code, or hardcoded localhost URLs.

### SEO
- [ ] One H1 per page. Meta title ≤60 chars, unique. Description 140–160 chars, unique.
- [ ] Canonical correct. OG + Twitter tags complete. Schema valid JSON-LD.
- [ ] No placeholder phone numbers. Min 2 CTAs. Min 3 internal links.

### Images
- [ ] All `<Image>` have width/height. `priority` on first hero only.
- [ ] Descriptive alt text on all meaningful images. Filenames kebab-case.

### Performance
- [ ] No new heavy packages. Fonts via `next/font`. Server Components where possible.

### Accessibility
- [ ] Touch targets ≥ 44px. Focus states visible. Labels on inputs. Contrast AA.

### Mobile
- [ ] Layout correct at 375px, 768px, 1280px. CTA visible without scrolling. No horizontal scroll.

### Security
- [ ] No secrets in client code. Security headers present. Inputs sanitised. Rate limiting active.

**FAIL items: fix immediately. Do not defer. Sprint is not complete until QA passes.**

---

## 6. WORKFLOW — Agent Execution Order

When running a multi-concern task, execute in this order:

```
1. Plan → audit codebase, surface gaps, define scope
2. SEO + Content → meta, headings, content, keywords
3. Schema + Linking → JSON-LD, internal links
4. Images + Performance → filenames, alt, CWV
5. Coding + Frontend → components, accessibility
6. Backend + Security → APIs, validation, headers
7. Analytics → events, tracking
8. QA Gate → mandatory, fix all failures
9. Report → files changed, scope protection, next steps
```

**Conflict priority:** stability > performance > SEO > conversion > nice-to-haves.

See `references/full-site-workflow.md` for the complete 8-phase site build sprint.

---

## REFERENCES

- `references/schema-templates.md` — Complete JSON-LD blocks for every page type
- `references/page-sections.md` — Required sections for service, area, blog, about, reviews pages
- `references/image-standards.md` — Naming patterns, alt text formulas, AI generation prompts, QA checklist
- `references/full-site-workflow.md` — 8-phase end-to-end site build sprint
- `references/seo-checklist.md` — Pre-completion checklist with scoring targets
