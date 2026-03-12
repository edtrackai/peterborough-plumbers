"use client";

import { useState } from "react";
import { PostcodeGate } from "./PostcodeGate";
import { SlotPicker } from "./SlotPicker";
import { BookingDetailsForm } from "./BookingDetailsForm";
import { JobDetailForm, type JobDetailData } from "./JobDetailForm";

// ── Types ─────────────────────────────────────────────────────────────────

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

type Step =
  | { name: "postcode" }
  | { name: "slots"; slots: Slot[]; zone: Zone; postcode: string }
  | { name: "details"; slot: Slot; bookingRef: string; expiresAt: string; postcode: string; zone: Zone }
  | { name: "job-detail"; slot: Slot; bookingRef: string; expiresAt: string; postcode: string; zone: Zone }
  | { name: "done"; bookingRef: string };

// ── BookingFlow ───────────────────────────────────────────────────────────

export function BookingFlow() {
  const [step, setStep] = useState<Step>({ name: "postcode" });
  const [reserving, setReserving] = useState(false);
  const [reserveError, setReserveError] = useState<string | null>(null);

  // Step 1 → 2: postcode checked, zones + slots returned
  function handleAvailable(slots: Slot[], zone: Zone, postcode: string) {
    setStep({ name: "slots", slots, zone, postcode });
  }

  // Step 2 → 3: slot selected, reserve it
  async function handleSlotSelect(slot: Slot) {
    if (step.name !== "slots") return;
    setReserving(true);
    setReserveError(null);

    try {
      const res = await fetch("/api/slots/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId: slot.id,
          postcode: step.postcode,
          zonePrefix: step.zone.prefix,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setReserveError("That slot was just taken. Please choose another.");
        } else {
          setReserveError(data.error ?? "Could not reserve slot.");
        }
        return;
      }

      setStep({
        name: "details",
        slot,
        bookingRef: data.bookingRef,
        expiresAt: data.expiresAt,
        postcode: step.postcode,
        zone: step.zone,
      });
    } catch {
      setReserveError("Network error. Please try again.");
    } finally {
      setReserving(false);
    }
  }

  // Step 3 → 4 (job detail): basic details confirmed
  function handleConfirmed(ref: string) {
    if (step.name === "details") {
      setStep({
        name: "job-detail",
        slot: step.slot,
        bookingRef: ref,
        expiresAt: step.expiresAt,
        postcode: step.postcode,
        zone: step.zone,
      });
    } else {
      setStep({ name: "done", bookingRef: ref });
    }
  }

  // Step 4 → done: job detail submitted
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleJobDetailComplete(_data: JobDetailData) {
    if (step.name === "job-detail") {
      setStep({ name: "done", bookingRef: step.bookingRef });
    }
  }

  // Expired timer: back to start
  function handleExpired() {
    setStep({ name: "postcode" });
  }

  function handleBack() {
    if (step.name === "slots") {
      setStep({ name: "postcode" });
    } else if (step.name === "details") {
      setStep({ name: "postcode" });
    } else if (step.name === "job-detail") {
      // Can't go back to details (slot reserved) — just go to postcode
      setStep({ name: "postcode" });
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Step back button */}
      {(step.name === "slots" || step.name === "details" || step.name === "job-detail") && (
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-1 text-sm text-pp-teal font-medium hover:underline"
        >
          ← Back
        </button>
      )}

      {step.name === "postcode" && (
        <PostcodeGate onAvailable={handleAvailable} />
      )}

      {step.name === "slots" && (
        <>
          <SlotPicker
            slots={step.slots}
            zone={step.zone}
            postcode={step.postcode}
            onSelect={handleSlotSelect}
          />
          {reserving && (
            <p className="mt-4 text-center text-sm text-gray-400 animate-pulse">
              Reserving your slot…
            </p>
          )}
          {reserveError && (
            <p className="mt-4 text-center text-sm text-red-600 font-medium">
              {reserveError}
            </p>
          )}
        </>
      )}

      {step.name === "details" && (
        <BookingDetailsForm
          bookingRef={step.bookingRef}
          expiresAt={step.expiresAt}
          slot={step.slot}
          postcode={step.postcode}
          onConfirmed={handleConfirmed}
          onExpired={handleExpired}
        />
      )}

      {step.name === "job-detail" && (
        <JobDetailForm
          bookingRef={step.bookingRef}
          onComplete={handleJobDetailComplete}
          onBack={handleBack}
        />
      )}

      {step.name === "done" && (
        <ConfirmationBanner bookingRef={step.bookingRef} />
      )}
    </div>
  );
}

// ── Inline confirmation banner ────────────────────────────────────────────

function ConfirmationBanner({ bookingRef }: { bookingRef: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-10">
      <div className="h-16 w-16 rounded-full bg-pp-teal/10 flex items-center justify-center">
        <svg
          className="h-8 w-8 text-pp-teal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-pp-navy mb-2">Booking Confirmed!</h2>
        <p className="text-pp-body">
          Your reference number is{" "}
          <span className="font-mono font-bold text-pp-teal">{bookingRef}</span>.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Your quote has been sent to your WhatsApp. Reply <strong>YES</strong> to approve or <strong>NO</strong> to decline.
        </p>
      </div>
      <a
        href={`/booking/${bookingRef}`}
        className="rounded-xl bg-pp-teal px-8 py-3 text-white font-semibold hover:bg-pp-teal-dark transition-colors"
      >
        View Booking Details
      </a>
    </div>
  );
}
