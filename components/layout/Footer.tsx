import Link from "next/link";
import Image from "next/image";
import { siteSettings } from "@/content/settings";
import { services } from "@/content/services";

export default function Footer() {
  return (
    <footer style={{ background: "#3a3a3a" }}>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-10 pb-6">

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logos/logo-mark.png"
            alt="Peterborough Plumbers"
            width={52}
            height={52}
            className="h-[52px] w-[52px] object-contain"
          />
        </div>

        {/* 3 columns + social icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Column 1: Our Services */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">About Us</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/areas" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
                  Areas We Cover
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
                  Book Online
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4">Help &amp; Support</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/faqs" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
                  Guides Hub
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
                  Emergency Plumber
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
                  Pricing &amp; Costs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
                  Get a Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Social icons */}
          <div>
            <div className="flex flex-wrap gap-2">
              {/* Facebook */}
              <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 rounded-full bg-[#555555] hover:bg-[#1877F2] flex items-center justify-center transition-colors duration-200">
                <svg className="h-[18px] w-[18px] text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href={siteSettings.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="h-9 w-9 rounded-full bg-[#555555] hover:bg-[#FF0000] flex items-center justify-center transition-colors duration-200">
                <svg className="h-[18px] w-[18px] text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-[#555555] hover:bg-[#E1306C] flex items-center justify-center transition-colors duration-200">
                <svg className="h-[18px] w-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Legal links row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
          <Link href="/privacy" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link href="/cookies" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
            Cookies Policy
          </Link>
          <Link href="/terms" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
            Terms of Use
          </Link>
          <Link href="/faqs" className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200">
            Accessibility
          </Link>
        </div>

      </div>

      {/* ── Red divider ──────────────────────────────────────────────────────── */}
      <div className="border-t border-[#C8102E]" />

      {/* ── Copyright bar ────────────────────────────────────────────────────── */}
      <div style={{ background: "#2e2e2e" }}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-[#ffffffbf] text-sm">
            &copy; {siteSettings.companyName} {new Date().getFullYear()}. Peterborough plumbing &amp; heating. Fully insured.
          </p>
        </div>
      </div>

    </footer>
  );
}
