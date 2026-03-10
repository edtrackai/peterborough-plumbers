import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import WhatsAppChats from "@/components/admin/WhatsAppChats";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "WhatsApp | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function WhatsAppPage() {
  const [chats, calls] = await Promise.all([
    prisma.waChat.findMany({
      orderBy: { lastMessageAt: "desc" },
      take: 50,
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    }),
    prisma.call.findMany({
      orderBy: { startedAt: "desc" },
      take: 200,
      include: { summary: true },
    }),
  ]);

  // Group calls by waId
  const callsByWaId: Record<string, typeof calls> = {};
  for (const call of calls) {
    const key = call.waId ?? call.phone ?? "";
    if (!key) continue;
    if (!callsByWaId[key]) callsByWaId[key] = [];
    callsByWaId[key].push(call);
  }

  const serialized = chats.map((c) => ({
    ...c,
    lastMessageAt: c.lastMessageAt.toISOString(),
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
    messages: c.messages.map((m) => ({
      ...m,
      createdAt: m.createdAt.toISOString(),
    })),
    calls: (callsByWaId[c.waId] ?? []).map((call) => ({
      id: call.id,
      status: call.status,
      outcome: call.outcome,
      durationSeconds: call.durationSeconds,
      startedAt: call.startedAt.toISOString(),
      summary: call.summary
        ? {
            serviceType: call.summary.serviceType,
            issueSummary: call.summary.issueSummary,
            urgency: call.summary.urgency,
            needsHuman: call.summary.needsHuman,
          }
        : null,
    })),
  }));

  return <WhatsAppChats initialChats={serialized} />;
}
