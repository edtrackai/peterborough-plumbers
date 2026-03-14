\# Image SEO System



A practical combined system for:

\- auditing existing site images

\- implementing new images correctly

\- improving image SEO, performance, accessibility, and social sharing



This file merges:

\- Image SEO Checklist

\- image-standards



\---



\## 1. Purpose



Use this document to:



1\. audit images already on the site

2\. fix the highest-impact image SEO issues first

3\. apply consistent image implementation rules for future uploads

4\. avoid wasting time on low-impact metadata before core web issues are fixed



\---



\## 2. When to Use



Use this file when working on:



\- homepage hero images

\- service page hero images

\- area page images

\- blog featured images

\- blog inline images

\- service cards

\- team/testimonial images

\- Open Graph / social images

\- trust/certification images



\---



\## 3. Core Rules



Always follow these rules:



\- fix high-impact image issues first

\- prioritise performance, accessibility, and relevance over advanced metadata

\- use descriptive alt text, not keyword stuffing

\- use responsive image delivery

\- use hero image priority only where genuinely needed

\- do not over-optimise decorative assets

\- do not spend time on EXIF/IPTC/XMP unless core image issues are already solved

\- only use location wording naturally and truthfully

\- only add schema fields that are real, visible, and verified



\---



\## 4. Audit Priority Order



Always audit images in this order:



1\. homepage hero / LCP image

2\. main service page hero images

3\. Open Graph / social preview images

4\. trust / review / certification images

5\. blog featured images

6\. blog inline images

7\. service cards / area cards

8\. decorative assets last



\---



\## 5. Audit Checklist



\### Tier 1 — Must Fix



\#### File-Level

\- \[ ] \*\*File Name\*\* — Descriptive, lowercase, hyphen-separated

\- \[ ] \*\*File Format\*\* — Correct format chosen (WebP/AVIF where appropriate, PNG/SVG only when needed)

\- \[ ] \*\*File Size\*\* — Compressed without visible quality loss

\- \[ ] \*\*Image Dimensions\*\* — Correctly sized for intended display

\- \[ ] \*\*Colour Profile\*\* — sRGB for web



\#### HTML / Rendering

\- \[ ] \*\*Alt Text (`alt`)\*\* — Accurate, concise, descriptive, contextually relevant

\- \[ ] \*\*Decorative Images\*\* — Use `alt=""` where image is decorative

\- \[ ] \*\*Width \& Height Attributes\*\* — Present to reduce CLS

\- \[ ] \*\*Loading Strategy\*\* — Below-the-fold images lazy loaded

\- \[ ] \*\*Hero Image Priority\*\* — Used only on LCP / above-the-fold hero image

\- \[ ] \*\*Srcset \& Sizes\*\* — Responsive image delivery configured

\- \[ ] \*\*No Oversized Delivery\*\* — Large images not sent unnecessarily to small screens

\- \[ ] \*\*No Broken Images\*\* — Image URLs return 200

\- \[ ] \*\*Correct MIME Type\*\* — Proper content type sent by server



\#### Context / SEO

\- \[ ] \*\*Image Relevance\*\* — Image supports page topic

\- \[ ] \*\*Placed Near Relevant Copy\*\* — Image is near useful supporting text/headings

\- \[ ] \*\*Page Title Relevance\*\* — Page topic matches image subject

\- \[ ] \*\*Open Graph Image Present\*\* — `og:image` set on important pages

\- \[ ] \*\*Twitter/X Image Present\*\* — `twitter:image` set where applicable

\- \[ ] \*\*Image Sitemap Coverage\*\* — Important indexable images are covered in sitemap strategy



\#### Accessibility

\- \[ ] \*\*Alt Present on Content Images\*\*

\- \[ ] \*\*No Key Text Embedded in Images\*\*

\- \[ ] \*\*Text Over Images Is Readable\*\*



\---



\### Tier 2 — Strongly Recommended



\#### File-Level

\- \[ ] \*\*Consistent Naming Pattern\*\*

\- \[ ] \*\*Consistent Format Policy\*\*



\#### HTML / Markup

\- \[ ] \*\*Decoding Attribute\*\* — `decoding="async"` where helpful

\- \[ ] \*\*`<picture>` Element\*\* — Used only when genuinely useful for format/source switching

\- \[ ] \*\*Figure/Caption Usage\*\* — `<figure>` + `<figcaption>` used when captions add value

\- \[ ] \*\*Image Anchor Context\*\* — If clickable, surrounding context is descriptive



\#### On-Page Context

\- \[ ] \*\*Heading Proximity\*\* — Image placed near relevant H2/H3 where useful

\- \[ ] \*\*Caption Helps Understanding\*\*

\- \[ ] \*\*Unique Image Preference\*\* — Prefer original brand/service imagery over generic stock

\- \[ ] \*\*Local Relevance\*\* — On local pages, image naturally supports local context



\#### Technical / Performance

\- \[ ] \*\*CDN Delivery\*\*

\- \[ ] \*\*Caching Headers\*\*

\- \[ ] \*\*Next-Gen Formats\*\*

\- \[ ] \*\*Fallback Strategy\*\*

\- \[ ] \*\*Hero LCP Review\*\* — Hero image is not unnecessarily harming LCP



\#### Social / Sharing

\- \[ ] \*\*`og:image:width` and `og:image:height`\*\*

\- \[ ] \*\*`og:image:alt`\*\*

\- \[ ] \*\*`twitter:image:alt`\*\*

\- \[ ] \*\*Correct Social Aspect Ratios\*\*



\#### Local SEO

\- \[ ] \*\*Location in File Name\*\* — Only when natural and useful

\- \[ ] \*\*Location in Alt Text\*\* — Only when natural and truthful

\- \[ ] \*\*Local Landmarks / Service Context\*\* — Only when genuine

\- \[ ] \*\*Business Context Nearby\*\* — Useful when relevant



\---



\### Tier 3 — Optional / Advanced



Only work on these after core web-visible image issues are already fixed.



\#### Embedded Metadata

\- \[ ] \*\*EXIF Title / Description\*\*

\- \[ ] \*\*EXIF Author / Copyright\*\*

\- \[ ] \*\*IPTC Headline / Caption\*\*

\- \[ ] \*\*IPTC Copyright / Credit\*\*

\- \[ ] \*\*XMP Title / Description / Creator\*\*

\- \[ ] \*\*Date Created\*\*

\- \[ ] \*\*Camera / Lens Metadata\*\*



\#### Geo / Location Metadata

\- \[ ] \*\*GPS Latitude / Longitude\*\*

\- \[ ] \*\*City / Region / Country\*\*

\- \[ ] \*\*Location Name\*\*



\#### Structured Data

\- \[ ] \*\*ImageObject Schema\*\* — Only where genuinely useful

\- \[ ] \*\*`name`\*\*

\- \[ ] \*\*`description`\*\*

\- \[ ] \*\*`contentUrl`\*\*

\- \[ ] \*\*`thumbnailUrl`\*\*

\- \[ ] \*\*`uploadDate`\*\*

\- \[ ] \*\*`author`\*\*

\- \[ ] \*\*`copyrightHolder`\*\*

\- \[ ] \*\*`license`\*\*

\- \[ ] \*\*`contentLocation`\*\*

\- \[ ] \*\*`representativeOfPage`\*\*

\- \[ ] \*\*`caption`\*\*

\- \[ ] \*\*`keywords`\*\*



\#### Rights / Advanced Usage

\- \[ ] \*\*Licence Page\*\*

\- \[ ] \*\*Credit Text\*\*

\- \[ ] \*\*Usage Rights / Terms\*\*

\- \[ ] \*\*AI-Generated Disclosure\*\* — Only where appropriate

\- \[ ] \*\*Branding / Watermark Policy\*\*



\---



\## 6. Low-Priority / De-Prioritised Items



Do \*\*not\*\* prioritise these before core fixes:



\- image `title` attribute

\- exhaustive EXIF/IPTC/XMP completion

\- GPS geotagging for every image

\- Pinterest-specific attributes

\- advanced rights fields on normal service pages

\- camera/lens metadata for routine site assets



Core priorities always come first:

\- alt text

\- dimensions

\- file size

\- hero/LCP handling

\- responsive delivery

\- contextual relevance

\- social sharing image quality



\---



\## 7. Implementation Standards



\### 7.1 File Naming Rules



\#### Core Naming Convention

\*\*Pattern:\*\* `\[service]-\[location]-\[context].webp`



Rules:

\- lowercase only

\- hyphens only

\- no spaces

\- no underscores

\- no camelCase



Examples:

\- `boiler-repair-peterborough-hero.webp`

\- `drain-unblocking-pe1-card.webp`

\- `leak-detection-process-step-1.webp`



\#### Service Page Hero Images

Pattern:

\- `\[service]-hero.webp`



Examples:

\- `boiler-repair-hero.webp`

\- `emergency-plumbing-hero.webp`

\- `leak-detection-hero.webp`



\#### Area Page Hero Images

Pattern:

\- `\[area-name]-hero.webp`

\- `pe\[number]-hero.webp`



Examples:

\- `pe1-hero.webp`

\- `thorpe-hero.webp`



\#### Blog Images

Featured:

\- `\[blog-slug]-hero.webp`



Inline:

\- `\[blog-slug]-step-\[number].webp`

\- `\[blog-slug]-before-after.webp`



Examples:

\- `boiler-maintenance-tips-hero.webp`

\- `winter-boiler-prep-step-1.webp`



\#### Service Card Images

Pattern:

\- `service-\[service-name]-card.webp`



Examples:

\- `service-boiler-repair-card.webp`

\- `service-leak-fix-card.webp`



\#### Team / Testimonial Images

Pattern:

\- `team-\[name]-card.webp`

\- `testimonial-\[service].webp`



Examples:

\- `team-james-miller-card.webp`

\- `testimonial-boiler-repair.webp`



\#### Open Graph Images

Pattern:

\- `og-\[page-slug].jpg`



Examples:

\- `og-homepage.jpg`

\- `og-boiler-repair.jpg`

\- `og-pe1-area.jpg`



\---



\### 7.2 Alt Text Rules



\#### Formula

`\[Action/Subject] + \[Service/Item] + \[Location if relevant] + \[Context if relevant]`



Rules:

\- 8–15 words where practical

\- descriptive

\- natural

\- no keyword stuffing

\- do not use “image of”, “picture of”, “photo of” unless needed for clarity



\#### Good Examples



\*\*Hero images\*\*

\- `Emergency plumber in Peterborough responding to urgent boiler leak call`



\*\*Service card\*\*

\- `Technician checking central heating system with diagnostic equipment`



\*\*Before / after\*\*

\- `Comparison of damaged pipe before repair and new installation after`



\*\*Team\*\*

\- `Gas Safe registered engineer James Miller with service vehicle`



\*\*Testimonial\*\*

\- `Satisfied customer after emergency boiler repair visit in PE1`



\*\*Process image\*\*

\- `Step 2: Engineer diagnosing boiler fault with pressure gauge`



\*\*Blog inline\*\*

\- `Frozen copper pipes showing ice buildup preventing water flow`



\*\*Trust badge\*\*

\- `Gas Safe Register certification badge for registered engineers`



\#### Bad Examples

\- `Plumber image`

\- `Emergency plumbing services in Peterborough UK plumber`

\- `Before and after`

\- `Customer photo`



\---



\### 7.3 Next.js Image Rules



\#### Use high priority only for:

\- hero/LCP image

\- critical above-the-fold featured image



\#### Do not use high priority for:

\- below-the-fold images

\- service cards

\- blog inline images

\- testimonials

\- carousels

\- gallery thumbnails



\#### General Rules

\- always include `alt`

\- always include `width` and `height`

\- always set useful `sizes`

\- use responsive sizing

\- avoid huge intrinsic dimensions when not needed

\- do not use plain `<img>` if project standards require `next/image`



\---



\### 7.4 Hero Image Example



```tsx

<Image

&#x20; src="/images/services/boiler-repair-hero.webp"

&#x20; alt="Emergency plumber in Peterborough responding to urgent boiler leak"

&#x20; width={1920}

&#x20; height={600}

&#x20; priority

&#x20; sizes="(max-width: 768px) 100vw, 1920px"

&#x20; className="w-full h-auto"

/>

