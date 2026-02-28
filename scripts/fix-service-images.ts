/**
 * Updates service image paths in the DB to match the compressed WebP files.
 * Run with: npx tsx scripts/fix-service-images.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const imageMap: Record<string, { image: string; heroImage: string }> = {
  "boiler-service":             { image: "/images/homepage/boiler-service.webp",    heroImage: "/images/homepage/boiler-service.webp" },
  "central-heating-services":   { image: "/images/homepage/boiler-service.webp",    heroImage: "/images/homepage/boiler-service.webp" },
  "emergency-plumber":          { image: "/images/homepage/emergency-plumbing.webp", heroImage: "/images/homepage/emergency-plumbing.webp" },
  "plumbing-installation":      { image: "/images/homepage/hero-engineer.webp",      heroImage: "/images/homepage/hero-engineer.webp" },
  "damp-leak-detection":        { image: "/images/homepage/plumbing-repairs.webp",   heroImage: "/images/homepage/plumbing-repairs.webp" },
  "plumbing-repairs":           { image: "/images/homepage/plumbing-repairs.webp",   heroImage: "/images/homepage/plumbing-repairs.webp" },
  "gas-safety-certificates":    { image: "/images/homepage/hero-engineer.webp",      heroImage: "/images/homepage/hero-engineer.webp" },
  "pre-purchase-plumbing-survey": { image: "/images/homepage/hero-team.webp",        heroImage: "/images/homepage/hero-team.webp" },
  "bathroom-installations":     { image: "/images/homepage/plumbing-repairs.webp",   heroImage: "/images/homepage/plumbing-repairs.webp" },
  "landlord-services":          { image: "/images/homepage/hero-engineer.webp",      heroImage: "/images/homepage/hero-engineer.webp" },
  "drain-blockages":            { image: "/images/homepage/plumbing-repairs.webp",   heroImage: "/images/homepage/plumbing-repairs.webp" },
};

async function main() {
  for (const [slug, imgs] of Object.entries(imageMap)) {
    const result = await prisma.service.updateMany({
      where: { slug },
      data: { image: imgs.image, heroImage: imgs.heroImage },
    });
    console.log(`${slug}: updated ${result.count} row(s) → ${imgs.image}`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
