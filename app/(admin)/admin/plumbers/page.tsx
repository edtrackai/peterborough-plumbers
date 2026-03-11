import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PlumbersPanel from "@/components/admin/PlumbersPanel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function PlumbersPage() {
  const plumbers = await prisma.plumber.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      isActive: true,
      isOnDuty: true,
      lastSeenAt: true,
      createdAt: true,
      approvalStatus: true,
      plumberId: true,
      adminNote: true,
      gasSafeNumber: true,
      verifiedGeneral: true,
      boilerGasApproved: true,
      _count: { select: { bookings: true } },
    },
  });

  const serialized = plumbers.map((p) => ({
    ...p,
    lastSeenAt: p.lastSeenAt?.toISOString() ?? null,
    createdAt: p.createdAt.toISOString(),
  }));

  return <PlumbersPanel initial={serialized} />;
}
