/**
 * Processes inbound WhatsApp messages to detect quote approval/decline.
 * Matches against keywords from pb_approval_keywords table.
 */
import { prisma } from "@/lib/prisma";
import { logEvent } from "@/lib/audit";
import { renderNamedTemplate } from "@/lib/quotes/templates";
import { sendText } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/db/content";

export type ApprovalIntent = "approve" | "decline" | "discuss" | "unclear";

export interface ApprovalResult {
  intent:       ApprovalIntent;
  quoteRef:     string | null;
  bookingId:    string | null;
  replyMessage: string;
  processed:    boolean;
}

let keywordCache: { word: string; intent: string }[] | null = null;
let keywordCacheExpiry = 0;

async function getKeywords(): Promise<{ word: string; intent: string }[]> {
  if (keywordCache && Date.now() < keywordCacheExpiry) return keywordCache;
  const rows = await prisma.approvalKeyword.findMany({ where: { isActive: true } });
  keywordCache = rows.map(r => ({ word: r.word.toLowerCase().trim(), intent: r.intent }));
  keywordCacheExpiry = Date.now() + 5 * 60 * 1000;
  return keywordCache;
}

function normalise(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

async function detectIntent(text: string): Promise<ApprovalIntent> {
  const normalised = normalise(text);
  const keywords = await getKeywords();

  // Exact match first
  const exact = keywords.find(k => k.word === normalised);
  if (exact) return exact.intent as ApprovalIntent;

  // Contains match
  const contains = keywords.find(k => normalised.includes(k.word));
  if (contains) return contains.intent as ApprovalIntent;

  return "unclear";
}

/** Normalise phone → waId (strip +, spaces, parens) */
function normalisePhone(phone: string): string {
  let p = phone.replace(/[^\d]/g, "");
  if (p.startsWith("0")) p = "44" + p.slice(1);
  return p;
}

export async function processInboundQuoteReply(
  waId: string,
  messageText: string,
  waMessageId: string,
): Promise<ApprovalResult> {
  const settings = await getSiteSettings();

  // Dedup — check if we've already processed this message
  const existing = await prisma.quoteMessage.findUnique({ where: { waMessageId } });
  if (existing) {
    return { intent: "unclear", quoteRef: null, bookingId: null, replyMessage: "", processed: false };
  }

  const intent = await detectIntent(messageText);

  // Find active quote(s) for this waId
  // Match via Booking.phone or Lead.phone
  const normWaId = waId.replace(/\D/g, "");

  const quotes = await prisma.quote.findMany({
    where: {
      status: "sent",
      validUntil: { gt: new Date() },
      OR: [
        { booking: { phone: { contains: normWaId.slice(-9) } } },
        { lead:    { phone: { contains: normWaId.slice(-9) } } },
      ],
    },
    include: {
      booking: { select: { id: true, bookingRef: true, phone: true } },
      lead:    { select: { id: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  if (quotes.length === 0) {
    return { intent, quoteRef: null, bookingId: null, replyMessage: "", processed: false };
  }

  // If multiple quotes, take most recent
  const quote = quotes[0];
  let replyMessage = "";

  // Store inbound message
  await prisma.quoteMessage.create({
    data: {
      quoteId:    quote.id,
      direction:  "inbound",
      channel:    "whatsapp",
      recipient:  waId,
      body:       messageText,
      waMessageId,
      status:     "sent",
    },
  });

  if (intent === "approve") {
    // Atomic update — only if still sent
    const updated = await prisma.quote.updateMany({
      where: { id: quote.id, status: "sent" },
      data: {
        status:         "approved",
        approvedAt:     new Date(),
        approvedByWaId: waId,
        approvedByText: messageText,
      },
    });

    if (updated.count > 0) {
      await logEvent({
        entityType: "quote",
        entityId:   quote.id,
        eventType:  "customer_approved",
        actorType:  "customer",
        metadata:   { waId, replyText: messageText, quoteRef: quote.quoteRef, total: String(quote.total) },
      });

      // Transition booking to pending_assignment
      if (quote.bookingId) {
        await prisma.booking.updateMany({
          where: { id: quote.bookingId, status: "quote_sent" },
          data:  { status: "pending_assignment" },
        });
      }

      replyMessage = await renderNamedTemplate("quote_approved_reply", {
        quote_reference: quote.quoteRef,
        phone: settings.phone,
      });
    }
  } else if (intent === "decline") {
    await prisma.quote.updateMany({
      where: { id: quote.id, status: "sent" },
      data:  { status: "declined", declinedAt: new Date() },
    });

    await logEvent({
      entityType: "quote",
      entityId:   quote.id,
      eventType:  "customer_declined",
      actorType:  "customer",
      metadata:   { waId, replyText: messageText, quoteRef: quote.quoteRef },
    });

    if (quote.bookingId) {
      await prisma.booking.updateMany({
        where: { id: quote.bookingId, status: "quote_sent" },
        data:  { status: "quote_declined" },
      });
    }

    replyMessage = await renderNamedTemplate("quote_declined_reply", {
      quote_reference: quote.quoteRef,
      phone: settings.phone,
    });
  } else if (intent === "discuss") {
    await prisma.quote.updateMany({
      where: { id: quote.id, status: "sent" },
      data:  { status: "draft" }, // hold — admin will manually action
    });

    await logEvent({
      entityType: "quote",
      entityId:   quote.id,
      eventType:  "customer_discuss",
      actorType:  "customer",
      metadata:   { waId, replyText: messageText, quoteRef: quote.quoteRef },
    });

    replyMessage = await renderNamedTemplate("quote_discuss_reply", {
      phone: settings.phone,
    });
  } else {
    // unclear — notify admin, do not change quote state
    replyMessage = await renderNamedTemplate("quote_unclear_reply", {
      phone: settings.phone,
    });
  }

  return {
    intent,
    quoteRef:  quote.quoteRef,
    bookingId: quote.bookingId ?? null,
    replyMessage,
    processed: true,
  };
}
