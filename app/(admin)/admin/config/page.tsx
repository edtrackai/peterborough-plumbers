import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ConfigClient } from "@/components/admin/ConfigClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Configuration | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function AdminConfigPage() {
  const rawSettings = await prisma.configSetting.findMany({
    orderBy: [{ group: "asc" }, { key: "asc" }],
  });

  const settings = rawSettings.map((s) => ({
    id: s.id,
    key: s.key,
    value: s.value,
    valueType: s.valueType,
    group: s.group,
    label: s.label,
    description: s.description,
    updatedAt: s.updatedAt.toISOString(),
  }));

  const groups = Array.from(new Set(settings.map((s) => s.group))).sort();

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-[900px] mx-auto">
      {/* Page header */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Configuration
        </p>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Configuration</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Pricing rules, quote settings, and notification preferences. Changes take effect immediately.
        </p>
      </div>

      <ConfigClient settings={settings} groups={groups} />
    </div>
  );
}
