import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";
import { normaliseWaId } from "@/lib/dispatch";

/**
 * GET /api/dispatch/is-plumber?waId=447700900000
 * Returns whether the WhatsApp sender is a registered active plumber.
 * Called by n8n at the top of the RAG bot to route plumber replies separately.
 *
 * waId: no +, e.g. "447700900000" (44 = UK) or "923001234567" (92 = PK)
 */
export async function GET(req: NextRequest) {
  const authErr = checkApiKey(req);
  if (authErr) return authErr;

  const raw = req.nextUrl.searchParams.get("waId") ?? "";
  if (!raw) {
    return NextResponse.json({ error: "waId required" }, { status: 400 });
  }

  const incomingWaId = normaliseWaId(raw);

  // Fetch all active plumbers with a phone and compare normalised values
  const plumbers = await prisma.plumber.findMany({
    where: { isActive: true, phone: { not: null } },
    select: { id: true, name: true, phone: true },
  });

  const plumber = plumbers.find(
    (p) => p.phone && normaliseWaId(p.phone) === incomingWaId
  ) ?? null;

  return NextResponse.json({
    isPlumber: plumber !== null,
    plumber: plumber ?? null,
  });
}
