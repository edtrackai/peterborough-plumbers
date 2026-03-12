import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";

export async function GET(req: NextRequest) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const settings = await prisma.configSetting.findMany({ orderBy: [{ group: "asc" }, { key: "asc" }] });
  return NextResponse.json({ settings });
}
