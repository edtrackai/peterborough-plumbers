/**
 * Cron: expire overdue quotes + optionally release booking slots.
 * Schedule in vercel.json: {"crons":[{"path":"/api/cron/quote-expiry","schedule":"0 * * * *"}]}
 * Auth: CRON_SECRET header (set in Vercel env)
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getConfigValue } from "@/lib/quotes/config";
import { logEvent } from "@/lib/audit";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("authorization");
  if (process.env.CRON_SECRET && secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const now = new Date();
  const expiryAction = await getConfigValue("booking.quote_expiry_action");

  // Find all sent quotes past their validUntil
  const expiredQuotes = await prisma.quote.findMany({
    where: {
      status:     "sent",
      validUntil: { lt: now },
    },
    select: { id: true, quoteRef: true, bookingId: true },
  });

  if (expiredQuotes.length === 0) {
    return NextResponse.json({ expired: 0 });
  }

  const ids = expiredQuotes.map(q => q.id);

  await prisma.quote.updateMany({
    where: { id: { in: ids } },
    data:  { status: "expired" },
  });

  // Log each expiry
  await Promise.allSettled(
    expiredQuotes.map(q =>
      logEvent({
        entityType: "quote",
        entityId:   q.id,
        eventType:  "quote_expired",
        actorType:  "system",
        metadata:   { quoteRef: q.quoteRef },
      })
    )
  );

  // Optionally release booking slots
  if (expiryAction === "cancel") {
    const bookingIds = expiredQuotes
      .map(q => q.bookingId)
      .filter(Boolean) as string[];

    if (bookingIds.length > 0) {
      await prisma.booking.updateMany({
        where: { id: { in: bookingIds }, status: "quote_sent" },
        data:  { status: "quote_expired" },
      });
    }
  }

  return NextResponse.json({ expired: expiredQuotes.length });
}
