# Coding Skills — Peterborough Plumbers

## Core Rules

- Next.js App Router best practices (Server Components, ISR)
- 90+ Lighthouse performance score target
- Clean Tailwind with consistent design tokens
- Mobile-first responsive design
- WCAG AA accessibility standards
- Never break existing UI without explicit instruction

---

## Page Metadata — MANDATORY on Every page.tsx

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '[50-60 chars] [Keyword] in Peterborough | Brand — [Modifier]',
  description: '[140-160 chars] [Keyword + Location + CTA + Trust Signal]',
  alternates: { canonical: 'https://[domain]/[path]' },
  openGraph: {
    title: '[same as title]',
    description: '[same as description]',
    url: 'https://[domain]/[path]',
    siteName: 'Peterborough Plumbers',
    type: 'website',
    locale: 'en_GB',
    images: [{ url: 'https://[domain]/images/og/[page].jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  other: { 'geo.region': 'GB-CAM', 'geo.placename': 'Peterborough' },
};
```

---

## robots.txt — MUST exist (app/robots.ts)

```typescript
import { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] },
    sitemap: 'https://[domain]/sitemap.xml',
  };
}
```

---

## XML Sitemap — MUST exist (app/sitemap.ts)

```typescript
import { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://[domain]';
  const services = [
    'boiler-service', 'gas-safety-certificates', 'central-heating-services',
    'bathroom-installations', 'landlord-services', 'emergency-plumber',
    'plumbing-installation', 'plumbing-repairs', 'damp-leak-detection',
    'drain-blockages', 'pre-purchase-plumbing-survey'
  ];
  const areas = [
    'orton', 'werrington', 'hampton', 'bretton',
    'market-deeping', 'yaxley', 'whittlesey', 'stamford'
  ];
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...services.map(s => ({
      url: `${baseUrl}/services/${s}`, lastModified: new Date(),
      changeFrequency: 'monthly' as const, priority: 0.8
    })),
    ...areas.map(a => ({
      url: `${baseUrl}/areas/${a}`, lastModified: new Date(),
      changeFrequency: 'monthly' as const, priority: 0.7
    })),
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/book`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
```

---

## Canonical Tags

- EVERY page MUST have self-referencing canonical via `alternates.canonical`
- MUST use custom domain URL — NEVER vercel.app
- NO trailing slashes (enforce consistently)

---

## Image Optimization (MANDATORY)

- ALL images use Next.js `<Image>` with explicit `width` and `height`
- ALL images have descriptive alt text (5-15 words, keyword + location)
- ALL filenames: descriptive kebab-case, NO typos, NO spaces
- Hero/above-fold: `priority={true}`, `loading="eager"`
- Below-fold: lazy loading (default)
- WebP/AVIF preferred — max 200KB regular, 500KB hero

**Alt Text Formula:** `"[Action/subject] in [Location] — [Business]"`
```
✅ "Gas Safe engineer servicing a boiler in a Peterborough home"
✅ "Emergency plumber repairing a burst pipe in Bretton, Peterborough"
❌ "Boiler Service" (too generic)
❌ "image1.png" (meaningless)
```

---

## Page Speed Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

- Use `next/font` for all fonts (no external font loading)
- Minimize third-party scripts
- `<link rel="preconnect">` for external domains
- Dynamic imports for heavy components: `dynamic(() => import('./Map'), { ssr: false })`

---

## URL Structure

- ALL lowercase kebab-case, descriptive with target keyword
- MAX 3 levels: `/services/boiler-service` ✅
- NO trailing slashes, NO URL params on public pages
- NO dates in service/area URLs

---

## Accessibility (MANDATORY)

- `<html lang="en-GB">` in root layout
- ALL images: descriptive alt text
- ALL form inputs: `<label>` elements
- ALL links: descriptive text — NEVER "click here" or "learn more"
- Color contrast: 4.5:1 minimum (WCAG AA)
- Full keyboard navigation
- Skip-to-content link
- ARIA labels on interactive elements
- Phone: `<a href="tel:+44XXXXXXXXXX">` format
- Email: `<a href="mailto:email@domain.co.uk">` format

---

## JSON-LD Schema Component

```tsx
function JsonLd({ data }: { data: object | object[] }) {
  const schemas = Array.isArray(data) ? data : [data];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
```

---

## Placeholder Detection — ZERO TOLERANCE

NEVER allow these in code or content. STOP and ask for real values:
```
01234 567890    → real phone number
441234567890    → real WhatsApp number
123456          → real Gas Safe number
example.com     → real domain
lorem ipsum     → real content
TODO / FIXME    → resolve before deploy
[REAL ...]      → fill with actual values
```
