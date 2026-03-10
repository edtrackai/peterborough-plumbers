"use client";

import { useState, useRef } from "react";
import { ReservationTimer } from "./ReservationTimer";

const SERVICE_TYPES = [
  { id: "emergency", label: "Emergency" },
  { id: "boiler", label: "Boiler / Heating" },
  { id: "leak", label: "Leak / Pipe" },
  { id: "drain", label: "Blocked Drain" },
  { id: "bathroom", label: "Bathroom Fit" },
  { id: "other", label: "Other" },
];

const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

interface BookingDetailsFormProps {
  bookingRef: string;
  expiresAt: string;
  slot: { date: string; startTime: string; endTime: string };
  postcode: string;
  onConfirmed: (ref: string) => void;
  onExpired: () => void;
}

type FieldErrors = Record<string, string[]>;

interface FilePreview {
  file: File;
  previewUrl: string;
}

function formatSlotDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

  // Photo upload state
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: [] }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhotoError(null);
    const selected = Array.from(e.target.files ?? []);
    // Reset the triggering input immediately so the same file can be re-selected
    e.target.value = "";

    if (!selected.length) return;

    // Check total count
    if (filePreviews.length + selected.length > MAX_FILES) {
      setPhotoError(
        `Maximum ${MAX_FILES} photos allowed. You already have ${filePreviews.length}.`
      );
      return;
    }

    // Validate each file
    for (const file of selected) {
      if (!file.type.startsWith("image/")) {
        setPhotoError(`"${file.name}" is not an image file.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setPhotoError(`"${file.name}" exceeds the 5 MB limit.`);
        return;
      }
    }

    const newPreviews: FilePreview[] = selected.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFilePreviews((prev) => [...prev, ...newPreviews]);
  }

  function removeFile(index: number) {
    setFilePreviews((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].previewUrl);
      updated.splice(index, 1);
      return updated;
    });
    setPhotoError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGlobalError(null);
    setPhotoError(null);

    if (!serviceType) {
      setFieldErrors((prev) => ({
        ...prev,
        serviceType: ["Please select a service type"],
      }));
      return;
    }

    setLoading(true);
    try {
      // ── Step 1: Upload photos if any ──────────────────────────────────────
      let photoUrls: string[] = [];
      let photoPublicIds: string[] = [];

      if (filePreviews.length > 0) {
        const formData = new FormData();
        formData.append("bookingRef", bookingRef);
        for (const fp of filePreviews) {
          formData.append("files", fp.file);
        }

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const uploadData = await uploadRes.json();
          const uploadErrMsg = uploadData.error ?? "Photo upload failed.";

          // Ask user whether to proceed without photos
          const proceed = window.confirm(
            `${uploadErrMsg}\n\nDo you want to confirm the booking without photos?`
          );
          if (!proceed) {
            setPhotoError(uploadErrMsg);
            return;
          }
          // User chose to proceed without photos — leave arrays empty
        } else {
          const uploadData = await uploadRes.json();
          photoUrls = uploadData.uploads.map((u: { url: string }) => u.url);
          photoPublicIds = uploadData.uploads.map(
            (u: { publicId: string }) => u.publicId
          );
        }
      }

      // ── Step 2: Confirm booking ───────────────────────────────────────────
      const res = await fetch("/api/bookings/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingRef,
          serviceType,
          ...form,
          ...(photoUrls.length > 0 && { photoUrls, photoPublicIds }),
        }),
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
  const canAddMore = filePreviews.length < MAX_FILES;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-pp-navy">Your Details</h2>
          <p className="text-sm text-pp-body mt-1">
            {formatSlotDate(slot.date)}, {slot.startTime}–{slot.endTime} ·{" "}
            {postcode}
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
        <Field label="Describe the problem" error={err("description")}>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="e.g. Dripping tap in kitchen, no hot water…"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pp-teal resize-none"
          />
        </Field>

        {/* ── Photo upload ──────────────────────────────────────────────── */}
        <div>
          <label className="block text-sm font-semibold text-pp-navy mb-1">
            Upload picture{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">
            A photo of the issue (leak, boiler error code, blockage) helps us
            diagnose faster. Up to {MAX_FILES} images · max 5 MB each.
          </p>

          {/* Thumbnails */}
          {filePreviews.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {filePreviews.map((fp, i) => (
                <div key={i} className="relative group flex flex-col items-center gap-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fp.previewUrl}
                    alt={`Preview ${i + 1}`}
                    className="h-20 w-20 rounded-lg object-cover border border-gray-200 shadow-sm"
                  />
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold leading-none shadow hover:bg-red-600 transition-colors"
                    aria-label="Remove photo"
                  >
                    ×
                  </button>
                  {/* File size */}
                  <span className="text-[10px] text-gray-400 leading-none">
                    {formatFileSize(fp.file.size)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons — hidden when max reached */}
          {canAddMore && (
            <div className="flex flex-wrap gap-2">
              {/* Take Photo (camera) */}
              <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-pp-teal bg-white px-4 py-2.5 text-sm font-medium text-pp-teal hover:bg-pp-teal/5 active:bg-pp-teal/10 transition-colors select-none">
                <span aria-hidden="true">📷</span>
                Take Photo
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>

              {/* Upload from gallery / files */}
              <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-dashed border-pp-teal bg-white px-4 py-2.5 text-sm font-medium text-pp-teal hover:bg-pp-teal/5 active:bg-pp-teal/10 transition-colors select-none">
                <span aria-hidden="true">⬆️</span>
                Upload Photo
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}

          {/* Remaining count hint */}
          {filePreviews.length > 0 && canAddMore && (
            <p className="mt-2 text-xs text-gray-400">
              {MAX_FILES - filePreviews.length} more photo
              {MAX_FILES - filePreviews.length !== 1 ? "s" : ""} allowed
            </p>
          )}

          {photoError && (
            <p className="mt-2 text-xs text-red-600">{photoError}</p>
          )}
        </div>
        {/* ── End photo upload ──────────────────────────────────────────── */}

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
