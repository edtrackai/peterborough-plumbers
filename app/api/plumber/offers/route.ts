import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";

export async function GET() {
  const session = await getPlumberSession();
  if (!session.plumberId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const offers = await prisma.bookingOffer.findMany({
    where: { plumberId: session.plumberId, status: "offered" },
    orderBy: { offeredAt: "desc" },
    include: {
      booking: {
        include: {
          slot: { select: { date: true, startTime: true, endTime: true } },
          images: { select: { url: true }, take: 1 },
        },
      },
    },
  });

  return NextResponse.json({ offers });
}
