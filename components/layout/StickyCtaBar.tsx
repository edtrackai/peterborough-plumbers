import Link from "next/link";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";

export default function StickyCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-pp-dark/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
      <div className="flex gap-3">
        <Link
          href={siteSettings.primaryCtaHref}
          className="btn-book-now flex-1 bg-[#2563EB] text-white text-center py-3 rounded-lg font-bold text-sm hover:bg-[#1D4ED8] transition-colors"
        >
          {siteSettings.primaryCtaLabel}
        </Link>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-600 text-white text-center py-3 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors"
        >
          {siteSettings.secondaryCtaLabel}
        </a>
      </div>
    </div>
  );
}
