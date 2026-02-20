"use client";

import { useState } from "react";
import { services } from "@/content/services";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

interface BookingFormProps {
  preselectedService?: string;
}

export default function BookingForm({ preselectedService }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(fd: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const name = fd.get("name") as string;
    const phone = fd.get("phone") as string;
    const email = fd.get("email") as string;
    const postcode = fd.get("postcode") as string;
    const service = fd.get("service") as string;
    const date = fd.get("date") as string;
    const timeWindow = fd.get("timeWindow") as string;
    const details = fd.get("details") as string;

    if (!name || name.length < 2) errs.name = "Name must be at least 2 characters";
    if (!phone || phone.length < 10) errs.phone = "Please enter a valid phone number";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email";
    if (!postcode || !/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(postcode))
      errs.postcode = "Please enter a valid UK postcode";
    if (!service) errs.service = "Please select a service";
    if (!date) errs.date = "Please select a date";
    if (!timeWindow) errs.timeWindow = "Please select a time window";
    if (!details || details.length < 10) errs.details = "Please provide at least 10 characters";

    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setServerError(null);
    setSubmitting(true);

    const payload = {
      name: fd.get("name") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      postcode: fd.get("postcode") as string,
      service: fd.get("service") as string,
      date: fd.get("date") as string,
      timeWindow: fd.get("timeWindow") as string,
      details: fd.get("details") as string,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      trackEvent({ event: "booking_form_submit", service: payload.service });
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please call us directly or try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="bg-green-50 rounded-xl p-8 max-w-md mx-auto border border-green-200">
          <div className="text-4xl mb-4">&#10003;</div>
          <h2 className="text-2xl font-bold text-pp-dark mb-3">Booking Request Sent!</h2>
          <p className="text-pp-dark/70 mb-6">
            Thank you for your booking request. We&apos;ll confirm your appointment as soon as possible.
          </p>
          <div className="space-y-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              Chat on WhatsApp for Faster Response
            </a>
            <Link
              href="/"
              className="block text-pp-accent font-semibold hover:text-pp-accent/80 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-pp-dark mb-1">
          Name <span className="text-pp-accent">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full border border-pp-dark/20 rounded-lg px-4 py-3 text-pp-dark bg-white focus:border-pp-accent focus:ring-1 focus:ring-pp-accent transition-colors"
          placeholder="Your full name"
        />
        {errors.name && <p className="text-pp-accent text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-pp-dark mb-1">
          Contact Number <span className="text-pp-accent">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          defaultValue="+44 "
          className="w-full border border-pp-dark/20 rounded-lg px-4 py-3 text-pp-dark bg-white focus:border-pp-accent focus:ring-1 focus:ring-pp-accent transition-colors"
        />
        {errors.phone && <p className="text-pp-accent text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-pp-dark mb-1">
          Email Address <span className="text-pp-accent">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border border-pp-dark/20 rounded-lg px-4 py-3 text-pp-dark bg-white focus:border-pp-accent focus:ring-1 focus:ring-pp-accent transition-colors"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-pp-accent text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Postcode */}
      <div>
        <label htmlFor="postcode" className="block text-sm font-semibold text-pp-dark mb-1">
          Post Code <span className="text-pp-accent">*</span>
        </label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          required
          className="w-full border border-pp-dark/20 rounded-lg px-4 py-3 text-pp-dark bg-white focus:border-pp-accent focus:ring-1 focus:ring-pp-accent transition-colors"
          placeholder="PE1 1AA"
        />
        {errors.postcode && <p className="text-pp-accent text-sm mt-1">{errors.postcode}</p>}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-pp-dark mb-1">
          Service <span className="text-pp-accent">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue={preselectedService || ""}
          className="w-full border border-pp-dark/20 rounded-lg px-4 py-3 text-pp-dark bg-white focus:border-pp-accent focus:ring-1 focus:ring-pp-accent transition-colors"
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-pp-accent text-sm mt-1">{errors.service}</p>}
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-pp-dark mb-1">
            Preferred Date <span className="text-pp-accent">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full border border-pp-dark/20 rounded-lg px-4 py-3 text-pp-dark bg-white focus:border-pp-accent focus:ring-1 focus:ring-pp-accent transition-colors"
          />
          {errors.date && <p className="text-pp-accent text-sm mt-1">{errors.date}</p>}
        </div>
        <div>
          <label htmlFor="timeWindow" className="block text-sm font-semibold text-pp-dark mb-1">
            Time Window <span className="text-pp-accent">*</span>
          </label>
          <select
            id="timeWindow"
            name="timeWindow"
            required
            className="w-full border border-pp-dark/20 rounded-lg px-4 py-3 text-pp-dark bg-white focus:border-pp-accent focus:ring-1 focus:ring-pp-accent transition-colors"
          >
            <option value="">Select a time</option>
            <option value="Morning (8am-12pm)">Morning (8am-12pm)</option>
            <option value="Afternoon (12pm-5pm)">Afternoon (12pm-5pm)</option>
            <option value="Evening (5pm-8pm)">Evening (5pm-8pm)</option>
            <option value="ASAP">ASAP</option>
          </select>
          {errors.timeWindow && <p className="text-pp-accent text-sm mt-1">{errors.timeWindow}</p>}
        </div>
      </div>

      {/* Details */}
      <div>
        <label htmlFor="details" className="block text-sm font-semibold text-pp-dark mb-1">
          Details About the Issue <span className="text-pp-accent">*</span>
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={4}
          className="w-full border border-pp-dark/20 rounded-lg px-4 py-3 text-pp-dark bg-white focus:border-pp-accent focus:ring-1 focus:ring-pp-accent transition-colors resize-y"
          placeholder="Please describe the issue or service you need..."
        />
        {errors.details && <p className="text-pp-accent text-sm mt-1">{errors.details}</p>}
      </div>

      {serverError && (
        <p className="text-pp-accent text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#2563EB] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending…" : "Submit Booking Request"}
      </button>

      <p className="text-center text-sm text-pp-dark/50">
        Or call us directly:{" "}
        <a href={`tel:${siteSettings.phoneHref}`} className="text-pp-accent font-semibold">
          {siteSettings.phone}
        </a>
      </p>
    </form>
  );
}
