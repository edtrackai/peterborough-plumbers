"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TrackerEvent {
  type:      string;
  notes:     string | null;
  createdAt: string;
}

interface TrackerData {
  bookingId:        string;
  bookingRef:       string;
  status:           string;
  hasRating:        boolean;
  serviceType:      string | null;
  slot:             { date: string; startTime: string; endTime: string };
  plumber:          { name: string } | null;
  estimatedArrival: string | null;
  location:         { lat: number; lng: number; accuracy: number | null; updatedAt: string } | null;
  events:           TrackerEvent[];
}

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; message: string; color: string; bg: string }> = {
  pending:            { label: "Pending",       message: "Your booking is awaiting confirmation.",         color: "text-yellow-600", bg: "bg-yellow-50"  },
  pending_assignment: { label: "Confirming",    message: "We're finding the best available plumber.",     color: "text-yellow-600", bg: "bg-yellow-50"  },
  accepted:           { label: "Confirmed",     message: "Your plumber has accepted the job.",             color: "text-green-700",  bg: "bg-green-50"   },
  en_route:           { label: "On the Way",    message: "Your plumber is heading to you now.",            color: "text-blue-700",   bg: "bg-blue-50"    },
  arrived:            { label: "Arrived",       message: "Your plumber has arrived at your property.",    color: "text-indigo-700", bg: "bg-indigo-50"  },
  in_progress:        { label: "Working",       message: "Your plumber is currently working on the job.", color: "text-orange-700", bg: "bg-orange-50"  },
  completed:          { label: "Completed",     message: "The job is complete. Thank you for choosing us!", color: "text-gray-700",  bg: "bg-gray-100"   },
  cancelled:          { label: "Cancelled",     message: "This booking has been cancelled.",               color: "text-red-700",   bg: "bg-red-50"     },
};

const EVENT_LABELS: Record<string, string> = {
  booked:             "Booking received",
  pending_assignment: "Finding a plumber",
  accepted:           "Plumber assigned",
  en_route:           "Plumber on the way",
  arrived:            "Plumber arrived",
  in_progress:        "Work started",
  completed:          "Job completed",
  cancelled:          "Booking cancelled",
};

const TERMINAL_STATUSES = ["completed", "cancelled"];
const POLL_INTERVAL_MS  = 10_000;

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(isoStr: string) {
  return new Date(isoStr).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function formatSlot(date: string, start: string, end: string) {
  const d = new Date(date + "T00:00:00");
  const dayStr = d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  return `${dayStr} · ${start}–${end}`;
}

// ── Rating form ───────────────────────────────────────────────────────────────

function RatingForm({ bookingId }: { bookingId: string }) {
  const [stars,     setStars]     = useState(0);
  const [hovered,   setHovered]   = useState(0);
  const [comment,   setComment]   = useState("");
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (stars === 0) { setError("Please select a star rating."); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/rate/${bookingId}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ stars, comment: comment.trim() || undefined }),
      });
      if (res.status === 409) { setSubmitted(true); return; } // already rated
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Failed to submit. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 px-6 py-6 text-center">
        <p className="text-2xl mb-2">⭐</p>
        <p className="font-bold text-green-800 text-lg">Thank you for your feedback!</p>
        <p className="text-sm text-green-700 mt-1">Your review helps us improve our service.</p>
      </div>
    );
  }

  const display = hovered || stars;

  return (
    <div className="rounded-2xl bg-white border border-gray-200 px-6 py-6">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">How did we do?</p>
      <p className="text-base font-bold text-gray-800 mb-4">Rate your experience</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Star selector */}
        <div
          className="flex gap-2"
          role="group"
          aria-label="Star rating"
          onMouseLeave={() => setHovered(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n !== 1 ? "s" : ""}`}
              onClick={() => { setStars(n); setError(null); }}
              onMouseEnter={() => setHovered(n)}
              className="text-4xl leading-none transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded"
            >
              <span className={n <= display ? "text-amber-400" : "text-gray-200"}>★</span>
            </button>
          ))}
        </div>

        {/* Comment */}
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          placeholder="Tell us about your experience (optional)…"
          className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#C8102E]/40 focus:border-[#C8102E]"
        />

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#C8102E] py-3.5 text-sm font-bold text-white hover:bg-[#a50d26] transition-colors disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Rating"}
        </button>
      </form>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TrackerClient({ bookingRef }: { bookingRef: string }) {
  const [data, setData]       = useState<TrackerData | null>(null);
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/bookings/${bookingRef}/tracker`, { cache: "no-store" });
      if (res.status === 404) {
        setError("Booking not found. Please check your reference and try again.");
        return;
      }
      if (!res.ok) {
        setError("Unable to load tracking information. Please try again.");
        return;
      }
      const json: TrackerData = await res.json();
      setData(json);
      setError(null);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [bookingRef]);

  useEffect(() => {
    fetchData();
    const id = setInterval(() => {
      if (data && TERMINAL_STATUSES.includes(data.status)) return;
      fetchData();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchData, data]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-[#C8102E]/20 border-t-[#C8102E] animate-spin" />
        <p className="text-sm text-gray-500">Loading tracking information…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-200 px-6 py-8 text-center">
        <p className="text-red-700 font-semibold mb-1">Tracking unavailable</p>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const cfg        = STATUS_CONFIG[data.status] ?? STATUS_CONFIG.pending;
  const isTerminal = TERMINAL_STATUSES.includes(data.status);

  return (
    <div className="flex flex-col gap-4">

      {/* Status card */}
      <div className={`rounded-2xl px-6 py-5 border ${cfg.bg} border-gray-200`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-bold uppercase tracking-widest ${cfg.color}`}>{cfg.label}</span>
          <span className="font-mono text-xs text-gray-400">{data.bookingRef}</span>
        </div>
        <p className="text-gray-800 font-semibold leading-snug">{cfg.message}</p>
        {data.plumber && (
          <p className="mt-1 text-sm text-gray-600">
            Plumber: <strong>{data.plumber.name}</strong>
          </p>
        )}
        {data.estimatedArrival && data.status === "en_route" && (
          <p className="mt-1 text-sm text-blue-700 font-medium">
            ETA: {formatTime(data.estimatedArrival)}
          </p>
        )}
      </div>

      {/* Appointment */}
      <div className="rounded-2xl bg-white border border-gray-200 px-6 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Appointment</p>
        <p className="text-sm font-medium text-gray-800">
          {formatSlot(data.slot.date, data.slot.startTime, data.slot.endTime)}
        </p>
        {data.serviceType && (
          <p className="text-sm text-gray-500 capitalize mt-0.5">{data.serviceType.replace(/_/g, " ")}</p>
        )}
      </div>

      {/* Map — only when GPS location available */}
      {data.location && (
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="bg-gray-50 px-4 py-2.5 flex items-center justify-between border-b border-gray-200">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Plumber Location</p>
            <p className="text-[11px] text-gray-400">Updated {formatTime(data.location.updatedAt)}</p>
          </div>
          <iframe
            title="Plumber location map"
            src={`https://maps.google.com/maps?q=${data.location.lat},${data.location.lng}&z=15&output=embed`}
            width="100%"
            height="260"
            loading="lazy"
            className="block w-full border-0"
          />
        </div>
      )}

      {/* Event timeline */}
      {data.events.length > 0 && (
        <div className="rounded-2xl bg-white border border-gray-200 px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-4">Timeline</p>
          <ol className="relative border-l border-gray-200 ml-1 flex flex-col gap-4">
            {data.events.map((ev, i) => (
              <li key={i} className="pl-5">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#C8102E] border-2 border-white shadow" />
                <p className="text-sm font-semibold text-gray-800">
                  {EVENT_LABELS[ev.type] ?? ev.type}
                </p>
                {ev.notes && (
                  <p className="text-xs text-gray-500 mt-0.5">{ev.notes}</p>
                )}
                <p className="text-[11px] text-gray-400 mt-0.5">{formatTime(ev.createdAt)}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Rating form — shown only when completed and not yet rated */}
      {data.status === "completed" && !data.hasRating && (
        <RatingForm bookingId={data.bookingId} />
      )}

      {/* Polling indicator */}
      {!isTerminal && (
        <p className="text-center text-[11px] text-gray-400">
          Auto-updating every 10 seconds
        </p>
      )}
    </div>
  );
}
