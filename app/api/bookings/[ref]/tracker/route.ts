import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";

// 60 polls per minute per IP — supports ~1 poll/sec customer tracking
const RATE_LIMIT = { name: "tracker", max: 60, windowMs: 60 * 1000 };

// Statuses where we reveal the plumber name and location to the customer
const TRACKABLE_STATUSES = ["accepted", "en_route", "arrived", "in_progress"];

// Statuses where GPS location is relevant
const LOCATION_STATUSES = ["en_route", "arrived", "in_progress"];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, RATE_LIMIT);
  if (limited) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  const { ref } = await params;

  if (!ref || typeof ref !== "string") {
    return NextResponse.json({ error: "Invalid booking reference." }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { bookingRef: ref.toUpperCase() },
      select: {
        bookingRef:       true,
        status:           true,
        serviceType:      true,
        estimatedArrival: true,
        assignedPlumber: {
          select: { id: true, name: true, phone: true },
        },
        slot: {
          select: { date: true, startTime: true, endTime: true },
        },
        locations: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { lat: true, lng: true, accuracy: true, createdAt: true },
        },
        events: {
          orderBy: { createdAt: "desc" },
          take: 5,
          select: { eventType: true, notes: true, createdAt: true },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const isTrackable = TRACKABLE_STATUSES.includes(booking.status);
    const hasLocation = LOCATION_STATUSES.includes(booking.status);

    return NextResponse.json({
      bookingRef:  booking.bookingRef,
      status:      booking.status,
      serviceType: booking.serviceType,
      slot: {
        date:      booking.slot.date.toISOString().split("T")[0],
        startTime: booking.slot.startTime,
        endTime:   booking.slot.endTime,
      },
      // Plumber name only revealed after acceptance
      plumber: isTrackable && booking.assignedPlumber
        ? { name: booking.assignedPlumber.name }
        : null,
      estimatedArrival: booking.estimatedArrival?.toISOString() ?? null,
      // GPS location only when plumber is actively travelling
      location: hasLocation && booking.locations[0]
        ? {
            lat:       booking.locations[0].lat,
            lng:       booking.locations[0].lng,
            accuracy:  booking.locations[0].accuracy,
            updatedAt: booking.locations[0].createdAt.toISOString(),
          }
        : null,
      // Recent status events for timeline
      events: booking.events.map((e) => ({
        type:      e.eventType,
        notes:     e.notes,
        createdAt: e.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[bookings/tracker]", msg);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
