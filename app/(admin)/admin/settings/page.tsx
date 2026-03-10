import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Settings | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const s = await prisma.siteSettings.findUniqueOrThrow({ where: { id: "singleton" } });

  const initial = {
    companyName: s.companyName,
    phone: s.phone,
    phoneHref: s.phoneHref,
    whatsappNumber: s.whatsappNumber,
    email: s.email,
    address: s.address,
    gasSafeNumber: s.gasSafeNumber,
    googleRating: s.googleRating,
    reviewCount: s.reviewCount,
    yearsExperience: s.yearsExperience,
  };

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-[900px] mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Site Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Update your contact details and business info — changes save to the database immediately.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <SettingsForm initial={initial} />
      </div>
    </div>
  );
}
