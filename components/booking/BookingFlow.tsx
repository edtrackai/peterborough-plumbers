"use client";

import { useState, useRef, useEffect } from "react";
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
  | { name: "done"; bookingRef: string; quoteRef?: string };

type StepName = Step["name"];

const STEP_ORDER: StepName[] = ["postcode", "slots", "details", "job-detail", "done"];

interface StepCache {
  postcode?: string;
  slots?: Slot[];
  zone?: Zone;
}

// ── History helpers ───────────────────────────────────────────────────────
//
// We push/replace history entries with the SAME URL (no URL change) and store
// the booking step in the history state object.
//
// Why no URL change?
//   Next.js App Router intercepts history.pushState calls that include a URL
//   and may convert same-route navigations into replaces (no new history entry).
//   Without a URL argument, pushState is guaranteed to create a genuine new
//   entry without any router interception, because there is no route change.
//
// popstate reads e.state.bookingStep instead of window.location.search.

type HistoryState = { bookingStep: StepName };

function pushStep(name: StepName) {
  // Push with current URL (no URL change) — creates a real navigable entry.
  history.pushState({ bookingStep: name } satisfies HistoryState, "");
}

function replaceStep(name: StepName) {
  history.replaceState({ bookingStep: name } satisfies HistoryState, "");
}

// ── BookingFlow ───────────────────────────────────────────────────────────

export function BookingFlow() {
  const [step, setStep] = useState<Step>({ name: "postcode" });
  const [reserving, setReserving] = useState(false);
  const [reserveError, setReserveError] = useState<string | null>(null);

  // stepRef mirrors step so the popstate closure is never stale.
  const stepRef = useRef<Step>({ name: "postcode" });

  // Slot data persisted so the slots screen can be restored on browser back.
  const cache = useRef<StepCache>({});

  function go(newStep: Step) {
    stepRef.current = newStep;
    setStep(newStep);
  }

  // ── popstate listener (mounted once) ─────────────────────────────────
  useEffect(() => {
    // Tag the current history entry so we can detect a back into it.
    replaceStep("postcode");

    function onPopState(e: PopStateEvent) {
      const state = e.state as HistoryState | null;
      const targetName: StepName = state?.bookingStep ?? "postcode";

      const cur = stepRef.current;
      const targetIdx = STEP_ORDER.indexOf(targetName);
      const curIdx   = STEP_ORDER.indexOf(cur.name);

      // Forward navigation — ignore (user pressed forward after going back).
      if (targetIdx >= curIdx) return;

      // Backward navigation: reconstruct the target step from cache.
      if (targetName === "postcode") {
        go({ name: "postcode" });
      } else if (
        targetName === "slots" &&
        cache.current.slots &&
        cache.current.zone &&
        cache.current.postcode
      ) {
        go({
          name: "slots",
          slots: cache.current.slots,
          zone: cache.current.zone,
          postcode: cache.current.postcode,
        });
      } else {
        // Stale cache (e.g. refreshed mid-flow) — restart.
        replaceStep("postcode");
        go({ name: "postcode" });
      }
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Step 1 → 2 ────────────────────────────────────────────────────────
  function handleAvailable(slots: Slot[], zone: Zone, postcode: string) {
    cache.current = { postcode, slots, zone };
    pushStep("slots");   // real history entry, no URL change, no Next.js interception
    go({ name: "slots", slots, zone, postcode });
  }

  // ── Step 2 → 3 ────────────────────────────────────────────────────────
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
        setReserveError(
          res.status === 409
            ? "That slot was just taken. Please choose another."
            : (data.error ?? "Could not reserve slot.")
        );
        return;
      }

      pushStep("details");   // real history entry
      go({
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

  // ── Step 3 → 4 ────────────────────────────────────────────────────────
  function handleConfirmed(ref: string) {
    if (step.name === "details") {
      // replace not push: booking is already confirmed, back should skip details.
      replaceStep("job-detail");
      go({
        name: "job-detail",
        slot: step.slot,
        bookingRef: ref,
        expiresAt: step.expiresAt,
        postcode: step.postcode,
        zone: step.zone,
      });
    } else {
      go({ name: "done", bookingRef: ref });
    }
  }

  // ── Step 4 → done ─────────────────────────────────────────────────────
  function handleJobDetailComplete(data: JobDetailData) {
    if (step.name === "job-detail") {
      go({ name: "done", bookingRef: step.bookingRef, quoteRef: data.quoteRef });
    }
  }

  // ── Timer expired ─────────────────────────────────────────────────────
  function handleExpired() {
    replaceStep("postcode");
    go({ name: "postcode" });
  }

  // ── In-page ← Back button ─────────────────────────────────────────────
  function handleBack() {
    if (
      step.name === "slots" ||
      step.name === "details" ||
      step.name === "job-detail"
    ) {
      // history.back() pops the browser history and fires popstate,
      // which the onPopState handler uses to reconstruct the prior step.
      // This keeps the in-page button and the browser back button identical.
      history.back();
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
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
        <ConfirmationBanner bookingRef={step.bookingRef} quoteRef={step.quoteRef} />
      )}
    </div>
  );
}

// ── Inline confirmation banner ────────────────────────────────────────────

function ConfirmationBanner({ bookingRef, quoteRef }: { bookingRef: string; quoteRef?: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-10">
      {/* Tick */}
      <div className="h-16 w-16 rounded-full bg-pp-teal/10 flex items-center justify-center">
        <svg className="h-8 w-8 text-pp-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-pp-navy mb-2">Quote Request Sent!</h2>
        <p className="text-pp-body text-sm">
          Booking ref: <span className="font-mono font-bold text-pp-navy">{bookingRef}</span>
        </p>
      </div>

      {/* Quote details */}
      {quoteRef && (
        <div className="w-full max-w-sm rounded-xl border border-pp-teal/30 bg-pp-teal/5 px-6 py-4 text-sm">
          <p className="text-pp-body mb-1">
            Quote reference: <span className="font-mono font-bold text-pp-teal">{quoteRef}</span>
          </p>
          <p className="text-gray-500 text-xs leading-relaxed">
            Your written quote has been sent to your WhatsApp number.
          </p>
        </div>
      )}

      {/* WhatsApp instructions */}
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-gray-50 px-6 py-4 text-sm text-left space-y-2">
        <p className="font-semibold text-pp-navy text-sm mb-2">What happens next:</p>
        <p className="text-gray-600 text-xs flex items-start gap-2">
          <span className="text-pp-teal font-bold shrink-0">1.</span>
          Check your WhatsApp — your quote is waiting for you.
        </p>
        <p className="text-gray-600 text-xs flex items-start gap-2">
          <span className="text-pp-teal font-bold shrink-0">2.</span>
          Reply <strong>YES</strong> to approve and confirm your appointment.
        </p>
        <p className="text-gray-600 text-xs flex items-start gap-2">
          <span className="text-pp-teal font-bold shrink-0">3.</span>
          Reply <strong>NO</strong> to decline, or <strong>DISCUSS</strong> to talk it through.
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
