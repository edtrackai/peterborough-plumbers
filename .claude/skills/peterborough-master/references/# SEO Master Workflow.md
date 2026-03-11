# SEO Master Workflow

## Purpose
This file defines the main Claude workflow for advanced SEO optimization, image optimization, issue remediation, and final scoring/reporting.

It combines:

- Technical SEO
- On-Page / Content SEO
- Local SEO
- Structured Data
- Accessibility
- Performance
- Image Optimization
- Final Reporting

---

## Primary Objective
Claude must inspect the codebase, identify weaknesses, implement safe improvements, and produce a clear re-audit report.

Target outcome:
- strongest possible SEO and technical quality
- honest reporting
- no spammy tactics
- no unnecessary redesign

---

## Required Workflow

Claude must work in this exact order:

1. Initial Audit
2. Priority Issue List
3. File Identification
4. Remediation / Implementation
5. Re-Audit
6. Final Report

---

# Phase 1 — Initial Audit

## Audit Categories
Claude must audit the site across these categories:

- Technical SEO
- On-Page / Content
- Local SEO
- Structured Data
- Accessibility
- Performance
- Image Optimization

## Technical SEO Audit
Check:

- metadata coverage
- title tag uniqueness
- meta description quality
- canonical tags
- robots directives
- sitemap coverage
- crawlability
- indexability
- duplicate URL risks
- internal linking crawl paths
- semantic HTML quality
- heading hierarchy
- pagination/indexing issues if present

## On-Page / Content Audit
Check:

- one clear page purpose per page
- H1/H2/H3 structure
- keyword alignment to search intent
- content quality
- thin or repetitive sections
- intro quality
- trust signals
- FAQ usefulness
- conversion relevance
- readability
- over-optimization risks

## Local SEO Audit
Check:

- homepage local clarity
- service-area relevance
- service page local signals
- area page uniqueness
- local internal linking
- NAP consistency where relevant
- location modifiers used naturally
- local trust signals
- spammy city swapping risks

## Structured Data Audit
Check:

- existing JSON-LD
- schema type relevance
- LocalBusiness schema
- Service schema
- FAQ schema
- Breadcrumb schema
- Review/AggregateRating compliance
- duplicate or misleading schema
- broken schema implementation

## Accessibility Audit
Check:

- heading hierarchy
- semantic landmarks
- button and link names
- form labels
- focus states
- alt text
- decorative image handling
- color contrast
- keyboard support
- ARIA misuse

## Performance Audit
Check:

- LCP risks
- CLS risks
- INP risks
- client-side JS weight
- unnecessary `use client`
- lazy loading opportunities
- image delivery
- font loading
- script loading
- caching opportunities
- hydration cost

## Image Optimization Audit
Check:

- `next/image` usage
- remaining plain `img` tags on public pages
- width/height presence
- `sizes` usage
- priority usage
- lazy loading
- oversized image delivery
- hero image handling
- alt text quality
- decorative image misuse
- filename quality in asset workflows
- Open Graph image consistency

---

# Phase 2 — Priority Issue List

Claude must group issues into:

## Critical
Issues that affect:
- indexing
- crawlability
- broken canonicals
- broken schema
- major performance bottlenecks
- major accessibility failures
- dangerous duplicate content
- broken image delivery strategy

## High
Issues that significantly affect:
- metadata quality
- heading structure
- local SEO clarity
- internal linking
- hero image performance
- image alt handling
- structured data completeness

## Medium
Issues that improve:
- content structure
- supporting internal links
- trust/relevance signals
- image naming workflow
- minor contrast/focus issues

## Low
Polish and cleanup items.

Claude must prioritize:
1. safest high-impact fixes first
2. then medium-impact structural improvements
3. then low-risk polish

---

# Phase 3 — File Identification

Before implementation, Claude must list:

- exact files to change
- why each file matters
- which audit category it belongs to
- risk level:
  - low
  - medium
  - high

Claude must not implement before mapping file impact.

---

# Phase 4 — Remediation / Implementation

## Technical SEO Implementation
Claude must improve where justified:

- unique page titles
- unique meta descriptions
- canonical tags
- robots directives
- sitemap coverage
- metadata inheritance
- indexability logic
- crawlable internal links
- URL consistency
- semantic HTML

Rules:
- no generic metadata
- no duplicate metadata across unrelated pages
- no fake SEO text
- no thin doorway tactics

---

## On-Page / Content Implementation
Claude must improve:

- one clear H1 per page
- logical heading structure
- natural keyword placement
- introductory clarity
- topical completeness
- trust-building sections where useful
- FAQ quality where justified
- conversion alignment

Rules:
- no robotic rewriting
- no keyword stuffing
- no filler paragraphs
- preserve brand tone
- preserve readability

---

## Local SEO Implementation
Claude must improve:

- homepage local clarity
- service + location relevance
- internal links between homepage, service pages, area pages, contact, and reviews
- local trust signals where already supported by the site
- area-page uniqueness if weak

Rules:
- no spammy city swapping
- no doorway-page duplication
- no false local claims
- no overuse of city names

---

## Structured Data Implementation
Claude must improve structured data only where justified.

Possible schema:
- LocalBusiness
- Service
- FAQPage
- BreadcrumbList
- WebPage
- Organization

Rules:
- schema must be truthful
- schema must match on-page content
- no fake reviews
- no misleading aggregate ratings
- no unnecessary schema clutter

---

## Accessibility Implementation
Claude must improve:

- heading order
- labels
- button names
- focus styles
- alt text
- decorative images with empty alt where appropriate
- contrast where needed
- semantic structure

Rules:
- preserve design where possible
- prefer native HTML
- do not add unnecessary ARIA

---

## Performance Implementation
Claude must improve:

- hero image loading
- image priority strategy
- lazy loading
- client JS reduction
- component loading strategy
- script loading
- font loading
- layout shift prevention
- cache-aware delivery where relevant

Rules:
- no performance regressions
- no heavy dependency additions unless justified
- no unnecessary client-side interactivity

---

## Image Optimization Implementation
For each important image, Claude must classify it as:

- hero / LCP image
- supporting content image
- trust logo / badge
- decorative image
- Open Graph image

Claude must ensure:

- proper image component choice
- stable dimensions
- correct `sizes`
- correct priority usage
- lazy loading for non-critical assets
- truthful alt text
- empty alt for decorative images where appropriate
- no oversized downloads
- no quality-damaging compression choices

Rules:
- no keyword stuffing in alt text
- no generic alt like “image”
- no forced descriptive alt for decorative art
- preserve visual quality

---

# Phase 5 — Re-Audit

After implementation, Claude must re-check:

## Technical SEO
- metadata coverage
- title uniqueness
- meta description quality
- canonical correctness
- robots correctness
- internal link crawlability
- no accidental noindex
- no duplicate canonicals

## On-Page / Content
- H1/H2/H3 logic
- page intent clarity
- keyword alignment
- no stuffing
- preserved readability

## Local SEO
- local relevance
- service-area relationships
- internal local linking quality
- no doorway-like duplication

## Structured Data
- schema validity
- schema relevance
- schema truthfulness
- no duplicate schema conflicts

## Accessibility
- semantic structure
- alt text quality
- decorative image handling
- focus and labels
- contrast issues improved

## Performance
- hero loading strategy
- reduced unnecessary JS
- reduced layout shift risks
- image loading correctness

## Image Optimization
- correct priority usage
- correct lazy loading
- `sizes` correctness
- stable dimensions
- no obvious oversized image delivery
- alt text correctness

---

# Phase 6 — Final Report

Claude must always produce a final report with:

## A. Summary of All Files Changed
Format:
- file path
- category
- exact change made

## B. Improvements by Category
Must include:
- Technical SEO
- On-Page / Content
- Local SEO
- Structured Data
- Accessibility
- Performance
- Image Optimization

## C. Estimated Before / After Scoring
Claude may use a scoring table like:

- Technical SEO
- On-Page / Content
- Local SEO
- Structured Data
- Accessibility
- Performance
- Overall

Rules:
- only claim scores supported by the actual work
- never fake a 100/100 score
- if something remains unresolved, reflect it honestly

## D. Manual Review Items
Claude must clearly separate:
- implemented
- partially implemented
- requires manual review
- blocked by infrastructure or dependency constraints

## E. Intentionally Not Changed
Claude must explain:
- what was left untouched
- why it was left untouched

---

# Scoring Principles

## Goal
Push the site toward the strongest possible quality score.

## But:
Claude must not claim perfection unless all important checks truly support it.

### Scoring must be:
- evidence-based
- category-specific
- honest
- tied to actual remediation

### If 100/100 is not justified:
Claude must say so clearly.

---

# Required Output Format

Claude must always return:

1. Initial audit summary
2. Priority issue list
3. Exact files to change
4. Implementation by category
5. Exact code changes
6. Re-audit summary
7. Final report tables
8. Manual-review items
9. Intentionally not changed items

---

# Final Behavior Rules

Claude must:
- inspect before changing
- implement before claiming improvement
- report honestly
- preserve design and business logic
- keep changes targeted
- avoid SEO spam
- avoid unnecessary complexity

Claude must not:
- stop at theory if implementation is possible
- fake results
- claim all issues are solved if they are not
- pursue 100/100 through dishonest reporting