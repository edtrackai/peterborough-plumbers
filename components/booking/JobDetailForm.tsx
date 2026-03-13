"use client";

import { useState, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export interface JobDetailData {
  serviceCategory:     string;
  serviceItem:         string;
  repairOrReplace:     "repair" | "replace" | "unsure";
  description:         string;
  urgency:             string;
  customerSupplied:    boolean;
  suppliedPartNote?:   string;
  quoteTypePreference: "fixed" | "estimate" | "inspection_first";
  preferredContact:    "whatsapp" | "phone" | "either";
  accessDifficulty:    "easy" | "moderate" | "difficult";
  quoteRef?:           string;
}

interface ServiceCategory {
  id:              string;
  name:            string;
  slug:            string;
  icon:            string | null;
  requiresGasSafe: boolean;
}

interface ServiceItem {
  id:               string;
  name:             string;
  slug:             string;
  defaultQuoteType: string;
  hasQuantity:      boolean;
}

interface JobDetailFormProps {
  bookingRef:  string;
  onComplete:  (data: JobDetailData) => void;
  onBack:      () => void;
}

type FieldErrors = Record<string, string>;

// ── Helpers ────────────────────────────────────────────────────────────────

function inputClass(hasError?: boolean) {
  return [
    "w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pp-teal",
    hasError ? "border-red-400" : "border-gray-300",
  ].join(" ");
}

function RadioGroup<T extends string>({
  name,
  value,
  onChange,
  options,
}: {
  name:     string;
  value:    T;
  onChange: (v: T) => void;
  options:  { value: T; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
            value === opt.value
              ? "border-pp-teal bg-pp-teal/5 font-medium text-pp-navy"
              : "border-gray-200 bg-white text-pp-body hover:border-pp-teal/50"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="accent-pp-teal"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label:    string;
  required?: boolean;
  error?:   string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-pp-navy">
        {label}{required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ── JobDetailForm ──────────────────────────────────────────────────────────

export function JobDetailForm({ bookingRef, onComplete, onBack }: JobDetailFormProps) {
  // ── Remote data
  const [categories, setCategories]   = useState<ServiceCategory[]>([]);
  const [items, setItems]             = useState<ServiceItem[]>([]);
  const [catLoading, setCatLoading]   = useState(true);
  const [itemLoading, setItemLoading] = useState(false);
  const [fetchError, setFetchError]   = useState<string | null>(null);

  // ── Form state
  const [serviceCategory,     setServiceCategory]     = useState("");
  const [serviceItem,         setServiceItem]         = useState("");
  const [repairOrReplace,     setRepairOrReplace]     = useState<JobDetailData["repairOrReplace"]>("repair");
  const [description,         setDescription]         = useState("");
  const [urgency,             setUrgency]             = useState("");
  const [customerSupplied,    setCustomerSupplied]    = useState(false);
  const [suppliedPartNote,    setSuppliedPartNote]    = useState("");
  const [quoteTypePreference, setQuoteTypePreference] = useState<JobDetailData["quoteTypePreference"]>("fixed");
  const [preferredContact,    setPreferredContact]    = useState<JobDetailData["preferredContact"]>("either");
  const [accessDifficulty,    setAccessDifficulty]    = useState<JobDetailData["accessDifficulty"]>("easy");

  // ── Disclaimer
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  // ── Validation errors
  const [errors, setErrors]       = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Fetch categories on mount
  useEffect(() => {
    async function load() {
      try {
        const res  = await fetch("/api/service-categories");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to load categories");
        setCategories(data.categories ?? []);
      } catch (err) {
        setFetchError(err instanceof Error ? err.message : "Failed to load service categories");
      } finally {
        setCatLoading(false);
      }
    }
    load();
  }, []);

  // ── Fetch items when category changes
  useEffect(() => {
    if (!serviceCategory) {
      setItems([]);
      setServiceItem("");
      return;
    }

    async function load() {
      setItemLoading(true);
      setItems([]);
      setServiceItem("");
      try {
        const res  = await fetch(`/api/service-categories/${serviceCategory}/items`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to load items");
        setItems(data.items ?? []);
      } catch {
        // Non-fatal — items just won't populate
        setItems([]);
      } finally {
        setItemLoading(false);
      }
    }
    load();
  }, [serviceCategory]);

  // ── Validation
  function validate(): boolean {
    const errs: FieldErrors = {};

    if (!serviceCategory) errs.serviceCategory = "Please select a service category";
    if (!serviceItem)     errs.serviceItem      = "Please select a service item";
    if (description.trim().length < 20)
      errs.description = "Description must be at least 20 characters";
    if (description.trim().length > 500)
      errs.description = "Description must be 500 characters or fewer";
    if (!urgency) errs.urgency = "Please select an urgency level";
    if (!disclaimerAccepted)
      errs.disclaimer = "Please confirm you have read and accept the quotation notice";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // ── Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    const data: JobDetailData = {
      serviceCategory,
      serviceItem,
      repairOrReplace,
      description:         description.trim(),
      urgency,
      customerSupplied,
      suppliedPartNote:    customerSupplied ? suppliedPartNote.trim() : undefined,
      quoteTypePreference,
      preferredContact,
      accessDifficulty,
    };

    try {
      const res = await fetch(`/api/bookings/${bookingRef}/job-detail`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          serviceItemSlug:     serviceItem,
          repairOrReplace,
          description:         data.description,
          urgency,
          customerSupplied,
          suppliedPartNote:    data.suppliedPartNote,
          quoteTypePreference,
          accessDifficulty,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setSubmitError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      onComplete({ ...data, quoteRef: json.quoteRef ?? undefined });
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const err = (field: string) => errors[field];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-pp-navy">Job Details</h2>
        <p className="mt-1 text-sm text-pp-body">
          Tell us about the work you need so we can prepare an accurate quote.
        </p>
      </div>

      {/* Info banner */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 leading-relaxed">
        We&apos;ll review your job details and send a written quote to your WhatsApp. Your slot is
        held for 48 hours. No work begins until you&apos;ve approved the quote.
      </div>

      {fetchError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {fetchError}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

        {/* 1. Service Category */}
        <Field label="Service Category" required error={err("serviceCategory")}>
          {catLoading ? (
            <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
          ) : (
            <select
              value={serviceCategory}
              onChange={(e) => {
                setServiceCategory(e.target.value);
                setErrors((prev) => ({ ...prev, serviceCategory: "" }));
              }}
              className={inputClass(!!err("serviceCategory"))}
            >
              <option value="">Select a category…</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.icon ? `${cat.icon} ` : ""}{cat.name}
                  {cat.requiresGasSafe ? " (Gas Safe required)" : ""}
                </option>
              ))}
            </select>
          )}
        </Field>

        {/* 2. Service Item */}
        <Field label="Service Item" required error={err("serviceItem")}>
          {itemLoading ? (
            <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
          ) : (
            <select
              value={serviceItem}
              onChange={(e) => {
                setServiceItem(e.target.value);
                setErrors((prev) => ({ ...prev, serviceItem: "" }));
              }}
              disabled={!serviceCategory || items.length === 0}
              className={inputClass(!!err("serviceItem"))}
            >
              <option value="">
                {!serviceCategory
                  ? "Select a category first…"
                  : items.length === 0
                  ? "No items available"
                  : "Select a service item…"}
              </option>
              {items.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
        </Field>

        {/* 3. Repair or Replace */}
        <Field label="Repair or Replace?">
          <RadioGroup
            name="repairOrReplace"
            value={repairOrReplace}
            onChange={setRepairOrReplace}
            options={[
              { value: "repair",  label: "Repair existing" },
              { value: "replace", label: "Replace / install new" },
              { value: "unsure",  label: "Not sure" },
            ]}
          />
        </Field>

        {/* 4. Description */}
        <Field label="Job Description" required error={err("description")}>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
            placeholder="Describe the issue in as much detail as possible…"
            maxLength={500}
            className={`${inputClass(!!err("description"))} resize-none`}
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            {description.length}/500
          </p>
        </Field>

        {/* 5. Urgency */}
        <Field label="How urgently do you need this?" required error={err("urgency")}>
          <RadioGroup
            name="urgency"
            value={urgency as JobDetailData["urgency"]}
            onChange={(v) => {
              setUrgency(v);
              setErrors((prev) => ({ ...prev, urgency: "" }));
            }}
            options={[
              { value: "standard", label: "Standard (within a week)" },
              { value: "soon",     label: "Soon (2–3 days)" },
              { value: "urgent",   label: "Urgent (today/tomorrow)" },
            ]}
          />
        </Field>

        {/* 6 & 7. Customer-supplied part */}
        <div>
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 px-4 py-3 hover:border-pp-teal/50 transition-colors">
            <input
              type="checkbox"
              checked={customerSupplied}
              onChange={(e) => setCustomerSupplied(e.target.checked)}
              className="mt-0.5 accent-pp-teal"
            />
            <span className="text-sm text-pp-body">
              I already have the part / materials
            </span>
          </label>

          {customerSupplied && (
            <div className="mt-3">
              <label className="mb-1.5 block text-sm font-semibold text-pp-navy">
                Describe the part you have
              </label>
              <input
                type="text"
                value={suppliedPartNote}
                onChange={(e) => setSuppliedPartNote(e.target.value)}
                placeholder="e.g. Grohe Eurosmart tap cartridge, 35mm"
                className={inputClass()}
              />
            </div>
          )}
        </div>

        {/* 8. Quote preference */}
        <Field label="Quote Preference">
          <RadioGroup
            name="quoteTypePreference"
            value={quoteTypePreference}
            onChange={setQuoteTypePreference}
            options={[
              { value: "fixed",            label: "Fixed quote" },
              { value: "estimate",         label: "Rough estimate" },
              { value: "inspection_first", label: "Inspection first (free)" },
            ]}
          />
        </Field>

        {/* 9. Preferred contact */}
        <Field label="Preferred Contact Method">
          <RadioGroup
            name="preferredContact"
            value={preferredContact}
            onChange={setPreferredContact}
            options={[
              { value: "whatsapp", label: "WhatsApp" },
              { value: "phone",    label: "Phone" },
              { value: "either",   label: "Either" },
            ]}
          />
        </Field>

        {/* 10. Access difficulty */}
        <Field label="Access to the Job">
          <select
            value={accessDifficulty}
            onChange={(e) =>
              setAccessDifficulty(e.target.value as JobDetailData["accessDifficulty"])
            }
            className={inputClass()}
          >
            <option value="easy">Easy (clear access)</option>
            <option value="moderate">Moderate (some restriction)</option>
            <option value="difficult">Difficult (limited access)</option>
          </select>
        </Field>

        {/* ── Disclaimer ──────────────────────────────────────────────── */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 leading-relaxed">
          <p className="font-bold mb-1">⚠️ Important Notice — Please Read</p>
          <p>
            This quotation is an estimate based on the information, photos, or description you have provided.
            It is <strong>not a fixed final price</strong>. Final charges may change after on-site inspection
            if the actual issue, fittings, quantity, access, or materials required differ from what was described.
          </p>
        </div>

        <div>
          <label className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors ${
            errors.disclaimer ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-pp-teal/50"
          }`}>
            <input
              type="checkbox"
              checked={disclaimerAccepted}
              onChange={(e) => {
                setDisclaimerAccepted(e.target.checked);
                if (e.target.checked) setErrors((prev) => ({ ...prev, disclaimer: "" }));
              }}
              className="mt-0.5 accent-pp-teal"
            />
            <span className="text-sm text-pp-body">
              I understand this is an estimate and the final price may change following on-site inspection.
            </span>
          </label>
          {errors.disclaimer && (
            <p className="mt-1 text-xs text-red-600">{errors.disclaimer}</p>
          )}
        </div>
        {/* ── End disclaimer ──────────────────────────────────────────── */}

        {/* Submit error */}
        {submitError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-3 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-pp-teal py-4 text-base font-bold text-white transition-colors hover:bg-pp-teal-dark disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Request Quote →"}
          </button>
          <button
            type="button"
            onClick={onBack}
            disabled={submitting}
            className="w-full rounded-xl border border-gray-300 py-3 text-sm font-medium text-pp-body transition-colors hover:border-gray-400 disabled:opacity-60"
          >
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
}
