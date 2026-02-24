import { z } from "zod";

// ── Check Availability ─────────────────────────────────────────────────────

export const checkAvailabilitySchema = z.object({
  postcode: z
    .string()
    .min(1, "Postcode is required")
    .max(10, "Postcode too long")
    .transform((v) => v.trim().toUpperCase()),
});

export type CheckAvailabilityInput = z.infer<typeof checkAvailabilitySchema>;

// ── Reserve Slot ──────────────────────────────────────────────────────────

export const reserveSlotSchema = z.object({
  slotId: z.string().min(1, "Slot ID is required"),
  postcode: z
    .string()
    .min(1, "Postcode is required")
    .transform((v) => v.trim().toUpperCase()),
  zonePrefix: z.string().min(1, "Zone prefix is required"),
});

export type ReserveSlotInput = z.infer<typeof reserveSlotSchema>;

// ── Confirm Booking ───────────────────────────────────────────────────────

export const confirmBookingSchema = z.object({
  bookingRef: z.string().min(1, "Booking reference is required"),
  serviceType: z.string().min(1, "Service type is required"),
  description: z.string().optional(),
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100),
  phone: z
    .string()
    .min(10, "Enter a valid UK phone number")
    .max(20)
    .regex(/^[\d\s+()-]+$/, "Invalid phone number"),
  email: z.string().email("Enter a valid email address"),
  address: z
    .string()
    .min(5, "Enter your full address")
    .max(250),
  accessNotes: z.string().max(500).optional(),
  photoUrls: z
    .array(z.string().url())
    .max(3, "Maximum 3 photos allowed")
    .optional(),
  photoPublicIds: z.array(z.string()).max(3).optional(),
});

export type ConfirmBookingInput = z.infer<typeof confirmBookingSchema>;

// ── Update Status (Admin) ─────────────────────────────────────────────────

const VALID_TRANSITIONS: Record<string, string[]> = {
  reserved:           ["pending_assignment", "new", "expired", "cancelled"],
  pending_assignment: ["accepted", "cancelled"],
  new:                ["pending_assignment", "confirmed", "cancelled"],
  confirmed:          ["completed", "cancelled"],
  accepted:           ["en_route", "cancelled"],
  en_route:           ["arrived", "cancelled"],
  arrived:            ["in_progress", "cancelled"],
  in_progress:        ["completed", "cancelled"],
  completed:          [],
  cancelled:          [],
  expired:            [],
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
