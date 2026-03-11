/**
 * Central eligibility engine for plumber–job matching.
 *
 * Rules:
 * 1. Plumber must be approved + active
 * 2. Plumber must be on duty
 * 3. Plumber must be verifiedGeneral (required for all jobs)
 * 4. Boiler/gas jobs additionally require boilerGasApproved
 * 5. Plumber must not have a currently active booking (conflict check)
 *
 * Do NOT duplicate this logic in UI or other API routes.
 */

import { prisma } from "@/lib/prisma";

// Service types that require boilerGasApproved permission
const BOILER_GAS_KEYWORDS = [
  "boiler",
  "gas",
  "heating",
];

export function requiresBoilerGasApproval(serviceType: string | null | undefined): boolean {
  if (!serviceType) return false;
  const lower = serviceType.toLowerCase();
  return BOILER_GAS_KEYWORDS.some((kw) => lower.includes(kw));
}

// Statuses that count as "plumber is currently busy"
const ACTIVE_STATUSES = ["accepted", "en_route", "arrived", "in_progress"];

export type EligiblePlumber = {
  id: string;
  name: string;
  email: string;
};

export async function getEligiblePlumbersForRequest(booking: {
  serviceType?: string | null;
  zonePrefix?: string;
}): Promise<EligiblePlumber[]> {
  const needsBoilerGas = requiresBoilerGasApproval(booking.serviceType);

  // Find plumbers meeting all static criteria
  const candidates = await prisma.plumber.findMany({
    where: {
      isActive: true,
      isOnDuty: true,
      approvalStatus: "approved",
      verifiedGeneral: true,
      ...(needsBoilerGas ? { boilerGasApproved: true } : {}),
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (candidates.length === 0) return [];

  // Exclude plumbers with an active booking right now (busy check)
  const busyPlumberIds = await prisma.booking.findMany({
    where: {
      status: { in: ACTIVE_STATUSES },
      assignedPlumberId: { in: candidates.map((p) => p.id) },
    },
    select: { assignedPlumberId: true },
  }).then((rows) => new Set(rows.map((r) => r.assignedPlumberId)));

  return candidates.filter((p) => !busyPlumberIds.has(p.id));
}
