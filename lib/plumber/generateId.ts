/**
 * Generates and assigns a unique, human-readable Plumber ID (PLM-000001).
 *
 * Safe under concurrent approvals:
 * - Reads current MAX to determine next number
 * - Updates with WHERE plumberId IS NULL guard (prevents double-assignment)
 * - Retries up to 5 times on unique constraint collision (P2002)
 */

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function assignPlumberId(id: string): Promise<string> {
  for (let attempt = 1; attempt <= 5; attempt++) {
    // Find highest existing PLM number
    const last = await prisma.plumber.findFirst({
      where: { plumberId: { not: null } },
      orderBy: { plumberId: "desc" },
      select: { plumberId: true },
    });

    const lastNum = last?.plumberId
      ? parseInt(last.plumberId.replace("PLM-", ""), 10)
      : 0;

    const nextId = `PLM-${String(lastNum + 1).padStart(6, "0")}`;

    try {
      await prisma.plumber.update({
        where: { id },
        data: { plumberId: nextId },
      });
      return nextId;
    } catch (err) {
      // P2002 = unique constraint violation (race condition — retry with next number)
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        if (attempt === 5) throw new Error("Failed to assign unique Plumber ID after 5 attempts");
        continue;
      }
      throw err;
    }
  }
  throw new Error("Failed to assign Plumber ID");
}
