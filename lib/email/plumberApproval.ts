/**
 * Email notifications for plumber signup approval / rejection.
 * Uses the same Resend setup as existing email templates.
 */

import { Resend } from "resend";
import { siteSettings } from "@/content/settings";

const FROM = `${siteSettings.companyName} <website@peterboroughplumbers.com>`;

// ── Admin new signup notification ─────────────────────────────────────────────

export async function sendNewSignupNotification(data: {
  name: string;
  email: string;
  phone?: string;
  gasSafeNumber?: string;
}): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_USER;
  if (!process.env.RESEND_API_KEY || !adminEmail) return;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="UTF-8"><title>New Plumber Application</title></head>
<body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:#C8102E;padding:20px 24px;border-radius:8px 8px 0 0;">
    <h1 style="color:#fff;margin:0;font-size:18px;">New Plumber Application</h1>
    <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">${siteSettings.companyName} — Action Required</p>
  </div>
  <div style="background:#f9f9f9;padding:28px;border-radius:0 0 8px 8px;border:1px solid #e0e0e0;">
    <p style="margin:0 0 16px;">A new plumber has submitted an application and is awaiting review.</p>
    <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;">
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:10px 16px;font-size:12px;color:#888;width:140px;">Name</td>
        <td style="padding:10px 16px;font-size:14px;font-weight:600;">${data.name}</td>
      </tr>
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:10px 16px;font-size:12px;color:#888;">Email</td>
        <td style="padding:10px 16px;font-size:14px;"><a href="mailto:${data.email}" style="color:#C8102E;">${data.email}</a></td>
      </tr>
      ${data.phone ? `<tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:10px 16px;font-size:12px;color:#888;">Phone</td>
        <td style="padding:10px 16px;font-size:14px;">${data.phone}</td>
      </tr>` : ""}
      <tr>
        <td style="padding:10px 16px;font-size:12px;color:#888;">Gas Safe No.</td>
        <td style="padding:10px 16px;font-size:14px;font-family:monospace;">${data.gasSafeNumber || "Not provided"}</td>
      </tr>
    </table>
    <p style="text-align:center;margin:24px 0 0;">
      <a href="${siteSettings.siteUrl}/admin/plumbers"
         style="display:inline-block;background:#C8102E;color:#fff;padding:12px 28px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:14px;">
        Review Application
      </a>
    </p>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: FROM,
    to: adminEmail,
    subject: `New Plumber Application — ${data.name}`,
    html,
  });
}

// ── Approval ─────────────────────────────────────────────────────────────────

export async function sendApprovalEmail(data: {
  name: string;
  email: string;
  plumberId: string;
  boilerGasApproved: boolean;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="UTF-8"><title>Application Approved</title></head>
<body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:#C8102E;padding:24px;text-align:center;border-radius:8px 8px 0 0;">
    <h1 style="color:#fff;margin:0;font-size:22px;">${siteSettings.companyName}</h1>
    <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">Plumber Portal</p>
  </div>
  <div style="background:#f9f9f9;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e0e0e0;">
    <h2 style="color:#1a1a1a;margin-top:0;">🎉 Congratulations, ${data.name}!</h2>
    <p>Your application to join the Peterborough Plumbers team has been <strong>approved</strong>.</p>

    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:20px;margin:24px 0;">
      <p style="margin:0 0 8px;"><strong>Your Plumber ID:</strong> <span style="font-family:monospace;font-size:18px;color:#C8102E;">${data.plumberId}</span></p>
      <p style="margin:0 0 8px;"><strong>General Plumbing:</strong> ✅ Approved</p>
      ${data.boilerGasApproved ? '<p style="margin:0;"><strong>Boiler &amp; Gas Work:</strong> ✅ Approved</p>' : '<p style="margin:0;color:#666;"><strong>Boiler &amp; Gas Work:</strong> Not approved (general jobs only)</p>'}
    </div>

    <p>You can now log in to the plumber portal to receive job offers:</p>
    <p style="text-align:center;margin:24px 0;">
      <a href="${siteSettings.siteUrl}/plumber/login"
         style="display:inline-block;background:#C8102E;color:#fff;padding:14px 32px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:16px;">
        Log In to Portal
      </a>
    </p>

    <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;">
    <p style="font-size:12px;color:#999;margin:0;">
      ${siteSettings.companyName} · Peterborough, Cambridgeshire
    </p>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `✅ Application Approved — Welcome to ${siteSettings.companyName}`,
    html,
  });
}

// ── Rejection ─────────────────────────────────────────────────────────────────

export async function sendRejectionEmail(data: {
  name: string;
  email: string;
  adminNote?: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="UTF-8"><title>Application Update</title></head>
<body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:#3a3a3a;padding:24px;text-align:center;border-radius:8px 8px 0 0;">
    <h1 style="color:#fff;margin:0;font-size:22px;">${siteSettings.companyName}</h1>
  </div>
  <div style="background:#f9f9f9;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e0e0e0;">
    <h2 style="color:#1a1a1a;margin-top:0;">Application Update — ${data.name}</h2>
    <p>Thank you for applying to join the Peterborough Plumbers team.</p>
    <p>Unfortunately, after reviewing your application we are unable to proceed at this time.</p>
    ${data.adminNote ? `
    <div style="background:#fff;border-left:4px solid #e0e0e0;padding:16px 20px;margin:20px 0;">
      <p style="margin:0;font-style:italic;color:#555;">${data.adminNote}</p>
    </div>` : ""}
    <p>If you believe this is an error or have questions, please contact us directly:</p>
    <p><a href="tel:${siteSettings.phoneHref}" style="color:#C8102E;">${siteSettings.phone}</a></p>
    <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;">
    <p style="font-size:12px;color:#999;margin:0;">${siteSettings.companyName} · Peterborough, Cambridgeshire</p>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `Application Update — ${siteSettings.companyName}`,
    html,
  });
}
