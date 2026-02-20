# SEO Skills — Peterborough Plumbers

## Core Rules

- Optimize ALL pages for UK local SEO (Peterborough focus)
- Target 95%+ SEO compliance score
- NEVER keyword stuff, duplicate content, or use spam tactics
- EVERY page must pass the Pre-Completion Checklist below before shipping

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

### Service Page — Service Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service Name]",
  "description": "[150+ char service description]",
  "url": "https://[domain]/services/[slug]",
  "provider": {"@id": "https://[domain]/#business"},
  "areaServed": {"@type": "City", "name": "Peterborough"},
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "[price]",
      "priceCurrency": "GBP"
    }
  }
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

### 🔴 Critical — BLOCKS completion (must ALL pass)

- [ ] Meta title: 50-60 chars, keyword + location + power modifier
- [ ] Meta description: 140-160 chars, keyword + CTA + trust signal
- [ ] Single H1 with primary keyword + location
- [ ] Canonical tag present with custom domain URL
- [ ] JSON-LD schema present and VALID for page type
- [ ] All images have descriptive alt text (5+ words)
- [ ] No placeholder content anywhere on page
- [ ] Real phone number in clickable `tel:` link
- [ ] Minimum 2 CTAs (top + bottom of page)
- [ ] Internal links: 3+ to other pages
- [ ] `<html lang="en-GB">` set
- [ ] robots meta allows indexing (`index, follow`)

### 🟡 Important — Fix same session if possible

- [ ] Open Graph tags complete (title, description, image, url)
- [ ] Twitter card tags present
- [ ] Breadcrumb schema on all subpages
- [ ] FAQ section with FAQPage schema (service + area pages)
- [ ] Word count meets minimum for page type
- [ ] H2 headings target keyword variations (3+ per page)
- [ ] Trust signals displayed (Gas Safe, years, rating)
- [ ] Urgency language near CTAs
- [ ] No generic anchor text ("click here", "learn more")
- [ ] Image filenames descriptive kebab-case, no typos

### 🟢 Enhancement — Note for future improvement

- [ ] Blog content strategy in progress
- [ ] Google Business Profile created and linked
- [ ] Local citations submitted to 10+ directories
- [ ] Review collection active (target 50+ at 4.5★)
- [ ] GA4 analytics + conversion tracking installed
- [ ] Social media profiles created and linked

---

## Score Targets

| Category | Target |
|----------|--------|
| On-Page SEO | 19/20 |
| Content Depth | 18/20 |
| Technical SEO | 19/20 |
| Local SEO | 19/20 |
| Conversion | 18/20 |
| Authority | 17/20 |
| **TOTAL** | **95+/120** |

---

## Validation

After creating or editing any page, run:
```bash
node .claude/skills/advanced-seo/scripts/seo-validator.js [path-to-html-file]
```
Target: **95%+ pass rate.** If below 90%, fix issues before completing.
