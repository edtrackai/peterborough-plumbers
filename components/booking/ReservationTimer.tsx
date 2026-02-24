"use client";

import { useEffect, useState } from "react";

interface ReservationTimerProps {
  expiresAt: string; // ISO string
  onExpired: () => void;
}

export function ReservationTimer({ expiresAt, onExpired }: ReservationTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000))
  );

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpired();
      return;
    }

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [expiresAt, onExpired, secondsLeft]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const isUrgent = secondsLeft < 120; // < 2 minutes

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
        isUrgent
          ? "bg-red-100 text-red-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
      Slot reserved for {mins}:{String(secs).padStart(2, "0")}
    </div>
  );
}
