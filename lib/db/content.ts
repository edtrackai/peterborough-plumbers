import { prisma } from "@/lib/prisma";

/** Returns the single site-settings row (throws if missing — run seed first). */
export async function getSiteSettings() {
  return prisma.siteSettings.findUniqueOrThrow({ where: { id: "singleton" } });
}

/** Returns the WhatsApp deep-link URL. */
export async function getWhatsAppUrl(): Promise<string> {
  const s = await getSiteSettings();
  return `https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(s.whatsappPrefillMessage)}`;
}
