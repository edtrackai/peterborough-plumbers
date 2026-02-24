"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DutyToggleProps {
  isOnDuty: boolean;
}

export function DutyToggle({ isOnDuty: initial }: DutyToggleProps) {
  const [isOnDuty, setIsOnDuty] = useState(initial);
  const [loading, setLoading] = useState(false);
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
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-3 rounded-xl px-5 py-3.5 font-semibold text-sm transition-all disabled:opacity-60 ${
        isOnDuty
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-gray-100 text-gray-600 border border-gray-200"
      }`}
    >
      <span className={`h-3 w-3 rounded-full ${isOnDuty ? "bg-green-500" : "bg-gray-400"}`} />
      {loading ? "Updating…" : isOnDuty ? "On Duty" : "Off Duty"}
      <span className="ml-1 text-xs font-normal opacity-60">(tap to toggle)</span>
    </button>
  );
}
