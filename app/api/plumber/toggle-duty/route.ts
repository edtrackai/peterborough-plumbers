import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";

export async function POST() {
  const session = await getPlumberSession();
  if (!session.plumberId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const plumber = await prisma.plumber.findUnique({ where: { id: session.plumberId } });
  if (!plumber) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.plumber.update({
    where: { id: plumber.id },
    data: { isOnDuty: !plumber.isOnDuty, lastSeenAt: new Date() },
  });

  return NextResponse.json({ isOnDuty: updated.isOnDuty });
}
