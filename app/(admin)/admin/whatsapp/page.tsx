import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import WhatsAppTabs from "@/components/admin/WhatsAppTabs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "WhatsApp | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function WhatsAppPage() {
  const [chats, calls, dispatchLeads] = await Promise.all([
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
    prisma.lead.findMany({
      where: { dispatches: { some: {} } },
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        assignedPlumber: { select: { id: true, name: true, phone: true } },
        dispatches: {
          orderBy: { offeredAt: "asc" },
          include: {
            plumber: { select: { id: true, name: true, phone: true } },
          },
        },
      },
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

  const serializedChats = chats.map((c) => ({
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

  const serializedLeads = dispatchLeads.map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    postcode: l.postcode,
    serviceType: l.serviceType,
    notes: l.notes,
    preferredTime: l.preferredTime,
    status: l.status,
    source: l.source,
    createdAt: l.createdAt.toISOString(),
    assignedPlumber: l.assignedPlumber,
    dispatches: l.dispatches.map((d) => ({
      id: d.id,
      status: d.status,
      offeredAt: d.offeredAt.toISOString(),
      respondedAt: d.respondedAt?.toISOString() ?? null,
      plumber: d.plumber,
    })),
  }));

  return (
    <div className="relative flex-1 overflow-hidden">
      <WhatsAppTabs
        initialChats={serializedChats}
        initialLeads={serializedLeads}
      />
    </div>
  );
}
