import Link from "next/link";

export default function HelpTodaySection() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1060px] px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <h2 className="text-[1.85rem] lg:text-[2.2rem] font-bold text-[#1a1a1a] text-center mb-12 tracking-tight">
          How can we help you today?
        </h2>

        {/* ── 2 × 2 grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* ─── CARD 1: Emergency Plumbing ─────────────────────────────── */}
          <div className="relative bg-white rounded-2xl shadow-[0_1px_12px_rgba(0,0,0,0.07)] overflow-visible flex flex-col">

            {/* Floating "Available 24/7 | Fast Response" badge */}
            <div className="absolute -top-5 right-6 flex z-10 rounded-t-xl overflow-hidden shadow-md">
              <div className="bg-[#0F6E6E] text-white px-4 py-2 text-center leading-tight">
                <div className="text-[10px] font-medium tracking-wide">Available</div>
                <div className="text-[15px] font-extrabold">24/7</div>
              </div>
              <div className="bg-[#0a5a5a] text-white px-4 py-2 leading-tight">
                <div className="text-[10px] font-medium tracking-wide">Fast</div>
                <div className="text-[15px] font-extrabold">Response</div>
              </div>
            </div>

            <div className="p-6 lg:p-8 flex gap-5 items-start flex-1">
              {/* Icon */}
              <div className="shrink-0 text-[#C8102E] mt-1">
                <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[1.1rem] font-bold text-[#1a1a1a] mb-2 leading-snug">
                  Emergency Plumbing
                </h3>
                <p className="text-[0.88rem] text-[#6b7280] leading-relaxed mb-5">
                  Rapid response for burst pipes, flooding, blocked drains and heating failures across Peterborough.
                </p>
                <Link
                  href="/emergency"
                  className="inline-flex items-center border border-[#C8102E] text-[#C8102E] px-5 py-2 rounded-full text-[0.85rem] font-semibold hover:bg-[#C8102E] hover:text-white transition-colors duration-200"
                >
                  Get emergency help
                </Link>
              </div>
            </div>
          </div>

          {/* ─── CARD 2: Boiler Service & Repair ───────────────────────── */}
          <div className="bg-white rounded-2xl shadow-[0_1px_12px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col">

            {/* White top section */}
            <div className="p-6 lg:p-8 flex gap-5 items-start flex-1">
              <div className="shrink-0 text-[#C8102E] mt-1">
                <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[1.1rem] font-bold text-[#1a1a1a] mb-2 leading-snug">
                  Boiler Service &amp; Repair
                </h3>
                <p className="text-[0.88rem] text-[#6b7280] leading-relaxed mb-5">
                  Gas Safe engineers for all major boiler brands. Annual service from £79, certificate included.
                </p>
                <Link
                  href="/services/boiler-service"
                  className="inline-flex items-center border border-[#C8102E] text-[#C8102E] px-5 py-2 rounded-full text-[0.85rem] font-semibold hover:bg-[#C8102E] hover:text-white transition-colors duration-200"
                >
                  Book a service
                </Link>
              </div>
            </div>

            {/* Teal "Ready for a quote?" banner */}
            <div className="bg-[#0F6E6E] px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-bold text-[0.92rem]">Ready for a quote?</p>
                <p className="text-white/75 text-[0.8rem] mt-0.5">A few quick questions is all it takes.</p>
              </div>
              <Link
                href="/book"
                className="shrink-0 inline-flex items-center border-2 border-white text-white px-5 py-2 rounded-full text-[0.83rem] font-bold hover:bg-white hover:text-[#0F6E6E] transition-colors duration-200 whitespace-nowrap"
              >
                Get a quote
              </Link>
            </div>
          </div>

          {/* ─── CARD 3: Gas Safety Certificate ─────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-[0_1px_12px_rgba(0,0,0,0.07)] p-6 lg:p-8 flex flex-col">
            <div className="flex gap-5 items-start flex-1">

              {/* GAS SAFE REG. text mark */}
              <div
                className="shrink-0 text-[#C8102E] font-black leading-none text-center mt-0.5 select-none"
                aria-label="Gas Safe Registered"
              >
                <div className="text-[0.95rem] tracking-tight uppercase">GAS</div>
                <div className="text-[0.95rem] tracking-tight uppercase">SAFE</div>
                <div
                  className="text-[0.52rem] tracking-[0.12em] font-bold mt-0.5 uppercase"
                  style={{ borderTop: "1.5px solid #C8102E", paddingTop: "2px" }}
                >
                  REG.
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-[1.1rem] font-bold text-[#1a1a1a] mb-2 leading-snug">
                  Need a Gas Safety Certificate?
                </h3>
                <p className="text-[0.88rem] text-[#6b7280] leading-relaxed mb-5">
                  CP12 certificates from £65. Same-day turnaround available for landlords and homeowners.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center border border-[#C8102E] text-[#C8102E] px-5 py-2 rounded-full text-[0.85rem] font-semibold hover:bg-[#C8102E] hover:text-white transition-colors duration-200"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>

          {/* ─── CARD 4: Central Heating Services ───────────────────────── */}
          <div className="bg-white rounded-2xl shadow-[0_1px_12px_rgba(0,0,0,0.07)] p-6 lg:p-8 flex flex-col">
            <div className="flex gap-5 items-start flex-1">
              <div className="shrink-0 text-[#C8102E] mt-1">
                <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[1.1rem] font-bold text-[#1a1a1a] mb-2 leading-snug">
                  Central Heating Services
                </h3>
                <p className="text-[0.88rem] text-[#6b7280] leading-relaxed mb-5">
                  Keep your home warm all year round with our heating service, repair and installation plans.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center border border-[#C8102E] text-[#C8102E] px-5 py-2 rounded-full text-[0.85rem] font-semibold hover:bg-[#C8102E] hover:text-white transition-colors duration-200"
                >
                  View services
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ── Footer footnote ── */}
        <p className="text-center text-[0.78rem] text-[#9ca3af] mt-8">
          * Available 24/7 for emergency call-outs.{" "}
          <span className="text-[#C8102E] font-medium">Standard call-out charges apply.</span>
        </p>

      </div>
    </section>
  );
}
