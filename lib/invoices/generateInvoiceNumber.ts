/**
 * Generates INV-YYMMDD-NNNN invoice numbers.
 * NNNN is a daily sequential counter stored in ConfigSetting.
 * Uses raw SQL increment for atomicity.
 */
import { prisma } from "@/lib/prisma";

export async function generateInvoiceNumber(): Promise<string> {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const dateStr = `${yy}${mm}${dd}`;

  const key = `invoice.counter.${dateStr}`;

  // Ensure the row exists before incrementing
  await prisma.configSetting.upsert({
    where: { key },
    create: {
      key,
      value:     "0",
      valueType: "number",
      group:     "general",
      label:     `Invoice counter ${dateStr}`,
    },
    update: {},
  });

  // Atomic increment via raw SQL
  await prisma.$executeRaw`
    UPDATE pb_config_settings
    SET value = CAST(CAST(value AS INTEGER) + 1 AS TEXT)
    WHERE key = ${key}
  `;

  const row = await prisma.configSetting.findUnique({ where: { key } });
  const n = parseInt(row?.value ?? "1");

  return `INV-${dateStr}-${String(n).padStart(4, "0")}`;
}
