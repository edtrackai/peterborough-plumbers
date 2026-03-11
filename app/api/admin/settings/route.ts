import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.siteSettings.findUniqueOrThrow({ where: { id: "singleton" } });
  return NextResponse.json(settings);
}

export async function PATCH(req: Request) {
  const body = await req.json();

  const allowed = [
    "companyName",
    "phone",
    "phoneHref",
    "whatsappNumber",
    "email",
    "address",
    "gasSafeNumber",
    "googleRating",
    "reviewCount",
    "yearsExperience",
  ];

  const data: Record<string, string> = {};
  for (const key of allowed) {
    if (typeof body[key] === "string") data[key] = body[key].trim();
  }

  const settings = await prisma.siteSettings.update({
    where: { id: "singleton" },
    data,
  });

  // Purge the full-route cache so every page picks up the new settings immediately.
  revalidatePath("/", "layout");

  return NextResponse.json(settings);
}
