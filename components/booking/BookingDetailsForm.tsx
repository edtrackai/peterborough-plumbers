"use client";

import { useState } from "react";
import { ReservationTimer } from "./ReservationTimer";

const SERVICE_TYPES = [
  { id: "emergency", label: "Emergency" },
  { id: "boiler", label: "Boiler / Heating" },
  { id: "leak", label: "Leak / Pipe" },
  { id: "drain", label: "Blocked Drain" },
  { id: "bathroom", label: "Bathroom Fit" },
  { id: "other", label: "Other" },
];

interface BookingDetailsFormProps {
  bookingRef: string;
  expiresAt: string;
  slot: { date: string; startTime: string; endTime: string };
  postcode: string;
  onConfirmed: (ref: string) => void;
  onExpired: () => void;
}

type FieldErrors = Record<string, string[]>;

function formatSlotDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

export function BookingDetailsForm({
  bookingRef,
  expiresAt,
  slot,
  postcode,
  onConfirmed,
  onExpired,
}: BookingDetailsFormProps) {
  const [serviceType, setServiceType] = useState("");
  const [form, setForm] = useState({
    description: "",
    customerName: "",
    phone: "",
    email: "",
    address: "",
    accessNotes: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: [] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGlobalError(null);

    if (!serviceType) {
      setFieldErrors((prev) => ({ ...prev, serviceType: ["Please select a service type"] }));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingRef, serviceType, ...form }),
      });

      const data = await res.json();

      if (res.status === 410) {
        onExpired();
        return;
      }

      if (!res.ok) {
        if (data.fields) {
          setFieldErrors(data.fields);
        } else {
          setGlobalError(data.error ?? "Something went wrong.");
        }
        return;
      }

      onConfirmed(data.bookingRef);
    } catch {
      setGlobalError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const err = (field: string) => fieldErrors[field]?.[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-pp-navy">Your Details</h2>
          <p className="text-sm text-pp-body mt-1">
            {formatSlotDate(slot.date)}, {slot.startTime}–{slot.endTime} · {postcode}
          </p>
        </div>
        <ReservationTimer expiresAt={expiresAt} onExpired={onExpired} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Service type */}
        <div>
          <label className="block text-sm font-semibold text-pp-navy mb-2">
            Service Type <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {SERVICE_TYPES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setServiceType(s.id);
                  setFieldErrors((prev) => ({ ...prev, serviceType: [] }));
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                  serviceType === s.id
                    ? "bg-pp-teal text-white border-pp-teal"
                    : "bg-white text-pp-navy border-gray-300 hover:border-pp-teal"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          {err("serviceType") && (
            <p className="mt-1 text-xs text-red-600">{err("serviceType")}</p>
          )}
        </div>

        {/* Description */}
        <Field
          label="Describe the problem"
          error={err("description")}
        >
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="e.g. Dripping tap in kitchen, no hot water…"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pp-teal resize-none"
          />
        </Field>

        {/* Name + Phone */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name" required error={err("customerName")}>
            <TextInput
              value={form.customerName}
              onChange={(v) => set("customerName", v)}
              placeholder="Jane Smith"
            />
          </Field>
          <Field label="Phone" required error={err("phone")}>
            <TextInput
              value={form.phone}
              onChange={(v) => set("phone", v)}
              placeholder="07700 900123"
              type="tel"
            />
          </Field>
        </div>

        {/* Email */}
        <Field label="Email" required error={err("email")}>
          <TextInput
            value={form.email}
            onChange={(v) => set("email", v)}
            placeholder="jane@example.com"
            type="email"
          />
        </Field>

        {/* Address */}
        <Field label="Full address" required error={err("address")}>
          <TextInput
            value={form.address}
            onChange={(v) => set("address", v)}
            placeholder="12 High Street, Peterborough, PE1 1AB"
          />
        </Field>

        {/* Access notes */}
        <Field label="Access notes (optional)" error={err("accessNotes")}>
          <TextInput
            value={form.accessNotes}
            onChange={(v) => set("accessNotes", v)}
            placeholder="Side gate, ring doorbell twice…"
          />
        </Field>

        {globalError && (
          <p className="text-sm text-red-600 font-medium">{globalError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-pp-teal py-4 text-white font-bold text-base hover:bg-pp-teal-dark transition-colors disabled:opacity-60 mt-1"
        >
          {loading ? "Confirming…" : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

// ── Small helper sub-components ───────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-pp-navy mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pp-teal"
    />
  );
}
