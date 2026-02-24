"use client";

import { useState } from "react";

interface Slot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  spotsLeft: number;
}

interface Zone {
  prefix: string;
  zoneName: string;
}

interface PostcodeGateProps {
  onAvailable: (slots: Slot[], zone: Zone, postcode: string) => void;
}

export function PostcodeGate({ onAvailable }: PostcodeGateProps) {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outsideZone, setOutsideZone] = useState(false);

  async function handleCheck() {
    setError(null);
    setOutsideZone(false);

    const value = postcode.trim();
    if (!value) {
      setError("Please enter your postcode.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/availability/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postcode: value }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data.fields?.postcode?.[0] ?? data.error ?? "Something went wrong.";
        setError(msg);
        return;
      }

      if (!data.available && data.reason === "outside_zone") {
        setOutsideZone(true);
        return;
      }

      if (!data.available || data.slots.length === 0) {
        setError("No available appointments right now. Please call us instead.");
        return;
      }

      onAvailable(data.slots, data.zone, value);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center text-center gap-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-pp-navy mb-2">
          Book a Plumber
        </h2>
        <p className="text-pp-body">
          Enter your postcode to check availability in your area.
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && handleCheck()}
          placeholder="e.g. PE1 1AB"
          maxLength={10}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-center sm:text-left text-base font-medium uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-pp-teal"
          disabled={loading}
        />
        <button
          onClick={handleCheck}
          disabled={loading}
          className="rounded-lg bg-pp-teal px-6 py-3 text-white font-semibold hover:bg-pp-teal-dark transition-colors disabled:opacity-60"
        >
          {loading ? "Checking…" : "Check Availability"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 font-medium">{error}</p>
      )}

      {outsideZone && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 max-w-sm text-sm text-amber-800">
          <p className="font-semibold mb-1">We don&apos;t currently cover that area.</p>
          <p>
            Please call us on{" "}
            <a href="tel:01733123456" className="font-bold underline">
              01733 123 456
            </a>{" "}
            and we&apos;ll do our best to help.
          </p>
        </div>
      )}

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mt-2">
        {["Gas Safe Registered", "1-hr Response", "Fixed-Price Guarantee"].map((t) => (
          <span key={t} className="flex items-center gap-1">
            <span className="text-pp-teal font-bold">✓</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
