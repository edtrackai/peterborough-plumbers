"use client";

import { useState } from "react";

const SERVICES = [
  "Boiler Service",
  "Gas Safety Certificate",
  "Central Heating",
  "Bathroom Installation",
  "Plumbing Repair",
  "Emergency Plumber",
  "Drain Blockage",
  "Leak Detection",
  "Landlord Services",
  "Other",
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  serviceType: string;
  message: string;
  website: string; // honeypot — must stay empty
}

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  postcode: "",
  serviceType: "",
  message: "",
  website: "",
};

export default function LeadForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic client-side validation
    const newErrors: Partial<FormState> = {};
    if (form.name.trim().length < 2) newErrors.name = "Enter your full name";
    if (!/^[\d\s+()-]{10,}$/.test(form.phone)) newErrors.phone = "Enter a valid UK phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (form.postcode.trim().length < 3) newErrors.postcode = "Enter your postcode";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          serviceType: form.serviceType || undefined,
          message: form.message || undefined,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm(EMPTY);
      } else {
        const data = await res.json();
        if (data.fields) {
          setErrors(data.fields);
        }
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-pp-heading">Enquiry Received!</h3>
        <p className="text-pp-body/70 text-sm max-w-xs">
          Thanks — we'll be in touch within 2 hours. For emergencies call us directly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-pp-teal text-sm font-semibold hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-pp-heading">Get a Free Quote</h2>
      <p className="text-sm text-pp-body/70 -mt-2">Fill in the form and we'll call you back within 2 hours.</p>

      {/* Name */}
      <div>
        <label htmlFor="lead-name" className="block text-sm font-semibold text-pp-heading mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="John Smith"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-pp-teal focus:ring-1 focus:ring-pp-teal ${
            errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
          }`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-semibold text-pp-heading mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="07700 900000"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-pp-teal focus:ring-1 focus:ring-pp-teal ${
            errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
          }`}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="lead-email" className="block text-sm font-semibold text-pp-heading mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="john@example.com"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-pp-teal focus:ring-1 focus:ring-pp-teal ${
            errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
          }`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Postcode */}
      <div>
        <label htmlFor="lead-postcode" className="block text-sm font-semibold text-pp-heading mb-1">
          Postcode <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-postcode"
          type="text"
          autoComplete="postal-code"
          value={form.postcode}
          onChange={(e) => set("postcode", e.target.value)}
          placeholder="PE1 1AA"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-pp-teal focus:ring-1 focus:ring-pp-teal ${
            errors.postcode ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
          }`}
        />
        {errors.postcode && <p className="mt-1 text-xs text-red-500">{errors.postcode}</p>}
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="lead-service" className="block text-sm font-semibold text-pp-heading mb-1">
          Service Required
        </label>
        <select
          id="lead-service"
          value={form.serviceType}
          onChange={(e) => set("serviceType", e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-pp-teal focus:ring-1 focus:ring-pp-teal"
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="lead-message" className="block text-sm font-semibold text-pp-heading mb-1">
          Tell Us More <span className="text-pp-body/40 font-normal">(optional)</span>
        </label>
        <textarea
          id="lead-message"
          rows={3}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Brief description of the issue…"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-pp-teal focus:ring-1 focus:ring-pp-teal resize-none"
        />
      </div>

      {/* Honeypot — hidden from users, bots fill it in */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", tabIndex: -1 } as React.CSSProperties}>
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          type="text"
          name="website"
          autoComplete="off"
          tabIndex={-1}
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
          Something went wrong — please try again or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-pp-teal py-3.5 text-sm font-bold text-white hover:bg-pp-teal-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Get My Free Quote"}
      </button>

      <p className="text-center text-xs text-pp-body/50">
        No obligation · We typically respond within 2 hours
      </p>
    </form>
  );
}
