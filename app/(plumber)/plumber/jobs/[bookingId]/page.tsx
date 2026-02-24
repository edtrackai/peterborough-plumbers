import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import { PlumberNav } from "@/components/plumber/PlumberNav";
import { JobTimeline } from "@/components/plumber/JobTimeline";
import { StatusButtons } from "@/components/plumber/StatusButtons";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  accepted:    { label: "Accepted",    color: "bg-green-100 text-green-800" },
  en_route:    { label: "On the way",  color: "bg-blue-100 text-blue-800" },
  arrived:     { label: "Arrived",     color: "bg-indigo-100 text-indigo-800" },
  in_progress: { label: "Working",     color: "bg-orange-100 text-orange-800" },
  completed:   { label: "Completed",   color: "bg-gray-100 text-gray-600" },
  cancelled:   { label: "Cancelled",   color: "bg-red-100 text-red-600" },
};

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const session = await getPlumberSession();
  if (!session.plumberId) redirect("/plumber/login");

  const { bookingId } = await params;

  const [offerCount, booking] = await Promise.all([
    prisma.bookingOffer.count({ where: { plumberId: session.plumberId, status: "offered" } }),
    prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        slot: { select: { date: true, startTime: true, endTime: true } },
        images: { select: { url: true } },
        rating: true,
        events: {
          orderBy: { createdAt: "asc" },
          include: { plumber: { select: { name: true } } },
        },
      },
    }),
  ]);

  if (!booking || booking.assignedPlumberId !== session.plumberId) notFound();

  const statusInfo = STATUS_LABELS[booking.status] ?? { label: booking.status, color: "bg-gray-100 text-gray-600" };
  const slotDate = booking.slot.date.toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long",
  });

  const serialisedEvents = booking.events.map((e) => ({
    id: e.id,
    eventType: e.eventType,
    notes: e.notes,
    createdAt: e.createdAt.toISOString(),
    plumber: e.plumber,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <PlumberNav name={session.name} offerCount={offerCount} />
      <main className="mx-auto max-w-2xl px-4 py-6 flex flex-col gap-5">

        {/* Header */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-5 py-4">
          <div className="flex items-start justify-between mb-1">
            <p className="font-mono text-xs text-gray-400">{booking.bookingRef}</p>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
          <h1 className="text-lg font-bold text-pp-navy capitalize">
            {booking.serviceType ?? "General Plumbing"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{slotDate} · {booking.slot.startTime}–{booking.slot.endTime}</p>
        </div>

        {/* Status actions */}
        {!["completed", "cancelled"].includes(booking.status) && (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-5 py-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Update Status</h2>
            <StatusButtons bookingId={booking.id} currentStatus={booking.status} />
          </div>
        )}

        {/* Customer info */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-5 py-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Customer</h2>
          <div className="flex flex-col gap-1.5">
            <DetailRow label="Name"    value={booking.customerName} />
            <DetailRow label="Address" value={booking.address} />
            <DetailRow label="Postcode" value={booking.postcode} />
            {booking.phone && (
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <a href={`tel:${booking.phone}`}
                  className="rounded-full border border-pp-teal px-3 py-1.5 text-xs font-medium text-pp-teal hover:bg-pp-teal hover:text-white transition-colors">
                  📞 Call {booking.phone}
                </a>
                <a href={`https://wa.me/${booking.phone.replace(/\D/g, "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="rounded-full border border-green-600 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-600 hover:text-white transition-colors">
                  💬 WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Job details */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-5 py-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Job Details</h2>
          <div className="flex flex-col gap-1.5">
            <DetailRow label="Service"     value={booking.serviceType}  className="capitalize" />
            <DetailRow label="Description" value={booking.description} />
            <DetailRow label="Access"      value={booking.accessNotes} />
          </div>
        </div>

        {/* Photos */}
        {booking.images.length > 0 && (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-5 py-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
              Customer Photos ({booking.images.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {booking.images.map((img, i) => (
                <a key={i} href={img.url} target="_blank" rel="noopener noreferrer"
                  className="block h-20 w-20 rounded-lg overflow-hidden border border-gray-100 hover:border-pp-teal transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Rating */}
        {booking.rating && (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-5 py-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Customer Rating</h2>
            <div className="flex items-center gap-2">
              <span className="text-2xl text-yellow-400">{"★".repeat(booking.rating.stars)}{"☆".repeat(5 - booking.rating.stars)}</span>
              <span className="text-sm font-semibold text-pp-navy">{booking.rating.stars}/5</span>
            </div>
            {booking.rating.comment && (
              <p className="mt-2 text-sm text-gray-600 italic">"{booking.rating.comment}"</p>
            )}
          </div>
        )}

        {/* Timeline */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-5 py-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Activity Timeline</h2>
          <JobTimeline events={serialisedEvents} />
        </div>

      </main>
    </div>
  );
}

function DetailRow({ label, value, className = "" }: { label: string; value: string | null | undefined; className?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-24 shrink-0 text-gray-400">{label}</span>
      <span className={`text-pp-navy font-medium ${className}`}>{value}</span>
    </div>
  );
}
