import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import WhatsAppChats from "@/components/admin/WhatsAppChats";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "WhatsApp | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function WhatsAppPage() {
  const chats = await prisma.waChat.findMany({
    orderBy: { lastMessageAt: "desc" },
    take: 50,
    include: {
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  // Serialize Date objects to ISO strings for client component
  const serialized = chats.map((c) => ({
    ...c,
    lastMessageAt: c.lastMessageAt.toISOString(),
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
    messages: c.messages.map((m) => ({
      ...m,
      createdAt: m.createdAt.toISOString(),
    })),
  }));

  return <WhatsAppChats initialChats={serialized} />;
}
