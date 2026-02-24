import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;

    const booking = await prisma.booking.findUnique({
      where: { bookingRef: ref },
      include: {
        slot: { select: { date: true, startTime: true, endTime: true } },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({
      bookingRef: booking.bookingRef,
      status: booking.status,
      postcode: booking.postcode,
      serviceType: booking.serviceType,
      description: booking.description,
      customerName: booking.customerName,
      phone: booking.phone,
      email: booking.email,
      address: booking.address,
      slot: {
        date: booking.slot.date.toISOString().split("T")[0],
        startTime: booking.slot.startTime,
        endTime: booking.slot.endTime,
      },
      confirmedAt: booking.confirmedAt?.toISOString() ?? null,
    });
  } catch (err) {
    console.error("[bookings/[ref]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
