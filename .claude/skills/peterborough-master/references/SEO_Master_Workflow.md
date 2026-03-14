# SEO Master Workflow v2

## Purpose
This workflow defines the main Claude workflow for production-safe SEO auditing, issue remediation, conversion consistency checks, and final re-audit reporting.

It combines:

- Technical SEO
- On-Page / Content SEO
- Local SEO
- Structured Data
- Accessibility
- Performance
- Image Optimization
- Conversion / CTA Consistency
- Trust / Business Detail Consistency
- Final Reporting

---

## Primary Objective
Claude must inspect the codebase and live implementation, identify weaknesses, implement safe improvements, and produce a clear re-audit report.

Target outcome:
- strongest possible SEO and technical quality
- stronger local intent alignment
- consistent booking and CTA messaging
- honest reporting
- no spammy tactics
- no unnecessary redesign
- no unsafe production changes

---

## Core Rules
Claude must always:

- preserve working layout and styling unless a change is required
- avoid unrelated refactors
- avoid creating duplicate pages for the same intent
- prefer improving existing strong pages over creating new ones
- verify business-detail consistency sitewide
- use one clear primary page per intent cluster
- fix the safest highest-impact issues first
- report uncertainty honestly

---

## Required Workflow
Claude must work in this exact order:

1. Initial Audit
2. Intent Map
3. Priority Issue List
4. File Identification
5. Remediation / Implementation
6. Re-Audit
7. Search Console / Reindex Review
8. Final Report

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
- Conversion / CTA Consistency
- Trust / Business Detail Consistency

---

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
- stale snippets or old indexed content signals
- redirect logic where duplicate URLs exist

---

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
- template-copy grammar issues
- robotic or repeated service intros
- area page duplication risks

---

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
- whether local service coverage claims are truthful and consistent

---

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
- mismatch between schema and visible content

---

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

---

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

---

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

## Conversion / CTA Consistency Audit
Check:

- primary conversion path is clearly defined
- CTA labels are consistent across homepage, contact, sticky bars, and service pages
- booking flow matches real implementation
- WhatsApp, callback form, quote form, and booking language do not conflict
- no misleading tracking / management promises if not implemented
- emergency pages present a clear next step
- form friction risk on mobile
- service pages use the correct CTA for their intent

---

## Trust / Business Detail Consistency Audit
Check:

- phone number consistency sitewide
- business name consistency sitewide
- review count consistency
- ETA / response-time consistency
- pricing wording consistency
- finance wording consistency
- credentials and registrations are real and not placeholders
- footer, contact page, schema, and service pages match each other
- no stale or outdated business details remain in templates

---

# Phase 2 — Intent Map

Claude must create an intent map before implementation.

For each main search intent cluster, define:

- primary keyword cluster
- primary target page
- supporting pages
- cannibalization risks
- whether a redirect / canonical / noindex decision is needed

Examples:
- homepage = plumbers in [city] / local plumber [city]
- emergency page = emergency plumber [city] / emergency plumber call out
- drain page = drain unblocking [city] / blocked drains [city]

Claude must flag when multiple live pages compete for the same commercial intent.

---

# Phase 3 — Priority Issue List

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
- conflicting primary intent pages
- sitewide business-detail inconsistency

## High
Issues that significantly affect:
- metadata quality
- heading structure
- local SEO clarity
- internal linking
- hero image performance
- image alt handling
- structured data completeness
- CTA clarity
- booking flow consistency
- stale SERP snippet risk

## Medium
Issues that improve:
- content structure
- supporting internal links
- trust/relevance signals
- image naming workflow
- template grammar
- area page uniqueness
- minor contrast/focus issues

## Low
Polish and cleanup items.

Claude must prioritize:
1. safest high-impact fixes first
2. then medium-impact structural improvements
3. then low-risk polish

---

# Phase 4 — File Identification

Before implementation, Claude must list:

- exact files to change
- why each file matters
- which audit category it belongs to
- risk level:
  - low
  - medium
  - high

Claude must not implement before mapping file impact.

Claude must also identify:
- shared business info files
- shared CTA components
- shared template files
- schema/metadata generators
- area page and service page templates
- routes causing duplicate-intent issues

---

# Phase 5 — Remediation / Implementation

Claude must implement in this order:

1. sitewide business-detail consistency fixes
2. duplicate-intent / canonicalization fixes
3. critical technical SEO fixes
4. metadata / H1 / intro alignment on priority pages
5. conversion / CTA consistency fixes
6. structured data fixes
7. internal linking improvements
8. template-copy and area-page uniqueness improvements
9. performance and image optimization improvements
10. low-risk polish

Implementation rules:
- no redesign
- no unnecessary content bloat
- no new pages unless clearly justified
- no fake trust additions
- no over-optimization
- no removal of working lead capture unless clearly intended

---

# Phase 6 — Re-Audit

After implementation, Claude must re-audit the updated site/codebase and verify:

- primary pages have stronger intent alignment
- duplicate-intent conflicts are resolved
- business details are consistent
- CTA flow is consistent
- schema matches visible content
- titles/meta/H1s are improved
- area pages are less templated where applicable
- no major layout or functionality regressions were introduced

---

# Phase 7 — Search Console / Reindex Review

Claude must identify pages that may need manual reindexing after fixes.

Check for:
- stale snippets in SERPs
- previously indexed wrong phone numbers
- old emergency page snippets
- changed metadata on priority pages
- corrected structured data on important pages

Claude must provide a manual reindex list, such as:
- homepage
- contact page
- pricing page
- primary emergency page
- major service pages with corrected snippets

---

# Phase 8 — Final Report

Claude must produce a structured final report with:

## 1. Audit Summary
- total issues found
- critical issues
- high issues
- medium issues
- low issues

## 2. Intent Map Summary
- main keyword clusters
- chosen primary target pages
- cannibalization fixes made

## 3. Files Changed
- exact file paths
- what changed
- why

## 4. SEO Improvements
For each important page changed:
- page purpose
- old vs new title tag
- old vs new meta description
- H1 status
- intro/FAQ/internal-link improvements

## 5. Conversion / CTA Summary
- primary funnel identified
- old inconsistencies
- fixes made
- current recommended flow

## 6. Trust / Business Detail Summary
- phone number consistency
- review / ETA / pricing wording consistency
- placeholder or misleading trust items removed/fixed

## 7. Reindex Review
- pages recommended for manual reindexing
- why they need it

## 8. Remaining Risks / Follow-Up
- anything that still needs manual review
- any deferred low-risk improvements

## 9. Final Score
Claude must provide:
- pre-fix score
- post-fix score
- honest explanation of remaining weaknesses

---

## Success Standard
A successful run means:

- one clear page purpose per page
- one clear primary page per intent cluster
- stronger local SEO signals
- consistent business details
- consistent CTA and booking logic
- technically safe improvements
- honest final reporting