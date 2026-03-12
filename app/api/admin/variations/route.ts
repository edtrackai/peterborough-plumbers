import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";

export async function GET(req: NextRequest) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "pending_office";

  const variations = await prisma.variation.findMany({
    where:   { status },
    include: {
      booking:       { select: { bookingRef: true, customerName: true, phone: true, postcode: true } },
      originalQuote: { select: { quoteRef: true, total: true } },
      reasons:       { select: { key: true, label: true } },
      images:        { select: { url: true } },
      raisedByPlumber: { select: { name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ variations });
}
