import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import { PlumberNav } from "@/components/plumber/PlumberNav";
import { DutyToggle } from "@/components/plumber/DutyToggle";
import { GpsTracker } from "@/components/plumber/GpsTracker";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getPlumberSession();
  if (!session.plumberId) redirect("/plumber/login");

  const [plumber, offerCount, stats, activeBooking] = await Promise.all([
    prisma.plumber.findUnique({ where: { id: session.plumberId } }),
    prisma.bookingOffer.count({ where: { plumberId: session.plumberId, status: "offered" } }),
    prisma.booking.findMany({
      where:   { assignedPlumberId: session.plumberId },
      include: { rating: { select: { stars: true } } },
    }),
    prisma.booking.findFirst({
      where: {
        assignedPlumberId: session.plumberId,
        status: { in: ["en_route", "arrived", "in_progress"] },
      },
      select: { id: true, bookingRef: true, status: true },
    }),
  ]);

  if (!plumber) redirect("/plumber/login");

  const totalJobs     = stats.length;
  const completedJobs = stats.filter((b) => b.status === "completed").length;
  const ratings       = stats.map((b) => b.rating?.stars).filter(Boolean) as number[];
  const avgRating     = ratings.length
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : null;

  const initials = plumber.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <PlumberNav name={plumber.name} offerCount={offerCount} />
      <main className="mx-auto max-w-2xl px-4 pt-6 pb-24 sm:pb-8 flex flex-col gap-3">

        {/* ── Profile card ── */}
        <div className="rounded-2xl bg-[#111111] border border-white/[0.07] px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand)]/15 border border-[var(--brand)]/20">
                <span className="text-xl font-bold text-[var(--brand)]">{initials}</span>
              </div>
              {plumber.isOnDuty && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-[#111111]" />
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-white truncate">{plumber.name}</h1>
              <p className="text-sm text-zinc-500 truncate">{plumber.email}</p>
              {plumber.phone && <p className="text-sm text-zinc-500">{plumber.phone}</p>}
            </div>
          </div>

          {/* Duty toggle */}
          <DutyToggle isOnDuty={plumber.isOnDuty} />

          {/* GPS tracker */}
          <div className="mt-3">
            <GpsTracker activeBookingId={activeBooking?.id ?? null} />
            {activeBooking && (
              <p className="mt-2 text-center text-[11px] text-zinc-700">
                Active job: <span className="text-zinc-500 font-mono">{activeBooking.bookingRef}</span>
                {" · "}
                <span className="capitalize">{activeBooking.status.replace("_", " ")}</span>
              </p>
            )}
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-2.5">
          <StatCard label="Total Jobs" value={totalJobs.toString()} />
          <StatCard label="Completed"  value={completedJobs.toString()} />
          <StatCard
            label="Avg Rating"
            value={avgRating ?? "—"}
            highlight={!!avgRating}
          />
        </div>

        {/* ── Last seen ── */}
        {plumber.lastSeenAt && (
          <p className="text-center text-[11px] text-zinc-700 pt-1">
            Last active: {plumber.lastSeenAt.toLocaleString("en-GB")}
          </p>
        )}

      </main>
    </div>
  );
}

function StatCard({
  label, value, highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl bg-[#111111] border border-white/[0.07] px-4 py-4 text-center">
      <p className={`text-2xl font-bold tracking-tight ${highlight ? "text-amber-400" : "text-white"}`}>
        {value}
      </p>
      <p className="text-[11px] text-zinc-600 mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}
