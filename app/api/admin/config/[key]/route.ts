import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { bustConfigCache } from "@/lib/quotes/config";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { key } = await params;
  const { value } = await req.json();

  if (value === undefined || value === null) {
    return NextResponse.json({ error: "value is required" }, { status: 400 });
  }

  const updated = await prisma.configSetting.update({
    where: { key },
    data: { value: String(value) },
  });

  bustConfigCache();
  return NextResponse.json(updated);
}
