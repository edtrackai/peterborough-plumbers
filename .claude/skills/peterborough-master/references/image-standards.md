# Image Standards & Specifications

Complete guidelines for image naming, alt text, Next.js props, schema integration, and QA.

---

## FILENAME FORMAT & NAMING PATTERNS

### Core Naming Convention

**Pattern:** `[service]-[location]-[context].webp`

- Lowercase only
- Hyphens as separators (no underscores, spaces, camelCase)
- Service: e.g., boiler-repair, leak-fix, central-heating
- Location: e.g., peterborough, pe1, city-centre (optional)
- Context: e.g., hero, before-after, process-step-1, card
- Example: `boiler-repair-peterborough-hero.webp`

### Service Page Hero Images
- Pattern: `[service]-hero.webp`
- Examples:
  - boiler-repair-hero.webp
  - boiler-installation-hero.webp
  - emergency-plumbing-hero.webp
  - leak-detection-hero.webp
  - central-heating-hero.webp
  - gas-safety-hero.webp

### Area Page Hero Images
- Pattern: `[area-name]-hero.webp` or `pe[number]-hero.webp`
- Examples:
  - pe1-hero.webp
  - pe2-hero.webp
  - city-centre-hero.webp
  - thorpe-hero.webp

### Blog Article Images
- Pattern: `[blog-slug]-hero.webp` for featured
- Pattern: `[blog-slug]-step-[number].webp` for inline
- Pattern: `[blog-slug]-before-after.webp` for comparison
- Examples:
  - boiler-maintenance-tips-hero.webp
  - winter-boiler-prep-step-1.webp
  - frozen-pipes-prevention-before-after.webp

### Service Card Images
- Pattern: `service-[service-name]-card.webp`
- Examples:
  - service-boiler-repair-card.webp
  - service-leak-fix-card.webp
  - service-radiator-bleed-card.webp

### Testimonial/Team Card Images
- Pattern: `team-[name]-card.webp` or `testimonial-[service].webp`
- Examples:
  - team-john-smith-card.webp
  - testimonial-boiler-repair.webp

### Open Graph (OG) Images
- Pattern: `og-[page-slug].webp` or `og-[page-type].webp`
- Dimensions: 1200x630px
- Format: JPG only (OpenGraph standard)
- Examples:
  - og-homepage.jpg
  - og-boiler-repair.jpg
  - og-pe1-area.jpg

### Icon/Badge Images
- Pattern: `icon-[name].svg` or `badge-[name].webp`
- Examples:
  - icon-24-hours.svg
  - icon-gas-safe.svg
  - badge-5-star.webp

### Process/Step Images
- Pattern: `process-[step-number]-[service].webp`
- Examples:
  - process-1-inspection.webp
  - process-2-diagnosis.webp
  - process-3-quote.webp

---

## ALT TEXT FORMULA & EXAMPLES

### Alt Text Structure

`[Action/Subject] + [Service/Item] + [Location (if relevant)] + [Context (if relevant)]`

**Word count:** 8-15 words
**Style:** Descriptive, not keyword-stuffed
**Avoid:** "image of", "picture of", "screenshot of"

### Examples by Image Type

#### Hero Images
- ✅ GOOD: "Emergency plumber in Peterborough responding to urgent boiler leak call"
- ❌ BAD: "Plumber image"
- ❌ BAD: "Emergency plumbing services in Peterborough UK plumber" (too keyword-stuffed)

#### Service Card Images
- ✅ GOOD: "Technician checking central heating system with diagnostic equipment"
- ❌ BAD: "Central heating service"
- ❌ BAD: "Professional plumber performing central heating maintenance"

#### Before/After Comparison
- ✅ GOOD: "Comparison of corroded pipe before repair and new installation after"
- ❌ BAD: "Before and after"
- ❌ BAD: "Pipe repair before and after images"

#### Team/Profile Photos
- ✅ GOOD: "Gas Safe registered engineer James Miller with service vehicle"
- ❌ BAD: "Team member"
- ❌ BAD: "Portrait of plumber"

#### Testimonial/Customer Review
- ✅ GOOD: "Satisfied customer holding Gas Safety certificate after inspection"
- ❌ BAD: "Customer photo"
- ❌ BAD: "Happy client review"

#### Process/Step Images
- ✅ GOOD: "Step 2: Engineer diagnosing boiler malfunction with pressure gauge"
- ❌ BAD: "Boiler repair step"
- ❌ BAD: "How to fix boiler"

#### Infographic/Chart
- ✅ GOOD: "Chart showing average boiler repair costs by component failure type"
- ❌ BAD: "Cost chart"
- ❌ BAD: "Infographic"

#### Blog Inline Images
- ✅ GOOD: "Frozen copper pipes showing ice crystals preventing water flow"
- ❌ BAD: "Frozen pipes"
- ❌ BAD: "Winter plumbing problems image"

#### Trust Badge/Certification
- ✅ GOOD: "Gas Safe Register official certification badge for registered engineers"
- ❌ BAD: "Gas Safe badge"
- ❌ BAD: "Certification logo"

---

## NEXT.JS IMAGE COMPONENT PROPS

### Priority Rules

**Use `priority={true}` for:**
- Hero images (above the fold, all pages)
- Open Graph images
- Homepage service grid (first 6 items only)

**Use `priority={false}` (default) for:**
- Below-fold images
- Lazy-loaded carousels
- Blog inline images
- Testimonial cards

### Image Dimensions & Sizes

#### Hero Images
```jsx
<Image
  src="/images/services/boiler-repair-hero.webp"
  alt="Emergency plumber in Peterborough responding to urgent boiler leak"
  width={1920}
  height={600}
  priority={true}
  sizes="(max-width: 768px) 100vw, 1920px"
  className="w-full h-auto"
/>
```

#### Service Card Images
```jsx
<Image
  src="/images/service-boiler-repair-card.webp"
  alt="Technician checking central heating system with diagnostic equipment"
  width={400}
  height={250}
  priority={false}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="w-full h-auto rounded-lg"
/>
```

#### Blog Featured Image
```jsx
<Image
  src="/images/blog/boiler-maintenance-tips-hero.webp"
  alt="Professional engineer servicing boiler with diagnostic tools"
  width={1200}
  height={675}
  priority={true}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
  className="w-full h-auto rounded-lg"
/>
```

#### Blog Inline Image
```jsx
<Image
  src="/images/blog/winter-boiler-prep-step-1.webp"
  alt="Technician inspecting boiler combustion chamber for carbon buildup"
  width={800}
  height={450}
  priority={false}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
  className="w-full h-auto my-6 rounded-lg"
/>
```

#### Testimonial Avatar
```jsx
<Image
  src="/images/testimonial-boiler-repair.webp"
  alt="Customer John Smith who received emergency boiler repair in PE1"
  width={80}
  height={80}
  priority={false}
  sizes="80px"
  className="w-20 h-20 rounded-full"
/>
```

#### Area Card Thumbnail
```jsx
<Image
  src="/images/areas/pe1-hero.webp"
  alt="Residential area in PE1 Peterborough city centre where we offer plumbing services"
  width={300}
  height={200}
  priority={false}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="w-full h-auto rounded-lg"
/>
```

### General Size Guidelines

| Image Type | Desktop | Tablet | Mobile | Aspect Ratio |
|-----------|---------|--------|--------|-------------|
| Hero | 1920x600 | 1200x400 | 800x400 | 16:5 |
| Card/Grid | 400x250 | 300x187 | 200x125 | 16:10 |
| Blog Featured | 1200x675 | 900x506 | 600x337 | 16:9 |
| Blog Inline | 800x450 | 600x337 | 400x225 | 16:9 |
| Thumbnail | 300x200 | 250x166 | 200x133 | 3:2 |
| Avatar | 80x80 | 80x80 | 60x60 | 1:1 |
| OG (JPG only) | 1200x630 | - | - | 1.9:1 |

---

## OPEN GRAPH (OG) IMAGE SPECIFICATIONS

### Format & Dimensions
- **Format:** JPG only (not WebP)
- **Dimensions:** 1200x630px
- **Filename:** `og-[page-slug].jpg`
- **File size:** < 500KB
- **Quality:** 85-90% JPEG compression

### OG Image Content Strategy

#### Homepage OG Image
- Filename: `og-homepage.jpg`
- Content: Business name, "Emergency Plumber in Peterborough", star rating, phone number
- Design: Professional, trustworthy, 24/7 badge
- Placement: `<meta property="og:image" content="https://[domain]/images/og-homepage.jpg" />`

#### Service Page OG Image
- Filename: `og-[service-slug].jpg` (e.g., `og-boiler-repair.jpg`)
- Content: Service name, "Peterborough", star rating, phone number
- Design: Service-specific icon/image, professional aesthetic
- Placement: Per-page meta

#### Area Page OG Image
- Filename: `og-[area].jpg` (e.g., `og-pe1.jpg`)
- Content: Area name, "Peterborough", "Available Now", phone number
- Design: Geographic indicator (area map or landmark), response time
- Placement: Per-page meta

#### Blog OG Image
- Filename: `og-[blog-slug].jpg` (e.g., `og-boiler-maintenance-tips.jpg`)
- Content: Article title, publish date, "Read Now" or "Learn More"
- Design: Blog post featured image overlay with text
- Placement: Per-post meta

#### About Page OG Image
- Filename: `og-about.jpg`
- Content: "About [Business Name]", years in business, team photo
- Design: Professional team photo with company branding
- Placement: Page meta

#### Reviews Page OG Image
- Filename: `og-reviews.jpg`
- Content: "5-Star Rated by 100+ Customers", aggregate rating
- Design: Star rating display, customer testimonial snippet
- Placement: Page meta

### OG Meta Tag Implementation

```html
<meta property="og:title" content="[PLACEHOLDER Page Title]" />
<meta property="og:description" content="[PLACEHOLDER 155-160 char description]" />
<meta property="og:image" content="https://[domain]/images/og-[slug].jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:url" content="https://[domain]/[page-path]" />
<meta property="og:type" content="website" />
```

---

## AI IMAGE GENERATION PROMPTS

### Prompt Framework

`[Scene] + [Subject] + [Action] + [Setting] + [Style] + [Technical Details]`

### Service-Specific Prompts

#### Boiler Service
```
Professional plumber in full uniform checking a modern combi boiler with 
diagnostic equipment and pressure gauge. Indoor residential boiler room setting, 
natural daylight through small window. Technician focused and professional. 
High-quality photograph, sharp details, warm professional lighting. 
Photo realistic, 4K, British home setting.
```

#### Emergency/Urgent Repair
```
Experienced emergency plumber arriving at a residential home in Peterborough 
with toolbox and equipment ready. Professional van parked at the kerb, 
customer greeting at doorway. Evening/night time setting. Professional, 
trustworthy appearance. Cinematic photography, warm ambient lighting, 
urgent but reassuring tone. Real photograph aesthetic.
```

#### Gas Safety Inspection
```
Certified Gas Safe engineer conducting thorough gas safety inspection on 
heating appliances in a British residential home. Using inspection tools, 
checking pipes and connections. Professional environment, homeowner present. 
Detailed shot of inspection process. High-quality photograph, professional 
lighting, authoritative and trustworthy. 4K resolution.
```

#### Central Heating System
```
Modern central heating system with radiators, boiler, and manifold visible 
in a bright contemporary British kitchen. Technician adjusting thermostat. 
Warm, well-lit environment. Cross-section view showing water flow. 
Professional, clean installation. Hyper-realistic, high-detail photograph, 
warm colour palette. 4K quality.
```

#### Area Coverage (Generic)
```
Aerial view of Peterborough residential neighbourhood showing typical 
British homes, streets, and community. Daytime, clear sky. Wide street view 
with mix of house types. Welcoming, residential atmosphere. Professional 
drone photography, sharp focus, warm natural lighting. Real-world setting.
```

#### Leak Detection/Before-After
```
Split-screen comparison: Left side showing visible water leak from ceiling 
in damaged condition, right side showing same area professionally repaired 
with fresh paint and intact ceiling. Before-after restoration. Indoor 
residential setting. Professional quality contrast. High-resolution photograph.
```

#### Team/Professional Portrait
```
Portrait of confident male plumber in branded polo shirt holding Gas Safe 
certificate and toolbox, standing in front of professional service van. 
Outdoor daytime setting, professional business background. Friendly but 
authoritative expression. Professional headshot lighting, sharp focus on face. 
4K quality, authentic photograph.
```

### Prompt Customisation Rules

1. Include "plumber", "engineer", or "technician" (British terminology)
2. Specify "British", "UK", or "Peterborough" for regional authenticity
3. Use "professional", "certified", "qualified" for trust signalling
4. Include lighting direction: "natural daylight", "professional lighting", "warm ambient"
5. Specify format: "photograph", "realistic", "4K", "high-resolution"
6. Avoid: generic stock images, obviously fake/AI aesthetics, poor quality

---

## IMAGE QA CHECKLIST

### Before Publishing

- [ ] **Filename**
  - [ ] Lowercase only
  - [ ] Hyphens as separators (no underscores, spaces, camelCase)
  - [ ] Follows [service]-[location]-[context].webp pattern
  - [ ] No special characters or numbers (except in PE postcode references)

- [ ] **Alt Text**
  - [ ] Present on every image
  - [ ] 8-15 words, descriptive and natural
  - [ ] No "image of", "picture of", "screenshot of"
  - [ ] No keyword-stuffing (max 1-2 keywords)
  - [ ] Includes action/subject where relevant
  - [ ] Includes location if page-specific

- [ ] **Image Format**
  - [ ] WebP for all images (except OG which is JPG)
  - [ ] OG images are JPG, 1200x630px
  - [ ] SVG for icons/logos
  - [ ] File size < 200KB for cards, < 500KB for heroes

- [ ] **Next.js Image Props**
  - [ ] width and height attributes present
  - [ ] priority={true} for above-fold images only
  - [ ] sizes attribute defined for responsive scaling
  - [ ] Appropriate className for layout
  - [ ] Image is not stretched/distorted

- [ ] **Schema Integration**
  - [ ] Hero images included in schema markup (image property)
  - [ ] Blog featured image in Article schema
  - [ ] Team photos with Person schema (if applicable)
  - [ ] OG image referenced in meta tags

- [ ] **Open Graph Image**
  - [ ] OG image exists for key pages (homepage, services, areas, blog)
  - [ ] OG image is JPG format
  - [ ] OG image is 1200x630px
  - [ ] OG meta tags include og:image, og:image:width, og:image:height
  - [ ] OG image has readable text overlay (if applicable)

- [ ] **Performance**
  - [ ] Image loads quickly (Lighthouse: > 80)
  - [ ] No layout shift (CLS: < 0.1)
  - [ ] Appropriate dimensions for container
  - [ ] Lazy loading applied where appropriate

- [ ] **Accessibility**
  - [ ] Alt text provides full context
  - [ ] Decorative images have alt=""
  - [ ] No text embedded in image is inaccessible
  - [ ] Colour contrast suitable if image contains text

- [ ] **Mobile Responsiveness**
  - [ ] Image displays correctly on mobile
  - [ ] No horizontal overflow
  - [ ] Text readable on small screens
  - [ ] Aspect ratio maintained across devices

- [ ] **Content Quality**
  - [ ] Professional quality (no blurry, pixelated, or low-res)
  - [ ] Relevant to page content
  - [ ] Consistent with brand aesthetic
  - [ ] No watermarks or copyright notices
  - [ ] Real photograph (no obviously fake AI)

- [ ] **Security & Compliance**
  - [ ] Image does not contain personal data (unless consented)
  - [ ] No copyrighted material used without permission
  - [ ] If customer photo, ensure customer consent/testimonial
  - [ ] No sensitive information visible (addresses, phone numbers in image)

---

## IMAGE DIRECTORY STRUCTURE

```
/public/images/
├── logo.webp
├── icon-*.svg
├── og-*.jpg
├── services/
│   ├── boiler-repair-hero.webp
│   ├── boiler-installation-hero.webp
│   ├── service-boiler-repair-card.webp
│   └── ... (one per service)
├── areas/
│   ├── pe1-hero.webp
│   ├── pe2-hero.webp
│   └── ... (one per area)
├── blog/
│   ├── boiler-maintenance-tips-hero.webp
│   ├── boiler-maintenance-tips-step-1.webp
│   └── ... (per article)
├── team/
│   ├── team-john-smith-card.webp
│   └── ... (per team member)
├── testimonials/
│   ├── testimonial-boiler-repair.webp
│   └── ... (per testimonial)
└── process/
    ├── process-1-inspection.webp
    └── ... (per step)
```

---

## COMMON MISTAKES TO AVOID

1. **❌ Using PNG instead of WebP** → Use WebP for all web images
2. **❌ Alt text like "image", "photo", "picture"** → Be descriptive
3. **❌ Alt text longer than 15 words** → Keep concise
4. **❌ Missing priority prop on hero images** → Add `priority={true}`
5. **❌ Hero images smaller than 1920x600** → Use high-resolution images
6. **❌ OG images in WebP format** → Use JPG only
7. **❌ Filenames with spaces or camelCase** → Use lowercase hyphens
8. **❌ Images not optimised for mobile** → Test on multiple devices
9. **❌ Keyword-stuffing in alt text** → Keep it natural and descriptive
10. **❌ Missing sizes attribute** → Define responsive sizes

---

## TOOLS & RESOURCES

- **Image Optimisation:** TinyPNG, Squoosh (Google), ImageOptim
- **Format Conversion:** CloudConvert, Online-Convert, XnConvert
- **Dimensions & Validation:** GIMP, Photoshop, Figma
- **Schema Testing:** Google Rich Results Test, Schema.org validator
- **OG Image Preview:** Facebook Sharing Debugger, Twitter Card Validator
- **Accessibility Testing:** WAVE, Axe DevTools
