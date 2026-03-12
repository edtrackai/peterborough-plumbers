"use client";

import { useState } from "react";
import WhatsAppChats from "./WhatsAppChats";
import DispatchPanel from "./DispatchPanel";

// Re-use the prop types from each child (passed through as-is)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WhatsAppTabs({ initialChats, initialLeads }: { initialChats: any[]; initialLeads: any[] }) {
  const [tab, setTab] = useState<"customers" | "plumbers">("customers");

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div
        className="flex items-center gap-1 px-4 py-2 bg-white border-b shrink-0"
        style={{ borderColor: "rgba(0,0,0,0.06)" }}
      >
        <button
          onClick={() => setTab("customers")}
          className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          style={
            tab === "customers"
              ? { background: "rgba(200,16,46,0.08)", color: "#C8102E" }
              : { color: "#64748B" }
          }
        >
          Customers
        </button>
        <button
          onClick={() => setTab("plumbers")}
          className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          style={
            tab === "plumbers"
              ? { background: "rgba(200,16,46,0.08)", color: "#C8102E" }
              : { color: "#64748B" }
          }
        >
          Plumber Dispatch
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {tab === "customers" ? (
          <WhatsAppChats initialChats={initialChats} />
        ) : (
          <DispatchPanel initialLeads={initialLeads} />
        )}
      </div>
    </div>
  );
}
