import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { key } = await params;
  const { body, subject, isActive } = await req.json();

  const existing = await prisma.messageTemplate.findUnique({ where: { key } });
  if (!existing) return NextResponse.json({ error: "Template not found" }, { status: 404 });

  const updated = await prisma.messageTemplate.update({
    where: { key },
    data: {
      ...(body !== undefined   && { body }),
      ...(subject !== undefined && { subject }),
      ...(isActive !== undefined && { isActive }),
      version: { increment: 1 },
    },
  });

  return NextResponse.json(updated);
}
