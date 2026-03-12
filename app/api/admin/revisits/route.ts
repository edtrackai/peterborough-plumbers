import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";

export async function GET(req: NextRequest) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const revisits = await prisma.revisit.findMany({
    include: {
      originalBooking: { select: { bookingRef: true, customerName: true, phone: true } },
      reason:          { select: { key: true, label: true, isChargeable: true } },
      images:          { select: { url: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ revisits });
}
