"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TRANSITIONS: Record<string, { status: string; label: string; cls: string }[]> = {
  accepted:    [{ status: "en_route",    label: "Start Trip",     cls: "bg-blue-600 hover:bg-blue-500"    }],
  en_route:    [{ status: "arrived",     label: "Mark Arrived",   cls: "bg-indigo-600 hover:bg-indigo-500" }],
  arrived:     [{ status: "in_progress", label: "Start Work",     cls: "bg-orange-500 hover:bg-orange-400" }],
  in_progress: [{ status: "completed",   label: "Mark Complete",  cls: "bg-green-600 hover:bg-green-500"   }],
};

interface StatusButtonsProps {
  bookingId:     string;
  currentStatus: string;
}

export function StatusButtons({ bookingId, currentStatus }: StatusButtonsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [notes, setNotes]     = useState("");
  const [locationMsg, setLocationMsg] = useState<string | null>(null);

  const actions = TRANSITIONS[currentStatus] ?? [];

  async function handleStatus(newStatus: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/plumber/bookings/${bookingId}/status`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ status: newStatus, notes: notes.trim() || undefined }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Failed to update status");
        return;
      }
      setNotes("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function shareLocation() {
    if (!navigator.geolocation) {
      setLocationMsg("Geolocation not supported on this device.");
      return;
    }
    setLocationMsg("Getting location…");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const res = await fetch(`/api/plumber/bookings/${bookingId}/location`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            lat:      pos.coords.latitude,
            lng:      pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          }),
        });
        setLocationMsg(res.ok ? "Location shared" : "Failed to share location");
        setTimeout(() => setLocationMsg(null), 3000);
      },
      () => {
        setLocationMsg("Location permission denied.");
        setTimeout(() => setLocationMsg(null), 4000);
      }
    );
  }

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Optional note */}
      <textarea
        rows={2}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Optional note (visible in timeline)…"
        className="w-full rounded-xl bg-[#1A1A1A] border border-white/[0.07] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-700 resize-none transition-colors focus:outline-none focus:border-[var(--brand)]/50 focus:ring-1 focus:ring-[var(--brand)]/30"
      />

      {/* Primary action buttons */}
      {actions.map((a) => (
        <button
          key={a.status}
          disabled={loading}
          onClick={() => handleStatus(a.status)}
          className={`w-full rounded-xl py-3.5 text-sm font-bold text-white transition-colors disabled:opacity-50 ${a.cls}`}
        >
          {loading ? "Updating…" : a.label}
        </button>
      ))}

      {/* Location share */}
      {["en_route", "arrived", "in_progress"].includes(currentStatus) && (
        <button
          onClick={shareLocation}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] py-3 text-sm font-medium text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="2" fill="currentColor" />
            <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Share Location
        </button>
      )}

      {locationMsg && (
        <p className="text-center text-xs text-zinc-500">{locationMsg}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
