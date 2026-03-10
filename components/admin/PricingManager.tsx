"use client";

import { useState, useCallback } from "react";
import type { Pricing } from "@prisma/client";

// ── Category grouping (matches pricing/page.tsx structure) ────────────────────
const GROUPS = [
  {
    label: "Boiler Services",
    icon: "🔧",
    slugs: [
      "annual-boiler-service",
      "boiler-repair-standard",
      "boiler-repair-complex",
      "new-combi-boiler",
      "new-system-boiler",
      "new-regular-boiler",
      "boiler-replacement",
      "boiler-flue-extension",
    ],
  },
  {
    label: "Heating & Radiators",
    icon: "🌡️",
    slugs: [
      "power-flush-small",
      "power-flush-medium",
      "power-flush-large",
      "radiator-replacement",
      "radiator-addition",
      "trv-replacement",
      "magnetic-filter",
      "underfloor-heating-electric",
      "zone-valve-replacement",
    ],
  },
  {
    label: "Plumbing Repairs & Installations",
    icon: "🔩",
    slugs: [
      "tap-repair",
      "drain-blocked-internal",
      "leak-detection",
      "stopcock-replacement",
      "cistern-repair",
      "pipe-repair",
      "outside-tap",
      "water-softener",
      "hot-water-cylinder",
    ],
  },
  {
    label: "Bathroom Installations",
    icon: "🛁",
    slugs: [
      "bathroom-refit-basic",
      "bathroom-renovation-full",
      "ensuite-installation",
      "wet-room-conversion",
      "shower-electric",
      "shower-mixer",
      "toilet-installation",
      "basin-installation",
      "bath-installation",
    ],
  },
  {
    label: "Gas Safety & Certification",
    icon: "✅",
    slugs: [
      "gas-safety-cp12-1",
      "gas-safety-cp12-extra",
      "co-alarm",
      "gas-pressure-test",
      "gas-appliance-service",
    ],
  },
  {
    label: "Drain Blockages & CCTV",
    icon: "🚿",
    slugs: [
      "drain-clearance-internal",
      "drain-clearance-external",
      "drain-cctv-survey",
      "drain-repair-patch",
      "drain-unblocking-emergency",
    ],
  },
  {
    label: "Emergency Call-Out",
    icon: "🚨",
    slugs: [
      "emergency-daytime",
      "emergency-evening",
      "emergency-weekend",
      "emergency-labour-hourly",
      "emergency-parts",
    ],
  },
  {
    label: "Landlord Services",
    icon: "🏠",
    slugs: [
      "landlord-gas-boiler-combined",
      "landlord-gas-safety-only",
      "landlord-maintenance-package",
      "landlord-emergency-callout",
    ],
  },
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────
type RowState = {
  price: string;
  priceLabel: string;
  priceNote: string;
  isActive: boolean;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";
type ErrorMsg = string | null;

// ── Row component ─────────────────────────────────────────────────────────────
function PricingRow({
  item,
  row,
  status,
  errorMsg,
  onChange,
  onSave,
}: {
  item: Pricing;
  row: RowState;
  status: SaveStatus;
  errorMsg: ErrorMsg;
  onChange: (field: keyof RowState, value: string | boolean) => void;
  onSave: () => void;
}) {
  const isSaving = status === "saving";

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
      {/* Service name */}
      <td className="px-4 py-3 text-sm font-medium text-slate-700 w-[28%]">
        {item.serviceName}
      </td>

      {/* Label */}
      <td className="px-3 py-3 w-[12%]">
        <input
          type="text"
          value={row.priceLabel}
          onChange={(e) => onChange("priceLabel", e.target.value)}
          placeholder="From"
          maxLength={20}
          className="w-full px-2.5 py-1.5 rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E]/40 bg-white text-slate-700 placeholder:text-slate-300"
        />
      </td>

      {/* Price */}
      <td className="px-3 py-3 w-[15%]">
        <input
          type="text"
          value={row.price}
          onChange={(e) => onChange("price", e.target.value)}
          placeholder="£0"
          maxLength={30}
          required
          className="w-full px-2.5 py-1.5 rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E]/40 bg-white font-semibold text-[#C8102E] placeholder:text-slate-300"
        />
      </td>

      {/* Note */}
      <td className="px-3 py-3 hidden lg:table-cell">
        <input
          type="text"
          value={row.priceNote}
          onChange={(e) => onChange("priceNote", e.target.value)}
          placeholder="Optional note…"
          maxLength={200}
          className="w-full px-2.5 py-1.5 rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E]/40 bg-white text-slate-600 placeholder:text-slate-300"
        />
      </td>

      {/* Active */}
      <td className="px-3 py-3 w-[8%] text-center">
        <button
          type="button"
          role="switch"
          aria-checked={row.isActive}
          onClick={() => onChange("isActive", !row.isActive)}
          className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
          style={{ background: row.isActive ? "#C8102E" : "#D1D5DB" }}
        >
          <span
            className="inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
            style={{ transform: row.isActive ? "translateX(18px)" : "translateX(2px)" }}
          />
        </button>
      </td>

      {/* Save */}
      <td className="px-3 py-3 w-[10%] text-right">
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background:
                status === "saved"
                  ? "#22C55E"
                  : status === "error"
                  ? "#EF4444"
                  : "linear-gradient(135deg, #E31530 0%, #C8102E 100%)",
              color: "#fff",
              boxShadow:
                status === "idle" || status === "saving"
                  ? "0 2px 6px rgba(200,16,46,0.3)"
                  : "none",
            }}
          >
            {status === "saving"
              ? "Saving…"
              : status === "saved"
              ? "✓ Saved"
              : status === "error"
              ? "✗ Error"
              : "Save"}
          </button>
          {errorMsg && (
            <span className="text-[0.6rem] text-red-500 text-right leading-tight max-w-[100px]">
              {errorMsg}
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function PricingManager({ pricing }: { pricing: Pricing[] }) {
  // Build lookup map: slug → Pricing record
  const pricingMap = Object.fromEntries(pricing.map((p) => [p.serviceSlug, p]));

  // Initial row state from DB
  const [rows, setRows] = useState<Record<string, RowState>>(() =>
    Object.fromEntries(
      pricing.map((p) => [
        p.serviceSlug,
        {
          price: p.price,
          priceLabel: p.priceLabel,
          priceNote: p.priceNote ?? "",
          isActive: p.isActive,
        },
      ])
    )
  );

  const [statuses, setStatuses] = useState<Record<string, SaveStatus>>({});
  const [errors, setErrors] = useState<Record<string, ErrorMsg>>({});

  const handleChange = useCallback(
    (slug: string, field: keyof RowState, value: string | boolean) => {
      setRows((prev) => ({
        ...prev,
        [slug]: { ...prev[slug], [field]: value },
      }));
      // Clear error on edit
      setErrors((prev) => ({ ...prev, [slug]: null }));
    },
    []
  );

  const handleSave = useCallback(async (slug: string) => {
    setStatuses((prev) => ({ ...prev, [slug]: "saving" }));
    setErrors((prev) => ({ ...prev, [slug]: null }));

    try {
      const row = rows[slug];
      const res = await fetch(`/api/admin/pricing/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });

      const data = await res.json();

      if (res.ok) {
        setStatuses((prev) => ({ ...prev, [slug]: "saved" }));
        setTimeout(
          () => setStatuses((prev) => ({ ...prev, [slug]: "idle" })),
          2500
        );
      } else {
        setStatuses((prev) => ({ ...prev, [slug]: "error" }));
        setErrors((prev) => ({ ...prev, [slug]: data.error ?? "Failed" }));
        setTimeout(
          () => setStatuses((prev) => ({ ...prev, [slug]: "idle" })),
          3500
        );
      }
    } catch {
      setStatuses((prev) => ({ ...prev, [slug]: "error" }));
      setErrors((prev) => ({ ...prev, [slug]: "Network error" }));
      setTimeout(
        () => setStatuses((prev) => ({ ...prev, [slug]: "idle" })),
        3500
      );
    }
  }, [rows]);

  return (
    <div className="space-y-6">
      {GROUPS.map((group) => {
        const items = group.slugs
          .map((slug) => pricingMap[slug])
          .filter(Boolean) as Pricing[];

        if (items.length === 0) return null;

        return (
          <div
            key={group.label}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            {/* Group header */}
            <div
              className="flex items-center gap-2.5 px-5 py-3.5"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
            >
              <span className="text-base" aria-hidden="true">
                {group.icon}
              </span>
              <h2 className="text-sm font-bold text-slate-800">{group.label}</h2>
              <span className="ml-auto text-[0.65rem] font-medium text-slate-400">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <th className="px-4 py-2.5 text-left text-[0.62rem] font-semibold uppercase tracking-wider text-slate-400">
                      Service
                    </th>
                    <th className="px-3 py-2.5 text-left text-[0.62rem] font-semibold uppercase tracking-wider text-slate-400">
                      Label
                    </th>
                    <th className="px-3 py-2.5 text-left text-[0.62rem] font-semibold uppercase tracking-wider text-slate-400">
                      Price
                    </th>
                    <th className="px-3 py-2.5 text-left text-[0.62rem] font-semibold uppercase tracking-wider text-slate-400 hidden lg:table-cell">
                      Note
                    </th>
                    <th className="px-3 py-2.5 text-center text-[0.62rem] font-semibold uppercase tracking-wider text-slate-400">
                      Active
                    </th>
                    <th className="px-3 py-2.5 text-right text-[0.62rem] font-semibold uppercase tracking-wider text-slate-400">
                      Save
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <PricingRow
                      key={item.serviceSlug}
                      item={item}
                      row={rows[item.serviceSlug]}
                      status={statuses[item.serviceSlug] ?? "idle"}
                      errorMsg={errors[item.serviceSlug] ?? null}
                      onChange={(field, value) =>
                        handleChange(item.serviceSlug, field, value)
                      }
                      onSave={() => handleSave(item.serviceSlug)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
