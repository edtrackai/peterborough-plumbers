/**
 * Plain-text and HTML email templates for Peterborough Plumbers.
 * Used by Resend for booking confirmations, notifications, and lead alerts.
 */

import { siteSettings } from "@/content/settings";

// ── Booking confirmation (sent to customer) ─────────────────────────────────

export function bookingConfirmationHtml(data: {
  name: string;
  service: string;
  date: string;
  timeWindow: string;
  bookingId: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="UTF-8"><title>Booking Confirmed</title></head>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #3a3a3a; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #fff; margin: 0; font-size: 22px;">${siteSettings.companyName}</h1>
    ${siteSettings.gasSafeNumber ? `<p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Gas Safe Registered — Reg. ${siteSettings.gasSafeNumber}</p>` : `<p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Gas Safe Registered Engineers</p>`}
  </div>
  <div style="background: #f9f9f9; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
    <h2 style="color: #3a3a3a; margin-top: 0;">Thanks, ${data.name} — your booking request is confirmed.</h2>
    <p>We've received your booking request and one of our Gas Safe registered engineers will be in touch shortly to confirm the appointment.</p>

    <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 6px; padding: 20px; margin: 24px 0;">
      <p style="margin: 0 0 8px;"><strong>Service:</strong> ${data.service}</p>
      <p style="margin: 0 0 8px;"><strong>Preferred date:</strong> ${data.date}</p>
      <p style="margin: 0 0 8px;"><strong>Time window:</strong> ${data.timeWindow}</p>
      <p style="margin: 0;"><strong>Reference:</strong> #${data.bookingId.slice(0, 8).toUpperCase()}</p>
    </div>

    <p>If you need to speak to us urgently, please call us directly:</p>
    <p style="font-size: 20px; font-weight: bold;">
      <a href="tel:${siteSettings.phoneHref}" style="color: #e62419; text-decoration: none;">${siteSettings.phone}</a>
    </p>

    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;">
    <p style="font-size: 12px; color: #999; margin: 0;">
      ${siteSettings.companyName} · Peterborough, Cambridgeshire${siteSettings.gasSafeNumber ? ` · Gas Safe Reg. ${siteSettings.gasSafeNumber}` : ""}
    </p>
  </div>
</body>
</html>`;
}

// ── Booking notification (sent to owner) ────────────────────────────────────

export function bookingNotificationHtml(data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeWindow: string;
  postcode: string;
  details: string;
  bookingId: string;
  ipAddress: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="UTF-8"><title>New Booking</title></head>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #3a3a3a;">New Booking Request</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; width: 120px;"><strong>Name</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.service}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.date}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Time</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.timeWindow}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Postcode</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.postcode}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Details</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.details}</td></tr>
    <tr><td style="padding: 8px;"><strong>Ref.</strong></td><td style="padding: 8px;">#${data.bookingId.slice(0, 8).toUpperCase()}</td></tr>
  </table>
  <p style="font-size: 12px; color: #999; margin-top: 24px;">Received at: ${new Date().toUTCString()}</p>
</body>
</html>`;
}

// ── New offer (sent to plumber when a job is dispatched to them) ─────────────

export function newOfferHtml(data: {
  plumberName: string;
  bookingRef:  string;
  serviceType: string | null;
  postcode:    string;
  slotDate:    string;   // "YYYY-MM-DD"
  slotStart:   string;
  slotEnd:     string;
  description: string | null;
  portalUrl:   string;
}): string {
  const formattedDate = new Date(data.slotDate + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const serviceLabel = data.serviceType
    ? data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1).replace(/_/g, " ")
    : "General Plumbing";

  return `
<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="UTF-8"><title>New Job Offer</title></head>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #242424; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #fff; margin: 0; font-size: 20px;">${siteSettings.companyName}</h1>
    <p style="color: rgba(255,255,255,0.5); margin: 6px 0 0; font-size: 13px;">New Job Offer</p>
  </div>
  <div style="background: #f9f9f9; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
    <h2 style="color: #242424; margin-top: 0; font-size: 18px;">Hi ${data.plumberName}, you have a new job offer</h2>
    <p style="color: #555; margin-bottom: 24px;">A customer needs a plumber. Log in to accept or decline before another plumber takes it.</p>

    <div style="background: #fff; border: 1px solid #e0e0e0; border-left: 4px solid #C8102E; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
      <p style="margin: 0 0 10px; font-size: 15px;"><strong>Service:</strong> ${serviceLabel}</p>
      <p style="margin: 0 0 10px;"><strong>Postcode:</strong> ${data.postcode}</p>
      <p style="margin: 0 0 10px;"><strong>Date:</strong> ${formattedDate}</p>
      <p style="margin: 0 0 10px;"><strong>Time window:</strong> ${data.slotStart} – ${data.slotEnd}</p>
      <p style="margin: 0;"><strong>Reference:</strong> ${data.bookingRef}</p>
      ${data.description ? `<p style="margin: 10px 0 0; color: #666; font-size: 13px; border-top: 1px solid #eee; padding-top: 10px;">${data.description}</p>` : ""}
    </div>

    <div style="text-align: center; margin-bottom: 24px;">
      <a href="${data.portalUrl}"
         style="display: inline-block; background: #C8102E; color: #fff; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
        View &amp; Accept Job
      </a>
    </div>

    <p style="font-size: 13px; color: #888; text-align: center; margin: 0;">
      Offers expire. Log in quickly to secure this job.
    </p>

    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;">
    <p style="font-size: 12px; color: #999; margin: 0;">
      ${siteSettings.companyName} · Peterborough, Cambridgeshire
    </p>
  </div>
</body>
</html>`;
}

// ── Plumber assigned (sent to customer when booking is accepted) ─────────────

export function plumberAssignedHtml(data: {
  customerName: string;
  plumberName: string;
  bookingRef: string;
  slotDate: string;       // "YYYY-MM-DD"
  slotStart: string;
  slotEnd: string;
  trackingUrl: string;
}): string {
  const formattedDate = new Date(data.slotDate + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `
<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="UTF-8"><title>Plumber Confirmed</title></head>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #3a3a3a; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: #fff; margin: 0; font-size: 22px;">${siteSettings.companyName}</h1>
    ${siteSettings.gasSafeNumber ? `<p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Gas Safe Registered — Reg. ${siteSettings.gasSafeNumber}</p>` : `<p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Gas Safe Registered Engineers</p>`}
  </div>
  <div style="background: #f9f9f9; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
    <h2 style="color: #3a3a3a; margin-top: 0;">Great news, ${data.customerName} — your plumber is confirmed!</h2>
    <p><strong>${data.plumberName}</strong> has accepted your job and will be with you on the scheduled date.</p>

    <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 6px; padding: 20px; margin: 24px 0;">
      <p style="margin: 0 0 8px;"><strong>Plumber:</strong> ${data.plumberName}</p>
      <p style="margin: 0 0 8px;"><strong>Date:</strong> ${formattedDate}</p>
      <p style="margin: 0 0 8px;"><strong>Time window:</strong> ${data.slotStart} – ${data.slotEnd}</p>
      <p style="margin: 0;"><strong>Reference:</strong> ${data.bookingRef}</p>
    </div>

    <p>You can track your plumber's progress in real time:</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${data.trackingUrl}"
         style="display: inline-block; background: #C8102E; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
        Track My Plumber
      </a>
    </div>

    <p>Or paste this link into your browser:</p>
    <p style="word-break: break-all; font-size: 13px; color: #555;">${data.trackingUrl}</p>

    <p>If you have any questions, please call us directly:</p>
    <p style="font-size: 20px; font-weight: bold;">
      <a href="tel:${siteSettings.phoneHref}" style="color: #C8102E; text-decoration: none;">${siteSettings.phone}</a>
    </p>

    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;">
    <p style="font-size: 12px; color: #999; margin: 0;">
      ${siteSettings.companyName} · Peterborough, Cambridgeshire${siteSettings.gasSafeNumber ? ` · Gas Safe Reg. ${siteSettings.gasSafeNumber}` : ""}
    </p>
  </div>
</body>
</html>`;
}

// ── Lead notification (sent to owner for contact form) ──────────────────────

export function leadNotificationHtml(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  pageSource: string;
  leadId: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="UTF-8"><title>New Enquiry</title></head>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #3a3a3a;">New Website Enquiry</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; width: 120px;"><strong>Name</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone ?? "—"}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Message</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.message}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Source page</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.pageSource}</td></tr>
    <tr><td style="padding: 8px;"><strong>Lead ID</strong></td><td style="padding: 8px;">#${data.leadId.slice(0, 8).toUpperCase()}</td></tr>
  </table>
  <p style="font-size: 12px; color: #999; margin-top: 24px;">Received at: ${new Date().toUTCString()}</p>
</body>
</html>`;
}
