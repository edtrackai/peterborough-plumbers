import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  postcode: z
    .string()
    .min(5, "Please enter a valid postcode")
    .regex(/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i, "Please enter a valid UK postcode"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  timeWindow: z.string().min(1, "Please select a time window"),
  details: z.string().min(10, "Please provide at least 10 characters about the issue"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
