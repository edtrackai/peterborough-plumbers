import Link from "next/link";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";

export default function CTASection({
  heading = "Ready to Book Your Plumber?",
  subheading = "Get in touch today for plumbing repairs, boiler servicing and heating support across Peterborough.",
}: {
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#242424] mb-4">{heading}</h2>
        <p className="text-[#6b7280] text-lg leading-relaxed mb-10">{subheading}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={siteSettings.primaryCtaHref}
            className="btn-book-now bg-[var(--brand)] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-[var(--brand-hover)] transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-white"
          >
            {siteSettings.primaryCtaLabel}
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-[#242424] px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg border-2 border-[#242424]/30 hover:bg-[#242424] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#242424] focus:ring-offset-2 focus:ring-offset-white"
          >
            {siteSettings.secondaryCtaLabel}
          </a>
        </div>
        <p className="mt-8 text-[#9ca3af] text-sm">
          Or call us directly:{" "}
          <a
            href={`tel:${siteSettings.phoneHref}`}
            className="text-[#242424] font-semibold hover:text-[var(--brand)] hover:underline transition-colors"
          >
            {siteSettings.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
