import Link from "next/link";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";
import { services } from "@/content/services";
import { areas } from "@/content/areas";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company info */}
          <div>
            <h3 className="text-pp-yellow font-bold text-lg mb-4">{siteSettings.companyName}</h3>
            <p className="text-white/70 text-sm mb-4">
              {siteSettings.yearsExperience} years of trusted plumbing service in Peterborough and
              surrounding areas. Gas Safe registered.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p>Gas Safe Reg: {siteSettings.gasSafeNumber}</p>
              <p>
                <a href={`tel:${siteSettings.phone}`} className="hover:text-pp-yellow transition-colors">
                  {siteSettings.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteSettings.email}`} className="hover:text-pp-yellow transition-colors">
                  {siteSettings.email}
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-pp-yellow font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-white/70 hover:text-pp-yellow transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm text-pp-yellow hover:text-pp-yellow/80 transition-colors font-medium"
                >
                  View All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="text-pp-yellow font-bold text-lg mb-4">Areas We Cover</h3>
            <ul className="space-y-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="text-sm text-white/70 hover:text-pp-yellow transition-colors"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-pp-yellow font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white/70 hover:text-pp-yellow transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-white/70 hover:text-pp-yellow transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white/70 hover:text-pp-yellow transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-white/70 hover:text-pp-yellow transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/70 hover:text-pp-yellow transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  WhatsApp Chat
                </a>
              </li>
            </ul>
            <div className="mt-6 space-y-2">
              <Link href="/privacy" className="block text-xs text-white/50 hover:text-white/70 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-xs text-white/50 hover:text-white/70 transition-colors">
                Terms &amp; Conditions
              </Link>
              <Link href="/cookies" className="block text-xs text-white/50 hover:text-white/70 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} {siteSettings.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
