/**
 * Patches the 5 services that had no image in the DB.
 * Run once:  npx tsx prisma/update-service-images.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updates = [
  { slug: "landlord-services",          image: "/images/homepage/gas-safety-certificate.png" },
  { slug: "plumbing-installation",      image: "/images/homepage/hero-engineer.webp" },
  { slug: "damp-leak-detection",        image: "/images/homepage/hero.png" },
  { slug: "drain-blockages",            image: "/images/homepage/plumbing-repairs.png" },
  { slug: "pre-purchase-plumbing-survey", image: "/images/homepage/hero-team.png" },
];

async function main() {
  for (const { slug, image } of updates) {
    const result = await prisma.service.updateMany({
      where: { slug },
      data: { image },
    });
    console.log(`${slug}: ${result.count === 1 ? "✓ updated" : "⚠ not found"}`);
  }
  console.log("Done.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
