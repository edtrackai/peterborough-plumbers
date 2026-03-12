import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { TemplatesClient } from "@/components/admin/TemplatesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Message Templates | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function AdminTemplatesPage() {
  const [rawTemplates, rawKeywords] = await Promise.all([
    prisma.messageTemplate.findMany({
      orderBy: [{ channel: "asc" }, { key: "asc" }],
    }),
    prisma.approvalKeyword.findMany({
      orderBy: [{ intent: "asc" }, { word: "asc" }],
    }),
  ]);

  const templates = rawTemplates.map((t) => ({
    id: t.id,
    key: t.key,
    channel: t.channel,
    subject: t.subject,
    body: t.body,
    variables: t.variables as string[],
    isActive: t.isActive,
    version: t.version,
    updatedBy: t.updatedBy,
    updatedAt: t.updatedAt.toISOString(),
  }));

  const keywords = rawKeywords.map((k) => ({
    id: k.id,
    word: k.word,
    intent: k.intent,
    language: k.language,
    isActive: k.isActive,
  }));

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-[1000px] mx-auto">
      {/* Page header */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Configuration
        </p>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Message Templates</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Edit WhatsApp and email templates sent to customers during the quote and variation flow.
        </p>
      </div>

      <TemplatesClient templates={templates} keywords={keywords} />
    </div>
  );
}
