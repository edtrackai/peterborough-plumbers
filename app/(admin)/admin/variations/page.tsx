import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { VariationsClient } from "@/components/admin/VariationsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Variations | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function AdminVariationsPage() {
  const [rawPending, rawAll] = await Promise.all([
    prisma.variation.findMany({
      where: { status: "pending_office" },
      orderBy: { createdAt: "asc" },
      include: {
        booking: { select: { bookingRef: true, customerName: true, serviceType: true } },
        raisedByPlumber: { select: { name: true, phone: true } },
        reasons: { select: { id: true, key: true, label: true, isChargeable: true } },
        images: { select: { id: true, url: true } },
      },
    }),
    prisma.variation.findMany({
      where: { status: { notIn: ["pending_office", "draft"] } },
      orderBy: { updatedAt: "desc" },
      take: 100,
      include: {
        booking: { select: { bookingRef: true, customerName: true, serviceType: true } },
        raisedByPlumber: { select: { name: true } },
        reasons: { select: { id: true, key: true, label: true } },
        images: { select: { id: true, url: true } },
      },
    }),
  ]);

  function serialise(v: (typeof rawPending)[number] | (typeof rawAll)[number]) {
    return {
      id: v.id,
      variationRef: v.variationRef,
      status: v.status,
      extraLabourCost: v.extraLabourCost.toNumber(),
      extraMaterialCost: v.extraMaterialCost.toNumber(),
      extraTotal: v.extraTotal.toNumber(),
      notes: v.notes,
      officeApprovedBy: v.officeApprovedBy,
      officeApprovedAt: v.officeApprovedAt?.toISOString() ?? null,
      createdAt: v.createdAt.toISOString(),
      updatedAt: v.updatedAt.toISOString(),
      bookingRef: v.booking.bookingRef,
      customerName: v.booking.customerName,
      serviceType: v.booking.serviceType,
      plumberName: v.raisedByPlumber.name,
      plumberPhone: ("phone" in v.raisedByPlumber ? v.raisedByPlumber.phone : null) ?? null,
      reasons: v.reasons.map((r) => ({
        id: r.id,
        key: r.key,
        label: r.label,
        isChargeable: "isChargeable" in r ? r.isChargeable : true,
      })),
      images: v.images.map((img) => ({ id: img.id, url: img.url })),
    };
  }

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Quote &amp; Variation
          </p>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Variations</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review and approve engineer-raised variations before they are sent to customers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600"
            style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            {rawPending.length} awaiting approval
          </span>
        </div>
      </div>

      <VariationsClient
        pending={rawPending.map(serialise)}
        all={rawAll.map(serialise)}
      />
    </div>
  );
}
