/**
 * Immutable append-only audit log writer.
 * Never throws — audit failures must not break business logic.
 */
import { prisma } from "@/lib/prisma";

export type AuditActor = "system" | "admin" | "plumber" | "customer";

export interface AuditParams {
  entityType: "quote" | "booking" | "variation" | "revisit" | "invoice";
  entityId: string;
  eventType: string;
  actorType: AuditActor;
  actorId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
}

export async function logEvent(params: AuditParams): Promise<void> {
  try {
    await prisma.activityLog.create({
      data: {
        entityType: params.entityType,
        entityId:   params.entityId,
        eventType:  params.eventType,
        actorType:  params.actorType,
        actorId:    params.actorId ?? null,
        metadata:   (params.metadata ?? {}) as object,
        ipAddress:  params.ipAddress ?? null,
      },
    });
  } catch {
    // Silently swallow — audit must never break the calling operation
  }
}
