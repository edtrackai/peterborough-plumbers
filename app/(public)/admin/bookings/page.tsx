import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { AdminBookingTable } from "@/components/booking/AdminBookingTable";

export const metadata: Metadata = {
  title: "Admin — Bookings | Peterborough Plumbers",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 20;

interface Props {
  searchParams: Promise<{ status?: string; date?: string; page?: string }>;
}

export default async function AdminBookingsPage({ searchParams }: Props) {
  const { status, date, page: pageStr } = await searchParams;
  const page = Math.max(1, Number(pageStr ?? "1"));

  const where: Prisma.BookingWhereInput = {};
  if (status) where.status = status;
  if (date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    where.slot = { date: { gte: d, lt: next } };
  }

  const [total, bookings] = await prisma.$transaction([
    prisma.booking.count({ where }),
    prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        slot: { select: { date: true, startTime: true, endTime: true } },
        images: { select: { url: true }, orderBy: { createdAt: "asc" } },
      },
    }),
  ]);

  const pages = Math.ceil(total / PAGE_SIZE);

  const serialised = bookings.map((b) => ({
    id: b.id,
    bookingRef: b.bookingRef,
    status: b.status,
    postcode: b.postcode,
    customerName: b.customerName,
    phone: b.phone,
    email: b.email,
    serviceType: b.serviceType,
    description: b.description,
    address: b.address,
    accessNotes: b.accessNotes,
    slot: {
      date: b.slot.date.toISOString().split("T")[0],
      startTime: b.slot.startTime,
      endTime: b.slot.endTime,
    },
    createdAt: b.createdAt.toISOString(),
    images: b.images.map((img) => ({ url: img.url })),
  }));

  const STATUSES = ["", "reserved", "pending_assignment", "new", "accepted", "en_route", "arrived", "in_progress", "completed", "cancelled", "expired"];

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-pp-navy">Bookings</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {total} total · page {page} of {pages || 1}
            </p>
          </div>

          {/* Filters */}
          <form className="flex flex-wrap gap-3">
            <select
              name="status"
              defaultValue={status ?? ""}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s === "" ? "All statuses" : s}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              defaultValue={date ?? ""}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-lg bg-pp-teal px-4 py-2 text-sm text-white font-medium hover:bg-pp-teal-dark transition-colors"
            >
              Filter
            </button>
          </form>
        </div>

        <AdminBookingTable bookings={serialised} />

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-6 flex justify-center gap-3">
            {page > 1 && (
              <a
                href={`?status=${status ?? ""}&date=${date ?? ""}&page=${page - 1}`}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm hover:border-pp-teal"
              >
                ← Prev
              </a>
            )}
            {page < pages && (
              <a
                href={`?status=${status ?? ""}&date=${date ?? ""}&page=${page + 1}`}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm hover:border-pp-teal"
              >
                Next →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
