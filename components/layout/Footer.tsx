import Link from "next/link";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";
import { services } from "@/content/services";
import { areas } from "@/content/areas";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a2744" }} className="text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{siteSettings.companyName}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {siteSettings.yearsExperience} years of trusted plumbing and heating service across
              Peterborough and surrounding areas. Gas Safe registered engineers.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <p className="text-white/70">
                Gas Safe Reg:{" "}
                <span className="text-white font-medium">{siteSettings.gasSafeNumber}</span>
              </p>
              <p>
                <a
                  href={`tel:${siteSettings.phoneHref}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {siteSettings.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {siteSettings.email}
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm text-[var(--brand)] hover:text-white transition-colors duration-200 font-medium"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Areas We Cover</h3>
            <ul className="space-y-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas"
                  className="text-sm text-[var(--brand)] hover:text-white transition-colors duration-200 font-medium"
                >
                  All Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/emergency" className="text-sm text-[var(--brand)] hover:text-white transition-colors duration-200 font-semibold">
                  Emergency Plumber
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  Pricing & Costs
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  Plumbing Guides
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  Book Online
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-400 hover:text-green-300 transition-colors duration-200"
                >
                  WhatsApp Chat
                </a>
              </li>
            </ul>
            <div className="mt-6 space-y-2">
              <Link href="/privacy" className="block text-xs text-white/40 hover:text-white/70 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-xs text-white/40 hover:text-white/70 transition-colors duration-200">
                Terms &amp; Conditions
              </Link>
              <Link href="/cookies" className="block text-xs text-white/40 hover:text-white/70 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} {siteSettings.companyName}. All rights reserved.</p>
          <p>Gas Safe Registered No. {siteSettings.gasSafeNumber}</p>
        </div>
      </div>
    </footer>
  );
}
