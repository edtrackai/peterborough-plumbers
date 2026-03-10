import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { revalidatePath } from "next/cache";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  try {
    const { slug } = await params;
    const body = await req.json();
    const { price, priceLabel, priceNote, isActive } = body;

    // Validation
    if (!price || typeof price !== "string" || price.trim().length === 0) {
      return NextResponse.json({ error: "Price is required." }, { status: 400 });
    }
    if (price.trim().length > 30) {
      return NextResponse.json({ error: "Price too long (max 30 chars)." }, { status: 400 });
    }
    if (typeof priceLabel === "string" && priceLabel.length > 20) {
      return NextResponse.json({ error: "Label too long (max 20 chars)." }, { status: 400 });
    }
    if (typeof priceNote === "string" && priceNote.length > 200) {
      return NextResponse.json({ error: "Note too long (max 200 chars)." }, { status: 400 });
    }

    const updated = await prisma.pricing.update({
      where: { serviceSlug: slug },
      data: {
        price: price.trim(),
        priceLabel: typeof priceLabel === "string" ? priceLabel.trim() : "",
        priceNote: typeof priceNote === "string" && priceNote.trim() ? priceNote.trim() : null,
        isActive: Boolean(isActive),
      },
    });

    // Revalidate pages that display pricing
    revalidatePath("/pricing");
    revalidatePath("/emergency");
    // Boiler service page uses ISR — force immediate revalidation when its price changes
    if (slug === "annual-boiler-service") {
      revalidatePath("/services/boiler-service");
    }

    return NextResponse.json({ success: true, pricing: updated });
  } catch {
    return NextResponse.json({ error: "Update failed. Please try again." }, { status: 500 });
  }
}
