import { prisma } from "@/lib/prisma";

/**
 * Generates a sequential PP-NNN estimate reference.
 * Counter stored in pb_config_settings with key "estimate.ref_counter".
 * Uses a raw SQL increment for atomicity.
 */
export async function generateEstimateRef(): Promise<string> {
  // Ensure the row exists before incrementing
  await prisma.configSetting.upsert({
    where: { key: "estimate.ref_counter" },
    create: {
      key:       "estimate.ref_counter",
      value:     "0",
      valueType: "number",
      group:     "general",
      label:     "Estimate reference counter",
    },
    update: {},
  });

  // Atomic increment via raw SQL
  await prisma.$executeRaw`
    UPDATE pb_config_settings
    SET value = CAST(CAST(value AS INTEGER) + 1 AS TEXT)
    WHERE key = 'estimate.ref_counter'
  `;

  const row = await prisma.configSetting.findUnique({
    where: { key: "estimate.ref_counter" },
  });

  const n = parseInt(row?.value ?? "1");
  return `PP-${n}`;
}
