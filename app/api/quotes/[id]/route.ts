import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { logEvent } from "@/lib/audit";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  const quote = await prisma.quote.findUnique({
    where: { id },
    include: {
      lineItems: { orderBy: { sortOrder: "asc" } },
      messages:  { orderBy: { sentAt: "asc" } },
      booking:   { select: { bookingRef: true, customerName: true, phone: true, postcode: true, status: true } },
      lead:      { select: { name: true, phone: true, postcode: true } },
      serviceItem: { select: { name: true, slug: true } },
    },
  });

  if (!quote) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(quote);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  try {
    const body = await req.json();
    const { notes, internalNotes, jobSummary, validUntil, lineItems } = body;

    const existing = await prisma.quote.findUnique({ where: { id }, select: { status: true, quoteRef: true } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (["approved", "superseded"].includes(existing.status)) {
      return NextResponse.json({ error: "Cannot edit an approved or superseded quote" }, { status: 409 });
    }

    const updated = await prisma.$transaction(async (tx) => {
      if (lineItems && Array.isArray(lineItems)) {
        await tx.quoteLineItem.deleteMany({ where: { quoteId: id } });
        await tx.quoteLineItem.createMany({
          data: lineItems.map((li: { description: string; quantity: number; unitPrice: number; lineTotal: number; lineType: string; isOptional?: boolean; sortOrder?: number }, i: number) => ({
            quoteId:     id,
            description: li.description,
            quantity:    li.quantity,
            unitPrice:   li.unitPrice,
            lineTotal:   li.lineTotal,
            lineType:    li.lineType,
            isOptional:  li.isOptional ?? false,
            sortOrder:   li.sortOrder ?? i,
          })),
        });

        // Recalculate totals
        const total = lineItems.reduce((s: number, li: { lineTotal: number }) => s + li.lineTotal, 0);
        return tx.quote.update({
          where: { id },
          data: { notes, internalNotes, jobSummary, validUntil: validUntil ? new Date(validUntil) : undefined, total, subtotal: total, status: "draft" },
        });
      }

      return tx.quote.update({
        where: { id },
        data: { notes, internalNotes, jobSummary, validUntil: validUntil ? new Date(validUntil) : undefined },
      });
    });

    await logEvent({
      entityType: "quote",
      entityId:   id,
      eventType:  "quote_edited",
      actorType:  "admin",
      metadata:   { quoteRef: existing.quoteRef },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[quotes/[id] PATCH]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
