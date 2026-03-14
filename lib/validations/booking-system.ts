import { z } from "zod";

// ── Update Status (Admin) ─────────────────────────────────────────────────

const VALID_TRANSITIONS: Record<string, string[]> = {
  reserved:             ["pending_assignment", "new", "expired", "cancelled"],
  pending_assignment:   ["accepted", "cancelled"],
  new:                  ["pending_assignment", "confirmed", "cancelled"],
  confirmed:            ["completed", "cancelled"],
  accepted:             ["en_route", "cancelled"],
  en_route:             ["arrived", "cancelled"],
  arrived:              ["in_progress", "cancelled"],
  in_progress:          ["completed", "cancelled"],
  completed:            [],
  cancelled:            [],
  expired:              [],
  // Quote-system statuses
  quote_requested:      ["quote_sent", "cancelled"],
  quote_sent:           ["quote_approved", "quote_declined", "quote_expired", "cancelled"],
  quote_approved:       ["pending_assignment", "cancelled"],
  quote_declined:       [],
  quote_expired:        [],
  inspection_scheduled: ["quote_sent", "cancelled"],
  revisit_required:     ["pending_assignment", "cancelled"],
};

const ALL_STATUSES = z.enum([
  "reserved",
  "pending_assignment",
  "new",
  "confirmed",
  "accepted",
  "en_route",
  "arrived",
  "in_progress",
  "completed",
  "cancelled",
  "expired",
  // Quote-system statuses
  "quote_requested",
  "quote_sent",
  "quote_approved",
  "quote_declined",
  "quote_expired",
  "inspection_scheduled",
  "revisit_required",
]);

export const updateStatusSchema = z
  .object({ status: ALL_STATUSES, currentStatus: ALL_STATUSES })
  .superRefine((data, ctx) => {
    if (!VALID_TRANSITIONS[data.currentStatus]?.includes(data.status)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Cannot transition from "${data.currentStatus}" to "${data.status}"`,
        path: ["status"],
      });
    }
  });

export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
