import { services, type Service } from "@/content/services";
import { areas, type Area } from "@/content/areas";

// Semantic mapping: each service links to its most relevant related services
const relatedServiceMap: Record<string, string[]> = {
  "boiler-service": ["central-heating-services", "gas-safety-certificates", "emergency-plumber"],
  "gas-safety-certificates": ["boiler-service", "landlord-services", "central-heating-services"],
  "central-heating-services": ["boiler-service", "plumbing-installation", "plumbing-repairs"],
  "bathroom-installations": ["plumbing-installation", "plumbing-repairs", "damp-leak-detection"],
  "landlord-services": ["gas-safety-certificates", "boiler-service", "plumbing-repairs"],
  "emergency-plumber": ["plumbing-repairs", "drain-blockages", "damp-leak-detection"],
  "plumbing-installation": ["bathroom-installations", "central-heating-services", "plumbing-repairs"],
  "plumbing-repairs": ["emergency-plumber", "damp-leak-detection", "plumbing-installation"],
  "damp-leak-detection": ["plumbing-repairs", "emergency-plumber", "drain-blockages"],
  "drain-blockages": ["emergency-plumber", "damp-leak-detection", "plumbing-repairs"],
  "pre-purchase-plumbing-survey": ["boiler-service", "damp-leak-detection", "central-heating-services"],
};

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
