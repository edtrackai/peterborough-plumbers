import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";

export async function GET(req: NextRequest) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status");
  const page   = parseInt(searchParams.get("page") ?? "1");
  const limit  = Math.min(parseInt(searchParams.get("limit") ?? "25"), 100);
  const skip   = (page - 1) * limit;

  try {
    const where = status ? { status } : {};

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          booking: { select: { bookingRef: true, customerName: true, phone: true } },
          lead:    { select: { name: true, phone: true } },
        },
      }),
      prisma.invoice.count({ where }),
    ]);

    return NextResponse.json({ invoices, total, page, limit });
  } catch (err) {
    console.error("[admin/invoices GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
