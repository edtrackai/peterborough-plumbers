import Link from "next/link";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";

export default function CTASection({
  heading = "Ready to Book?",
  subheading = "Get in touch today for a free, no-obligation quote.",
}: {
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="py-16 lg:py-24 bg-black">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{heading}</h2>
        <p className="text-white/70 text-lg mb-10">{subheading}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={siteSettings.primaryCtaHref}
            className="btn-book-now bg-[#2563EB] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1D4ED8] transition-colors shadow-lg"
          >
            {siteSettings.primaryCtaLabel}
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            {siteSettings.secondaryCtaLabel}
          </a>
        </div>
        <p className="mt-8 text-white/50 text-sm">
          Or call us directly:{" "}
          <a href={`tel:${siteSettings.phone}`} className="text-pp-yellow hover:text-pp-yellow/80 transition-colors">
            {siteSettings.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
