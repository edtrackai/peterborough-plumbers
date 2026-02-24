import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import { PlumberNav } from "@/components/plumber/PlumberNav";
import { OffersClient } from "./OffersClient";

export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const session = await getPlumberSession();
  if (!session.plumberId) redirect("/plumber/login");

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

  const serialised = offers.map((o) => ({
    id: o.id,
    bookingId: o.bookingId,
    offeredAt: o.offeredAt.toISOString(),
    booking: {
      bookingRef: o.booking.bookingRef,
      serviceType: o.booking.serviceType,
      description: o.booking.description,
      postcode: o.booking.postcode,
      slot: {
        date: o.booking.slot.date.toISOString().split("T")[0],
        startTime: o.booking.slot.startTime,
        endTime: o.booking.slot.endTime,
      },
      images: o.booking.images.map((img) => ({ url: img.url })),
    },
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <PlumberNav name={session.name} offerCount={offers.length} />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-pp-navy">Job Requests</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {offers.length === 0 ? "No new requests" : `${offers.length} request${offers.length > 1 ? "s" : ""} waiting`}
          </p>
        </div>
        <OffersClient initialOffers={serialised} />
      </main>
    </div>
  );
}
