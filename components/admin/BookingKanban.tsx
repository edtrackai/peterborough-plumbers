"use client";

import { useState, useTransition } from "react";
import { OfferDispatchDrawer } from "./OfferDispatchDrawer";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface KanbanBooking {
  id: string;
  bookingRef: string;
  status: string;
  customerName: string;
  phone: string;
  serviceType: string;
  postcode: string;
  address: string | null;
  description: string | null;
  slot: { date: string; startTime: string; endTime: string };
  createdAt: string;
}

// ── Pipeline stages ───────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "queued",
    label: "Queued",
    statuses: ["reserved", "pending_assignment", "new"],
    color: "#F59E0B",
    bg: "#FFFBEB",
    border: "#FDE68A",
    next: ["accepted", "cancelled"],
  },
  {
    id: "accepted",
    label: "Accepted",
    statuses: ["accepted"],
    color: "#6366F1",
    bg: "#EEF2FF",
    border: "#C7D2FE",
    next: ["en_route", "cancelled"],
  },
  {
    id: "en_route",
    label: "En Route",
    statuses: ["en_route", "arrived"],
    color: "#F97316",
    bg: "#FFF7ED",
    border: "#FED7AA",
    next: ["in_progress", "cancelled"],
  },
  {
    id: "in_progress",
    label: "In Progress",
    statuses: ["in_progress"],
    color: "#A855F7",
    bg: "#FAF5FF",
    border: "#E9D5FF",
    next: ["completed", "cancelled"],
  },
  {
    id: "completed",
    label: "Completed",
    statuses: ["completed"],
    color: "#22C55E",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    next: [],
  },
  {
    id: "cancelled",
    label: "Cancelled",
    statuses: ["cancelled", "expired"],
    color: "#94A3B8",
    bg: "#F8FAFC",
    border: "#E2E8F0",
    next: [],
  },
] as const;

// ── Status colours ────────────────────────────────────────────────────────────
const STATUS_DOT: Record<string, string> = {
  reserved: "#F59E0B", pending_assignment: "#F59E0B", new: "#3B82F6",
  accepted: "#6366F1", en_route: "#F97316", arrived: "#F97316",
  in_progress: "#A855F7", completed: "#22C55E", cancelled: "#94A3B8", expired: "#94A3B8",
};

// ── Icons ─────────────────────────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ── Booking card (shared mobile + desktop) ────────────────────────────────────
function BookingCard({
  booking,
  stageColor,
  nextStatuses,
  onUpdate,
  onDispatch,
}: {
  booking: KanbanBooking;
  stageColor: string;
  nextStatuses: readonly string[];
  onUpdate: (id: string, status: string) => void;
  onDispatch: (id: string, ref: string) => void;
}) {
  const [dropOpen, setDropOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const slotDate = new Date(booking.slot.date + "T00:00:00");
  const dateStr = slotDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  function moveStatus(newStatus: string) {
    setDropOpen(false);
    startTransition(async () => {
      const res = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) onUpdate(booking.id, newStatus);
    });
  }

  return (
    <div
      className="bg-white rounded-xl border border-slate-100 shadow-sm p-3.5 space-y-2.5 transition-shadow hover:shadow-md"
      style={{ borderLeft: `3px solid ${stageColor}`, opacity: pending ? 0.6 : 1 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-black text-slate-800 leading-tight truncate">{booking.customerName}</p>
          <p className="text-[0.65rem] text-slate-400 mt-0.5 font-mono">{booking.bookingRef}</p>
        </div>
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.6rem] font-bold shrink-0"
          style={{ background: `${STATUS_DOT[booking.status]}20`, color: STATUS_DOT[booking.status] }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_DOT[booking.status] }} />
          {booking.status.replace(/_/g, " ")}
        </span>
      </div>

      {/* Service */}
      {booking.serviceType && (
        <p className="text-xs font-semibold text-slate-600 bg-slate-50 rounded-lg px-2.5 py-1.5 truncate">
          {booking.serviceType}
        </p>
      )}

      {/* Meta */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        <span className="flex items-center gap-1 text-[0.68rem] text-slate-400">
          <MapIcon /> {booking.postcode}
        </span>
        <span className="flex items-center gap-1 text-[0.68rem] text-slate-400">
          <CalIcon /> {dateStr} {booking.slot.startTime}
        </span>
        <a href={`tel:${booking.phone}`} className="flex items-center gap-1 text-[0.68rem] text-slate-400 hover:text-slate-600">
          <PhoneIcon /> {booking.phone}
        </a>
      </div>

      {/* Description */}
      {booking.description && (
        <p className="text-[0.65rem] text-slate-400 line-clamp-2 leading-relaxed">
          {booking.description}
        </p>
      )}

      {/* Dispatch offer button — only for unassigned bookings */}
      {["pending_assignment", "reserved", "new"].includes(booking.status) && (
        <div className="pt-1 border-t border-slate-100">
          <button
            onClick={() => onDispatch(booking.id, booking.bookingRef)}
            className="w-full flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-[0.7rem] font-bold text-white transition-colors"
            style={{ background: "#C8102E" }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M1 5.5h9M6 1l4 4.5L6 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Dispatch to Plumber
          </button>
        </div>
      )}

      {/* Actions */}
      {nextStatuses.length > 0 && (
        <div className="relative pt-1 border-t border-slate-100">
          <button
            onClick={() => setDropOpen(!dropOpen)}
            disabled={pending}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[0.7rem] font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <span>Move to…</span>
            <svg className={`h-3 w-3 transition-transform ${dropOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden">
              {nextStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => moveStatus(s)}
                  className="w-full text-left px-3 py-2.5 text-xs font-semibold capitalize hover:bg-slate-50 transition-colors flex items-center gap-2.5"
                  style={{ color: STATUS_DOT[s] }}
                >
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: STATUS_DOT[s] }} />
                  {s.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Mobile accordion view ─────────────────────────────────────────────────────
function MobileKanban({
  bookings,
  onUpdate,
  onDispatch,
}: {
  bookings: KanbanBooking[];
  onUpdate: (id: string, s: string) => void;
  onDispatch: (id: string, ref: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>("queued");

  return (
    <div className="space-y-2">
      {STAGES.map((stage) => {
        const cards = bookings.filter((b) => (stage.statuses as readonly string[]).includes(b.status));
        const isOpen = expanded === stage.id;

        return (
          <div
            key={stage.id}
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: stage.border, background: stage.bg }}
          >
            <button
              className="w-full px-4 py-3.5 flex items-center justify-between"
              onClick={() => setExpanded(isOpen ? null : stage.id)}
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: stage.color }} />
                <span className="text-sm font-bold text-slate-700">{stage.label}</span>
                <span
                  className="h-5 min-w-[1.25rem] px-1.5 rounded-full text-[0.62rem] font-black flex items-center justify-center text-white"
                  style={{ background: stage.color }}
                >
                  {cards.length}
                </span>
              </div>
              <ChevronIcon open={isOpen} />
            </button>

            {isOpen && (
              <div className="px-2.5 pb-2.5 space-y-2.5">
                {cards.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 italic py-5">No bookings in this stage</p>
                ) : (
                  cards.map((b) => (
                    <BookingCard
                      key={b.id}
                      booking={b}
                      stageColor={stage.color}
                      nextStatuses={stage.next}
                      onUpdate={onUpdate}
                      onDispatch={onDispatch}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Kanban board ──────────────────────────────────────────────────────────────
export function BookingKanban({ initialBookings }: { initialBookings: KanbanBooking[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [drawer, setDrawer] = useState<{ id: string; ref: string } | null>(null);

  function handleUpdate(id: string, newStatus: string) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  }

  function handleDispatch(id: string, ref: string) {
    setDrawer({ id, ref });
  }

  function handleDispatched() {
    // Mark booking as pending_assignment locally if it wasn't already
    setBookings((prev) =>
      prev.map((b) =>
        b.id === drawer?.id && b.status !== "pending_assignment"
          ? { ...b, status: "pending_assignment" }
          : b
      )
    );
  }

  return (
    <>
      {/* Mobile: accordion */}
      <div className="block lg:hidden">
        <MobileKanban bookings={bookings} onUpdate={handleUpdate} onDispatch={handleDispatch} />
      </div>

      {/* Desktop: horizontal kanban */}
      <div className="hidden lg:flex gap-4 overflow-x-auto pb-4" style={{ minHeight: "500px" }}>
        {STAGES.map((stage) => {
          const cards = bookings.filter((b) => (stage.statuses as readonly string[]).includes(b.status));
          return (
            <div
              key={stage.id}
              className="shrink-0 w-[240px] flex flex-col rounded-xl overflow-hidden border"
              style={{ background: stage.bg, borderColor: stage.border }}
            >
              {/* Column header */}
              <div
                className="px-4 py-3 flex items-center justify-between border-b"
                style={{ borderColor: stage.border }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: stage.color }} />
                  <span className="text-xs font-bold text-slate-700">{stage.label}</span>
                </div>
                <span
                  className="h-5 min-w-[1.25rem] px-1 rounded-full text-[0.65rem] font-black flex items-center justify-center text-white"
                  style={{ background: stage.color }}
                >
                  {cards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 p-2.5 space-y-2.5 overflow-y-auto" style={{ maxHeight: "70vh" }}>
                {cards.length === 0 ? (
                  <div className="flex items-center justify-center h-20 text-xs text-slate-400 italic">
                    Empty
                  </div>
                ) : (
                  cards.map((b) => (
                    <BookingCard
                      key={b.id}
                      booking={b}
                      stageColor={stage.color}
                      nextStatuses={stage.next}
                      onUpdate={handleUpdate}
                      onDispatch={handleDispatch}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Offer dispatch drawer */}
      {drawer && (
        <OfferDispatchDrawer
          bookingId={drawer.id}
          bookingRef={drawer.ref}
          onClose={() => setDrawer(null)}
          onDispatched={handleDispatched}
        />
      )}
    </>
  );
}
