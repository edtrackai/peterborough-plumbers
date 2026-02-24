import { sql } from "@/lib/db";

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string | null;
  time_window: string | null;
  details: string | null;
  postcode: string | null;
  status: "new" | "confirmed" | "completed" | "cancelled";
  source: string;
  created_at: string;
}

export interface CreateBookingInput {
  name: string;
  email: string;
  phone: string;
  service: string;
  date?: string;
  timeWindow?: string;
  details?: string;
  postcode?: string;
  ipAddress?: string;
}

export async function createBooking(data: CreateBookingInput): Promise<string> {
  const rows = await sql`
    INSERT INTO bookings (name, email, phone, service, preferred_date, time_window, details, postcode, ip_address)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.phone},
      ${data.service},
      ${data.date ?? null},
      ${data.timeWindow ?? null},
      ${data.details ?? null},
      ${data.postcode ?? null},
      ${data.ipAddress ?? null}
    )
    RETURNING id
  `;
  return (rows[0] as { id: string }).id;
}

export async function getBookings(limit = 50): Promise<Booking[]> {
  const rows = await sql`
    SELECT * FROM bookings
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows as Booking[];
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<void> {
  await sql`
    UPDATE bookings
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${id}
  `;
}
