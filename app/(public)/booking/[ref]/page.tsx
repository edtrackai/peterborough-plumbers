import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = {
  title: "Booking Details | Peterborough Plumbers",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function BookingDetailPage({ params }: Props) {
  const { ref } = await params;

  const booking = await prisma.booking.findUnique({
    where: { bookingRef: ref },
    include: { slot: true },
  });

  if (!booking) notFound();

  const slotDate = new Date(booking.slot.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-pp-navy px-6 py-8 text-white text-center">
            <p className="text-sm font-medium text-white/70 mb-1">Booking Reference</p>
            <p className="font-mono text-2xl font-bold text-pp-teal">{booking.bookingRef}</p>
            <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold capitalize">
              {booking.status}
            </span>
          </div>

          {/* Details */}
          <div className="px-6 py-6 flex flex-col gap-4">
            <Row label="Date" value={slotDate} />
            <Row
              label="Time"
              value={`${booking.slot.startTime} – ${booking.slot.endTime}`}
            />
            <Row label="Postcode" value={booking.postcode} />
            {booking.serviceType && (
              <Row label="Service" value={booking.serviceType} capitalize />
            )}
            {booking.customerName && (
              <Row label="Name" value={booking.customerName} />
            )}
            {booking.address && (
              <Row label="Address" value={booking.address} />
            )}
            {booking.description && (
              <Row label="Notes" value={booking.description} />
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-6 py-5 text-center text-sm text-gray-500">
            Questions?{" "}
            <a href={`tel:${siteSettings.phoneHref}`} className="font-semibold text-pp-teal">
              Call {siteSettings.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="font-medium text-gray-500 shrink-0">{label}</span>
      <span className={`text-pp-navy font-semibold text-right ${capitalize ? "capitalize" : ""}`}>
        {value}
      </span>
    </div>
  );
}
