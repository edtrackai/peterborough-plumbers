/**
 * Seed: Per-service base labour + materials pricing rules.
 * Run: npx tsx prisma/seed-service-pricing.ts
 *
 * Safe to re-run — matches by serviceItemId + ruleType and upserts.
 * Run AFTER seed-quote-system.ts (service items must exist first).
 *
 * Prices are inclusive of labour time only. VAT rate is 0 (not VAT-registered).
 * Call-out fee (£75) and urgency multipliers are applied globally by the engine.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// serviceItemSlug → { labour, materials? }
// All amounts in GBP. Materials = 0 means customer supplies or not applicable.
const SERVICE_PRICING: {
  slug:      string;
  labour:    number;
  materials: number;
  label?:    string;
}[] = [
  // ── Plumbing Repairs ──────────────────────────────────────────────────
  { slug: "burst-pipe-repair",  labour: 120, materials: 45 },
  { slug: "leaking-tap",        labour:  60, materials: 25 },
  { slug: "leaking-pipe",       labour:  75, materials: 30 },
  { slug: "toilet-repair",      labour:  80, materials: 45 },
  { slug: "radiator-repair",    labour:  90, materials: 55 },
  { slug: "stop-tap",           labour:  70, materials: 30 },
  { slug: "water-pressure",     labour:  80, materials: 20 },

  // ── Boiler & Heating ──────────────────────────────────────────────────
  { slug: "boiler-service",        labour:  85, materials: 10, label: "Boiler service (parts & filters)" },
  { slug: "boiler-repair",         labour: 150, materials: 60 },
  { slug: "boiler-replacement",    labour: 350, materials:  0, label: "Boiler installation labour (parts quoted separately)" },
  { slug: "central-heating-flush", labour: 280, materials: 80, label: "Powerflush labour + chemicals" },

  // ── Bathrooms ─────────────────────────────────────────────────────────
  { slug: "bathroom-installation", labour: 800, materials:   0, label: "Full bathroom installation labour (fixtures quoted separately)" },
  { slug: "shower-installation",   labour: 200, materials: 120 },
  { slug: "bath-installation",     labour: 150, materials:  60 },
  { slug: "toilet-installation",   labour:  95, materials:  50 },

  // ── Drains & Blockages ────────────────────────────────────────────────
  { slug: "blocked-drain",   labour:  95, materials:  0, label: "Drain clearance labour" },
  { slug: "blocked-toilet",  labour:  65, materials:  0 },
  { slug: "drain-survey",    labour: 120, materials:  0, label: "CCTV drain survey" },

  // ── Gas Services ──────────────────────────────────────────────────────
  { slug: "gas-safety-cert", labour:  70, materials:  0, label: "CP12 gas safety certificate" },
  { slug: "gas-leak",        labour:  90, materials:  0, label: "Gas leak investigation" },

  // ── Landlord Services ─────────────────────────────────────────────────
  { slug: "landlord-gas-safety",  labour:  80, materials:  0 },
  { slug: "landlord-inspection",  labour:  90, materials:  0 },
];

async function main() {
  console.log("Seeding per-service pricing rules…\n");

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const entry of SERVICE_PRICING) {
    const item = await prisma.serviceItem.findUnique({ where: { slug: entry.slug } });
    if (!item) {
      console.warn(`  ⚠  Service item not found: ${entry.slug} — skipping`);
      skipped++;
      continue;
    }

    // ── base_labour ───────────────────────────────────────────────────
    const labourLabel = entry.label ?? `Labour — ${item.name}`;
    const existingLabour = await prisma.pricingRule.findFirst({
      where: { serviceItemId: item.id, ruleType: "base_labour" },
    });
    if (existingLabour) {
      await prisma.pricingRule.update({
        where: { id: existingLabour.id },
        data:  { value: entry.labour, label: labourLabel, isActive: true },
      });
      updated++;
    } else {
      await prisma.pricingRule.create({
        data: {
          serviceItemId: item.id,
          ruleType:      "base_labour",
          label:         labourLabel,
          valueType:     "fixed_amount",
          value:         entry.labour,
          isActive:      true,
          sortOrder:     1,
        },
      });
      created++;
    }

    // ── base_materials (skip if 0) ────────────────────────────────────
    if (entry.materials > 0) {
      const existingMaterials = await prisma.pricingRule.findFirst({
        where: { serviceItemId: item.id, ruleType: "base_materials" },
      });
      if (existingMaterials) {
        await prisma.pricingRule.update({
          where: { id: existingMaterials.id },
          data:  { value: entry.materials, isActive: true },
        });
        updated++;
      } else {
        await prisma.pricingRule.create({
          data: {
            serviceItemId: item.id,
            ruleType:      "base_materials",
            label:         "Parts & materials",
            valueType:     "fixed_amount",
            value:         entry.materials,
            isActive:      true,
            sortOrder:     2,
          },
        });
        created++;
      }
    }

    console.log(
      `  ✓ ${item.name.padEnd(40)} labour: £${String(entry.labour).padStart(4)}${
        entry.materials > 0 ? `  materials: £${entry.materials}` : ""
      }`
    );
  }

  console.log(`\nCreated: ${created}  Updated: ${updated}  Skipped: ${skipped}`);
  console.log("✅ Service pricing seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
