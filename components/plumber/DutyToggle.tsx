"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DutyToggleProps {
  isOnDuty: boolean;
}

export function DutyToggle({ isOnDuty: initial }: DutyToggleProps) {
  const [isOnDuty, setIsOnDuty] = useState(initial);
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch("/api/plumber/toggle-duty", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setIsOnDuty(data.isOnDuty);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      role="switch"
      aria-checked={isOnDuty}
      onClick={toggle}
      disabled={loading}
      className="w-full flex items-center justify-between rounded-xl bg-[#1A1A1A] border border-white/[0.07] px-4 py-3.5 transition-all hover:border-white/[0.13] disabled:opacity-50"
    >
      <div className="flex items-center gap-3">
        <span className={`h-2 w-2 rounded-full transition-colors ${isOnDuty ? "bg-green-400" : "bg-zinc-700"}`} />
        <div className="text-left">
          <p className="text-sm font-semibold text-white">
            {loading ? "Updating…" : isOnDuty ? "On Duty" : "Off Duty"}
          </p>
          <p className="text-xs text-zinc-600">
            {isOnDuty ? "Receiving new job requests" : "Not receiving new requests"}
          </p>
        </div>
      </div>

      {/* Toggle pill */}
      <div className={`relative h-6 w-11 rounded-full overflow-hidden transition-colors duration-200 ${isOnDuty ? "bg-green-500" : "bg-zinc-700"}`}>
        <span
          className={`absolute top-0.5 left-0 h-5 w-5 rounded-full bg-white transition-all duration-200 ${
            isOnDuty ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );
}
