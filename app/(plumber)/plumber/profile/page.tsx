import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import { PlumberNav } from "@/components/plumber/PlumberNav";
import { DutyToggle } from "@/components/plumber/DutyToggle";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getPlumberSession();
  if (!session.plumberId) redirect("/plumber/login");

  const [plumber, offerCount, stats] = await Promise.all([
    prisma.plumber.findUnique({ where: { id: session.plumberId } }),
    prisma.bookingOffer.count({ where: { plumberId: session.plumberId, status: "offered" } }),
    prisma.booking.findMany({
      where: { assignedPlumberId: session.plumberId },
      include: { rating: { select: { stars: true } } },
    }),
  ]);

  if (!plumber) redirect("/plumber/login");

  const totalJobs     = stats.length;
  const completedJobs = stats.filter((b) => b.status === "completed").length;
  const ratings       = stats.map((b) => b.rating?.stars).filter(Boolean) as number[];
  const avgRating     = ratings.length
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <PlumberNav name={plumber.name} offerCount={offerCount} />
      <main className="mx-auto max-w-2xl px-4 py-6 flex flex-col gap-5">

        {/* Profile card */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-6 py-5">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pp-navy text-white text-xl font-bold">
              {plumber.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg font-bold text-pp-navy">{plumber.name}</h1>
              <p className="text-sm text-gray-500">{plumber.email}</p>
              {plumber.phone && <p className="text-sm text-gray-500">{plumber.phone}</p>}
            </div>
          </div>

          <DutyToggle isOnDuty={plumber.isOnDuty} />
          <p className="mt-2 text-xs text-gray-400">
            Toggle on-duty to receive new job requests.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Total Jobs" value={totalJobs.toString()} />
          <StatCard label="Completed"  value={completedJobs.toString()} />
          <StatCard label="Avg Rating" value={avgRating ? `★ ${avgRating}` : "—"} highlight={!!avgRating} />
        </div>

        {/* Last seen */}
        {plumber.lastSeenAt && (
          <p className="text-xs text-center text-gray-400">
            Last active: {plumber.lastSeenAt.toLocaleString("en-GB")}
          </p>
        )}

      </main>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl bg-white border border-gray-100 shadow-sm px-4 py-3 text-center">
      <p className={`text-xl font-bold ${highlight ? "text-yellow-500" : "text-pp-navy"}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}
