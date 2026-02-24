import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const status = searchParams.get("status") ?? undefined;
    const date = searchParams.get("date") ?? undefined;
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));

    const where: Prisma.BookingWhereInput = {};

    if (status) where.status = status;
    if (date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      where.slot = { date: { gte: d, lt: next } };
    }

    const [total, bookings] = await prisma.$transaction([
      prisma.booking.count({ where }),
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: {
          slot: { select: { date: true, startTime: true, endTime: true } },
        },
      }),
    ]);

    return NextResponse.json({
      total,
      page,
      pageSize: PAGE_SIZE,
      pages: Math.ceil(total / PAGE_SIZE),
      bookings: bookings.map((b) => ({
        id: b.id,
        bookingRef: b.bookingRef,
        status: b.status,
        postcode: b.postcode,
        customerName: b.customerName,
        phone: b.phone,
        email: b.email,
        serviceType: b.serviceType,
        slot: {
          date: b.slot.date.toISOString().split("T")[0],
          startTime: b.slot.startTime,
          endTime: b.slot.endTime,
        },
        createdAt: b.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    console.error("[admin/bookings GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
