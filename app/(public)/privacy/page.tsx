import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Peterborough Plumbers",
  description: "Privacy policy for Peterborough Plumbers. How we collect, use, and protect your personal data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-pp-navy pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy" }]} />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Privacy Policy</h1>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 space-y-6 text-pp-body leading-relaxed">
          <p>Last updated: January 2025</p>
          <h2 className="text-2xl font-bold text-pp-heading">1. Information We Collect</h2>
          <p>When you use our booking form or contact us, we may collect your name, phone number, email address, postcode, and details about your plumbing requirements.</p>
          <h2 className="text-2xl font-bold text-pp-heading">2. How We Use Your Information</h2>
          <p>We use your information solely to respond to your enquiry, arrange and deliver plumbing services, and communicate with you about your booking.</p>
          <h2 className="text-2xl font-bold text-pp-heading">3. Data Sharing</h2>
          <p>We do not sell or share your personal data with third parties. Your information is only used by {siteSettings.companyName} to deliver our services.</p>
          <h2 className="text-2xl font-bold text-pp-heading">4. Data Retention</h2>
          <p>We retain your data only as long as necessary to provide our services and comply with legal obligations.</p>
          <h2 className="text-2xl font-bold text-pp-heading">5. Your Rights</h2>
          <p>You have the right to access, correct, or request deletion of your personal data. Contact us at {siteSettings.email} to exercise these rights.</p>
          <h2 className="text-2xl font-bold text-pp-heading">6. Contact</h2>
          <p>For privacy-related questions, contact us at {siteSettings.email} or call {siteSettings.phone}.</p>
        </div>
      </section>
    </>
  );
}
