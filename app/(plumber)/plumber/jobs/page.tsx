import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import { PlumberNav } from "@/components/plumber/PlumberNav";

export const dynamic = "force-dynamic";

const ACTIVE_STATUSES = ["accepted", "en_route", "arrived", "in_progress"];

const STATUS_LABELS: Record<string, string> = {
  accepted:    "Accepted",
  en_route:    "On the way",
  arrived:     "Arrived",
  in_progress: "Working",
  completed:   "Completed",
  cancelled:   "Cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  accepted:    "bg-green-100 text-green-800",
  en_route:    "bg-blue-100 text-blue-800",
  arrived:     "bg-indigo-100 text-indigo-800",
  in_progress: "bg-orange-100 text-orange-800",
  completed:   "bg-gray-100 text-gray-600",
  cancelled:   "bg-red-100 text-red-600",
};

export default async function JobsPage() {
  const session = await getPlumberSession();
  if (!session.plumberId) redirect("/plumber/login");

  const [offerCount, jobs] = await Promise.all([
    prisma.bookingOffer.count({ where: { plumberId: session.plumberId, status: "offered" } }),
    prisma.booking.findMany({
      where: { assignedPlumberId: session.plumberId },
      orderBy: { updatedAt: "desc" },
      include: {
        slot: { select: { date: true, startTime: true, endTime: true } },
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
    return (
      <Link
        href={`/plumber/jobs/${b.id}`}
        className="flex items-center justify-between rounded-xl bg-white border border-gray-100 px-4 py-3.5 hover:border-pp-teal transition-colors"
      >
        <div>
          <p className="font-mono text-xs text-gray-400">{b.bookingRef}</p>
          <p className="text-sm font-semibold text-pp-navy capitalize mt-0.5">{b.serviceType ?? "General"} · {b.postcode}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatDate(b.slot.date)} · {b.slot.startTime}–{b.slot.endTime}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[b.status] ?? "bg-gray-100 text-gray-600"}`}>
            {STATUS_LABELS[b.status] ?? b.status}
          </span>
          {b.rating && (
            <span className="text-xs text-yellow-500">{"★".repeat(b.rating.stars)}</span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PlumberNav name={session.name} offerCount={offerCount} />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <h1 className="text-xl font-bold text-pp-navy mb-5">My Jobs</h1>

        {active.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Active</h2>
            <div className="flex flex-col gap-2">
              {active.map((b) => <JobRow key={b.id} b={b} />)}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Past Jobs</h2>
            <div className="flex flex-col gap-2">
              {past.map((b) => <JobRow key={b.id} b={b} />)}
            </div>
          </section>
        )}

        {jobs.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <span className="text-5xl mb-4">🔧</span>
            <p className="text-lg font-semibold text-pp-navy">No jobs yet</p>
            <p className="text-sm text-gray-400 mt-1">Accept a request to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
}
