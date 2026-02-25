import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import { PlumberNav } from "@/components/plumber/PlumberNav";

export const dynamic = "force-dynamic";

const ACTIVE_STATUSES = ["accepted", "en_route", "arrived", "in_progress"];

const STATUS_META: Record<string, { label: string; pill: string; dot: string }> = {
  accepted:    { label: "Accepted",    pill: "bg-green-500/15 text-green-400 border border-green-500/20",   dot: "bg-green-400"  },
  en_route:    { label: "On the way",  pill: "bg-blue-500/15 text-blue-400 border border-blue-500/20",     dot: "bg-blue-400"   },
  arrived:     { label: "Arrived",     pill: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20", dot: "bg-indigo-400" },
  in_progress: { label: "Working",     pill: "bg-orange-500/15 text-orange-400 border border-orange-500/20", dot: "bg-orange-400 animate-pulse" },
  completed:   { label: "Completed",   pill: "bg-zinc-700/60 text-zinc-400 border border-zinc-700",         dot: "bg-zinc-500"   },
  cancelled:   { label: "Cancelled",   pill: "bg-red-500/15 text-red-400 border border-red-500/20",         dot: "bg-red-400"    },
};

export default async function JobsPage() {
  const session = await getPlumberSession();
  if (!session.plumberId) redirect("/plumber/login");

  const [offerCount, jobs] = await Promise.all([
    prisma.bookingOffer.count({ where: { plumberId: session.plumberId, status: "offered" } }),
    prisma.booking.findMany({
      where:   { assignedPlumberId: session.plumberId },
      orderBy: { updatedAt: "desc" },
      include: {
        slot:   { select: { date: true, startTime: true, endTime: true } },
        rating: { select: { stars: true } },
      },
    }),
  ]);

  const active = jobs.filter((j) => ACTIVE_STATUSES.includes(j.status));
  const past   = jobs.filter((j) => !ACTIVE_STATUSES.includes(j.status));

  function formatDate(d: Date) {
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  }

  function JobRow({ b }: { b: (typeof jobs)[0] }) {
    const meta = STATUS_META[b.status] ?? STATUS_META.completed;
    return (
      <Link
        href={`/plumber/jobs/${b.id}`}
        className="group flex items-center justify-between rounded-xl bg-[#111111] border border-white/[0.07] px-4 py-4 hover:border-white/[0.14] transition-all duration-150"
      >
        <div className="min-w-0">
          <p className="font-mono text-[11px] text-zinc-600 mb-1">{b.bookingRef}</p>
          <p className="text-sm font-semibold text-white capitalize truncate">
            {b.serviceType ?? "General"}{" "}
            <span className="text-zinc-500 font-normal">· {b.postcode}</span>
          </p>
          <p className="text-xs text-zinc-600 mt-0.5">
            {formatDate(b.slot.date)} · {b.slot.startTime}–{b.slot.endTime}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0 ml-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.pill}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
          {b.rating && (
            <span className="text-xs font-medium text-amber-400">
              {"★".repeat(b.rating.stars)}
              <span className="text-zinc-700">{"★".repeat(5 - b.rating.stars)}</span>
            </span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PlumberNav name={session.name} offerCount={offerCount} />
      <main className="mx-auto max-w-2xl px-4 pt-6 pb-24 sm:pb-8">

        <h1 className="text-xl font-bold text-white mb-6">My Jobs</h1>

        {active.length > 0 && (
          <section className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-3">
              Active · {active.length}
            </p>
            <div className="flex flex-col gap-2">
              {active.map((b) => <JobRow key={b.id} b={b} />)}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-3">
              Past Jobs · {past.length}
            </p>
            <div className="flex flex-col gap-2">
              {past.map((b) => <JobRow key={b.id} b={b} />)}
            </div>
          </section>
        )}

        {jobs.length === 0 && (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A1A1A] border border-white/[0.07]">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <path d="M5 14.5A7.5 7.5 0 0112.5 7H14a7.5 7.5 0 017.5 7.5c0 2.3-1.04 4.36-2.68 5.73L16 24H10l-2.82-3.77A7.47 7.47 0 015 14.5z" stroke="#3F3F46" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M10 24v3M16 24v3" stroke="#3F3F46" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-base font-semibold text-white">No jobs yet</p>
            <p className="text-sm text-zinc-600 mt-1">Accept a request to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
}
