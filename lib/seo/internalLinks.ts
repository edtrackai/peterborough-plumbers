import { services, type Service } from "@/content/services";
import { areas, type Area } from "@/content/areas";

// Single source of truth for related service slugs (4 per service)
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

export function getAreasForService(count = 4): Area[] {
  return areas.slice(0, count);
}
