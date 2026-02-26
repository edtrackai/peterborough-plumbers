import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";
import LeadForm from "@/components/forms/LeadForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact Peterborough Plumbers | Call, WhatsApp or Book Online",
  description:
    "Get in touch with Peterborough Plumbers — Gas Safe registered engineers available 24/7. Call, WhatsApp, email or book online. Same-day and emergency appointments available.",
  path: "/contact",
  absoluteTitle: true,
  image: "/images/homepage/hero.png",
});

export default function ContactPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />

      {/* Hero */}
      <section className="relative bg-pp-navy overflow-hidden flex flex-col hero-white-text min-h-[280px] sm:min-h-[clamp(400px,40vw,660px)]">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src="/images/homepage/hero.png" alt="Contact Peterborough Plumbers — call, email or book online" fill className="object-cover" priority quality={85} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.58) 68%, rgba(8,10,20,0.35) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-44" style={{ background: "linear-gradient(to top, rgba(4,6,14,0.80) 0%, rgba(4,6,14,0.30) 55%, transparent 100%)" }} />
          <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-4 sm:pt-28 pb-8">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} inverted />
          <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">Available Today &mdash; Peterborough &amp; Surrounding Areas</span>
          </div>
          <h1 className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl" style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}>
            Contact{" "}
            <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Peterborough Plumbers
            </span>
          </h1>
          <p className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            Gas Safe registered engineers serving Peterborough and surrounding areas. Call for emergencies, or use the form below for standard enquiries and quotes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex items-center justify-center h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97]" style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)", boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)" }}>
              Book Online
            </Link>
            <a href={`tel:${siteSettings.phoneHref}`} className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
              {siteSettings.phone}
            </a>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
            {["Gas Safe Registered", "24/7 Emergency Line", "Quote Within 2 Hours"].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
                <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-[5]" aria-hidden="true" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "clamp(48px, 5.5vw, 80px)" }}>
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Main contact section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left: contact methods */}
            <div className="space-y-5">
              {/* Phone */}
              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-[var(--brand)] flex items-center justify-center">
                    <svg className="h-5 w-5 text-[var(--pp-navy)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-pp-heading mb-1">Call Us — 24/7</h2>
                    <a
                      href={`tel:${siteSettings.phoneHref}`}
                      className="text-2xl font-bold text-pp-teal hover:text-pp-teal-dark transition-colors"
                    >
                      {siteSettings.phone}
                    </a>
                    <p className="text-sm text-[var(--muted)] mt-1">
                      For emergencies, always call — we answer 24 hours a day.
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M11.986 0C5.379 0 0 5.379 0 11.986c0 2.097.546 4.065 1.502 5.776L.05 23.95l6.376-1.44a11.95 11.95 0 005.56 1.37c6.607 0 11.986-5.378 11.986-11.985C23.972 5.38 18.593 0 11.986 0zm0 21.878a9.887 9.887 0 01-5.044-1.381l-.361-.214-3.742.846.856-3.64-.235-.374a9.847 9.847 0 01-1.507-5.28c0-5.437 4.421-9.858 9.858-9.858s9.858 4.421 9.858 9.858-4.42 9.843-9.683 9.843z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-pp-heading mb-1">WhatsApp</h2>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-green-600 font-semibold hover:text-green-700 transition-colors"
                    >
                      Message us on WhatsApp
                    </a>
                    <p className="text-sm text-[var(--muted)] mt-1">
                      Fast responses during business hours (Mon–Sat 8am–6pm).
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-[var(--surface-alt)] flex items-center justify-center">
                    <svg className="h-5 w-5 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-pp-heading mb-1">Email</h2>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="text-base text-pp-teal hover:text-pp-teal-dark transition-colors break-all font-medium"
                    >
                      {siteSettings.email}
                    </a>
                    <p className="text-sm text-[var(--muted)] mt-1">
                      We aim to reply to all emails within 2 working hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Opening hours */}
              <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
                <h2 className="text-lg font-bold text-pp-heading mb-4">Opening Hours</h2>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Monday – Friday", hours: "8:00am – 6:00pm" },
                    { day: "Saturday", hours: "8:00am – 5:00pm" },
                    { day: "Sunday", hours: "Emergency only" },
                    { day: "Bank Holidays", hours: "Emergency only" },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between border-b border-[var(--border)] pb-2 last:border-0 last:pb-0">
                      <span className="text-pp-heading font-medium">{row.day}</span>
                      <span className="text-[var(--muted)]">{row.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--muted)] mt-3">
                  24/7 emergency line available outside business hours —{" "}
                  <a href={`tel:${siteSettings.phoneHref}`} className="text-pp-teal font-medium hover:underline">
                    call {siteSettings.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Right: lead form */}
            <div className="bg-white rounded-xl p-8 border border-[var(--border)]">
              <LeadForm />
            </div>

          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-[var(--surface-alt)] py-14 border-y border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading text-center mb-10">
            What Happens After You Contact Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "We Call You Back",
                body: "Within 2 hours during business hours. We ask a few quick questions about the job to give you an accurate quote.",
              },
              {
                step: "2",
                title: "You Get a Written Quote",
                body: "We provide a clear, itemised written quote before any work begins. No hidden extras. No pressure to proceed.",
              },
              {
                step: "3",
                title: "We Complete the Work",
                body: "Our Gas Safe registered engineer arrives on time, completes the work to the agreed specification, and provides a full invoice on completion.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-xl border border-[var(--border)] text-center">
                <div className="h-10 w-10 rounded-full bg-[var(--brand)] text-[var(--pp-navy)] flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-pp-heading mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="bg-white py-12 border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-xl font-bold text-pp-heading mb-3">Areas We Serve</h2>
          <p className="text-sm text-[var(--muted)] mb-6 max-w-xl mx-auto">
            We cover Peterborough and all surrounding areas. Not sure if we cover your postcode?
            Call us — we&apos;ll confirm in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Peterborough City Centre (PE1)",
              "Orton (PE2)",
              "Bretton (PE3)",
              "Werrington (PE4)",
              "Yaxley (PE7)",
              "Hampton (PE7)",
              "Whittlesey (PE7)",
              "Market Deeping (PE6)",
              "Stamford (PE9)",
            ].map((area) => (
              <span
                key={area}
                className="text-sm text-pp-heading bg-[var(--surface-alt)] border border-[var(--border)] px-4 py-2 rounded-full"
              >
                📍 {area}
              </span>
            ))}
          </div>
          <Link
            href="/areas"
            className="mt-5 inline-block text-sm text-[var(--brand)] hover:underline font-medium"
          >
            View all areas we cover →
          </Link>
        </div>
      </section>

      <CTASection heading="Need an Emergency Plumber?" subheading={`Call ${siteSettings.phone} now — Gas Safe registered engineers available 24/7.`} />
    </>
  );
}
