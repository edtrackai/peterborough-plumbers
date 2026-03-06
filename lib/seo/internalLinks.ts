import { services, type Service } from "@/content/services";

// ── Area link type ────────────────────────────────────────────────────────────
export interface AreaLink { slug: string; name: string }

// ── Guide category → area pages ───────────────────────────────────────────────
// Used by /guides/[slug] to render relevant area chips per guide category.
// Each category maps to 4 areas contextually matched to the guide's topic.
export const guideCategoryAreaMap: Record<string, AreaLink[]> = {
  costs: [
    { slug: "city-centre",    name: "Peterborough City Centre" },
    { slug: "hampton",        name: "Hampton" },
    { slug: "stamford",       name: "Stamford" },
    { slug: "werrington",     name: "Werrington" },
  ],
  diy: [
    { slug: "werrington",     name: "Werrington" },
    { slug: "bretton",        name: "Bretton" },
    { slug: "yaxley",         name: "Yaxley" },
    { slug: "city-centre",    name: "Peterborough City Centre" },
  ],
  boilers: [
    { slug: "city-centre",    name: "Peterborough City Centre" },
    { slug: "werrington",     name: "Werrington" },
    { slug: "market-deeping", name: "Market Deeping" },
    { slug: "stamford",       name: "Stamford" },
  ],
  heating: [
    { slug: "hampton",        name: "Hampton" },
    { slug: "bretton",        name: "Bretton" },
    { slug: "city-centre",    name: "Peterborough City Centre" },
    { slug: "market-deeping", name: "Market Deeping" },
  ],
  emergencies: [
    { slug: "city-centre",    name: "Peterborough City Centre" },
    { slug: "orton",          name: "Orton" },
    { slug: "yaxley",         name: "Yaxley" },
    { slug: "whittlesey",     name: "Whittlesey" },
  ],
};

// ── Blog category → area pages ────────────────────────────────────────────────
// Used by /blog/[slug] to render an "Areas We Cover" chip strip.
// Each blog category maps to 3 areas contextually matched to typical readers.
export const blogCategoryAreaMap: Record<string, AreaLink[]> = {
  "Boiler & Heating": [
    { slug: "city-centre",    name: "Peterborough City Centre" },
    { slug: "werrington",     name: "Werrington" },
    { slug: "hampton",        name: "Hampton" },
  ],
  "Landlord & Legal": [
    { slug: "city-centre",    name: "Peterborough City Centre" },
    { slug: "orton",          name: "Orton" },
    { slug: "bretton",        name: "Bretton" },
  ],
  "Emergency & Repairs": [
    { slug: "city-centre",    name: "Peterborough City Centre" },
    { slug: "orton",          name: "Orton" },
    { slug: "yaxley",         name: "Yaxley" },
  ],
  "Local Guides": [
    { slug: "hampton",        name: "Hampton" },
    { slug: "stamford",       name: "Stamford" },
    { slug: "market-deeping", name: "Market Deeping" },
  ],
};

// ── Area → helpful guides ─────────────────────────────────────────────────────
// Used by /areas/[slug] to render a "Helpful Guides" section.
// Each area maps to 3 guides contextually relevant to that area's housing stock.
export interface GuideLink { slug: string; title: string }

export const areaGuideMap: Record<string, GuideLink[]> = {
  "city-centre": [
    { slug: "emergency-plumber-call-out-cost",      title: "Emergency Plumber Call-Out Cost" },
    { slug: "what-to-do-burst-pipe",                title: "What to Do If a Pipe Bursts" },
    { slug: "boiler-not-working-guide",             title: "Boiler Not Working? Troubleshooting Guide" },
  ],
  "werrington": [
    { slug: "how-to-bleed-a-radiator",              title: "How to Bleed a Radiator" },
    { slug: "central-heating-not-working",          title: "Central Heating Not Working?" },
    { slug: "how-much-does-a-boiler-service-cost",  title: "How Much Does a Boiler Service Cost?" },
  ],
  "bretton": [
    { slug: "how-to-unblock-a-drain",               title: "How to Unblock a Drain" },
    { slug: "signs-drain-blocked",                  title: "Signs Your Drain Is Blocked" },
    { slug: "cctv-drain-survey",                    title: "CCTV Drain Survey: What It Is and When You Need One" },
  ],
  "hampton": [
    { slug: "bathroom-installation-cost-peterborough", title: "Bathroom Installation Cost in Peterborough" },
    { slug: "bathroom-installation-time",           title: "How Long Does a Bathroom Installation Take?" },
    { slug: "wet-room-vs-shower",                   title: "Wet Room vs Shower Enclosure: Which Is Better?" },
  ],
  "orton": [
    { slug: "emergency-plumber-call-out-cost",      title: "Emergency Plumber Call-Out Cost" },
    { slug: "what-to-do-burst-pipe",                title: "What to Do If a Pipe Bursts" },
    { slug: "gas-safety-certificate-cost",          title: "Gas Safety Certificate Cost" },
  ],
  "yaxley": [
    { slug: "how-to-prevent-frozen-pipes",          title: "How to Prevent Frozen Pipes" },
    { slug: "central-heating-not-working",          title: "Central Heating Not Working?" },
    { slug: "plumber-cost-per-hour",                title: "How Much Does a Plumber Cost Per Hour?" },
  ],
  "whittlesey": [
    { slug: "boiler-replacement-vs-repair",         title: "Boiler Repair vs Replacement" },
    { slug: "how-to-repressurise-your-boiler",      title: "How to Repressurise Your Boiler" },
    { slug: "radiators-not-heating-up",             title: "Radiators Not Heating Up Properly?" },
  ],
  "market-deeping": [
    { slug: "how-much-does-a-boiler-service-cost",  title: "How Much Does a Boiler Service Cost?" },
    { slug: "gas-safety-certificate-cost",          title: "Gas Safety Certificate Cost" },
    { slug: "central-heating-power-flush-cost",     title: "Central Heating Power Flush Cost" },
  ],
  "stamford": [
    { slug: "how-much-does-a-boiler-service-cost",  title: "How Much Does a Boiler Service Cost?" },
    { slug: "bathroom-installation-cost-peterborough", title: "Bathroom Installation Cost" },
    { slug: "plumber-cost-per-hour",                title: "How Much Does a Plumber Cost Per Hour?" },
  ],
  // ── Village area guide links ────────────────────────────────────────────────
  "longthorpe": [
    { slug: "emergency-plumber-call-out-cost",      title: "Emergency Plumber Call-Out Cost" },
    { slug: "how-to-bleed-a-radiator",              title: "How to Bleed a Radiator" },
    { slug: "plumber-cost-per-hour",                title: "How Much Does a Plumber Cost Per Hour?" },
  ],
  "eye": [
    { slug: "how-to-prevent-frozen-pipes",          title: "How to Prevent Frozen Pipes" },
    { slug: "central-heating-not-working",          title: "Central Heating Not Working?" },
    { slug: "what-to-do-burst-pipe",                title: "What to Do If a Pipe Bursts" },
  ],
  "glinton": [
    { slug: "how-to-repressurise-your-boiler",      title: "How to Repressurise Your Boiler" },
    { slug: "boiler-not-working-guide",             title: "Boiler Not Working? Troubleshooting Guide" },
    { slug: "plumber-cost-per-hour",                title: "How Much Does a Plumber Cost Per Hour?" },
  ],
  "thorney": [
    { slug: "what-to-do-burst-pipe",                title: "What to Do If a Pipe Bursts" },
    { slug: "how-to-prevent-frozen-pipes",          title: "How to Prevent Frozen Pipes" },
    { slug: "emergency-plumber-call-out-cost",      title: "Emergency Plumber Call-Out Cost" },
  ],
  "crowland": [
    { slug: "how-much-does-a-boiler-service-cost",  title: "How Much Does a Boiler Service Cost?" },
    { slug: "gas-safety-certificate-cost",          title: "Gas Safety Certificate Cost" },
    { slug: "plumber-cost-per-hour",                title: "How Much Does a Plumber Cost Per Hour?" },
  ],
};

// ── Blog category → helpful guides ───────────────────────────────────────────
// Used by /blog/[slug] to cross-link to the Guides Hub.
export const blogCategoryGuideMap: Record<string, GuideLink[]> = {
  "Boiler & Heating": [
    { slug: "how-much-does-a-boiler-service-cost",  title: "How Much Does a Boiler Service Cost?" },
    { slug: "signs-boiler-needs-replacing",         title: "7 Signs Your Boiler Needs Replacing" },
    { slug: "boiler-not-working-guide",             title: "Boiler Not Working? Troubleshooting Guide" },
  ],
  "Landlord & Legal": [
    { slug: "gas-safety-certificate-cost",          title: "Gas Safety Certificate Cost for Landlords" },
    { slug: "how-to-check-plumber-is-gas-safe",     title: "How to Check If a Plumber Is Gas Safe" },
    { slug: "boiler-replacement-vs-repair",         title: "Boiler Repair vs Replacement" },
  ],
  "Emergency & Repairs": [
    { slug: "what-to-do-burst-pipe",                title: "What to Do If a Pipe Bursts" },
    { slug: "emergency-plumber-call-out-cost",      title: "Emergency Plumber Call-Out Cost" },
    { slug: "how-to-prevent-frozen-pipes",          title: "How to Prevent Frozen Pipes" },
  ],
  "Local Guides": [
    { slug: "plumber-cost-per-hour",                title: "How Much Does a Plumber Cost Per Hour?" },
    { slug: "bathroom-installation-cost-peterborough", title: "Bathroom Installation Cost in Peterborough" },
    { slug: "central-heating-power-flush-cost",     title: "Central Heating Power Flush Cost" },
  ],
};

// ── Service → related blog posts ─────────────────────────────────────────────
// Used by /services/[slug] to surface relevant blog content.
export interface BlogLink { slug: string; title: string }

export const serviceBlogMap: Record<string, BlogLink[]> = {
  "boiler-service": [
    { slug: "how-often-service-boiler",             title: "How Often Should You Service Your Boiler?" },
    { slug: "signs-boiler-needs-replacing",         title: "Signs Your Boiler Needs Replacing" },
  ],
  "gas-safety-certificates": [
    { slug: "landlord-gas-safety-guide",            title: "Landlord Gas Safety Guide" },
    { slug: "gas-safety-vs-plumbing-safety-landlords", title: "Gas Safety vs Plumbing Safety: What Landlords Must Check" },
  ],
  "landlord-services": [
    { slug: "landlord-plumbing-safety-checklist",   title: "Landlord Plumbing Safety Checklist for Rental Properties" },
    { slug: "gas-safety-vs-plumbing-safety-landlords", title: "Gas Safety vs Plumbing Safety: What Landlords Must Check" },
  ],
  "emergency-plumber": [
    { slug: "plumbing-emergency-guide",             title: "What to Do in a Plumbing Emergency" },
    { slug: "no-hot-water-emergency-steps",         title: "No Hot Water? Emergency Steps to Take" },
  ],
  "central-heating-services": [
    { slug: "what-is-power-flush",                  title: "What Is a Power Flush?" },
  ],
  "plumbing-repairs": [
    { slug: "how-to-stop-dripping-tap",             title: "How to Stop a Dripping Tap" },
  ],
  "plumbing-installation": [
    { slug: "peterborough-water-hard-soft",         title: "Peterborough's Water: Hard or Soft?" },
    { slug: "new-build-peterborough-plumbing-guide", title: "Buying a New Build in Peterborough?" },
  ],
  "pre-purchase-plumbing-survey": [
    { slug: "new-build-peterborough-plumbing-guide", title: "Buying a New Build in Peterborough?" },
  ],
  "drain-blockages": [
    { slug: "blocked-drain-causes-peterborough",       title: "Common Causes of Blocked Drains in Peterborough Homes" },
    { slug: "do-you-need-cctv-drain-survey",           title: "Do You Need a CCTV Drain Survey? Signs to Look For" },
  ],
  "bathroom-installations": [
    { slug: "bathroom-installation-time-uk",           title: "How Long Does a Bathroom Installation Take?" },
    { slug: "wet-room-vs-shower-enclosure",            title: "Wet Room vs Shower Enclosure: Which Is Better?" },
  ],
  "damp-leak-detection": [
    { slug: "hidden-water-leak-signs-home",            title: "7 Hidden Water Leak Warning Signs in Your Home" },
    { slug: "damp-vs-plumbing-leak",                   title: "Damp vs Plumbing Leak: How to Tell the Difference" },
  ],
};

// ── Single source of truth for related service slugs (4 per service) ──────────
export const relatedServiceMap: Record<string, string[]> = {
  "emergency-plumber":            ["plumbing-repairs", "damp-leak-detection", "drain-blockages", "plumbing-installation"],
  "plumbing-repairs":             ["emergency-plumber", "damp-leak-detection", "plumbing-installation", "bathroom-installations"],
  "drain-blockages":              ["emergency-plumber", "plumbing-repairs", "damp-leak-detection", "plumbing-installation"],
  "damp-leak-detection":          ["plumbing-repairs", "emergency-plumber", "plumbing-installation", "bathroom-installations"],
  "plumbing-installation":        ["plumbing-repairs", "bathroom-installations", "landlord-services", "drain-blockages"],
  "bathroom-installations":       ["plumbing-installation", "plumbing-repairs", "damp-leak-detection", "landlord-services"],
  "landlord-services":            ["gas-safety-certificates", "plumbing-repairs", "plumbing-installation", "pre-purchase-plumbing-survey"],
  "pre-purchase-plumbing-survey": ["landlord-services", "plumbing-repairs", "damp-leak-detection", "gas-safety-certificates"],
  "gas-safety-certificates":      ["landlord-services", "pre-purchase-plumbing-survey", "boiler-service", "central-heating-services"],
  "boiler-service":               ["central-heating-services", "landlord-services", "emergency-plumber", "plumbing-repairs"],
  "central-heating-services":     ["boiler-service", "gas-safety-certificates", "emergency-plumber", "plumbing-repairs"],
};

export function getRelatedServiceSlugs(slug: string): string[] {
  return relatedServiceMap[slug] ?? [];
}

export function getRelatedServices(currentSlug: string, count = 3): Service[] {
  const relatedSlugs = relatedServiceMap[currentSlug];
  if (relatedSlugs) {
    return relatedSlugs
      .slice(0, count)
      .map((slug) => services.find((s) => s.slug === slug))
      .filter((s): s is Service => s !== undefined);
  }
  // Fallback: return other services excluding current
  return services.filter((s) => s.slug !== currentSlug).slice(0, count);
}


