"use client";

import { useRouter } from "next/navigation";
import { siteSettings } from "@/content/settings";

type Props = {
  name: string;
  email: string;
  approvalStatus: string;
  adminNote: string | null;
};

const STATUS_CONFIG: Record<string, { icon: string; title: string; colour: string; bg: string; body: string }> = {
  pending_verification: {
    icon: "⏳",
    title: "Application Under Review",
    colour: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    body: "Your application has been received and is currently being reviewed by our team. We'll send you an email once a decision has been made.",
  },
  needs_more_info: {
    icon: "📋",
    title: "Additional Information Required",
    colour: "#3B82F6",
    bg: "rgba(59,130,246,0.08)",
    body: "We need a little more information before we can proceed with your application. Please review the note below and contact us.",
  },
  rejected: {
    icon: "❌",
    title: "Application Unsuccessful",
    colour: "#EF4444",
    bg: "rgba(239,68,68,0.08)",
    body: "Unfortunately your application was not successful at this time. Please see any notes below or contact us for more information.",
  },
  suspended: {
    icon: "🔒",
    title: "Account Suspended",
    colour: "#EF4444",
    bg: "rgba(239,68,68,0.08)",
    body: "Your account has been suspended. Please contact us for more information.",
  },
};

const fallback = {
  icon: "ℹ️",
  title: "Account Status",
  colour: "#6B7280",
  bg: "rgba(107,114,128,0.08)",
  body: "Your account status is being reviewed.",
};

export default function PendingClient({ name, email, approvalStatus, adminNote }: Props) {
  const router = useRouter();
  const cfg = STATUS_CONFIG[approvalStatus] ?? fallback;

  async function handleLogout() {
    await fetch("/api/plumber/logout", { method: "POST" });
    router.push("/plumber/login");
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{
        background: "#080808",
        backgroundImage: [
          "radial-gradient(ellipse 100% 55% at 50% -8%, rgba(200,16,46,0.18) 0%, transparent 58%)",
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.022) 1px, transparent 0)",
        ].join(", "),
        backgroundSize: "100% 100%, 28px 28px",
      }}
    >
      <div className="w-full max-w-[400px]">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="relative inline-flex mb-5">
            <div
              className="h-[60px] w-[60px] rounded-[18px] flex items-center justify-center text-3xl"
              style={{
                background: cfg.bg,
                border: `1px solid ${cfg.colour}30`,
                boxShadow: `0 0 40px ${cfg.colour}20`,
              }}
            >
              {cfg.icon}
            </div>
          </div>
          <h1 className="text-[22px] font-bold text-white tracking-tight leading-tight">
            {cfg.title}
          </h1>
          <p className="text-[13px] text-zinc-500 mt-1.5">Hi, {name.split(" ")[0]}</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7 space-y-5"
          style={{
            background: "linear-gradient(160deg, rgba(26,26,26,0.92) 0%, rgba(14,14,14,0.96) 100%)",
            backdropFilter: "blur(12px)",
            boxShadow: [
              "0 0 0 1px rgba(255,255,255,0.07)",
              "0 1px 0 0 rgba(255,255,255,0.08) inset",
              "0 24px 60px rgba(0,0,0,0.65)",
            ].join(", "),
          }}
        >

          {/* Status badge */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: cfg.bg, border: `1px solid ${cfg.colour}25` }}
          >
            <span className="text-2xl shrink-0">{cfg.icon}</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: cfg.colour }}>{cfg.title}</p>
              <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{cfg.body}</p>
            </div>
          </div>

          {/* Admin note */}
          {adminNote && (
            <div
              className="rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.1em] mb-2">
                Note from team
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed">{adminNote}</p>
            </div>
          )}

          {/* Account info */}
          <div
            className="rounded-xl px-4 py-3 space-y-2"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-zinc-600">Email</span>
              <span className="text-[12px] text-zinc-400 font-mono">{email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-zinc-600">Status</span>
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${cfg.colour}15`, color: cfg.colour }}
              >
                {approvalStatus.replace(/_/g, " ")}
              </span>
            </div>
          </div>

          {/* Contact note */}
          <p className="text-[12px] text-zinc-600 text-center leading-relaxed">
            Questions? Call us on{" "}
            <a href={`tel:${siteSettings.phoneHref}`} className="text-zinc-400 hover:text-white transition-colors">
              {siteSettings.phone}
            </a>
          </p>

          {/* Sign out */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl py-3 text-sm font-semibold transition-colors"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#71717a",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#d4d4d8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#71717a"; }}
          >
            Sign out
          </button>
        </div>

      </div>
    </div>
  );
}
