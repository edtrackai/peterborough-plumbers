"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TRANSITIONS: Record<string, { status: string; label: string; color: string }[]> = {
  accepted:    [{ status: "en_route",    label: "🚗 Start Trip",      color: "bg-blue-600 hover:bg-blue-700" }],
  en_route:    [{ status: "arrived",     label: "📍 Arrived",         color: "bg-indigo-600 hover:bg-indigo-700" }],
  arrived:     [{ status: "in_progress", label: "🔧 Work Started",    color: "bg-orange-500 hover:bg-orange-600" }],
  in_progress: [{ status: "completed",   label: "🏁 Work Completed",  color: "bg-green-600 hover:bg-green-700" }],
};

interface StatusButtonsProps {
  bookingId: string;
  currentStatus: string;
}

export function StatusButtons({ bookingId, currentStatus }: StatusButtonsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [locationMsg, setLocationMsg] = useState<string | null>(null);

  const actions = TRANSITIONS[currentStatus] ?? [];

  async function handleStatus(newStatus: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/plumber/bookings/${bookingId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, notes: notes.trim() || undefined }),
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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          }),
        });
        setLocationMsg(res.ok ? "✓ Location shared" : "Failed to share location");
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
      {/* Notes field */}
      <textarea
        rows={2}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Optional note (visible in timeline)…"
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pp-teal resize-none"
      />

      {/* Status action buttons */}
      {actions.map((a) => (
        <button
          key={a.status}
          disabled={loading}
          onClick={() => handleStatus(a.status)}
          className={`w-full rounded-xl py-3.5 text-sm font-bold text-white transition-colors disabled:opacity-60 ${a.color}`}
        >
          {loading ? "Updating…" : a.label}
        </button>
      ))}

      {/* Location ping */}
      {["en_route", "arrived", "in_progress"].includes(currentStatus) && (
        <button
          onClick={shareLocation}
          className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          📡 Share Location Now
        </button>
      )}

      {locationMsg && <p className="text-xs text-gray-500 text-center">{locationMsg}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
