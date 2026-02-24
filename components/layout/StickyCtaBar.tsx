import Link from "next/link";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";

export default function StickyCtaBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden backdrop-blur-md border-t border-white/10 px-4 pt-3"
      style={{ backgroundColor: "transparent", paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-3">
        <Link
          href={siteSettings.primaryCtaHref}
          className="btn-book-now flex-1 bg-pp-teal text-white text-center py-3 rounded-full font-bold text-sm hover:bg-pp-teal-dark transition-colors duration-200"
        >
          {siteSettings.primaryCtaLabel}
        </Link>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-600 text-white text-center py-3 rounded-full font-bold text-sm hover:bg-green-700 transition-colors duration-200"
        >
          {siteSettings.secondaryCtaLabel}
        </a>
      </div>
    </div>
  );
}
