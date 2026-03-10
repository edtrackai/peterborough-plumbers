"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const TRANSITIONS: Record<string, { status: string; label: string; cls: string }[]> = {
  accepted:    [{ status: "en_route",    label: "Start Trip",     cls: "bg-blue-600 hover:bg-blue-500"    }],
  en_route:    [{ status: "arrived",     label: "Mark Arrived",   cls: "bg-indigo-600 hover:bg-indigo-500" }],
  arrived:     [{ status: "in_progress", label: "Start Work",     cls: "bg-orange-500 hover:bg-orange-400" }],
  in_progress: [{ status: "completed",   label: "Mark Complete",  cls: "bg-green-600 hover:bg-green-500"   }],
};

const GPS_STATUSES = ["en_route", "arrived", "in_progress"];

interface StatusButtonsProps {
  bookingId:     string;
  currentStatus: string;
}

export function StatusButtons({ bookingId, currentStatus }: StatusButtonsProps) {
  const router = useRouter();
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [notes, setNotes]         = useState("");
  const [gpsActive, setGpsActive] = useState(false);
  const [gpsMsg, setGpsMsg]       = useState<string | null>(null);
  // watchPosition ID — number on browsers, NodeJS.Timeout shim avoided by using number
  const watchIdRef = useRef<number | null>(null);

  const actions     = TRANSITIONS[currentStatus] ?? [];
  const supportsGps = GPS_STATUSES.includes(currentStatus);

  // Push a single position reading to the API
  async function pushPosition(pos: GeolocationPosition) {
    try {
      const res = await fetch(`/api/plumber/bookings/${bookingId}/location`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          lat:      pos.coords.latitude,
          lng:      pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      });
      if (res.ok) {
        setGpsMsg(`Location updated · ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`);
      } else if (res.status === 401) {
        setGpsMsg("Session expired — please log in again");
        doStopTracking();
      } else {
        const d = await res.json().catch(() => ({}));
        setGpsMsg(d.error ?? "Location update failed");
      }
    } catch {
      setGpsMsg("Network error — retrying next update");
    }
  }

  function onGpsError(err: GeolocationPositionError) {
    if (err.code === err.PERMISSION_DENIED) {
      setGpsMsg("Location permission denied — enable it in browser settings");
    } else if (err.code === err.POSITION_UNAVAILABLE) {
      setGpsMsg("GPS signal unavailable — retrying…");
    } else {
      setGpsMsg("GPS timeout — retrying…");
    }
  }

  function doStopTracking() {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setGpsActive(false);
    setGpsMsg(null);
  }

  function startTracking() {
    if (!navigator.geolocation) {
      setGpsMsg("Geolocation is not supported on this device.");
      return;
    }
    setGpsActive(true);
    setGpsMsg("Acquiring GPS…");
    // watchPosition continuously monitors position — no manual interval needed
    watchIdRef.current = navigator.geolocation.watchPosition(
      pushPosition,
      onGpsError,
      { enableHighAccuracy: true, maximumAge: 15_000, timeout: 15_000 }
    );
  }

  // Clean up watch on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

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
      doStopTracking();
      setNotes("");
      router.refresh();
    } finally {
      setLoading(false);
    }
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

      {/* GPS auto-tracking toggle */}
      {supportsGps && (
        <button
          onClick={gpsActive ? doStopTracking : startTracking}
          className={`w-full flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-colors ${
            gpsActive
              ? "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/15"
              : "border-white/[0.08] text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${gpsActive ? "bg-green-400 animate-pulse" : "bg-zinc-600"}`} />
          {gpsActive ? "Tracking active — tap to stop" : "Start GPS tracking"}
        </button>
      )}

      {gpsMsg && (
        <p className="text-center text-xs text-zinc-500">{gpsMsg}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
