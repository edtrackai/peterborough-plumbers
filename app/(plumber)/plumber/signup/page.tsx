"use client";

export const dynamic = "force-dynamic";

import { useState, useRef } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

type PlumberType = "general" | "gas_safe";

type DocType =
  | "photo_id"
  | "selfie"
  | "public_liability_insurance"
  | "dbs_certificate"
  | "gas_safe_certificate";

interface UploadedDoc {
  url: string;
  publicId: string;
}

interface DocSlot {
  uploaded: UploadedDoc | null;
  uploading: boolean;
  error: string | null;
}

// ── Shared input helpers ───────────────────────────────────────────────────────

const inputBase =
  "w-full rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 transition-all focus:outline-none";
const inputBaseNoIcon =
  "w-full rounded-xl py-3 px-4 text-sm text-white placeholder:text-zinc-600 transition-all focus:outline-none";
const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

function onFocusInput(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = "rgba(200,16,46,0.7)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,16,46,0.1)";
}
function onBlurInput(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
  e.currentTarget.style.boxShadow = "none";
}

// ── Document upload slot ───────────────────────────────────────────────────────

const DOC_LABELS: Record<DocType, { label: string; hint: string; accept: string }> = {
  photo_id: {
    label: "Photo ID",
    hint: "Passport, driving licence, or national ID",
    accept: "image/jpeg,image/png,image/webp,image/heic,application/pdf",
  },
  selfie: {
    label: "Selfie with ID",
    hint: "Hold your ID next to your face",
    accept: "image/jpeg,image/png,image/webp,image/heic",
  },
  public_liability_insurance: {
    label: "Public Liability Insurance",
    hint: "Certificate showing valid cover (PDF or image)",
    accept: "image/jpeg,image/png,image/webp,application/pdf",
  },
  dbs_certificate: {
    label: "DBS Certificate",
    hint: "Optional — enhanced DBS check",
    accept: "image/jpeg,image/png,image/webp,application/pdf",
  },
  gas_safe_certificate: {
    label: "Gas Safe Certificate",
    hint: "Your current Gas Safe registration card",
    accept: "image/jpeg,image/png,image/webp,application/pdf",
  },
};

function DocUploadSlot({
  docType,
  required,
  slot,
  onUpload,
}: {
  docType: DocType;
  required: boolean;
  slot: DocSlot;
  onUpload: (docType: DocType, file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const meta = DOC_LABELS[docType];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <span className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
          {meta.label}
        </span>
        {required ? (
          <span className="text-[#C8102E] text-xs">*</span>
        ) : (
          <span className="text-zinc-600 text-[10px] normal-case tracking-normal font-normal">(optional)</span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={meta.accept}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(docType, file);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={slot.uploading}
        className="w-full rounded-xl px-4 py-3 text-left transition-all flex items-center gap-3 disabled:opacity-60"
        style={{
          background: slot.uploaded
            ? "rgba(34,197,94,0.06)"
            : "rgba(255,255,255,0.03)",
          border: slot.uploaded
            ? "1px solid rgba(34,197,94,0.3)"
            : slot.error
            ? "1px solid rgba(239,68,68,0.4)"
            : "1px dashed rgba(255,255,255,0.12)",
        }}
      >
        {slot.uploading ? (
          <>
            <svg className="h-4 w-4 text-zinc-500 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
            </svg>
            <span className="text-xs text-zinc-500">Uploading…</span>
          </>
        ) : slot.uploaded ? (
          <>
            <svg className="h-4 w-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs text-green-400 font-medium truncate flex-1">Uploaded</span>
            <span className="text-[10px] text-zinc-600 shrink-0">Change</span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <div className="min-w-0">
              <p className="text-xs text-zinc-400">Click to upload</p>
              <p className="text-[10px] text-zinc-600 truncate">{meta.hint}</p>
            </div>
          </>
        )}
      </button>

      {slot.error && (
        <p className="text-[10.5px] text-red-400 leading-snug">{slot.error}</p>
      )}
    </div>
  );
}

// ── Type selection card ────────────────────────────────────────────────────────

function TypeSelectionCard({ onSelect }: { onSelect: (t: PlumberType) => void }) {
  return (
    <div
      className="rounded-2xl p-7"
      style={{
        background: "linear-gradient(160deg, rgba(26,26,26,0.92) 0%, rgba(14,14,14,0.96) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: [
          "0 0 0 1px rgba(255,255,255,0.07)",
          "0 1px 0 0 rgba(255,255,255,0.08) inset",
          "0 24px 60px rgba(0,0,0,0.65)",
          "0 0 80px rgba(200,16,46,0.09)",
        ].join(", "),
      }}
    >
      <p className="text-[13px] font-semibold text-zinc-300 text-center mb-1.5">
        Are you a Gas Safe registered engineer?
      </p>
      <p className="text-[11.5px] text-zinc-600 text-center leading-relaxed mb-6">
        Gas Safe engineers can accept boiler and gas related jobs.
        General plumbers will receive non-gas plumbing work only.
      </p>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onSelect("gas_safe")}
          className="w-full rounded-xl py-4 px-5 text-left transition-all active:scale-[0.98] flex items-center gap-4"
          style={{
            background: "linear-gradient(135deg, rgba(200,16,46,0.12) 0%, rgba(200,16,46,0.06) 100%)",
            border: "1px solid rgba(200,16,46,0.3)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(200,16,46,0.55)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(200,16,46,0.3)")}
        >
          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(200,16,46,0.15)", border: "1px solid rgba(200,16,46,0.25)" }}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="rgba(200,16,46,0.9)" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Yes — Gas Safe Engineer</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Boiler, gas &amp; general plumbing jobs</p>
          </div>
          <svg className="h-4 w-4 text-zinc-600 ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => onSelect("general")}
          className="w-full rounded-xl py-4 px-5 text-left transition-all active:scale-[0.98] flex items-center gap-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
        >
          <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <svg className="h-5 w-5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-white">No — General Plumbing Only</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Non-gas plumbing work only</p>
          </div>
          <svg className="h-4 w-4 text-zinc-600 ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="mt-5 text-center text-[12px] text-zinc-600">
        Already have an account?{" "}
        <Link href="/plumber/login" className="text-zinc-400 hover:text-white transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}

// ── Field wrapper ──────────────────────────────────────────────────────────────

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
    <div className="flex flex-col gap-1.5">
      <label className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
        {label}{" "}
        {required ? (
          <span className="text-[#C8102E]">*</span>
        ) : (
          <span className="text-zinc-600 normal-case tracking-normal font-normal">(optional)</span>
        )}
      </label>
      {children}
      {error && <p className="text-[10.5px] text-red-400">{error}</p>}
    </div>
  );
}

// ── Icon helpers ───────────────────────────────────────────────────────────────

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-zinc-600">
      {children}
    </span>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function PlumberSignupPage() {
  const [plumberType, setPlumberType] = useState<PlumberType | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gasSafeNumber: "",
    gasSafeCertExpiry: "",
    password: "",
    confirm: "",
  });
  const [docs, setDocs] = useState<Record<DocType, DocSlot>>({
    photo_id: { uploaded: null, uploading: false, error: null },
    selfie: { uploaded: null, uploading: false, error: null },
    public_liability_insurance: { uploaded: null, uploading: false, error: null },
    dbs_certificate: { uploaded: null, uploading: false, error: null },
    gas_safe_certificate: { uploaded: null, uploading: false, error: null },
  });

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function set(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleDocUpload(docType: DocType, file: File) {
    setDocs((prev) => ({
      ...prev,
      [docType]: { uploaded: null, uploading: true, error: null },
    }));

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/plumber/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setDocs((prev) => ({
          ...prev,
          [docType]: { uploaded: null, uploading: false, error: data.error ?? "Upload failed" },
        }));
      } else {
        setDocs((prev) => ({
          ...prev,
          [docType]: { uploaded: { url: data.url, publicId: data.publicId }, uploading: false, error: null },
        }));
      }
    } catch {
      setDocs((prev) => ({
        ...prev,
        [docType]: { uploaded: null, uploading: false, error: "Network error — please try again" },
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    // Validate required docs client-side
    const requiredDocs: DocType[] =
      plumberType === "gas_safe"
        ? ["photo_id", "selfie", "public_liability_insurance", "gas_safe_certificate"]
        : ["photo_id", "selfie", "public_liability_insurance"];

    const missingDoc = requiredDocs.find((d) => !docs[d].uploaded);
    if (missingDoc) {
      setError(`Please upload your ${DOC_LABELS[missingDoc].label} before submitting.`);
      return;
    }

    const anyUploading = Object.values(docs).some((d) => d.uploading);
    if (anyUploading) {
      setError("Please wait for all uploads to complete.");
      return;
    }

    // Collect uploaded docs
    const docPayload = (Object.entries(docs) as [DocType, DocSlot][])
      .filter(([, slot]) => slot.uploaded)
      .map(([docType, slot]) => ({
        docType,
        url: slot.uploaded!.url,
        publicId: slot.uploaded!.publicId,
      }));

    setLoading(true);
    try {
      const res = await fetch("/api/plumber/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plumberType,
          name: form.name,
          email: form.email,
          phone: form.phone,
          gasSafeNumber: plumberType === "gas_safe" ? form.gasSafeNumber : undefined,
          gasSafeCertExpiry: plumberType === "gas_safe" ? form.gasSafeCertExpiry : undefined,
          password: form.password,
          docs: docPayload,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setFieldErrors(data.fields);
        setError(data.error ?? "Sign-up failed. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const cardStyle = {
    background: "linear-gradient(160deg, rgba(26,26,26,0.92) 0%, rgba(14,14,14,0.96) 100%)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: [
      "0 0 0 1px rgba(255,255,255,0.07)",
      "0 1px 0 0 rgba(255,255,255,0.08) inset",
      "0 24px 60px rgba(0,0,0,0.65)",
      "0 0 80px rgba(200,16,46,0.09)",
    ].join(", "),
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{
        background: "#080808",
        backgroundImage: [
          "radial-gradient(ellipse 100% 55% at 50% -8%, rgba(200,16,46,0.28) 0%, transparent 58%)",
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.022) 1px, transparent 0)",
        ].join(", "),
        backgroundSize: "100% 100%, 28px 28px",
      }}
    >
      <div className="w-full max-w-[440px]">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="relative inline-flex mb-5">
            <div
              className="h-[60px] w-[60px] rounded-[18px] flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #E31530 0%, #C8102E 55%, #7f0b1e 100%)",
                boxShadow: "0 0 0 1px rgba(200,16,46,0.4), 0 8px 28px rgba(200,16,46,0.35), 0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6"
                  stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-[22px] font-bold text-white tracking-tight">Apply to Join</h1>
          <p className="text-[13px] text-zinc-500 mt-1.5">Peterborough Plumbers — Plumber Portal</p>
        </div>

        {/* Success state */}
        {success ? (
          <div className="rounded-2xl p-7 text-center space-y-4" style={cardStyle}>
            <div className="text-5xl">✅</div>
            <div>
              <p className="text-lg font-bold text-white">Application Submitted!</p>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                We&apos;ve received your application and will review it shortly. You&apos;ll receive an email once a decision has been made.
              </p>
            </div>
            <Link
              href="/plumber/login"
              className="block w-full rounded-xl py-3 text-sm font-semibold text-white text-center transition-all"
              style={{
                background: "linear-gradient(135deg, #E31530 0%, #C8102E 55%, #8B0C1E 100%)",
                boxShadow: "0 6px 20px rgba(200,16,46,0.35)",
              }}
            >
              Back to Login
            </Link>
          </div>

        /* Type selection */
        ) : !plumberType ? (
          <TypeSelectionCard onSelect={setPlumberType} />

        /* Application form */
        ) : (
          <div className="rounded-2xl p-7" style={cardStyle}>
            {/* Type badge + change link */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                {plumberType === "gas_safe" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                    style={{ background: "rgba(200,16,46,0.15)", color: "rgba(220,80,80,1)", border: "1px solid rgba(200,16,46,0.25)" }}>
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                    Gas Safe Engineer
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(160,160,160,1)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                    General Plumber
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => { setPlumberType(null); setError(null); setFieldErrors({}); }}
                className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                Change
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* ── Personal details ────────────────────────────────────────── */}
              <Field label="Full Name" required error={fieldErrors.name?.[0]}>
                <div className="relative">
                  <IconWrap>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-full w-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </IconWrap>
                  <input type="text" required value={form.name} onChange={set("name")}
                    placeholder="John Smith" autoComplete="name"
                    className={inputBase} style={inputStyle} onFocus={onFocusInput} onBlur={onBlurInput} />
                </div>
              </Field>

              <Field label="Email Address" required error={fieldErrors.email?.[0]}>
                <div className="relative">
                  <IconWrap>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-full w-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </IconWrap>
                  <input type="email" required value={form.email} onChange={set("email")}
                    placeholder="your@email.com" autoComplete="email"
                    className={inputBase} style={inputStyle} onFocus={onFocusInput} onBlur={onBlurInput} />
                </div>
              </Field>

              <Field label="Phone Number" required error={fieldErrors.phone?.[0]}>
                <div className="relative">
                  <IconWrap>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-full w-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </IconWrap>
                  <input type="tel" required value={form.phone} onChange={set("phone")}
                    placeholder="07700 900001" autoComplete="tel"
                    className={inputBase} style={inputStyle} onFocus={onFocusInput} onBlur={onBlurInput} />
                </div>
              </Field>

              {/* ── Gas Safe credentials (gas_safe only) ────────────────────── */}
              {plumberType === "gas_safe" && (
                <>
                  <div
                    className="rounded-xl px-4 py-3 -mx-1"
                    style={{ background: "rgba(200,16,46,0.05)", border: "1px solid rgba(200,16,46,0.15)" }}
                  >
                    <p className="text-[10.5px] font-semibold text-[rgba(200,16,46,0.8)] uppercase tracking-[0.1em] mb-3">
                      Gas Safe Credentials
                    </p>
                    <div className="flex flex-col gap-3">
                      <Field label="Gas Safe Registration Number" required error={fieldErrors.gasSafeNumber?.[0]}>
                        <div className="relative">
                          <IconWrap>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-full w-full">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </IconWrap>
                          <input type="text" required value={form.gasSafeNumber} onChange={set("gasSafeNumber")}
                            placeholder="e.g. 123456" autoComplete="off"
                            className={inputBase} style={inputStyle} onFocus={onFocusInput} onBlur={onBlurInput} />
                        </div>
                        <p className="text-[10px] text-zinc-600">We verify this with the Gas Safe Register before approving gas &amp; boiler work.</p>
                      </Field>

                      <Field label="Certificate Expiry Date" required error={fieldErrors.gasSafeCertExpiry?.[0]}>
                        <input
                          type="date"
                          required
                          value={form.gasSafeCertExpiry}
                          onChange={set("gasSafeCertExpiry")}
                          min={new Date().toISOString().split("T")[0]}
                          className={inputBaseNoIcon}
                          style={{ ...inputStyle, colorScheme: "dark" }}
                          onFocus={onFocusInput}
                          onBlur={onBlurInput}
                        />
                      </Field>
                    </div>
                  </div>
                </>
              )}

              {/* ── Password ────────────────────────────────────────────────── */}
              <Field label="Password" required error={fieldErrors.password?.[0]}>
                <div className="relative">
                  <IconWrap>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-full w-full">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </IconWrap>
                  <input type={showPassword ? "text" : "password"} required value={form.password} onChange={set("password")}
                    placeholder="Min. 12 characters" autoComplete="new-password"
                    className={`${inputBase} pr-11`} style={inputStyle} onFocus={onFocusInput} onBlur={onBlurInput} />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-300 transition-colors">
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {form.password && (
                  <p className={`text-[11px] ${form.password.length >= 12 ? "text-green-500" : "text-amber-500"}`}>
                    {form.password.length >= 12 ? "✓ Strong enough" : `${12 - form.password.length} more characters needed`}
                  </p>
                )}
              </Field>

              <Field label="Confirm Password" required>
                <div className="relative">
                  <IconWrap>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="h-full w-full">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </IconWrap>
                  <input type={showPassword ? "text" : "password"} required value={form.confirm} onChange={set("confirm")}
                    placeholder="Repeat password" autoComplete="new-password"
                    className={inputBase}
                    style={{
                      ...inputStyle,
                      borderColor: form.confirm && form.confirm !== form.password ? "rgba(239,68,68,0.5)" : undefined,
                    }}
                    onFocus={onFocusInput} onBlur={onBlurInput} />
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p className="text-[11px] text-red-400">Passwords do not match</p>
                )}
              </Field>

              {/* ── Verification documents ──────────────────────────────────── */}
              <div>
                <p className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em] mb-3">
                  Verification Documents
                </p>
                <div className="flex flex-col gap-3">
                  <DocUploadSlot docType="photo_id" required slot={docs.photo_id} onUpload={handleDocUpload} />
                  <DocUploadSlot docType="selfie" required slot={docs.selfie} onUpload={handleDocUpload} />
                  <DocUploadSlot docType="public_liability_insurance" required slot={docs.public_liability_insurance} onUpload={handleDocUpload} />
                  <DocUploadSlot docType="dbs_certificate" required={false} slot={docs.dbs_certificate} onUpload={handleDocUpload} />
                  {plumberType === "gas_safe" && (
                    <DocUploadSlot docType="gas_safe_certificate" required slot={docs.gas_safe_certificate} onUpload={handleDocUpload} />
                  )}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-start gap-2.5 rounded-xl px-4 py-3"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <svg className="h-4 w-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[13px] text-red-400 leading-snug">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #E31530 0%, #C8102E 55%, #8B0C1E 100%)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.1) inset, 0 6px 20px rgba(200,16,46,0.35)",
                }}
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>

            </form>

            <p className="mt-5 text-center text-[12px] text-zinc-600">
              Already have an account?{" "}
              <Link href="/plumber/login" className="text-zinc-400 hover:text-white transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <svg className="h-3 w-3 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-[11px] text-zinc-700">
            Secure &nbsp;·&nbsp; Encrypted &nbsp;·&nbsp; Peterborough Plumbers
          </p>
        </div>
      </div>
    </div>
  );
}
