import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BookingKanban } from "@/components/admin/BookingKanban";
import { AdminBookingTable } from "@/components/booking/AdminBookingTable";
import type { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Bookings Pipeline | Admin",
  robots: { index: false, follow: false },
};

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  reserved:           { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  pending_assignment: { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  new:                { bg: "#DBEAFE", text: "#1E40AF", dot: "#3B82F6" },
  accepted:           { bg: "#EDE9FE", text: "#5B21B6", dot: "#8B5CF6" },
  en_route:           { bg: "#FFEDD5", text: "#9A3412", dot: "#F97316" },
  arrived:            { bg: "#FFEDD5", text: "#9A3412", dot: "#F97316" },
  in_progress:        { bg: "#F3E8FF", text: "#6B21A8", dot: "#A855F7" },
  completed:          { bg: "#DCFCE7", text: "#166534", dot: "#22C55E" },
  cancelled:          { bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" },
  expired:            { bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" },
};

const PIPELINE_STATUSES = [
  "reserved", "pending_assignment", "new",
  "accepted", "en_route", "arrived", "in_progress",
];
const HISTORICAL_STATUSES = ["completed", "cancelled", "expired"];
const PAGE_SIZE = 20;

interface Props {
  searchParams: Promise<{ tab?: string; status?: string; date?: string; page?: string }>;
}

export default async function AdminBookingsPage({ searchParams }: Props) {
  const { tab = "pipeline", status, date, page: pageStr } = await searchParams;
  const page = Math.max(1, Number(pageStr ?? "1"));

  // All active pipeline bookings (no pagination — kanban needs all)
  const pipelineBookings = await prisma.booking.findMany({
    where: { status: { in: PIPELINE_STATUSES } },
    orderBy: { createdAt: "asc" },
    include: { slot: { select: { date: true, startTime: true, endTime: true } } },
    take: 200,
  });

  const [totalActive, completedToday, totalAll] = await Promise.all([
    prisma.booking.count({ where: { status: { in: PIPELINE_STATUSES } } }),
    prisma.booking.count({
      where: {
        status: "completed",
        updatedAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
    prisma.booking.count(),
  ]);

  // Historical table
  const histWhere: Prisma.BookingWhereInput = { status: { in: HISTORICAL_STATUSES } };
  if (status && HISTORICAL_STATUSES.includes(status)) histWhere.status = status;
  if (date) {
    const d = new Date(date); d.setHours(0, 0, 0, 0);
    const next = new Date(d); next.setDate(d.getDate() + 1);
    histWhere.slot = { date: { gte: d, lt: next } };
  }
  const [histTotal, histBookings] = tab === "history"
    ? await prisma.$transaction([
        prisma.booking.count({ where: histWhere }),
        prisma.booking.findMany({
          where: histWhere,
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * PAGE_SIZE,
          take: PAGE_SIZE,
          include: {
            slot: { select: { date: true, startTime: true, endTime: true } },
            images: { select: { url: true }, orderBy: { createdAt: "asc" } },
          },
        }),
      ])
    : [0, []];

  const histPages = Math.ceil(histTotal / PAGE_SIZE);

  const serialisedPipeline = pipelineBookings.map((b) => ({
    id: b.id,
    bookingRef: b.bookingRef,
    status: b.status,
    customerName: b.customerName ?? "",
    phone: b.phone ?? "",
    serviceType: b.serviceType ?? "",
    postcode: b.postcode,
    address: b.address,
    description: b.description,
    slot: {
      date: b.slot.date.toISOString().split("T")[0],
      startTime: b.slot.startTime,
      endTime: b.slot.endTime,
    },
    createdAt: b.createdAt.toISOString(),
  }));

  const serialisedHist = histBookings.map((b) => ({
    id: b.id, bookingRef: b.bookingRef, status: b.status, postcode: b.postcode,
    customerName: b.customerName, phone: b.phone, email: b.email,
    serviceType: b.serviceType, description: b.description,
    address: b.address, accessNotes: b.accessNotes,
    slot: {
      date: b.slot.date.toISOString().split("T")[0],
      startTime: b.slot.startTime, endTime: b.slot.endTime,
    },
    createdAt: b.createdAt.toISOString(),
    images: b.images.map((img) => ({ url: img.url })),
  }));

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Bookings Pipeline</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {totalActive} active &middot; {completedToday} completed today &middot; {totalAll} all-time
          </p>
        </div>
        <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
          ← Dashboard
        </Link>
      </div>

      {/* Status chips */}
      <div className="flex flex-wrap gap-2">
        {PIPELINE_STATUSES.map((s) => {
          const count = pipelineBookings.filter((b) => b.status === s).length;
          if (!count) return null;
          const st = STATUS_STYLE[s];
          return (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize"
              style={{ background: st.bg, color: st.text }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: st.dot }} />
              {s.replace(/_/g, " ")} · {count}
            </span>
          );
        })}
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-slate-200 shadow-sm w-fit">
        {(["pipeline", "history"] as const).map((t) => (
          <Link
            key={t}
            href={`?tab=${t}`}
            className={[
              "px-4 py-1.5 rounded-lg text-sm font-semibold transition-all",
              tab === t ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700",
            ].join(" ")}
            style={tab === t ? { background: "#C8102E" } : {}}
          >
            {t === "pipeline" ? "🗂 Pipeline" : "📋 History"}
          </Link>
        ))}
      </div>

      {/* Pipeline kanban */}
      {tab !== "history" && (
        serialisedPipeline.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center py-24">
            <div className="text-center">
              <p className="text-slate-400 font-medium">No active bookings in pipeline</p>
              <p className="text-slate-300 text-sm mt-1">All clear — switch to History to view past bookings</p>
            </div>
          </div>
        ) : (
          <BookingKanban initialBookings={serialisedPipeline} />
        )
      )}

      {/* History table */}
      {tab === "history" && (
        <div className="space-y-4">
          <form className="flex flex-wrap gap-3 bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <select
              name="status"
              defaultValue={status ?? ""}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            >
              <option value="">All statuses</option>
              {HISTORICAL_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="date" name="date" defaultValue={date ?? ""}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            />
            <input type="hidden" name="tab" value="history" />
            <button
              type="submit"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ background: "#C8102E" }}
            >
              Filter
            </button>
          </form>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-600">{histTotal} records</p>
            </div>
            <AdminBookingTable bookings={serialisedHist} />
          </div>

          {histPages > 1 && (
            <div className="flex justify-center gap-2">
              {page > 1 && (
                <a href={`?tab=history&status=${status ?? ""}&date=${date ?? ""}&page=${page - 1}`}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-slate-400">
                  ← Prev
                </a>
              )}
              <span className="flex items-center px-4 text-sm text-slate-500">{page} / {histPages}</span>
              {page < histPages && (
                <a href={`?tab=history&status=${status ?? ""}&date=${date ?? ""}&page=${page + 1}`}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-slate-400">
                  Next →
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
