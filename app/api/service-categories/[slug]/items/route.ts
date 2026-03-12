import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const category = await prisma.serviceCategory.findUnique({
    where: { slug },
    include: {
      serviceItems: {
        where:   { isActive: true },
        orderBy: { sortOrder: "asc" },
        select:  { id: true, name: true, slug: true, defaultQuoteType: true, hasQuantity: true },
      },
    },
  });

  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ items: category.serviceItems });
}
