"use client";

import { useState } from "react";

interface BookingRow {
  id: string;
  bookingRef: string;
  status: string;
  postcode: string;
  customerName: string | null;
  phone: string | null;
  email: string | null;
  serviceType: string | null;
  slot: { date: string; startTime: string; endTime: string };
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  reserved: "bg-yellow-100 text-yellow-800",
  new: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
  expired: "bg-gray-100 text-gray-400",
};

const NEXT_STATUSES: Record<string, string[]> = {
  reserved: ["new", "cancelled"],
  new: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
  expired: [],
};

interface AdminBookingTableProps {
  bookings: BookingRow[];
  onStatusChange?: (id: string, newStatus: string) => void;
}

export function AdminBookingTable({ bookings, onStatusChange }: AdminBookingTableProps) {
  const [updating, setUpdating] = useState<string | null>(null);

  async function handleStatusChange(booking: BookingRow, newStatus: string) {
    setUpdating(booking.id);
    try {
      const res = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        onStatusChange?.(booking.id, newStatus);
      }
    } finally {
      setUpdating(null);
    }
  }

  if (bookings.length === 0) {
    return (
      <p className="py-12 text-center text-gray-400">No bookings found.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-100 text-sm">
        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <tr>
            {["Ref", "Date/Time", "Postcode", "Customer", "Service", "Status", "Actions"].map(
              (h) => (
                <th key={h} className="px-4 py-3 text-left">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 bg-white">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-pp-navy font-semibold">
                {b.bookingRef}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <p className="font-medium text-pp-navy">
                  {new Date(b.slot.date + "T00:00:00").toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
                <p className="text-gray-400 text-xs">
                  {b.slot.startTime}–{b.slot.endTime}
                </p>
              </td>
              <td className="px-4 py-3 font-medium">{b.postcode}</td>
              <td className="px-4 py-3">
                <p className="font-medium text-pp-navy">{b.customerName ?? "—"}</p>
                <p className="text-gray-400 text-xs">{b.email ?? ""}</p>
              </td>
              <td className="px-4 py-3 capitalize">{b.serviceType ?? "—"}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    STATUS_COLORS[b.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {/* Call / WhatsApp */}
                  {b.phone && (
                    <>
                      <a
                        href={`tel:${b.phone}`}
                        className="rounded-full border border-pp-teal px-2.5 py-1 text-xs font-medium text-pp-teal hover:bg-pp-teal hover:text-white transition-colors"
                      >
                        Call
                      </a>
                      <a
                        href={`https://wa.me/${b.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-green-600 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-600 hover:text-white transition-colors"
                      >
                        WhatsApp
                      </a>
                    </>
                  )}
                  {/* Status transitions */}
                  {NEXT_STATUSES[b.status]?.map((next) => (
                    <button
                      key={next}
                      disabled={updating === b.id}
                      onClick={() => handleStatusChange(b, next)}
                      className="rounded-full bg-pp-navy px-2.5 py-1 text-xs font-medium text-white hover:bg-pp-navy-dark transition-colors disabled:opacity-50 capitalize"
                    >
                      → {next}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
