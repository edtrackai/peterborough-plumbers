import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = bookingSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.issues },
      { status: 422 }
    );
  }

  const data = result.data;

  // Log booking — replace with email/CRM integration when ready
  console.log("[Booking] New booking request:", {
    name: data.name,
    phone: data.phone,
    email: data.email,
    postcode: data.postcode,
    service: data.service,
    date: data.date,
    timeWindow: data.timeWindow,
    details: data.details,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
