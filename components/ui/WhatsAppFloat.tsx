import { getSiteSettings } from "@/lib/db/content";
import WhatsAppFloatClient from "@/components/ui/WhatsAppFloatClient";

export default async function WhatsAppFloat() {
  const s = await getSiteSettings();
  const href = `https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(s.whatsappPrefillMessage)}`;
  return <WhatsAppFloatClient href={href} />;
}
