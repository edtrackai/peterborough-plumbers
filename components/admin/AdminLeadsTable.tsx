"use client";

import { useState, useTransition } from "react";

const STATUS_OPTIONS = ["new", "contacted", "converted", "closed"] as const;
type LeadStatus = (typeof STATUS_OPTIONS)[number];

const STATUS_COLOURS: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

export interface SerializedLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  serviceType: string | null;
  status: string;
  source: string;
  createdAt: string;
}

function LeadRow({ lead }: { lead: SerializedLead }) {
  const [status, setStatus] = useState<LeadStatus>(lead.status as LeadStatus);
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(newStatus: LeadStatus) {
    startTransition(async () => {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) setStatus(newStatus);
    });
  }

  const date = new Date(lead.createdAt);
  const dateStr = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm">
        <p className="font-semibold text-pp-heading">{lead.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{dateStr} {timeStr}</p>
      </td>
      <td className="px-4 py-3 text-sm">
        <a href={`tel:${lead.phone}`} className="text-pp-teal hover:underline">{lead.phone}</a>
        <br />
        <a href={`mailto:${lead.email}`} className="text-xs text-gray-500 hover:underline">{lead.email}</a>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{lead.postcode}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{lead.serviceType ?? <span className="text-gray-400">—</span>}</td>
      <td className="px-4 py-3">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLOURS[status] ?? "bg-gray-100 text-gray-500"}`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-3">
        <select
          value={status}
          disabled={isPending}
          onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
          className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-pp-teal disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </td>
    </tr>
  );
}

export function AdminLeadsTable({ leads }: { leads: SerializedLead[] }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white py-16 text-center">
        <p className="text-gray-500 text-sm">No leads found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-x-auto">
      <table className="w-full min-w-[780px] text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-400">
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Postcode</th>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Update</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
