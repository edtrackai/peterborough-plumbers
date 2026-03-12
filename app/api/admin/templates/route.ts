import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";

export async function GET(req: NextRequest) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const templates = await prisma.messageTemplate.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json({ templates });
}
