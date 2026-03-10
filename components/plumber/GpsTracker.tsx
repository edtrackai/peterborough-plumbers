"use client";

import { useState, useEffect, useRef } from "react";

interface GpsTrackerProps {
  /** bookingId of the currently active job, or null if none */
  activeBookingId: string | null;
}

export function GpsTracker({ activeBookingId }: GpsTrackerProps) {
  const [gpsActive, setGpsActive]   = useState(false);
  const [gpsMsg, setGpsMsg]         = useState<string | null>(null);
  const watchIdRef                  = useRef<number | null>(null);

  async function pushPosition(pos: GeolocationPosition) {
    if (!activeBookingId) return;
    try {
      const res = await fetch(`/api/plumber/bookings/${activeBookingId}/location`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          lat:      pos.coords.latitude,
          lng:      pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      });
      if (res.ok) {
        const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        setGpsMsg(`Updated ${time}`);
      } else if (res.status === 401) {
        setGpsMsg("Session expired — please log in again");
        doStop();
      } else {
        const d = await res.json().catch(() => ({}));
        setGpsMsg(d.error ?? "Update failed");
      }
    } catch {
      setGpsMsg("Network error — retrying…");
    }
  }

  function onGpsError(err: GeolocationPositionError) {
    if (err.code === err.PERMISSION_DENIED) {
      setGpsMsg("Permission denied — enable location in browser settings");
      doStop();
    } else if (err.code === err.POSITION_UNAVAILABLE) {
      setGpsMsg("GPS signal unavailable — retrying…");
    } else {
      setGpsMsg("GPS timeout — retrying…");
    }
  }

  function doStop() {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setGpsActive(false);
    setGpsMsg(null);
  }

  function doStart() {
    if (!navigator.geolocation) {
      setGpsMsg("Geolocation not supported on this device");
      return;
    }
    setGpsActive(true);
    setGpsMsg("Acquiring GPS…");
    watchIdRef.current = navigator.geolocation.watchPosition(
      pushPosition,
      onGpsError,
      { enableHighAccuracy: true, maximumAge: 15_000, timeout: 15_000 },
    );
  }

  // Auto-stop if active booking disappears (job completed, page refresh)
  useEffect(() => {
    if (!activeBookingId && gpsActive) doStop();
  }, [activeBookingId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const noJob = !activeBookingId;

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={gpsActive ? doStop : doStart}
        disabled={noJob}
        className={`w-full flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all ${
          noJob
            ? "border-white/[0.05] opacity-40 cursor-not-allowed"
            : gpsActive
            ? "border-green-500/30 bg-green-500/10 hover:bg-green-500/15"
            : "border-white/[0.07] bg-[#1A1A1A] hover:border-white/[0.14]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`h-2 w-2 rounded-full transition-colors ${
              gpsActive ? "bg-green-400 animate-pulse" : noJob ? "bg-zinc-700" : "bg-zinc-600"
            }`}
          />
          <div className="text-left">
            <p className={`text-sm font-semibold ${gpsActive ? "text-green-400" : "text-white"}`}>
              {gpsActive ? "GPS Tracking Active" : "Start GPS Tracking"}
            </p>
            <p className="text-xs text-zinc-600 mt-0.5">
              {noJob
                ? "No active job — GPS unavailable"
                : gpsActive
                ? (gpsMsg ?? "Sending live location…")
                : "Share your location for active job"}
            </p>
          </div>
        </div>

        {/* Toggle pill */}
        <div
          className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
            gpsActive ? "bg-green-500" : "bg-zinc-700"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
              gpsActive ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </div>
      </button>

      {/* Status message shown outside button when tracking is active */}
      {gpsActive && gpsMsg && (
        <p className="text-center text-[11px] text-zinc-600">{gpsMsg}</p>
      )}
    </div>
  );
}
