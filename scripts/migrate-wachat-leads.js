const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  const chats = await prisma.waChat.findMany();
  console.log("Total WaChats:", chats.length);

  let created = 0;
  let skipped = 0;

  for (const chat of chats) {
    const existing = await prisma.lead.findFirst({
      where: { phone: chat.waId, source: "whatsapp" },
    });
    if (existing) {
      skipped++;
      continue;
    }

    const lastMsg = await prisma.waMessage.findFirst({
      where: { chatId: chat.id, role: "user" },
      orderBy: { createdAt: "desc" },
    });

    await prisma.lead.create({
      data: {
        name: chat.customerName || "WhatsApp User",
        phone: chat.customerPhone || chat.waId,
        postcode: chat.postcode || "N/A",
        serviceType: chat.serviceType || null,
        source: "whatsapp",
      },
    });
    created++;
  }

  console.log("Leads created:", created, "| Skipped:", skipped);
  await prisma.$disconnect();
}

run().catch(console.error);
