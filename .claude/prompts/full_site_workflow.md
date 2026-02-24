# FULL SITE WORKFLOW — Peterborough Plumbers
# Database · Advanced UI · Advanced Content · SEO Optimisation
# ─────────────────────────────────────────────────────────────
# Run this prompt to execute a complete, end-to-end site build sprint.
# PM coordinates all agents in order. Nothing ships without QA sign-off.

---

## SKILLS TO LOAD (mandatory before any work begins)

Load and apply ALL of the following before touching any file:
- `.claude/skills/project-manager.md`
- `.claude/skills/seniority-5y.md`
- `.claude/skills/backend.md`
- `.claude/skills/frontend.md`
- `.claude/skills/content.md`
- `.claude/skills/seo.md`
- `.claude/skills/schema.md`
- `.claude/skills/internal-linking.md`
- `.claude/skills/images.md`
- `.claude/skills/performance.md`
- `.claude/skills/analytics.md`
- `.claude/skills/security.md`
- `.claude/skills/qa.md`

---

## CONSTRAINTS (always enforced — no exceptions)

- No redesign: colours, spacing, animations, brand tokens unchanged
- Minimal diffs: change only what is needed, never refactor for its own sake
- No fake data: all schema, reviews, prices, phone numbers must be real or clearly marked `[PLACEHOLDER]`
- No duplicated SEO blocks: one canonical, one H1, one schema block per page
- No new npm packages without PM approval and bundle size justification
- UK English throughout: colour, recognised, whilst, £ symbol
- All phone numbers as `<a href="tel:+44...">` — never plain text
- Every page must pass the SEO Pre-Completion Checklist (seo.md) before marking done

---

## PHASE 0 — PM PRE-FLIGHT (run first, before any code)

**Goal:** Audit current state, surface gaps, produce the sprint plan.

### 0.1 Codebase Audit
Read the following to understand what already exists:
- `app/layout.tsx` — root metadata, lang, font
- `app/(public)/page.tsx` — homepage content depth + schema
- `app/api/booking/route.ts` — current booking API
- `lib/db.ts` — DB client
- `lib/validations/booking.ts` — current Zod schema
- `content/services.ts` — service data
- `content/areas.ts` — area data
- `content/reviews.ts` — review data
- `content/blog.ts` — blog data
- `app/sitemap.ts` — sitemap coverage
- `app/robots.ts` — robots rules
- `components/forms/BookingForm.tsx` — form UI
- `components/layout/Header.tsx` — header + CTA
- `components/layout/Footer.tsx` — footer NAP

### 0.2 Gap Analysis — produce a list for each category:
- **DB gaps**: tables missing, no migrations, no seed data
- **API gaps**: endpoints missing, no email send, no rate limiting
- **UI gaps**: components missing, accessibility issues, mobile UX
- **Content gaps**: pages below word count minimum, sections missing
- **SEO gaps**: missing meta tags, schema, OG images, canonical tags

### 0.3 Sprint Plan
Produce:
- Goal summary (one sentence)
- Agent execution order (Phases 1–7 below)
- Files expected to change per phase
- Risks and assumptions

---

## PHASE 1 — DATABASE (Full Setup)

**Agent:** Backend
**Dependency:** Phase 0 complete

### 1.1 Schema Design
Create or confirm the following tables in Neon Postgres.
Write migrations as raw SQL in `db/migrations/`.

```sql
-- Table: bookings
CREATE TABLE IF NOT EXISTS bookings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(100)   NOT NULL,
  email         VARCHAR(254)   NOT NULL,
  phone         VARCHAR(20)    NOT NULL,
  service       VARCHAR(100)   NOT NULL,
  preferred_date DATE,
  message       TEXT,
  postcode      VARCHAR(10),
  status        VARCHAR(20)    NOT NULL DEFAULT 'new',   -- new | confirmed | completed | cancelled
  source        VARCHAR(50)    DEFAULT 'website',        -- website | whatsapp | phone
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Table: leads (contact form enquiries — NOT bookings)
CREATE TABLE IF NOT EXISTS leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(100)   NOT NULL,
  email         VARCHAR(254)   NOT NULL,
  phone         VARCHAR(20),
  message       TEXT           NOT NULL,
  page_source   VARCHAR(200),  -- which page the form was submitted from
  status        VARCHAR(20)    NOT NULL DEFAULT 'new',   -- new | contacted | closed
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Table: reviews (Google reviews synced or manually added)
CREATE TABLE IF NOT EXISTS reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name VARCHAR(100)   NOT NULL,
  area          VARCHAR(100),
  service       VARCHAR(100),
  rating        SMALLINT       NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text   TEXT           NOT NULL,
  review_date   DATE           NOT NULL,
  platform      VARCHAR(50)    DEFAULT 'google',
  verified      BOOLEAN        DEFAULT FALSE,
  published     BOOLEAN        DEFAULT TRUE,
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Table: blog_posts (if moving away from static content/blog.ts)
CREATE TABLE IF NOT EXISTS blog_posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          VARCHAR(200)   NOT NULL UNIQUE,
  title         VARCHAR(300)   NOT NULL,
  excerpt       TEXT           NOT NULL,
  body          TEXT           NOT NULL,   -- markdown or HTML
  author        VARCHAR(100)   DEFAULT 'Peterborough Plumbers',
  featured_image VARCHAR(500),
  tags          TEXT[],
  published     BOOLEAN        DEFAULT FALSE,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Table: analytics_events (lightweight custom event store)
CREATE TABLE IF NOT EXISTS analytics_events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name    VARCHAR(100)   NOT NULL,  -- call_click | whatsapp_click | form_submit | booking_submit
  page_path     VARCHAR(500),
  session_id    VARCHAR(100),
  metadata      JSONB,
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_bookings_status     ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created    ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_published   ON reviews(published) WHERE published = TRUE;
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug     ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published      ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event     ON analytics_events(event_name, created_at DESC);
```

### 1.2 Migration Runner
Create `db/migrate.ts` — a simple script that runs all `.sql` files in `db/migrations/` in order:

```typescript
// db/migrate.ts
// Run: npx tsx db/migrate.ts
import { sql } from '@/lib/db'
import fs from 'fs'
import path from 'path'

const migrationsDir = path.join(process.cwd(), 'db/migrations')
const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort()

for (const file of files) {
  const migration = fs.readFileSync(path.join(migrationsDir, file), 'utf8')
  console.log(`Running migration: ${file}`)
  await sql.query(migration)
  console.log(`Done: ${file}`)
}
```

### 1.3 Seed Data
Create `db/seed.ts` — seed the reviews table with the real reviews from `content/reviews.ts`
so the DB becomes the single source of truth.

### 1.4 DB Utility Layer
Create or extend `lib/db/` with typed query helpers:

```
lib/db/
  bookings.ts   — createBooking(), getBookings(), updateBookingStatus()
  leads.ts      — createLead(), getLeads()
  reviews.ts    — getPublishedReviews(), getAggregateRating()
  blog.ts       — getPublishedPosts(), getPostBySlug()
  analytics.ts  — trackEvent()
```

Each function must:
- Use tagged template literals (`sql\`...\``)
- Have TypeScript return types
- Handle errors by throwing with a clear message
- Never log sensitive data

### 1.5 Environment Variables
Confirm `.env.local.example` documents all required variables:
```
DATABASE_URL=           # Neon Postgres connection string
RESEND_API_KEY=         # Resend email API (for booking confirmations)
OWNER_EMAIL=            # Email address to receive lead/booking notifications
NEXT_PUBLIC_SITE_URL=   # Production domain (e.g. https://peterboroughplumbers.co.uk)
WHATSAPP_VERIFY_TOKEN=  # WhatsApp webhook verify token
```

---

## PHASE 2 — BACKEND & API LAYER

**Agent:** Backend
**Dependency:** Phase 1 DB tables exist

### 2.1 Enhanced Booking API (`app/api/booking/route.ts`)
Upgrade the existing booking API to:
1. Validate with Zod (all fields + UK phone regex)
2. Write the booking to the `bookings` DB table
3. Send confirmation email to the user via Resend
4. Send notification email to the owner via Resend
5. Return `{success: true, bookingId}` on success
6. Return field-level errors on validation failure
7. Rate limit: 5 submissions per IP per 10 minutes

Zod schema (update `lib/validations/booking.ts`):
```typescript
import { z } from 'zod'

const UK_PHONE_REGEX = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$|^(\+44\s?\(0\)\s?1\d{3}|01\d{3})\s?\d{6}$/

export const bookingSchema = z.object({
  name:           z.string().min(2).max(100),
  email:          z.string().email(),
  phone:          z.string().regex(UK_PHONE_REGEX, 'Please enter a valid UK phone number'),
  service:        z.string().min(1).max(100),
  preferredDate:  z.string().optional(),
  message:        z.string().min(10).max(2000).optional(),
  postcode:       z.string().max(10).optional(),
})
```

### 2.2 Contact / Lead API (`app/api/contact/route.ts`)
New endpoint for the contact page form:
- Validate: name, email, phone (optional), message
- Write to `leads` table
- Notify owner by email
- Rate limit: 5 per IP per 10 minutes

### 2.3 Analytics Event API (`app/api/analytics/route.ts`)
Lightweight internal event tracking endpoint:
- Accept: `{eventName, pagePath, metadata}`
- Write to `analytics_events` table
- No rate limit needed (internal use)
- Always return 200 — never fail silently on client

### 2.4 Email Templates (`lib/email/`)
Create Resend email templates:
- `lib/email/bookingConfirmation.ts` — sends to user
- `lib/email/bookingNotification.ts` — sends to owner
- `lib/email/leadNotification.ts` — sends to owner for contact form

All emails must:
- Use UK English
- Include the business phone number as a `tel:` link
- NOT expose any internal system details

### 2.5 Rate Limiting (`lib/rateLimit.ts`)
Use `lib/kv.ts` (already exists) for IP-based rate limiting.
Implement a simple sliding window:
```typescript
export async function checkRateLimit(ip: string, key: string, limit: number, windowMs: number): Promise<boolean>
```
Apply to all public form endpoints.

---

## PHASE 3 — ADVANCED UI

**Agent:** Frontend
**Dependency:** Phase 2 API routes complete (forms need working endpoints)

### 3.1 Pre-work
Before touching ANY component:
1. Read `app/globals.css` — understand all colour tokens and utility classes
2. Read `components/layout/Header.tsx` and `Footer.tsx`
3. Read `components/forms/BookingForm.tsx`
4. Read `components/blocks/Hero.tsx`

### 3.2 Multi-Step Booking Form
Upgrade `components/forms/BookingForm.tsx` to a 3-step flow:
- **Step 1 — Service selection**: grid of service cards with icons, user taps to select
- **Step 2 — Contact details**: name, phone, email, postcode, preferred date, message
- **Step 3 — Confirmation**: summary of booking + "Confirm Booking" CTA

Rules:
- Progress indicator at the top (Step 1 of 3)
- Back button on steps 2 and 3
- Client-side validation before advancing to next step
- Full Zod validation on server before saving
- Success state shows booking reference number
- Error state shows field-level messages in plain English
- Mobile-first: works perfectly at 375px, one thumb
- Accessible: all inputs have `<label>`, keyboard navigable, focus states visible

### 3.3 Sticky Mobile CTA Bar
Enhance `components/layout/StickyCtaBar.tsx`:
- Show on all pages below the fold on mobile (< 768px)
- Show: Phone icon + "Call Now" | WhatsApp icon + "WhatsApp"
- Both as `tel:` and `wa.me/` links
- 44px minimum touch target
- Slides in after 3 seconds or 300px scroll
- Does NOT overlap footer

### 3.4 Floating Emergency Badge
Add a `components/ui/EmergencyBadge.tsx` component:
- Only visible on homepage and emergency page
- Shows: "24/7 Emergency" with phone number
- Position: bottom-right, z-index above content but below modals
- Pulses gently (CSS animation only — no JS)
- Mobile: compact, desktop: full label

### 3.5 Service Cards Enhancement
Update `components/blocks/ServiceGrid.tsx`:
- Add teal top border (already in design system — verify it's present)
- Hover: lift + shadow (`translate-y-[-4px]` on hover)
- Each card: icon (Lucide), title, one-line description, "Book [Service]" link
- Lazy load images using `<Image>` with explicit width/height

### 3.6 Testimonials Carousel
Create `components/blocks/TestimonialsCarousel.tsx`:
- Auto-advances every 5 seconds
- Manual dots navigation
- Shows: star rating (teal), reviewer name, area, review text (max 200 chars)
- CSS-only transition (no JS animation library)
- Accessible: pause on hover, keyboard navigable
- Pulls data from the `reviews` DB table via a Server Component

### 3.7 Trust Badges Row
Create `components/ui/TrustBadges.tsx`:
- Shows: Gas Safe | 30+ Years | 4.6★ Google | No Call-Out Fee
- Used in Hero and CTA sections
- Icons: SVG inline, not icon library
- Mobile: 2×2 grid, desktop: horizontal row

### 3.8 Breadcrumb Component
Confirm `components/layout/Breadcrumbs.tsx` is:
- Visible on all subpages (not homepage)
- Correct dark text contrast on all hero backgrounds
- Linked with descriptive anchor text
- Matching the BreadcrumbList schema exactly

### 3.9 Cookie Consent Banner
Create `components/ui/CookieBanner.tsx`:
- Shown on first visit, dismissed on accept/reject
- Stores preference in localStorage
- Only load analytics scripts AFTER accept
- Accessible: keyboard navigable, high contrast
- UK law compliant (accept/reject options, no pre-ticked boxes)

### 3.10 Loading & Skeleton States
Add skeleton loaders for:
- Reviews section (while fetching from DB)
- Blog post list (while fetching)
- Booking form success/error state transitions

---

## PHASE 4 — ADVANCED CONTENT

**Agent:** Content + SEO
**Dependency:** Phase 3 UI components available to use

Apply ALL rules from `.claude/skills/content.md` on every page.
Every page must hit the word count minimum and all required sections.

### 4.1 Homepage (`app/(public)/page.tsx`)
**Target: 1,200–1,500 words | All 8 required sections**

Required sections (from content.md):
1. Hero — H1, 50–80 word intro, CTA pair, TrustBadges row
2. Services grid — all 10+ services as cards
3. Offer/promo banner — "Boiler Service from £79" teal CTA band
4. Why choose us — 4 trust stats (30yrs / Gas Safe / 12 engineers / 4.6★)
5. Testimonials — 5+ reviews via TestimonialsCarousel
6. Areas we cover — all 9 areas as linked cards with postcodes
7. CTA section — Book Now + WhatsApp + Call
8. Footer NAP — full Name, Address, Phone, Email, Gas Safe reg

Content notes:
- H1: "Trusted Plumbers in Peterborough — Gas Safe Registered, 30+ Years Local"
- Intro paragraph: establish trust + local authority in 60 words
- Every CTA button: teal background, white text, specific label (not "Submit")

### 4.2 Service Pages — All 10 (one at a time)
`app/(public)/services/[slug]/page.tsx`

Services to cover:
1. boiler-service
2. emergency-plumber
3. gas-safety-certificates
4. central-heating-services
5. bathroom-installations
6. plumbing-repairs
7. plumbing-installation
8. landlord-services
9. drain-blockages
10. damp-leak-detection

For each service page, all 10 required sections must be present (content.md):
1. Hero — H1 with service + Peterborough, intro, CTAs
2. Service overview — What's included (200+ words)
3. Pricing — "from £X" with explanation
4. Process steps — 4–6 numbered steps
5. Why choose us — Gas Safe, experience, ratings
6. FAQ — minimum 5 FAQs (80–150 words each)
7. Related services — 3–4 cards linking to other service pages
8. Areas covered — all 9 areas linked
9. Customer testimonial — 1 relevant review
10. CTA section — Book Now + WhatsApp + Call + urgency copy

**Content rules for service pages:**
- H1 formula: "[Service Name] in Peterborough — [Modifier]"
- Include local Peterborough references naturally
- Pricing must be realistic (use "from £X" format, no made-up numbers)
- FAQs must answer real questions people ask in Peterborough

### 4.3 Area Pages — All 9
`app/(public)/areas/[slug]/page.tsx`

Areas to cover:
1. city-centre (PE1/PE2)
2. werrington (PE4)
3. orton (PE2)
4. hampton (PE7)
5. bretton (PE3)
6. market-deeping (PE6)
7. yaxley (PE7)
8. whittlesey (PE7)
9. stamford (PE9)

For each area, all 9 required sections (content.md):
1. Hero — H1 with area name + postcode
2. Area description — 150+ words, local landmarks, streets, neighbourhoods
3. Services available — all services with links
4. Response time — "We reach [Area] in approximately X minutes"
5. Postcodes covered — full postcode list
6. Local testimonial — review from customer in that area
7. Nearby areas — 3–4 adjacent area page links
8. FAQ — 3–5 area-specific questions
9. CTA — area-personalised booking message

**CRITICAL: each area page must be >40% unique content — no copy-paste between areas.**

### 4.4 Blog Posts — 6 Priority Topics
`app/(public)/blog/[slug]/page.tsx`

Posts to create (from content.md priority list):
1. `how-much-does-boiler-service-cost-peterborough` — cost guide, 1,500 words
2. `signs-your-boiler-needs-replacing-peterborough` — problem-aware, 1,500 words
3. `winter-plumbing-tips-peterborough-homeowners` — seasonal, 1,200 words
4. `landlord-gas-safety-certificates-peterborough` — landlord-focused, 1,500 words
5. `what-to-do-burst-pipe-peterborough` — emergency, 1,200 words
6. `combi-boiler-vs-system-boiler-peterborough` — comparison, 1,500 words

Each blog post (7 required sections, content.md):
1. Hero — H1 with long-tail keyword, published date, read time
2. Introduction — 80–120 words, state the problem
3. Main body — 3+ H2 sections, 200+ words each
4. Images — 1+ optimised with descriptive alt text
5. FAQ section — 3+ FAQs with FAQPage schema
6. Related services — inline links to 2–3 service pages
7. CTA — "Book a [service] in Peterborough today"

### 4.5 Guides (`app/(public)/guides/[slug]/page.tsx`)
Confirm existing guides have:
- Correct word count
- Internal links to relevant service pages
- CTAs
- FAQs with schema

### 4.6 About Page (`app/(public)/about/page.tsx`)
**Target: 800–1,200 words | All 6 required sections**

1. Hero — H1: "About Peterborough Plumbers — 30+ Years of Trusted Local Service"
2. Company story — founded when, how, why — 150+ words, personal
3. Team section — named engineers, Gas Safe credentials
4. Accreditations — Gas Safe logo + registration number
5. Trust stats — years / engineers / reviews / areas
6. CTA — "Book a job or get a free quote"

### 4.7 Reviews Page (`app/(public)/reviews/page.tsx`)
**Target: All 5 required sections | Data from DB**

1. Hero — H1: "Customer Reviews — Peterborough Plumbers | 4.6★ Google Rating"
2. Aggregate score — large star display + total review count
3. Review cards — minimum 10 reviews (from DB)
4. Service filter — links to filter by service type
5. CTA — "Leave a review" + Google review link

---

## PHASE 5 — SEO OPTIMISATION

**Agent:** SEO + Content
**Dependency:** Phase 4 content complete

Apply ALL rules from `.claude/skills/seo.md`. Every page must pass the full Pre-Completion Checklist.

### 5.1 Root Layout Metadata (`app/layout.tsx`)
Confirm and fix:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'Peterborough Plumbers | Gas Safe — 30+ Years',
    template: '%s | Peterborough Plumbers',
  },
  description: 'Gas Safe registered plumbers in Peterborough with 30+ years experience. Boiler service, emergency repairs, bathroom installations. Call for a free quote.',
  openGraph: { siteName: 'Peterborough Plumbers', locale: 'en_GB', type: 'website' },
}
```
Also confirm: `<html lang="en-GB">` is set.

### 5.2 Meta Tags — Every Page
For every page file in `app/(public)/`:
- Unique meta title (50–60 chars, formula from seo.md)
- Unique meta description (140–160 chars, all 4 required elements)
- Canonical URL (production domain, no trailing slash)
- Open Graph: title, description, image, url, locale, siteName
- Twitter Card: card type, title, description, image
- robots: index+follow on public pages, noindex on /book, /thank-you, /privacy, /terms, /cookies

### 5.3 Schema Markup — Every Page
For each page type, implement the correct JSON-LD schema block (seo.md):
- **Homepage**: LocalBusiness + WebSite + AggregateRating
- **Service pages**: Service + FAQPage + BreadcrumbList (single @graph)
- **Area pages**: Plumber (area) + FAQPage + BreadcrumbList
- **Blog posts**: Article + FAQPage + BreadcrumbList
- **About page**: Organization + BreadcrumbList
- **Contact page**: LocalBusiness + BreadcrumbList
- **Reviews page**: LocalBusiness (AggregateRating + Review[]) + BreadcrumbList

Schema helper is already in `lib/seo/schema.ts` — extend it with typed functions.

### 5.4 Internal Linking Audit
Using `lib/seo/internalLinks.ts`:
- Every service page must link to 3–4 related services + 2–3 area pages
- Every area page must link to all services + 2–3 adjacent area pages
- Homepage links to all service + area index pages
- All anchor text must be descriptive (forbidden list in content.md)
- No orphan pages (every page reachable in ≤ 3 clicks)

### 5.5 Sitemap (`app/sitemap.ts`)
Confirm all live pages are in the sitemap with:
- Correct priority values (homepage=1.0, services=0.9, areas=0.8, blog=0.7)
- `changeFrequency` set per page type
- `lastModified` dynamic date

### 5.6 robots.ts (`app/robots.ts`)
Confirm:
- `Allow: /` for all public pages
- `Disallow: /book`, `/thank-you`, `/api/`, `/_next/`, `/privacy`, `/terms`, `/cookies`
- Sitemap URL included

### 5.7 OG Images
For every page, confirm OG image exists at `/public/images/og/[slug]-og.jpg`:
- Dimensions: 1200×630px
- Under 1MB
- Unique per page
- If missing, create a placeholder and flag for designer

### 5.8 Phone Number Audit
Global search for `01234 567890` (placeholder) — must return 0 results.
All phone numbers must be:
- Real UK Peterborough number (01733 XXXXXX)
- Wrapped in `<a href="tel:+44XXXXXXXXXX">`
- Identical in footer, schema, contact page, homepage

### 5.9 Core Web Vitals Fixes (via Performance Agent)
- Hero image: `priority={true}` on exactly one image per page
- All `<Image>` components: explicit `width` + `height`
- Fonts: `next/font` with `display: swap`
- No layout-triggering animations
- Third-party scripts via `next/script` with `strategy="lazyOnload"`

---

## PHASE 6 — ANALYTICS & SECURITY

**Agent:** Analytics + Security
**Dependency:** Phase 5 complete

### 6.1 GA4 Setup
- Install GA4 via `next/script` with `strategy="afterInteractive"`
- Only load after cookie consent accepted
- Conversion events to track:
  - `call_click` — any `tel:` link click
  - `whatsapp_click` — any `wa.me/` link click
  - `booking_submit` — successful booking form submission
  - `contact_submit` — successful contact form submission
  - `emergency_cta_click` — emergency badge click

### 6.2 Custom Event Tracking
Use `lib/analytics.ts` + the new `/api/analytics` endpoint to track events server-side as backup.

### 6.3 Security Headers (`next.config.ts`)
Add to `headers()`:
```
Content-Security-Policy
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 6.4 Input Sanitisation
Confirm all user-supplied text is:
- Stripped of HTML before storage (use DOMPurify server-side or manual strip)
- Trimmed of whitespace
- Validated against max length before DB insert

### 6.5 Environment Variable Audit
- Zero `process.env` references in client components
- All secrets server-side only
- `NEXT_PUBLIC_` prefix only on genuinely safe public values

---

## PHASE 7 — QA GATE (mandatory — nothing ships without this)

**Agent:** QA
**Dependency:** Phases 1–6 complete

Run the full QA checklist from `.claude/skills/qa.md` against EVERY changed file.

### 7.1 Build Check
```bash
npm run build
```
Must complete with zero errors. Zero TypeScript errors. Zero ESLint errors.

### 7.2 SEO Audit — Every Page
For each changed page, verify:
- [ ] Exactly 1 H1
- [ ] Meta title: 50–60 chars, unique, formula correct
- [ ] Meta description: 140–160 chars, unique, all 4 elements present
- [ ] Canonical: correct URL, production domain
- [ ] OG tags: all 5 fields present, image 1200×630
- [ ] Twitter card: all 4 fields present
- [ ] Schema: correct type for page type, syntactically valid JSON-LD
- [ ] No placeholder phone numbers (`01234 567890`)
- [ ] Minimum 2 CTAs (hero + bottom)
- [ ] Minimum 3 internal links with descriptive anchor text

### 7.3 Content Audit — Every Page
- [ ] Word count meets minimum for page type
- [ ] All required sections present
- [ ] No generic AI phrases ("In today's world", "without further ado")
- [ ] UK English throughout
- [ ] Pricing is realistic (or clearly marked [PLACEHOLDER])

### 7.4 Performance Audit
- [ ] `priority={true}` on first hero image only
- [ ] All `<Image>` have explicit `width` + `height`
- [ ] No new heavy npm packages
- [ ] Fonts loaded via `next/font`

### 7.5 Accessibility Audit
- [ ] All interactive elements ≥ 44×44px touch target
- [ ] All form inputs have `<label>` elements
- [ ] Focus states visible on all interactive elements
- [ ] Heading hierarchy logical (no skipped levels)
- [ ] Colour contrast meets WCAG 2.1 AA

### 7.6 Mobile Audit (mentally render at 375px)
- [ ] Call Now + primary CTA visible without scrolling
- [ ] No horizontal overflow
- [ ] Sticky mobile CTA bar functional
- [ ] Multi-step booking form works one-handed

### 7.7 Forms & Backend Audit
- [ ] Booking form submits end-to-end (API → DB → email)
- [ ] Validation rejects invalid UK phone numbers
- [ ] Rate limiting returns 429 on 6th submission
- [ ] No sensitive data in client-side code

### 7.8 Security Audit
- [ ] No API keys in client-side bundles
- [ ] Security headers present in `next.config.ts`
- [ ] All user input sanitised before DB insert
- [ ] Cookie consent blocks analytics until accepted

---

## PHASE 8 — PM REPORT TO OWNER

**Format:** Plain English, no jargon.

### Report Structure

**A) What changed** (by agent, by file):
List every file changed and what was done in one sentence per file.

**B) What did NOT change** (scope protection log):
Explicitly confirm: colours, layout, animations, brand tokens all unchanged.

**C) QA Result**:
PASS or FAIL. If fail, list the issues and what was done to fix them.

**D) Placeholder items requiring owner input**:
List any `[PLACEHOLDER]` values that need real data before going live:
- Real phone number (01733 XXXXXX)
- Real business address
- Real Gas Safe registration number
- Real founding year
- Real engineer names and photos (About page)
- DATABASE_URL in Vercel environment variables
- RESEND_API_KEY in Vercel environment variables

**E) Next sprint backlog** (top 5, prioritised):
1. Replace all [PLACEHOLDER] values with real data
2. Upload real OG images (1200×630px) for all pages
3. Set up Google Business Profile and link to site
4. Submit sitemap to Google Search Console
5. Launch review collection campaign (target 50+ at 4.5★)

---

## EXECUTION ORDER SUMMARY

```
Phase 0:  PM Pre-flight audit + plan
Phase 1:  Database (schema + migrations + seed + helpers)
Phase 2:  Backend (APIs + email + rate limiting)
Phase 3:  Advanced UI (booking flow + components + accessibility)
Phase 4:  Advanced Content (homepage + 10 services + 9 areas + 6 blogs)
Phase 5:  SEO Optimisation (meta + schema + internal links + sitemap)
Phase 6:  Analytics + Security (GA4 + events + headers + sanitisation)
Phase 7:  QA Gate (build + SEO + content + perf + a11y + mobile + security)
Phase 8:  PM Report to Owner
```

Each phase must be validated before the next begins.
QA gate (Phase 7) is mandatory — sprint is not complete until it passes.
