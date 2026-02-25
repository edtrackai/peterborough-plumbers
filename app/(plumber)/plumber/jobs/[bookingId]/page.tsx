import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import { PlumberNav } from "@/components/plumber/PlumberNav";
import { JobTimeline } from "@/components/plumber/JobTimeline";
import { StatusButtons } from "@/components/plumber/StatusButtons";

export const dynamic = "force-dynamic";

const STATUS_META: Record<string, { label: string; pill: string; dot: string }> = {
  accepted:    { label: "Accepted",    pill: "bg-green-500/15 text-green-400 border border-green-500/20",    dot: "bg-green-400"  },
  en_route:    { label: "On the way",  pill: "bg-blue-500/15 text-blue-400 border border-blue-500/20",      dot: "bg-blue-400"   },
  arrived:     { label: "Arrived",     pill: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20", dot: "bg-indigo-400" },
  in_progress: { label: "Working",     pill: "bg-orange-500/15 text-orange-400 border border-orange-500/20", dot: "bg-orange-400 animate-pulse" },
  completed:   { label: "Completed",   pill: "bg-zinc-700/60 text-zinc-400 border border-zinc-700",          dot: "bg-zinc-500"   },
  cancelled:   { label: "Cancelled",   pill: "bg-red-500/15 text-red-400 border border-red-500/20",          dot: "bg-red-400"    },
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
        slot:   { select: { date: true, startTime: true, endTime: true } },
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

  const meta     = STATUS_META[booking.status] ?? STATUS_META.completed;
  const slotDate = booking.slot.date.toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long",
  });

  const serialisedEvents = booking.events.map((e) => ({
    id:        e.id,
    eventType: e.eventType,
    notes:     e.notes,
    createdAt: e.createdAt.toISOString(),
    plumber:   e.plumber,
  }));

  const isActive = !["completed", "cancelled"].includes(booking.status);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PlumberNav name={session.name} offerCount={offerCount} />
      <main className="mx-auto max-w-2xl px-4 pt-6 pb-24 sm:pb-8 flex flex-col gap-3">

        {/* ── Job header card ── */}
        <div className="rounded-2xl bg-[#111111] border border-white/[0.07] px-5 py-5">
          <div className="flex items-start justify-between mb-3">
            <p className="font-mono text-[11px] text-zinc-600">{booking.bookingRef}</p>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.pill}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {meta.label}
            </span>
          </div>
          <h1 className="text-lg font-bold text-white capitalize">
            {booking.serviceType ?? "General Plumbing"}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {slotDate} · {booking.slot.startTime}–{booking.slot.endTime}
          </p>
        </div>

        {/* ── Status update ── */}
        {isActive && (
          <div className="rounded-2xl bg-[#111111] border border-white/[0.07] px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-4">
              Update Status
            </p>
            <StatusButtons bookingId={booking.id} currentStatus={booking.status} />
          </div>
        )}

        {/* ── Customer ── */}
        <div className="rounded-2xl bg-[#111111] border border-white/[0.07] px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-4">Customer</p>
          <div className="flex flex-col gap-2.5">
            <DetailRow label="Name"     value={booking.customerName} />
            <DetailRow label="Address"  value={booking.address} />
            <DetailRow label="Postcode" value={booking.postcode} />
          </div>
          {booking.phone && (
            <div className="flex items-center gap-2.5 mt-4">
              <a
                href={`tel:${booking.phone}`}
                className="flex items-center gap-2 rounded-xl border border-white/[0.09] px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:border-white/[0.18] hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 2.5a1 1 0 011-1h1.5a1 1 0 011 1l.5 2.5a1 1 0 01-.29.95L4.85 7.12a7.27 7.27 0 003.03 3.03l1.17-.86a1 1 0 01.95-.29l2.5.5a1 1 0 011 1V12a1 1 0 01-1 1A10.5 10.5 0 011 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
                Call {booking.phone}
              </a>
              <a
                href={`https://wa.me/${booking.phone.replace(/\D/g, "")}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/[0.09] px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:border-green-500/30 hover:text-green-400 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1.5A5.5 5.5 0 001.5 7c0 .97.25 1.89.69 2.68L1.5 12.5l2.9-.68A5.5 5.5 0 107 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M5 5.5s.5 2 1.5 2.5S9 9 9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* ── Job details ── */}
        <div className="rounded-2xl bg-[#111111] border border-white/[0.07] px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-4">Job Details</p>
          <div className="flex flex-col gap-2.5">
            <DetailRow label="Service"     value={booking.serviceType}  className="capitalize" />
            <DetailRow label="Description" value={booking.description} />
            <DetailRow label="Access"      value={booking.accessNotes} />
          </div>
        </div>

        {/* ── Photos ── */}
        {booking.images.length > 0 && (
          <div className="rounded-2xl bg-[#111111] border border-white/[0.07] px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-4">
              Photos ({booking.images.length})
            </p>
            <div className="grid grid-cols-4 gap-2">
              {booking.images.map((img, i) => (
                <a
                  key={i}
                  href={img.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square rounded-xl overflow-hidden border border-white/[0.07] hover:border-white/[0.18] transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── Rating ── */}
        {booking.rating && (
          <div className="rounded-2xl bg-[#111111] border border-white/[0.07] px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-3">
              Customer Rating
            </p>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M9 2l1.8 4.2H15l-3.6 2.6 1.4 4.2L9 10.6 5.2 13l1.4-4.2L3 6.2h4.2z"
                      fill={i < booking.rating!.stars ? "#F59E0B" : "#27272A"}
                    />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-white">{booking.rating.stars} / 5</span>
            </div>
            {booking.rating.comment && (
              <p className="mt-3 text-sm text-zinc-400 italic leading-relaxed">
                &ldquo;{booking.rating.comment}&rdquo;
              </p>
            )}
          </div>
        )}

        {/* ── Timeline ── */}
        <div className="rounded-2xl bg-[#111111] border border-white/[0.07] px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-5">
            Activity Timeline
          </p>
          <JobTimeline events={serialisedEvents} />
        </div>

      </main>
    </div>
  );
}

function DetailRow({
  label, value, className = "",
}: {
  label: string;
  value: string | null | undefined;
  className?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex gap-3 text-sm">
      <span className="w-24 shrink-0 text-zinc-600">{label}</span>
      <span className={`text-zinc-300 font-medium leading-snug ${className}`}>{value}</span>
    </div>
  );
}
