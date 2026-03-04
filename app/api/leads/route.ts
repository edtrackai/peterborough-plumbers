import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .min(10, "Enter a valid UK phone number")
    .max(20)
    .regex(/^[\d\s+()-]+$/, "Invalid phone number"),
  email: z.string().email("Enter a valid email address").optional(),
  postcode: z
    .string()
    .min(3, "Enter a valid postcode")
    .max(10)
    .transform((v) => v.trim().toUpperCase()),
  serviceType: z.string().optional(),
  message: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({ data: parsed.data });
    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[leads POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
