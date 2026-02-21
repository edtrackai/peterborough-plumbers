# Agent: Images — Advanced Image SEO
# Built from live audit of peterborough-plumbers.vercel.app
# Seniority: 5–7 years | Applies to ALL pages site-wide

---

## WHAT THIS AGENT IS RESPONSIBLE FOR

Every image on every page must pass ALL of the following:

1. Filename — SEO-optimised, no spaces, no capitals, WebP format
2. Alt text — descriptive, locally relevant, no duplicates, correct length
3. Next.js Image implementation — correct props, correct priority, correct sizes
4. Format & weight — WebP source, appropriately sized, not wastefully large
5. Schema — ImageObject in page JSON-LD where applicable
6. Context — image placed where it adds genuine content value
7. OG image — every page has a social share image at correct spec

---

## ISSUES FOUND ON YOUR LIVE SITE (Fix These First)

The following problems were confirmed by auditing /services/boiler-service.
These are shared components, so fixing them fixes every page simultaneously.

### CONFIRMED BROKEN IMAGES

| Current filename (broken) | Fix to | Problem |
|---|---|---|
| `boiler service.png` | `boiler-service-peterborough-gas-safe.webp` | Space in name + PNG format |
| `Central heatinf service.png` | `central-heating-service-peterborough.webp` | Typo + space + PNG |
| `Gas safety certificate.png` | `gas-safety-certificate-peterborough.webp` | Space + PNG |
| `emergency plumbing.png` | `emergency-plumber-peterborough-24hr.webp` | Space + PNG |

### CONFIRMED BROKEN ALT TEXT

| Current alt text (broken) | Fixed alt text |
|---|---|
| `"professional boiler service service in Peterborough by Gas Safe registered engineers"` | `"Gas Safe engineer carrying out an annual boiler service in a Peterborough home"` |
| `"Central Heating Services service in Peterborough — Full central heating installation, repair, and maintenance including radiators, "` | `"Central heating installation and repair in a Peterborough home"` (truncated in HTML — rewrite in full) |
| `"Gas Safety Certificates service in Peterborough — Landlord gas safety certificates (CP12) and domestic gas safety checks by qualif"` | `"Gas Safe engineer completing a CP12 gas safety certificate inspection in Peterborough"` |
| `"Emergency Plumber Service service in Peterborough — 24/7 emergency plumbing service for burst pipes, leaks, boiler breakdowns, and b"` | `"Emergency plumber responding to a burst pipe in a Peterborough home"` |

### CONFIRMED BROKEN NEXT.JS IMAGE PROPS

Current (broken):
```tsx
<Image
  src="/images/services/boiler service.png"
  alt="professional boiler service service in Peterborough..."
  width={3840}
  height={...}
  // No sizes prop
  // priority status unknown
/>
```

Fixed:
```tsx
<Image
  src="/images/services/boiler-service-peterborough-gas-safe.webp"
  alt="Gas Safe engineer carrying out an annual boiler service in a Peterborough home"
  width={1200}
  height={675}
  sizes="100vw"
  priority={true}   // ONLY because this is the first hero on the page
  quality={85}
/>
```

---

## RULE 1 — FILENAME STANDARDS (Non-Negotiable)

Every image file on disk must follow this exact format:

```
[service/subject]-[location]-[context].webp
```

### Rules
- Lowercase only — no capitals ever
- Hyphens only — no spaces, underscores, or special characters
- No generic names — no `image1.webp`, `hero.webp`, `photo.webp`
- No typos — spell-check every filename before saving
- Format must be `.webp` — never `.png` or `.jpg` as the primary source
- Length: 3–8 words maximum — descriptive but not excessive

### Naming by page type

**Service page hero:**
```
[service]-[city].webp
boiler-service-peterborough.webp
emergency-plumber-peterborough.webp
drain-unblocking-peterborough.webp
gas-safety-certificate-peterborough.webp
```

**Service page secondary images:**
```
[service]-[specific-action]-peterborough.webp
boiler-service-combustion-check-peterborough.webp
boiler-service-engineer-flue-inspection.webp
```

**Area page hero:**
```
plumber-[area-name]-peterborough.webp
plumber-werrington-peterborough.webp
plumber-orton-peterborough.webp
```

**Blog post images:**
```
[primary-keyword-slug]-[number].webp
how-to-bleed-radiator-step-1.webp
signs-boiler-needs-replacing-peterborough.webp
```

**Related service cards (shared component):**
```
[service]-service-peterborough-card.webp
central-heating-service-peterborough-card.webp
```

**OG / social share images:**
```
/public/images/og/[page-slug].jpg   ← JPG only for OG (wider platform support)
/public/images/og/boiler-service.jpg
/public/images/og/emergency-plumber.jpg
```

---

## RULE 2 — ALT TEXT STANDARDS (Non-Negotiable)

### The formula
```
[What is happening] + [who/what is involved] + [location where natural]
```

### Rules
- Maximum 125 characters — measure before committing
- No duplicated words anywhere in the string
- No keyword stuffing — write for a visually impaired user first
- Include city/area name where it fits naturally — never force it
- Never start with "Image of" or "Photo of" — Google ignores these words
- Never leave alt empty on a meaningful image — only decorative images get `alt=""`
- Never truncate — alt text must be a complete sentence

### Good vs bad examples

| ❌ Bad | ✅ Good |
|---|---|
| `"boiler service"` | `"Gas Safe engineer checking boiler pressure during an annual service in Peterborough"` |
| `"professional boiler service service in Peterborough"` | `"Peterborough plumber inspecting a combi boiler flue for safety"` |
| `"plumber"` | `"Plumber fixing a burst pipe under a kitchen sink in a Peterborough home"` |
| `"Central heatinf service.png"` (used as alt) | `"Central heating radiator installation in a Peterborough living room"` |
| `"image1"` | `"Blocked drain being cleared by a Peterborough drainage engineer"` |
| Truncated mid-sentence | Always write the complete description |

### Alt text by image type

**Hero images (service pages):**
```
"[Job description] by Gas Safe registered engineers in Peterborough"
"Gas Safe engineer servicing a Worcester Bosch combi boiler in a Peterborough kitchen"
```

**Hero images (area pages):**
```
"Local plumber carrying out [service] in [Area Name], Peterborough"
"Emergency plumber fixing a burst pipe in Werrington, Peterborough"
```

**Process / step images:**
```
"[Step description] during a boiler service in Peterborough"
"Engineer checking gas pressure settings during a boiler inspection"
```

**Team / trust images:**
```
"Gas Safe registered Peterborough Plumbers engineer in uniform"
```

**Blog images:**
```
"[Describes what the image shows, matches the article topic]"
"Homeowner bleeding a radiator in a Peterborough living room"
```

**Related service cards:**
```
"[Service name] service being carried out in a Peterborough home"
```

**Decorative / background images (no content value):**
```
alt=""    ← empty string, not missing attribute
```

---

## RULE 3 — NEXT.JS IMAGE PROPS (Non-Negotiable)

Every `<Image>` component must have ALL of these props set correctly.

### Complete prop reference

```tsx
<Image
  src="/images/[filename].webp"        // ← WebP, lowercase, hyphenated, no spaces
  alt="[descriptive alt text]"         // ← see Rule 2
  width={[px]}                         // ← always set — prevents CLS
  height={[px]}                        // ← always set — prevents CLS
  sizes="[responsive sizes string]"    // ← always set — prevents oversized images
  priority={true | omit}               // ← true ONLY on first hero per page
  quality={85}                         // ← optional but recommended: 75-85 for photos
/>
```

### priority rules — read carefully

```tsx
// CORRECT — first hero image on the page
<Image src="..." alt="..." priority={true} />

// CORRECT — all other images (omit priority entirely — defaults to lazy)
<Image src="..." alt="..." />

// WRONG — never do this on anything except the first hero
<Image src="..." alt="..." priority={true} /> // on a card image
<Image src="..." alt="..." priority={true} /> // on a below-fold image
<Image src="..." alt="..." loading="eager" /> // never manually set loading
```

### sizes prop by layout position

```tsx
// Full-width hero (spans 100% of viewport)
sizes="100vw"

// Two-column layout (half page on desktop, full on mobile)
sizes="(max-width: 768px) 100vw, 50vw"

// Three-column card grid (related services, service cards)
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

// Sidebar image
sizes="(max-width: 768px) 100vw, 33vw"

// Small icon / thumbnail
sizes="(max-width: 640px) 80px, 120px"
```

### width × height by image type

```tsx
// Full-width hero
width={1200} height={675}   // 16:9 ratio

// Service card / related service
width={400}  height={300}   // 4:3 ratio

// Blog post hero
width={1200} height={630}   // OG ratio — reusable as OG image

// Area page hero
width={1200} height={675}   // 16:9 ratio

// Team / trust photo
width={600}  height={600}   // 1:1 square
```

---

## RULE 4 — IMAGE FORMAT & QUALITY

### Source file format
- **Always WebP** as the source file in `/public/images/`
- Next.js serves AVIF to browsers that support it automatically when WebP is the source
- PNG is only acceptable for: logos with transparency, or icons where WebP causes visible quality loss
- Never use uncompressed JPG as a source — convert to WebP first

### Compression settings
- Photos: `quality={85}` — good visual quality, significant file size saving vs default 75
- Illustrations / flat graphics: `quality={90}` — less aggressive compression on flat colour
- Hero images: aim for under 150KB after Next.js optimisation
- Card images: aim for under 50KB after Next.js optimisation

### Conversion command (for dev reference)
```bash
# Convert PNG to WebP (requires cwebp or sharp)
cwebp -q 85 "boiler service.png" -o "boiler-service-peterborough.webp"

# Batch rename + convert (all PNG in a folder)
for f in *.png; do cwebp -q 85 "$f" -o "${f%.png}.webp"; done
```

---

## RULE 5 — IMAGE SCHEMA (ImageObject in JSON-LD)

Add an `image` property to Service and Article schema to make images eligible for Google Image search results with rich context.

### On service pages (add to Service schema)
```json
{
  "@type": "Service",
  "name": "Boiler Service Peterborough",
  "image": {
    "@type": "ImageObject",
    "url": "https://peterborough-plumbers.vercel.app/images/services/boiler-service-peterborough.webp",
    "width": 1200,
    "height": 675,
    "caption": "Gas Safe engineer carrying out an annual boiler service in Peterborough"
  }
}
```

### On blog posts (add to Article schema)
```json
{
  "@type": "Article",
  "image": {
    "@type": "ImageObject",
    "url": "https://peterborough-plumbers.vercel.app/images/blog/[image-filename].webp",
    "width": 1200,
    "height": 630,
    "caption": "[Descriptive caption matching article topic]"
  }
}
```

---

## RULE 6 — OG / SOCIAL SHARE IMAGES

Every page needs a unique OG image. This is what appears when the page is shared on WhatsApp, Facebook, LinkedIn, iMessage.

### Spec
- Format: **JPG** (not WebP — some platforms reject WebP OG images)
- Dimensions: **1200 × 630px** exactly
- Location: `/public/images/og/[page-slug].jpg`
- Keep important content centred — edges get cropped on mobile previews
- Include: business name or logo, service name, location, optionally price
- Do NOT include: tiny text, complex details, dark backgrounds with dark text

### Required OG meta tags (every page)
```tsx
// In Next.js: app/services/[slug]/page.tsx metadata export
export const metadata: Metadata = {
  openGraph: {
    title: "Boiler Service Peterborough | From £79 | Gas Safe",
    description: "Annual boiler service from £79. Gas Safe registered engineers, all major brands, same-week appointments in Peterborough.",
    url: "https://peterborough-plumbers.vercel.app/services/boiler-service",
    images: [
      {
        url: "https://peterborough-plumbers.vercel.app/images/og/boiler-service.jpg",
        width: 1200,
        height: 630,
        alt: "Boiler Service Peterborough — From £79 — Gas Safe Registered",
      },
    ],
    type: "website",
  },
};
```

### AI generation prompt for OG images
```
Professional services social media card image, 1200x630px.
Business: Peterborough Plumbers.
Service: [Service Name].
Style: Clean, professional, dark navy background with white and amber text.
Layout: Service name large and centred, "Peterborough" below it, price "From £XX" bottom left, Gas Safe logo placeholder bottom right.
No photorealistic imagery — flat graphic design only.
No watermarks. No stock photo aesthetics.
```

---

## RULE 7 — AI IMAGE GENERATION PROMPTS (for Premium Visuals)

When new hero or service images are needed, use this prompt structure.
All images must look like real UK homes — not American suburban settings.

### Required elements in every prompt
```
Subject:     What is happening / what service is being performed
Who:         Plumber in navy uniform (not hi-vis unless outdoor/drainage work)
Environment: UK residential interior — modern or traditional British home
Style:       Photorealistic, professional, NOT stock photo aesthetic
Lighting:    Natural daylight from window OR warm interior lighting
Quality:     Sharp focus, clean composition, no watermarks
Avoid:       American-style kitchens, generic stock poses, perfect Instagram lighting
```

### Prompt templates by service

**Boiler service:**
```
A professional plumber in a navy uniform inspecting the controls of a white combi boiler mounted on a kitchen wall in a modern UK home. Natural light from a nearby window. Photorealistic. Sharp focus. Clean composition. No watermarks. British residential interior, not American style.
```

**Emergency plumber:**
```
A plumber in a navy uniform crouched under a kitchen sink fixing a burst pipe, urgency conveyed through focused expression and tools on the floor. British kitchen interior. Photorealistic. Natural lighting. No staged or stock photo aesthetics.
```

**Gas safety certificate:**
```
A Gas Safe registered engineer in a navy uniform holding a clipboard and inspecting a boiler, wearing ID badge. Modern UK home. Professional and trustworthy appearance. Photorealistic. Clean composition.
```

**Central heating:**
```
A plumber fitting a chrome towel radiator to a bathroom wall in a UK home. Clean, modern British bathroom. Photorealistic. Natural daylight. Sharp focus.
```

**Area page hero:**
```
Aerial or street-level photograph of [Area Name] residential neighbourhood in Peterborough, Cambridgeshire, UK. Suburban British homes. Overcast British daylight. No people. Photorealistic.
```

**3D service icons:**
```
3D icon of a [boiler / wrench / pipe / radiator], isometric view, soft shadow, white background, clean modern style, suitable for a professional plumbing services website, flat base, muted navy and white colour palette.
```

---

## QA CHECKLIST — IMAGE AGENT

Run before every PR or sprint completion.

### Filenames
- [ ] All lowercase
- [ ] All hyphenated (no spaces, no underscores)
- [ ] No typos in filenames
- [ ] All .webp format (except OG images which are .jpg, logos which are .svg)
- [ ] Names are descriptive and include service + location

### Alt text
- [ ] Every meaningful image has alt text
- [ ] No alt text contains duplicated words
- [ ] No alt text is generic or empty on meaningful images
- [ ] No alt text exceeds 125 characters
- [ ] No alt text is truncated mid-sentence
- [ ] Decorative images have alt="" (empty string)

### Next.js Image props
- [ ] Every image has width and height set
- [ ] Every image has sizes prop set for its layout position
- [ ] priority={true} on first hero image only
- [ ] No priority prop on any other image
- [ ] No loading="eager" used anywhere
- [ ] quality={85} set on photo images
- [ ] blurDataURL + placeholder="blur" set on all hero images

### Schema
- [ ] ImageObject added to Service schema on service pages
- [ ] ImageObject added to Article schema on blog posts
- [ ] OG image referenced in page metadata export

### OG Images
- [ ] Every page has a unique OG image
- [ ] All OG images are 1200×630px JPG
- [ ] Stored at /public/images/og/[page-slug].jpg
- [ ] og:image meta tag references absolute URL

### Performance
- [ ] Hero image confirmed as LCP element — has priority={true}
- [ ] No other image has priority={true}
- [ ] Card images under 50KB post-optimisation
- [ ] Hero images under 150KB post-optimisation
- [ ] No CLS — width/height always set
- [ ] Lighthouse Performance score 90+
- [ ] PageSpeed Insights mobile score 80+

---

## RULE 8 — HERO IMAGE BLUR PLACEHOLDER

Add `placeholder="blur"` + `blurDataURL` to all hero images to prevent layout flash and improve perceived load speed:

```tsx
// Generate blurDataURL using plaiceholder or similar:
// npm install plaiceholder sharp

import { getPlaiceholder } from 'plaiceholder'

// In your page component or getStaticProps:
const { base64 } = await getPlaiceholder('/images/services/boiler-service-peterborough.webp')

// Then in JSX:
<Image
  src="/images/services/boiler-service-peterborough.webp"
  alt="Gas Safe engineer carrying out an annual boiler service in Peterborough"
  width={1200}
  height={675}
  sizes="100vw"
  priority={true}
  quality={85}
  placeholder="blur"
  blurDataURL={base64}  // ← shows blurred preview while image loads
/>
```

For static sites, generate base64 at build time. This directly improves LCP score and perceived performance — critical for mobile users on slower connections.

---

## RULE 9 — IMAGE SITEMAP

Google can discover and index images via an image sitemap, making your service photos eligible to appear in Google Image Search — a secondary traffic source.

Add image entries to `app/sitemap.ts`:

```typescript
// Extended sitemap with image data
// Note: Next.js MetadataRoute.Sitemap doesn't natively support images yet
// Use a custom XML sitemap at public/image-sitemap.xml instead:
```

Create `public/image-sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>https://[domain]/services/boiler-service</loc>
    <image:image>
      <image:loc>https://[domain]/images/services/boiler-service-peterborough.webp</image:loc>
      <image:title>Boiler Service Peterborough — Gas Safe Engineers</image:title>
      <image:caption>Gas Safe registered engineer servicing a boiler in Peterborough</image:caption>
    </image:image>
  </url>

  <url>
    <loc>https://[domain]/services/emergency-plumber</loc>
    <image:image>
      <image:loc>https://[domain]/images/services/emergency-plumber-peterborough-24hr.webp</image:loc>
      <image:title>Emergency Plumber Peterborough — 24/7</image:title>
      <image:caption>Emergency plumber responding to a burst pipe in Peterborough</image:caption>
    </image:image>
  </url>

  <!-- Add one <url> block per service and area page -->

</urlset>
```

Add to `public/robots.txt`:
```
Sitemap: https://[domain]/sitemap.xml
Sitemap: https://[domain]/image-sitemap.xml
```

Submit both sitemaps in Google Search Console.

---

## RULE 10 — LOGO & FAVICON STANDARDS

### Logo
- Primary format: **SVG** — scales perfectly at any size, tiny file
- Fallback: PNG at 2x resolution (e.g. 400×120px for a horizontal logo)
- Never use JPG for logos — no transparency support
- Usage in Next.js:
```tsx
import Image from 'next/image'

// SVG logo (preferred)
<Image src="/images/logo.svg" alt="Peterborough Plumbers logo" width={200} height={60} priority />

// Or use next/image with SVG via unoptimized prop (if SVG optimization causes issues)
<Image src="/images/logo.svg" alt="Peterborough Plumbers logo" width={200} height={60} unoptimized />
```

### Favicon — All required sizes
Place in `/public/`:
```
/public/favicon.ico              ← 32×32, legacy browser support
/public/favicon-16x16.png        ← 16×16
/public/favicon-32x32.png        ← 32×32
/public/apple-touch-icon.png     ← 180×180, iOS home screen
/public/android-chrome-192x192.png ← 192×192, Android
/public/android-chrome-512x512.png ← 512×512, Android splash
/public/site.webmanifest         ← PWA manifest
```

Add to `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
}
```

Generate all favicon sizes free at: **https://realfavicongenerator.net/**

---

## RULE 11 — AVIF & FORMAT NOTES

Next.js automatically serves AVIF to browsers that support it when the source is WebP.
No extra configuration needed — this is handled by `next/image` by default.

```javascript
// next.config.js — verify these are set (Next.js defaults)
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],  // AVIF first, WebP fallback
    // This is already the Next.js default — no change needed unless overridden
  },
}
```

AVIF delivers 20–50% better compression than WebP with equivalent quality.
Since Next.js handles this automatically, your only job is ensuring source files are WebP.

---

## RULE 12 — PERFORMANCE SCORE TARGETS

Run Lighthouse after every major image change.

| Score | Target | Tool |
|-------|--------|------|
| Lighthouse Performance | 90+ desktop / 80+ mobile | Chrome DevTools |
| PageSpeed Insights | 90+ desktop / 75+ mobile | pagespeed.web.dev |
| LCP | < 2.5s | Both |
| CLS | < 0.1 | Both |
| Hero image size (post-optimisation) | < 150KB | Network tab |
| Card image size (post-optimisation) | < 50KB | Network tab |

**If performance score is below target, check in this order:**
1. Is hero image using `priority={true}`?
2. Is hero image WebP and under 150KB?
3. Are card images using correct `sizes` prop?
4. Are any non-hero images incorrectly using `priority={true}`?
5. Are `width` and `height` set on every image (prevents CLS)?
