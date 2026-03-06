import Link from "next/link";
import { getWhatsAppUrl } from "@/content/settings";

export default function CleanPricingCTA() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section className="bg-white py-14 px-4">
      <div
        className="mx-auto max-w-5xl rounded-2xl px-8 py-12 sm:px-12 sm:py-14"
        style={{ background: "linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 100%)" }}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Left: text */}
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
              Ready to Book a Local Plumber?
            </h2>
            <p className="mt-3 text-white/65 text-[0.95rem] leading-relaxed">
              Transparent pricing, trusted engineers, and fast response across Peterborough.
            </p>
            <ul className="mt-5 space-y-2">
              {["Gas Safe Registered", "Transparent Pricing", "Fast Response"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                  <svg
                    className="h-4 w-4 shrink-0 text-emerald-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:shrink-0 mt-2 lg:mt-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-[50px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)",
                boxShadow: "0 4px 20px rgba(200,16,46,0.45)",
              }}
            >
              Book Now
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 h-[50px] px-8 rounded-full font-bold text-[0.9rem] text-white border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Chat
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
