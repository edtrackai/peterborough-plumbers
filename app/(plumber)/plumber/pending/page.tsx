import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import PendingClient from "./PendingClient";

export const dynamic = "force-dynamic";

export default async function PendingPage() {
  const session = await getPlumberSession();
  if (!session.plumberId) redirect("/plumber/login");

  const plumber = await prisma.plumber.findUnique({
    where: { id: session.plumberId },
    select: { name: true, email: true, approvalStatus: true, adminNote: true, plumberId: true },
  });

  if (!plumber) redirect("/plumber/login");

  // Approved plumbers should be in /plumber/requests
  if (plumber.approvalStatus === "approved") redirect("/plumber/requests");

  return (
    <PendingClient
      name={plumber.name}
      email={plumber.email}
      approvalStatus={plumber.approvalStatus}
      adminNote={plumber.adminNote ?? null}
    />
  );
}
