/**
 * fix-service-content.ts
 *
 * Targeted string-replacement fixes on live pb_services DB records.
 *
 * Fixes:
 * 1. Remove fake Gas Safe registration number "Reg: 123456" from all service content
 * 2. Replace over-strong emergency ETA promises ("within the hour", "within 1 hour")
 *    with the consistent approved wording
 *
 * Run with:
 *   npx tsx prisma/fix-service-content.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ── Replacement pairs ──────────────────────────────────────────────────────────
// Each entry: [exactStringToFind, replacement]
// Applied to the `content` field of every service record.

const contentReplacements: [string, string][] = [
  // ── Gas Safe placeholder removal ─────────────────────────────────────────
  // Remove " (Reg: 123456)" appended to "Gas Safe registered engineers"
  [" (Reg: 123456)", ""],
  // Remove ", Reg: 123456," in list items
  [", Reg: 123456,", ","],
  // Catch remaining bare occurrence in list items
  ["Gas Safe registered engineers (Reg: 123456)", "Gas Safe registered engineers"],

  // ── Emergency ETA over-promises ─────────────────────────────────────────
  // emergency-plumber content line 645
  [
    "with an experienced engineer typically at your door within the hour",
    "with fast response across Peterborough — ETA confirmed when you contact us",
  ],
  // emergency-plumber how-it-works step 3
  [
    "for genuine emergencies in Peterborough, we aim to reach you within 1 hour",
    "for genuine emergencies in Peterborough, we respond fast — ETA confirmed when you call",
  ],
  // emergency-plumber "Why Choose" bullet
  [
    "Aim to reach you within 1 hour across Peterborough",
    "Fast response across Peterborough — ETA confirmed when you call",
  ],
  // plumbing-repairs emergency section
  [
    "We aim to reach you within the hour and make the situation safe on the first visit",
    "We respond fast and make the situation safe on the first visit",
  ],
  // catch any remaining "within the hour" in service content
  [
    "typically at your door within the hour",
    "with fast response — ETA confirmed when you contact us",
  ],
];

// FAQ-specific replacements (applied to `faqs` JSON field as string)
const faqReplacements: [string, string][] = [
  // emergency-plumber FAQ answer
  [
    "We aim to reach you within 1 hour for genuine emergencies across the Peterborough area. Response times may vary during periods of very high demand, but we always prioritise the most urgent situations first.",
    "Fast response across Peterborough — genuine emergencies are always prioritised. ETA confirmed when you contact us. Response times may vary during periods of very high demand.",
  ],
  // landlord-services FAQ
  [
    "We aim to reach emergency call-outs within 1 hour across the Peterborough area.",
    "We respond fast to emergency call-outs across the Peterborough area — ETA confirmed when you call.",
  ],
];

function applyReplacements(text: string, pairs: [string, string][]): string {
  let result = text;
  for (const [find, replace] of pairs) {
    result = result.split(find).join(replace);
  }
  return result;
}

async function main() {
  const services = await prisma.service.findMany({
    select: { id: true, slug: true, content: true, faqs: true },
  });

  let updatedCount = 0;

  for (const svc of services) {
    const originalContent = svc.content ?? "";
    const originalFaqs   = JSON.stringify(svc.faqs ?? []);

    const newContent = applyReplacements(originalContent, contentReplacements);
    const newFaqsStr = applyReplacements(originalFaqs, faqReplacements);

    const contentChanged = newContent !== originalContent;
    const faqsChanged    = newFaqsStr !== originalFaqs;

    if (!contentChanged && !faqsChanged) continue;

    const updateData: Record<string, unknown> = {};
    if (contentChanged) updateData.content = newContent;
    if (faqsChanged)    updateData.faqs    = JSON.parse(newFaqsStr);

    await prisma.service.update({
      where: { id: svc.id },
      data: updateData,
    });

    console.log(`✓ Updated: ${svc.slug}${contentChanged ? " [content]" : ""}${faqsChanged ? " [faqs]" : ""}`);
    updatedCount++;
  }

  console.log(`\nDone. ${updatedCount} service(s) updated.`);
}

main()
  .catch((err) => { console.error(err); process.exit(1); })
  .finally(() => prisma.$disconnect());
