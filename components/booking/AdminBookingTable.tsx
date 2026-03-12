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
  description: string | null;
  address: string | null;
  accessNotes: string | null;
  slot: { date: string; startTime: string; endTime: string };
  createdAt: string;
  images?: { url: string }[];
}

const STATUS_COLORS: Record<string, string> = {
  reserved:           "bg-yellow-100 text-yellow-800",
  pending_assignment: "bg-amber-100 text-amber-800",
  new:                "bg-blue-100 text-blue-800",
  confirmed:          "bg-green-100 text-green-800",
  accepted:           "bg-teal-100 text-teal-800",
  en_route:           "bg-blue-200 text-blue-900",
  arrived:            "bg-indigo-100 text-indigo-800",
  in_progress:        "bg-orange-100 text-orange-800",
  completed:          "bg-gray-100 text-gray-700",
  cancelled:          "bg-red-100 text-red-700",
  expired:            "bg-gray-100 text-gray-400",
};

const NEXT_STATUSES: Record<string, string[]> = {
  reserved:           ["pending_assignment", "cancelled"],
  pending_assignment: ["accepted", "cancelled"],
  new:                ["pending_assignment", "confirmed", "cancelled"],
  confirmed:          ["completed", "cancelled"],
  accepted:           ["en_route", "cancelled"],
  en_route:           ["arrived", "cancelled"],
  arrived:            ["in_progress", "cancelled"],
  in_progress:        ["completed", "cancelled"],
  completed:          [],
  cancelled:          [],
  expired:            [],
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface AdminBookingTableProps {
  bookings: BookingRow[];
}

export function AdminBookingTable({ bookings: initial }: AdminBookingTableProps) {
  const [bookings, setBookings] = useState<BookingRow[]>(initial);
  const [selected, setSelected] = useState<BookingRow | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [renotifying, setRenotifying] = useState(false);
  const [renotifyMsg, setRenotifyMsg] = useState<string | null>(null);

  async function handleRenotify(booking: BookingRow) {
    setRenotifying(true);
    setRenotifyMsg(null);
    try {
      const res = await fetch(`/api/admin/bookings/${booking.id}/renotify`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setRenotifyMsg(`Notified ${data.notified} plumber${data.notified !== 1 ? "s" : ""}`);
      } else {
        setRenotifyMsg(data.error ?? "Failed to re-notify");
      }
    } catch {
      setRenotifyMsg("Network error");
    } finally {
      setRenotifying(false);
    }
  }

  async function handleStatusChange(booking: BookingRow, newStatus: string) {
    setUpdating(booking.id);
    try {
      const res = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === booking.id ? { ...b, status: newStatus } : b))
        );
        setSelected((prev) =>
          prev?.id === booking.id ? { ...prev, status: newStatus } : prev
        );
      }
    } finally {
      setUpdating(null);
    }
  }

  if (bookings.length === 0) {
    return <p className="py-12 text-center text-gray-400">No bookings found.</p>;
  }

  return (
    <>
      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <tr>
              {["Ref", "Date/Time", "Postcode", "Customer", "Service", "Photos", "Status", "Actions"].map(
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
              <tr
                key={b.id}
                onClick={() => { setSelected(b); setRenotifyMsg(null); }}
                className="hover:bg-pp-teal/5 cursor-pointer transition-colors"
              >
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
                  {b.images && b.images.length > 0 ? (
                    <div className="flex gap-1.5">
                      {b.images.map((img, i) => (
                        <a
                          key={i}
                          href={img.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="block h-10 w-10 rounded overflow-hidden border border-gray-200 hover:border-pp-teal transition-colors shrink-0"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.url}
                            alt={`Booking photo ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>
                <td
                  className="px-4 py-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-wrap gap-2">
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

      {/* ── Detail drawer ─────────────────────────────────────────────────── */}
      {selected && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          {/* Panel */}
          <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <p className="font-mono text-xs text-gray-400 mb-0.5">{selected.bookingRef}</p>
                <StatusBadge status={selected.status} />
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

              {/* Slot */}
              <Section title="Appointment">
                <Detail label="Date" value={formatDate(selected.slot.date)} />
                <Detail label="Time" value={`${selected.slot.startTime} – ${selected.slot.endTime}`} />
                <Detail label="Postcode" value={selected.postcode} />
              </Section>

              {/* Customer */}
              <Section title="Customer">
                <Detail label="Name" value={selected.customerName} />
                <Detail label="Email" value={selected.email} />
                <Detail label="Phone" value={selected.phone} />
                <Detail label="Address" value={selected.address} />
              </Section>

              {/* Job */}
              <Section title="Job">
                <Detail label="Service" value={selected.serviceType} className="capitalize" />
                <Detail label="Description" value={selected.description} />
                <Detail label="Access notes" value={selected.accessNotes} />
              </Section>

              {/* Photos */}
              {selected.images && selected.images.length > 0 && (
                <Section title={`Photos (${selected.images.length})`}>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selected.images.map((img, i) => (
                      <a
                        key={i}
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-20 w-20 rounded-lg overflow-hidden border border-gray-200 hover:border-pp-teal transition-colors"
                        title="View full image"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={`Photo ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </Section>
              )}

              {/* Metadata */}
              <Section title="Booking info">
                <Detail label="Created" value={new Date(selected.createdAt).toLocaleString("en-GB")} />
              </Section>
            </div>

            {/* Footer — contact + status actions */}
            <div className="border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
              {/* Contact buttons */}
              {selected.phone && (
                <div className="flex gap-2">
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex-1 rounded-lg border border-pp-teal py-2.5 text-center text-sm font-medium text-pp-teal hover:bg-pp-teal hover:text-white transition-colors"
                  >
                    📞 Call
                  </a>
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg border border-green-600 py-2.5 text-center text-sm font-medium text-green-700 hover:bg-green-600 hover:text-white transition-colors"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              )}

              {/* Re-notify plumbers */}
              {["pending_assignment", "reserved", "new"].includes(selected.status) && (
                <div className="flex flex-col gap-1.5">
                  <button
                    disabled={renotifying}
                    onClick={() => {
                      setRenotifyMsg(null);
                      handleRenotify(selected);
                    }}
                    className="w-full rounded-lg border border-amber-500 py-2.5 text-sm font-medium text-amber-700 hover:bg-amber-500 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {renotifying ? "Sending…" : "Re-notify plumbers"}
                  </button>
                  {renotifyMsg && (
                    <p className="text-center text-xs text-gray-500">{renotifyMsg}</p>
                  )}
                </div>
              )}

              {/* Status transition buttons */}
              {NEXT_STATUSES[selected.status]?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Update status
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {NEXT_STATUSES[selected.status].map((next) => (
                      <button
                        key={next}
                        disabled={updating === selected.id}
                        onClick={() => handleStatusChange(selected, next)}
                        className="flex-1 rounded-lg bg-pp-navy py-2.5 text-sm font-semibold text-white hover:bg-pp-navy-dark transition-colors disabled:opacity-50 capitalize"
                      >
                        {updating === selected.id ? "Updating…" : `→ ${next}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
        STATUS_COLORS[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
        {title}
      </h3>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function Detail({
  label,
  value,
  className,
}: {
  label: string;
  value: string | null | undefined;
  className?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-24 shrink-0 text-gray-400">{label}</span>
      <span className={`text-pp-navy font-medium ${className ?? ""}`}>{value}</span>
    </div>
  );
}
