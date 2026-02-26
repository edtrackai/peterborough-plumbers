import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy — How We Use Cookies | Peterborough Plumbers",
  description: "Cookie policy for the Peterborough Plumbers website. We only use essential cookies — no advertising or tracking. Find out how to manage your cookie settings.",
  path: "/cookies",
  noIndex: true,
});

export default function CookiesPage() {
  return (
    <>
      <section className="bg-pp-navy pt-4 sm:pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Cookie Policy", href: "/cookies" }]} />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Cookie Policy</h1>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 space-y-6 text-pp-body leading-relaxed">
          <p>Last updated: January 2025</p>
          <h2 className="text-2xl font-bold text-pp-heading">What Are Cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help the website function properly and provide information to site owners.</p>
          <h2 className="text-2xl font-bold text-pp-heading">Cookies We Use</h2>
          <p>This website uses only essential cookies required for the site to function. We do not use advertising or tracking cookies.</p>
          <h2 className="text-2xl font-bold text-pp-heading">Managing Cookies</h2>
          <p>You can control cookies through your browser settings. Disabling cookies may affect the functionality of this website.</p>
          <h2 className="text-2xl font-bold text-pp-heading">Contact</h2>
          <p>If you have questions about our cookie policy, contact us at {siteSettings.email}.</p>
        </div>
      </section>
    </>
  );
}
