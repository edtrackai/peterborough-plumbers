import Link from "next/link";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";

export default function CTASection({
  heading = "Ready to Book Your Plumber?",
  subheading = "Get in touch today for a free, no-obligation quote from our Gas Safe registered engineers.",
}: {
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="py-16 lg:py-24 bg-pp-navy">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{heading}</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-10">{subheading}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={siteSettings.primaryCtaHref}
            className="btn-book-now bg-[var(--brand)] text-[var(--pp-navy)] px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--brand-hover)] transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-pp-navy"
          >
            {siteSettings.primaryCtaLabel}
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white/40 hover:bg-white hover:text-pp-navy transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pp-navy"
          >
            {siteSettings.secondaryCtaLabel}
          </a>
        </div>
        <p className="mt-8 text-white/40 text-sm">
          Or call us directly:{" "}
          <a
            href={`tel:${siteSettings.phoneHref}`}
            className="text-white font-semibold hover:underline transition-colors"
          >
            {siteSettings.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
