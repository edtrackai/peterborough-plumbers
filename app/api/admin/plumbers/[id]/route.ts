import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { isActive, isOnDuty } = body as {
      isActive?: boolean;
      isOnDuty?: boolean;
    };

    const data: { isActive?: boolean; isOnDuty?: boolean } = {};
    if (typeof isActive === "boolean") data.isActive = isActive;
    if (typeof isOnDuty === "boolean") data.isOnDuty = isOnDuty;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const plumber = await prisma.plumber.update({
      where: { id },
      data,
      select: { id: true, name: true, isActive: true, isOnDuty: true },
    });

    return NextResponse.json({ plumber });
  } catch (err) {
    console.error("[admin/plumbers PATCH]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check for any linked history before hard-deleting
    const plumber = await prisma.plumber.findUnique({
      where: { id },
      select: {
        name: true,
        _count: { select: { bookings: true, offers: true, events: true } },
      },
    });

    if (!plumber) {
      return NextResponse.json({ error: "Plumber not found" }, { status: 404 });
    }

    const hasHistory =
      plumber._count.bookings > 0 ||
      plumber._count.offers > 0 ||
      plumber._count.events > 0;

    if (hasHistory) {
      return NextResponse.json(
        {
          error: `Cannot delete "${plumber.name}" — they have booking history. Suspend the account instead to preserve records.`,
          canSuspend: true,
        },
        { status: 409 }
      );
    }

    await prisma.plumber.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/plumbers DELETE]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
