import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";
import type { NextRequest } from "next/server";

/**
 * GET /api/dispatch/history
 * Admin panel: returns all leads that have been dispatched to plumbers,
 * with each plumber's dispatch record (message sent + reply + status).
 */
export async function GET(req: NextRequest) {
  const authErr = checkApiKey(req);
  if (authErr) return authErr;

  const leads = await prisma.lead.findMany({
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
  });

  const serialized = leads.map((l) => ({
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
      dispatchMessage: d.dispatchMessage,
      plumberReply: d.plumberReply,
      offeredAt: d.offeredAt.toISOString(),
      respondedAt: d.respondedAt?.toISOString() ?? null,
      plumber: d.plumber,
    })),
  }));

  return NextResponse.json({ leads: serialized });
}
