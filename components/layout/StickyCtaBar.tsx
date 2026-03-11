import Link from "next/link";
import { getSiteSettings } from "@/lib/db/content";

export default async function StickyCtaBar() {
  const s = await getSiteSettings();
  const whatsappUrl = `https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(s.whatsappPrefillMessage)}`;
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden backdrop-blur-md border-t border-white/10 px-4 pt-3"
      style={{ backgroundColor: "transparent", paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-3">
        <Link
          href={s.primaryCtaHref}
          className="btn-book-now flex-1 bg-pp-teal text-white text-center py-3 rounded-full font-bold text-sm hover:bg-pp-teal-dark transition-colors duration-200"
        >
          {s.primaryCtaLabel}
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-white text-center py-3 rounded-full font-bold text-sm transition-colors duration-200"
          style={{ backgroundColor: "#075E54" }}
        >
          {s.secondaryCtaLabel}
        </a>
      </div>
    </div>
  );
}
