import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CallsPanel from "@/components/admin/CallsPanel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Calls | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function CallsPage() {
  const calls = await prisma.call.findMany({
    orderBy: { startedAt: "desc" },
    take: 50,
    include: {
      summary: true,
      events: { orderBy: { createdAt: "asc" } },
      transcripts: { orderBy: { turnIndex: "asc" } },
    },
  });

  const serialized = calls.map((c) => ({
    ...c,
    startedAt: c.startedAt.toISOString(),
    endedAt: c.endedAt?.toISOString() ?? null,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
    summary: c.summary
      ? {
          ...c.summary,
          createdAt: c.summary.createdAt.toISOString(),
          transcriptText: c.summary.transcriptText ?? null,
        }
      : null,
    events: c.events.map((e) => ({
      ...e,
      createdAt: e.createdAt.toISOString(),
    })),
    transcripts: c.transcripts.map((t) => ({
      ...t,
      spokenAt: t.spokenAt.toISOString(),
      createdAt: t.createdAt.toISOString(),
    })),
  }));

  return <CallsPanel initialCalls={serialized} />;
}
