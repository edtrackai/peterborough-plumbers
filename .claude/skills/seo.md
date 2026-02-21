# SEO Skills — Peterborough Plumbers

## Core Rules

- Optimize ALL pages for UK local SEO (Peterborough focus)
- Target 95%+ SEO compliance score
- NEVER keyword stuff, duplicate content, or use spam tactics
- EVERY page must pass the Pre-Completion Checklist below before shipping

---

## Meta Tags — MANDATORY on Every Page

### Meta Title (50–60 characters)
- MUST contain: primary keyword + "Peterborough" + power modifier
- Power modifiers: Trusted, Professional, Emergency, Certified, Same-Day, 24/7, Gas Safe, Expert, From £X
- NEVER duplicate across pages
- Always verify character count before shipping

**Formula by page type:**
```
Service:   "[Service] Peterborough | [Modifier] — Peterborough Plumbers"
Area:      "Plumber in [Area] [Postcode] | [Modifier] — Peterborough Plumbers"
Homepage:  "Peterborough Plumbers | Gas Safe — 30+ Years Trusted Local Service"
Blog:      "[Keyword Question] | Expert Advice — Peterborough Plumbers"
```

**Examples:**
```
✅ "Boiler Service Peterborough | From £79 | Gas Safe"          (51 chars)
✅ "Emergency Plumber Peterborough | 24/7 | Same-Day Response"  (58 chars)
✅ "Plumber in Werrington PE4 | Same-Day — Peterborough Plumbers" (60 chars)
❌ "Welcome to Our Website"                    (no keyword, no location)
❌ "Peterborough Plumbers Peterborough Service" (stuffed, no value)
```

### Meta Description (140–160 characters)
**ALL FOUR elements are MANDATORY — every meta description must include:**
1. **Primary keyword** — exact match (e.g. "boiler service Peterborough")
2. **Trust signal** — Gas Safe / 30+ years / 4.6★ / Gas Safe Reg
3. **CTA** — "Call now", "Book today", "Get a free quote", "Book online"
4. **Price/USP** — from £X / no call-out fee / same-day / 24/7

**Formula:**
```
[Primary keyword] in Peterborough [trust signal]. [USP/price detail]. [CTA].
```

**Examples:**
```
✅ "Gas Safe boiler service in Peterborough from £79. 30+ years experience, all
   major brands. No hidden fees. Book online or call today."
   (156 chars ✅)

✅ "Annual boiler service from £79 by Gas Safe engineers in Peterborough.
   Keep your heating safe & efficient. Book online or call today."
   (138 chars ✅)

✅ "Emergency plumber in Peterborough available 24/7. Gas Safe registered,
   response within 1 hour. No call-out fee. Call 01234 567890 now."
   (142 chars ✅)

❌ "We are Peterborough Plumbers and we offer great plumbing services."
   (no CTA, no trust signal, no price — REJECTED)

❌ "" (empty — CRITICAL FAIL, Google generates its own)
```

**Implementation in Next.js (app/services/[slug]/page.tsx):**
```typescript
export const metadata: Metadata = {
  title: "Boiler Service Peterborough | From £79 | Gas Safe",
  description: "Annual boiler service from £79 by Gas Safe engineers in Peterborough. All major brands. No hidden fees. Book online or call today.",
}
```

---

## Open Graph + Twitter Card Tags — MANDATORY on Every Page

Add to every page's `<head>` via Next.js metadata export. Required on ALL page types.

### Next.js Metadata Implementation
```typescript
export const metadata: Metadata = {
  title: "[Page Title]",
  description: "[Meta description — same as above]",

  // Canonical URL — MANDATORY
  alternates: {
    canonical: "https://[domain]/[page-path]",
  },

  // Open Graph — MANDATORY
  openGraph: {
    title: "[Page Title]",
    description: "[Meta description]",
    url: "https://[domain]/[page-path]",
    siteName: "Peterborough Plumbers",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://[domain]/images/og/[page-slug]-og.jpg",
        width: 1200,
        height: 630,
        alt: "[Descriptive alt text for OG image]",
      },
    ],
  },

  // Twitter Card — MANDATORY
  twitter: {
    card: "summary_large_image",
    title: "[Page Title]",
    description: "[Meta description]",
    images: ["https://[domain]/images/og/[page-slug]-og.jpg"],
  },

  // Robots — MANDATORY (allow indexing on all public pages)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}
```

### Boiler Service Page — Exact Metadata Example
```typescript
export const metadata: Metadata = {
  title: "Boiler Service Peterborough | From £79 | Gas Safe",
  description: "Annual boiler service from £79 by Gas Safe engineers in Peterborough. All major brands covered. No hidden fees. Book online or call today.",

  alternates: {
    canonical: "https://[domain]/services/boiler-service",
  },

  openGraph: {
    title: "Boiler Service Peterborough | From £79 | Gas Safe",
    description: "Annual boiler service from £79 by Gas Safe engineers in Peterborough. All major brands covered. No hidden fees. Book online or call today.",
    url: "https://[domain]/services/boiler-service",
    siteName: "Peterborough Plumbers",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://[domain]/images/og/boiler-service-og.jpg",
        width: 1200,
        height: 630,
        alt: "Gas Safe boiler service engineer in Peterborough — from £79",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Boiler Service Peterborough | From £79 | Gas Safe",
    description: "Annual boiler service from £79 by Gas Safe engineers in Peterborough. All major brands. Book online today.",
    images: ["https://[domain]/images/og/boiler-service-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
}
```

### OG Image Requirements
- Dimensions: **1200×630px** (standard) — NEVER smaller
- Format: JPG or PNG, under 1MB
- File naming: kebab-case, e.g. `boiler-service-og.jpg`
- Location: `/public/images/og/[page-slug]-og.jpg`
- Content: page-relevant image + business name overlay
- EVERY page needs its own unique OG image — never reuse across pages

---

## HTML Tag Requirements — MANDATORY on Every Page

### Root HTML Tag
```html
<html lang="en-GB">
```
This MUST be set in your root layout (`app/layout.tsx`):
```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  )
}
```

### Canonical Tag
- MANDATORY on every page — prevents duplicate content penalties
- Must use the production domain, not vercel preview URLs
- Set via Next.js `alternates.canonical` in metadata (see above)
- Verify canonical points to the correct URL (no trailing slashes inconsistency)

```html
<!-- Rendered output should look like: -->
<link rel="canonical" href="https://[domain]/services/boiler-service" />
```

### Robots Meta
- All public pages: `index, follow`
- Thank-you / confirmation pages: `noindex, nofollow`
- Set via Next.js `robots` in metadata (see above)

---

## Phone Number Policy — MANDATORY

**NEVER use placeholder phone numbers in production.**

- All phone numbers across the site MUST be real, dialable UK numbers
- Format: `01733 XXXXXX` (Peterborough area code)
- Every phone number MUST be wrapped in a `tel:` link:
```html
<a href="tel:+441733XXXXXX">01733 XXXXXX</a>
```
- NAP phone number must be **character-for-character identical** on:
  - Every page footer
  - Contact page
  - Homepage
  - All schema markup
  - Google Business Profile
- Before shipping any page, do a global search for `01234 567890` and replace with real number
- WhatsApp link must also use the real number: `https://wa.me/441733XXXXXX`

**Checklist before shipping:**
```bash
# Search for placeholder numbers in codebase — must return 0 results
grep -r "01234 567890" ./src
grep -r "441234567890" ./src
```

---

## Schema Markup — JSON-LD (MANDATORY on Every Page)

### Schema Requirements by Page Type

| Page Type | Required Schema |
|-----------|----------------|
| Homepage | LocalBusiness + WebSite + AggregateRating |
| Service pages | Service + FAQPage + BreadcrumbList |
| Area pages | Service (area-specific) + BreadcrumbList |
| Blog posts | Article + BreadcrumbList + FAQPage (if FAQs) |
| About page | Organization + BreadcrumbList |
| Contact page | LocalBusiness + BreadcrumbList |
| Review page | AggregateRating + Review (multiple) + BreadcrumbList |

### Homepage — LocalBusiness Schema

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Plumber",
      "@id": "https://[domain]/#business",
      "name": "Peterborough Plumbers",
      "description": "Gas Safe registered plumbers in Peterborough with 30+ years experience.",
      "url": "https://[domain]",
      "telephone": "+44[REAL-NUMBER]",
      "email": "[REAL-EMAIL]",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[REAL ADDRESS]",
        "addressLocality": "Peterborough",
        "addressRegion": "Cambridgeshire",
        "postalCode": "[REAL POSTCODE]",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "[REAL LAT]",
        "longitude": "[REAL LNG]"
      },
      "image": "https://[domain]/images/logo.png",
      "priceRange": "££",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "08:00", "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "09:00", "closes": "16:00"
        }
      ],
      "areaServed": [
        {"@type": "City", "name": "Peterborough"},
        {"@type": "Place", "name": "Werrington"},
        {"@type": "Place", "name": "Orton"},
        {"@type": "Place", "name": "Hampton"},
        {"@type": "Place", "name": "Bretton"},
        {"@type": "Place", "name": "Market Deeping"},
        {"@type": "Place", "name": "Yaxley"},
        {"@type": "Place", "name": "Whittlesey"},
        {"@type": "Place", "name": "Stamford"}
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",
        "reviewCount": "[REAL COUNT]",
        "bestRating": "5"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://[domain]/#website",
      "url": "https://[domain]",
      "name": "Peterborough Plumbers",
      "publisher": {"@id": "https://[domain]/#business"}
    }
  ]
}
```

### Service Page — Full Schema Block (Service + FAQPage + BreadcrumbList)

**MANDATORY:** All 3 schemas must be present on every service page as a single `@graph` block.
Place inside a `<script type="application/ld+json">` tag in the `<head>` of every service page.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://[domain]/services/[slug]/#service",
      "name": "[Service Name] in Peterborough",
      "description": "[150+ char description — include Gas Safe, price, location]",
      "url": "https://[domain]/services/[slug]",
      "provider": {
        "@type": "Plumber",
        "@id": "https://[domain]/#business",
        "name": "Peterborough Plumbers",
        "telephone": "+44[REAL-NUMBER]",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Peterborough",
          "addressRegion": "Cambridgeshire",
          "addressCountry": "GB"
        }
      },
      "areaServed": [
        {"@type": "City", "name": "Peterborough"},
        {"@type": "Place", "name": "Werrington"},
        {"@type": "Place", "name": "Orton"},
        {"@type": "Place", "name": "Hampton"},
        {"@type": "Place", "name": "Bretton"},
        {"@type": "Place", "name": "Market Deeping"},
        {"@type": "Place", "name": "Yaxley"},
        {"@type": "Place", "name": "Whittlesey"},
        {"@type": "Place", "name": "Stamford"}
      ],
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "[price]",
          "priceCurrency": "GBP",
          "minPrice": "[min]",
          "maxPrice": "[max]"
        },
        "availability": "https://schema.org/InStock"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "[Service Name] Services"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://[domain]/services/[slug]/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "[Full question text — use exact H3 from page]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[Answer text — 80-150 words, match page FAQ content exactly]"
          }
        },
        {
          "@type": "Question",
          "name": "[Question 2]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[Answer 2]"
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://[domain]/services/[slug]/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://[domain]/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://[domain]/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "[Service Name]",
          "item": "https://[domain]/services/[slug]"
        }
      ]
    }
  ]
}
```

**Boiler Service Page — Exact Schema Example:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://[domain]/services/boiler-service/#service",
      "name": "Boiler Service in Peterborough",
      "description": "Annual boiler servicing from £79 by Gas Safe registered engineers in Peterborough. All major brands covered. Written service record provided.",
      "url": "https://[domain]/services/boiler-service",
      "provider": {"@id": "https://[domain]/#business"},
      "areaServed": {"@type": "City", "name": "Peterborough"},
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "79",
          "priceCurrency": "GBP"
        }
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How often should I service my boiler?",
          "acceptedAnswer": {"@type": "Answer", "text": "We recommend servicing your boiler every 12 months. Most manufacturers require annual Gas Safe servicing to keep the warranty valid."}
        },
        {
          "@type": "Question",
          "name": "How much does a boiler service cost in Peterborough?",
          "acceptedAnswer": {"@type": "Answer", "text": "Our standard boiler service starts from just £79 with no hidden fees or call-out charges. Bundle discounts available with gas safety certificate (CP12)."}
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://[domain]/"},
        {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://[domain]/services"},
        {"@type": "ListItem", "position": 3, "name": "Boiler Service", "item": "https://[domain]/services/boiler-service"}
      ]
    }
  ]
}
```

### FAQ Schema (on every page with FAQ section)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer 80-150 words]"
      }
    }
  ]
}
```

### Breadcrumb Schema (every page EXCEPT homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://[domain]/"},
    {"@type": "ListItem", "position": 2, "name": "[Parent]", "item": "https://[domain]/[parent]"},
    {"@type": "ListItem", "position": 3, "name": "[Current Page]"}
  ]
}
```

---

## Google Business Profile Integration

- Link to GBP from footer
- Embed Google Maps on contact page
- Display/link Google Reviews on homepage + reviews page
- GBP NAP MUST match website NAP exactly (character-for-character)

---

## Local Citations (Authority Building)

Priority directories to submit to:
1. Google Business Profile
2. Checkatrade
3. MyBuilder
4. TrustATrader
5. Yell.com
6. Thomson Local
7. FreeIndex
8. Bark
9. Bing Places
10. Apple Maps

All citations MUST use identical NAP to the website.

---

## Avoid (Harmful SEO Practices)

- Keyword stuffing (>2% density)
- Duplicate content across pages
- Hidden text or links
- Cloaking or sneaky redirects
- Paid link schemes
- Auto-generated thin content
- Doorway pages
- Fake reviews or testimonials
- Spam anchor text
- Link farms or PBNs

---

## 🔴🟡🟢 PRE-COMPLETION CHECKLIST

**Claude MUST verify ALL Critical items before any page task is marked complete.**
**A page is NOT done until every 🔴 item passes. No exceptions.**

### 🔴 Critical — BLOCKS completion (must ALL pass)

**Meta & Titles**
- [ ] Meta title: 50–60 chars exactly — keyword + "Peterborough" + power modifier
- [ ] Meta description: 140–160 chars — keyword + trust signal + CTA + price/USP — NEVER empty
- [ ] Meta description is UNIQUE — not duplicated on any other page

**Headings**
- [ ] Single H1 with primary keyword + "Peterborough" — first heading on page
- [ ] Minimum 3 H2s — each targeting a different keyword variation

**Technical Tags**
- [ ] `<html lang="en-GB">` set on root layout
- [ ] Canonical tag present — points to production domain URL (not vercel preview)
- [ ] robots meta: `index, follow` on all public pages
- [ ] Open Graph tags: title, description, image (1200×630), url, locale, siteName — ALL present
- [ ] Twitter Card tags: card type, title, description, image — ALL present

**Schema**
- [ ] JSON-LD schema present in `<head>` — correct type for page (see schema table)
- [ ] Service pages: Service + FAQPage + BreadcrumbList — all 3 in single @graph block
- [ ] FAQ schema answers match page FAQ content exactly (copy-for-copy)
- [ ] BreadcrumbList on all subpages — correct path and URLs

**Content & Links**
- [ ] All images have descriptive alt text — minimum 5 words, keyword-relevant
- [ ] Image filenames are descriptive kebab-case with no typos (e.g. `boiler-service-peterborough.jpg`)
- [ ] OG image exists at correct path `/public/images/og/[slug]-og.jpg` — 1200×630px
- [ ] Internal links: 3+ in body content with descriptive anchor text
- [ ] No generic anchor text ("click here", "learn more", "this page")

**Phone & NAP**
- [ ] NO placeholder phone numbers anywhere — `01234 567890` must be replaced with real number
- [ ] Real phone number wrapped in `<a href="tel:+44XXXXXXXXXX">` — clickable on mobile
- [ ] WhatsApp link uses real number: `https://wa.me/44XXXXXXXXXX`
- [ ] Phone number is character-for-character identical in footer, schema, and GBP

**CTAs**
- [ ] Minimum 2 CTAs — one in hero/top area, one at bottom of page
- [ ] No placeholder content anywhere on page (addresses, emails, names, prices)

### 🟡 Important — Fix same session if possible

- [ ] Word count meets minimum for page type (see content.md table)
- [ ] Trust signals visible on page: Gas Safe reg number, years experience, star rating
- [ ] Urgency language near CTAs: "same-day", "within 1 hour", "no call-out fee"
- [ ] FAQ section present with minimum 5 FAQs (service pages) / 3 FAQs (area pages)
- [ ] Related services section: 3–4 cards linking to other service pages
- [ ] Areas section: all 9 areas listed and linked
- [ ] Breadcrumb visible on page (not just in schema)

### 🟢 Enhancement — Note for future improvement

- [ ] Blog content strategy in progress
- [ ] Google Business Profile created and linked
- [ ] Local citations submitted to 10+ directories
- [ ] Review collection active (target 50+ at 4.5★)
- [ ] GA4 analytics + conversion tracking installed
- [ ] Social media profiles created and linked

---

## Score Targets

| Category | What's Measured | Target |
|----------|----------------|--------|
| On-Page SEO | Meta title, meta description, H1, canonical, robots, lang | 19/20 |
| Schema / Technical | JSON-LD (Service+FAQ+Breadcrumb), OG tags, Twitter tags | 19/20 |
| Content Depth | Word count, all 10 sections present, FAQ quality | 18/20 |
| Local SEO | Location mentions, NAP consistency, real phone, areas | 19/20 |
| Conversion | CTAs, urgency language, trust signals, WhatsApp | 18/20 |
| Authority | Internal links, anchor text quality, image filenames | 17/20 |
| **TOTAL** | | **95+/120** |

**Minimum passing threshold per category: 16/20**
Any category below 16 must be fixed before the page is marked complete.

---

## Validation

After creating or editing any page, run:
```bash
node .claude/skills/advanced-seo/scripts/seo-validator.js [path-to-html-file]
```
Target: **95%+ pass rate.** If below 90%, fix issues before completing.

---

## URL Slug Standards — MANDATORY

- All URLs: lowercase, hyphenated, no trailing slashes, no special characters
- Include primary keyword in slug — never use generic slugs like `/page-1`
- Max 3–5 words per slug

```
✅ /services/boiler-service
✅ /services/emergency-plumber-peterborough
✅ /areas/werrington-peterborough
✅ /blog/boiler-service-cost-peterborough
❌ /services/service1
❌ /page?id=23
❌ /Services/Boiler_Service
```

Never change a live URL without adding a 301 redirect. Changing slugs kills accumulated SEO authority.

---

## Sitemap & robots.txt — MANDATORY

### Next.js Sitemap (app/sitemap.ts)
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://[domain]'
  const lastModified = new Date()

  return [
    { url: domain, lastModified, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${domain}/services`, lastModified, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${domain}/services/boiler-service`, lastModified, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${domain}/services/emergency-plumber`, lastModified, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${domain}/services/gas-safety-certificates`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${domain}/services/central-heating-services`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${domain}/services/bathroom-installations`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${domain}/services/plumbing-repairs`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${domain}/services/plumbing-installation`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${domain}/services/landlord-services`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${domain}/services/drain-blockages`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${domain}/services/damp-leak-detection`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${domain}/services/pre-purchase-plumbing-survey`, lastModified, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${domain}/areas`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${domain}/areas/city-centre`, lastModified, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${domain}/areas/werrington`, lastModified, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${domain}/areas/orton`, lastModified, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${domain}/areas/hampton`, lastModified, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${domain}/areas/bretton`, lastModified, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${domain}/areas/market-deeping`, lastModified, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${domain}/areas/yaxley`, lastModified, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${domain}/areas/whittlesey`, lastModified, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${domain}/areas/stamford`, lastModified, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${domain}/about`, lastModified, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${domain}/reviews`, lastModified, priority: 0.6, changeFrequency: 'weekly' },
    { url: `${domain}/contact`, lastModified, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${domain}/blog`, lastModified, priority: 0.7, changeFrequency: 'weekly' },
  ]
}
```

### robots.txt (public/robots.txt)
```
User-agent: *
Allow: /

Disallow: /book
Disallow: /thank-you
Disallow: /api/
Disallow: /_next/
Disallow: /privacy
Disallow: /terms
Disallow: /cookies

Sitemap: https://[domain]/sitemap.xml
```

Rules:
- NEVER disallow service, area, blog, or about pages
- Always include Sitemap URL at bottom
- Submit sitemap to Google Search Console after every deployment

---

## Site-Wide Base Metadata — layout.tsx (MANDATORY)

Set this in `app/layout.tsx` as the base — individual pages override as needed:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://[domain]'),  // ← CRITICAL: prevents relative URL issues

  title: {
    default: 'Peterborough Plumbers | Gas Safe — 30+ Years',
    template: '%s | Peterborough Plumbers',  // ← auto-appends suffix to page titles
  },

  description: 'Gas Safe registered plumbers in Peterborough with 30+ years experience. Boiler service, emergency repairs, bathroom installations. Call for a free quote.',

  openGraph: {
    siteName: 'Peterborough Plumbers',
    locale: 'en_GB',
    type: 'website',
  },
}
```

**Fix for duplicate title bug (confirmed on live site):**
Current broken title: *"Peterborough Plumbers | Gas Safe | Peterborough Plumbers"* — name appears twice.
Cause: full title string set in both `layout.tsx` AND `page.tsx`.
Fix: pages only set the PREFIX — the template adds the suffix automatically:
```typescript
// page.tsx — correct pattern
export const metadata: Metadata = {
  title: "Boiler Service Peterborough | From £79 | Gas Safe",
  // Renders as: "Boiler Service Peterborough | From £79 | Gas Safe | Peterborough Plumbers"
}
```

---

## noindex Rules — Pages That Must NOT Be Indexed

```typescript
// Apply to: app/book/page.tsx, app/thank-you/page.tsx, app/privacy/page.tsx etc.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
```

Must be noindex: `/book`, `/thank-you`, `/privacy`, `/terms`, `/cookies`, any `?page=N` duplicates.
Must be indexed: all service, area, blog, about, reviews, contact pages.

---

## Missing Schema Templates

### Area Page Schema
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Plumber",
      "name": "Peterborough Plumbers — [Area Name]",
      "url": "https://[domain]/areas/[slug]",
      "provider": {"@id": "https://[domain]/#business"},
      "areaServed": {
        "@type": "Place",
        "name": "[Area Name]",
        "containedIn": {"@type": "City", "name": "Peterborough"}
      },
      "description": "Gas Safe registered plumbers serving [Area Name], Peterborough. Emergency callouts, boiler servicing, heating repairs."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you cover [Area Name]?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we cover [Area Name] ([Postcode]) and surrounding streets. Typical response time is [X] minutes."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://[domain]/"},
        {"@type": "ListItem", "position": 2, "name": "Areas", "item": "https://[domain]/areas"},
        {"@type": "ListItem", "position": 3, "name": "[Area Name]", "item": "https://[domain]/areas/[slug]"}
      ]
    }
  ]
}
```

### Blog / Article Schema
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://[domain]/blog/[slug]/#article",
      "headline": "[Blog H1 — exact match]",
      "description": "[Meta description]",
      "url": "https://[domain]/blog/[slug]",
      "datePublished": "YYYY-MM-DD",
      "dateModified": "YYYY-MM-DD",
      "author": {"@type": "Organization", "name": "Peterborough Plumbers", "@id": "https://[domain]/#business"},
      "publisher": {"@id": "https://[domain]/#business"},
      "image": {
        "@type": "ImageObject",
        "url": "https://[domain]/images/blog/[image].webp",
        "width": 1200, "height": 630
      }
    },
    {"@type": "FAQPage", "mainEntity": []},
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://[domain]/"},
        {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://[domain]/blog"},
        {"@type": "ListItem", "position": 3, "name": "[Post Title]", "item": "https://[domain]/blog/[slug]"}
      ]
    }
  ]
}
```

### About Page Schema
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://[domain]/#business",
      "name": "Peterborough Plumbers",
      "url": "https://[domain]",
      "foundingDate": "[YEAR]",
      "numberOfEmployees": {"@type": "QuantitativeValue", "value": "12"},
      "description": "Gas Safe registered plumbing and heating company serving Peterborough for 30+ years.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Peterborough",
        "addressRegion": "Cambridgeshire",
        "addressCountry": "GB"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+44[REAL-NUMBER]",
        "contactType": "customer service",
        "availableLanguage": "English",
        "areaServed": "Peterborough"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://[domain]/"},
        {"@type": "ListItem", "position": 2, "name": "About Us", "item": "https://[domain]/about"}
      ]
    }
  ]
}
```

### Reviews Page Schema
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://[domain]/#business",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",
        "reviewCount": "[REAL COUNT]",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {"@type": "Person", "name": "[Real reviewer name]"},
          "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
          "reviewBody": "[Real review text]",
          "datePublished": "YYYY-MM-DD"
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://[domain]/"},
        {"@type": "ListItem", "position": 2, "name": "Reviews", "item": "https://[domain]/reviews"}
      ]
    }
  ]
}
```

---

## Core Web Vitals — Performance Targets (Google Ranking Signal)

| Metric | Target | What it measures |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s | Hero image load speed |
| INP (Interaction to Next Paint) | < 200ms | Responsiveness |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |
| FCP (First Contentful Paint) | < 1.8s | Initial render speed |

**To hit these in Next.js:**
- `priority={true}` on hero image ONLY (preloads it as LCP element)
- Always set `width` + `height` on all images (prevents CLS)
- Use WebP format (30–50% smaller than PNG)
- Use `next/font` for font optimisation
- Lazy load all below-fold images (Next.js default)

**Check with:**
```bash
# https://pagespeed.web.dev/  ← target 90+ on all four scores
# Chrome DevTools > Lighthouse tab
```

---

## 301 Redirect Strategy

If any URL ever changes, add a 301 immediately in `next.config.js`:

```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-slug',
        destination: '/new-slug',
        permanent: true,  // 301 — passes full SEO authority. Never use false (302).
      },
    ]
  },
}
```

Track all redirects in `/docs/redirects.md`. Never delete a page with inbound links without redirecting it.
