/**
 * Seed: Quote system reference data
 * Run: npx tsx prisma/seed-quote-system.ts
 *
 * Safe to re-run — uses upsert throughout.
 * Tables seeded:
 *   ServiceCategory, ServiceItem, PricingRule, VariationReason,
 *   RevisitReason, MessageTemplate, ApprovalKeyword, ConfigSetting
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ═══════════════════════════════════════════════════════════════════════════════
// 1. SERVICE CATEGORIES
// ═══════════════════════════════════════════════════════════════════════════════

const SERVICE_CATEGORIES = [
  { slug: "plumbing-repairs",  name: "Plumbing Repairs",  icon: "🔧", requiresGasSafe: false, sortOrder: 1 },
  { slug: "boiler-heating",    name: "Boiler & Heating",  icon: "🔥", requiresGasSafe: true,  sortOrder: 2 },
  { slug: "bathrooms",         name: "Bathrooms",         icon: "🚿", requiresGasSafe: false, sortOrder: 3 },
  { slug: "drains-blockages",  name: "Drains & Blockages",icon: "💧", requiresGasSafe: false, sortOrder: 4 },
  { slug: "gas-services",      name: "Gas Services",      icon: "⚡", requiresGasSafe: true,  sortOrder: 5 },
  { slug: "landlord-services", name: "Landlord Services", icon: "🏠", requiresGasSafe: false, sortOrder: 6 },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 2. SERVICE ITEMS  (keyed by category slug)
// ═══════════════════════════════════════════════════════════════════════════════

const SERVICE_ITEMS: Record<
  string,
  {
    slug:             string;
    name:             string;
    defaultQuoteType: string;
    hasQuantity?:     boolean;
    requiresGasSafe?: boolean;
    sortOrder:        number;
  }[]
> = {
  "plumbing-repairs": [
    { slug: "burst-pipe-repair",  name: "Burst pipe repair",               defaultQuoteType: "fixed",    sortOrder: 1 },
    { slug: "leaking-tap",        name: "Leaking tap",                     defaultQuoteType: "fixed",    sortOrder: 2 },
    { slug: "leaking-pipe",       name: "Leaking pipe",                    defaultQuoteType: "fixed",    sortOrder: 3 },
    { slug: "toilet-repair",      name: "Toilet repair/replacement",       defaultQuoteType: "fixed",    hasQuantity: true, sortOrder: 4 },
    { slug: "radiator-repair",    name: "Radiator repair/replacement",     defaultQuoteType: "fixed",    hasQuantity: true, sortOrder: 5 },
    { slug: "stop-tap",           name: "Stopcock/stop tap",               defaultQuoteType: "fixed",    sortOrder: 6 },
    { slug: "water-pressure",     name: "Low water pressure",              defaultQuoteType: "estimate", sortOrder: 7 },
  ],

  "boiler-heating": [
    { slug: "boiler-service",          name: "Annual boiler service",        defaultQuoteType: "fixed",            requiresGasSafe: true, sortOrder: 1 },
    { slug: "boiler-repair",           name: "Boiler repair",                defaultQuoteType: "estimate",         requiresGasSafe: true, sortOrder: 2 },
    { slug: "boiler-replacement",      name: "Boiler replacement",           defaultQuoteType: "inspection_first", requiresGasSafe: true, sortOrder: 3 },
    { slug: "central-heating-flush",   name: "Central heating powerflush",   defaultQuoteType: "fixed",            requiresGasSafe: true, sortOrder: 4 },
  ],

  "bathrooms": [
    { slug: "bathroom-installation", name: "Full bathroom installation", defaultQuoteType: "inspection_first", sortOrder: 1 },
    { slug: "shower-installation",   name: "Shower installation",        defaultQuoteType: "estimate",         sortOrder: 2 },
    { slug: "bath-installation",     name: "Bath installation",          defaultQuoteType: "fixed",            sortOrder: 3 },
    { slug: "toilet-installation",   name: "Toilet installation",        defaultQuoteType: "fixed",            sortOrder: 4 },
  ],

  "drains-blockages": [
    { slug: "blocked-drain",   name: "Blocked drain",   defaultQuoteType: "estimate", sortOrder: 1 },
    { slug: "blocked-toilet",  name: "Blocked toilet",  defaultQuoteType: "fixed",    sortOrder: 2 },
    { slug: "drain-survey",    name: "Drain survey",    defaultQuoteType: "fixed",    sortOrder: 3 },
  ],

  "gas-services": [
    { slug: "gas-safety-cert", name: "Gas safety certificate (CP12)", defaultQuoteType: "fixed",    requiresGasSafe: true, sortOrder: 1 },
    { slug: "gas-leak",        name: "Gas leak investigation",        defaultQuoteType: "estimate", requiresGasSafe: true, sortOrder: 2 },
  ],

  "landlord-services": [
    { slug: "landlord-gas-safety",   name: "Landlord gas safety certificate", defaultQuoteType: "fixed", requiresGasSafe: true, sortOrder: 1 },
    { slug: "landlord-inspection",   name: "Landlord plumbing inspection",    defaultQuoteType: "fixed",                        sortOrder: 2 },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. PRICING RULES (global — serviceItemId = null)
// ═══════════════════════════════════════════════════════════════════════════════

const PRICING_RULES = [
  // Fixed global fees
  {
    ruleType:  "callout_fee",
    label:     "Standard call-out fee",
    valueType: "fixed_amount",
    value:     75.00,
    conditions: null,
  },
  {
    ruleType:   "evening_surcharge",
    label:      "Evening surcharge (after 6pm)",
    valueType:  "fixed_amount",
    value:      25.00,
    conditions: { afterHour: 18 },
  },
  {
    ruleType:   "weekend_surcharge",
    label:      "Weekend surcharge",
    valueType:  "fixed_amount",
    value:      30.00,
    conditions: { dayOfWeek: [0, 6] },
  },
  {
    ruleType:  "min_job_value",
    label:     "Minimum job value",
    valueType: "fixed_amount",
    value:     85.00,
    conditions: null,
  },
  // Urgency multipliers
  {
    ruleType:   "urgency_multiplier",
    label:      "Same-day urgency multiplier",
    valueType:  "multiplier",
    value:      1.30,
    conditions: { urgencyKey: ["same_day"] },
  },
  {
    ruleType:   "urgency_multiplier",
    label:      "Emergency urgency multiplier",
    valueType:  "multiplier",
    value:      1.50,
    conditions: { urgencyKey: ["emergency"] },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 4. VARIATION REASONS
// ═══════════════════════════════════════════════════════════════════════════════

const VARIATION_REASONS = [
  {
    key:                  "fitting_incompatible",
    label:                "Fitting incompatible with existing system",
    isChargeable:         true,
    requiresManagerReview: false,
    autoApproveBelow:     100,
    sortOrder:            1,
  },
  {
    key:                  "hidden_issue",
    label:                "Hidden issue discovered (not visible at survey)",
    isChargeable:         true,
    requiresManagerReview: false,
    autoApproveBelow:     150,
    sortOrder:            2,
  },
  {
    key:                  "extra_material",
    label:                "Additional materials required",
    isChargeable:         true,
    requiresManagerReview: false,
    autoApproveBelow:     100,
    sortOrder:            3,
  },
  {
    key:                  "quantity_changed",
    label:                "Quantity differs from original scope",
    isChargeable:         true,
    requiresManagerReview: false,
    autoApproveBelow:     null,
    sortOrder:            4,
  },
  {
    key:                  "access_problem",
    label:                "Access more difficult than described",
    isChargeable:         true,
    requiresManagerReview: false,
    autoApproveBelow:     75,
    sortOrder:            5,
  },
  {
    key:                  "wrong_customer_part",
    label:                "Customer-supplied part incorrect/incompatible",
    isChargeable:         true,
    requiresManagerReview: false,
    autoApproveBelow:     null,
    sortOrder:            6,
  },
  {
    key:                  "scope_change",
    label:                "Job scope significantly larger than expected",
    isChargeable:         true,
    requiresManagerReview: true,
    autoApproveBelow:     null,
    sortOrder:            7,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 5. REVISIT REASONS
// ═══════════════════════════════════════════════════════════════════════════════

const REVISIT_REASONS = [
  {
    key:                "wrong_customer_part",
    label:              "Customer supplied wrong part",
    isChargeable:       true,
    requiresManager:    false,
    defaultBlameParty:  "customer",
    sortOrder:          1,
  },
  {
    key:                "hidden_issue",
    label:              "Hidden issue requires further work",
    isChargeable:       false,
    requiresManager:    false,
    defaultBlameParty:  "circumstance",
    sortOrder:          2,
  },
  {
    key:                "access_issue_customer",
    label:              "Property access unavailable (customer)",
    isChargeable:       true,
    requiresManager:    false,
    defaultBlameParty:  "customer",
    sortOrder:          3,
  },
  {
    key:                "access_issue_site",
    label:              "Unexpected site access restriction",
    isChargeable:       false,
    requiresManager:    true,
    defaultBlameParty:  "circumstance",
    sortOrder:          4,
  },
  {
    key:                "missing_material",
    label:              "Required material not available — needs order",
    isChargeable:       false,
    requiresManager:    false,
    defaultBlameParty:  "business",
    sortOrder:          5,
  },
  {
    key:                "plumber_issue",
    label:              "Engineer unavailability",
    isChargeable:       false,
    requiresManager:    true,
    defaultBlameParty:  "business",
    sortOrder:          6,
  },
  {
    key:                "inspection_needed",
    label:              "Inspection required before fixed quote",
    isChargeable:       false,
    requiresManager:    false,
    defaultBlameParty:  "circumstance",
    sortOrder:          7,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 6. MESSAGE TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

const MESSAGE_TEMPLATES = [
  {
    key:       "initial_quote",
    channel:   "whatsapp",
    variables: ["customer_name","job_summary","quote_reference","quote_type_label","total","valid_until","appointment_time","line_items","phone"],
    body: `Hi {{customer_name}} 👋

Here's your quote from Peterborough Plumbers:

📋 *Quote ref: {{quote_reference}}*
🔧 Job: {{job_summary}}
📅 Slot: {{appointment_time}}
💰 {{quote_type_label}}: *£{{total}}*

Valid until {{valid_until}}.

To approve reply *YES*
To decline reply *NO*
To discuss reply *DISCUSS*

Questions? Call {{phone}}`,
  },
  {
    key:       "revised_quote",
    channel:   "whatsapp",
    variables: ["customer_name","plumber_name","quote_reference","reason_description","original_total","new_total","extra_total","line_items_summary","phone"],
    body: `Hi {{customer_name}},

{{plumber_name}} has found an issue on site:
_"{{reason_description}}"_

We won't carry out extra work without your written approval.

Updated quote (ref {{quote_reference}}):
Was: £{{original_total}} → Now: *£{{new_total}}*

{{line_items_summary}}

To approve the extra work, reply *YES*
To decline, reply *NO*
To discuss first, reply *DISCUSS*

Call us: {{phone}}`,
  },
  {
    key:       "quote_reminder",
    channel:   "whatsapp",
    variables: ["customer_name","quote_reference","job_summary","valid_until","phone"],
    body: `Hi {{customer_name}}, just a reminder — your quote (ref {{quote_reference}}) for {{job_summary}} expires at {{valid_until}}.

Reply *YES* to confirm or *NO* to cancel.
Questions? {{phone}}`,
  },
  {
    key:       "quote_approved_reply",
    channel:   "whatsapp",
    variables: ["quote_reference","phone"],
    body: `✅ Great — quote {{quote_reference}} approved! We'll confirm your booking shortly.

Questions? Call {{phone}}`,
  },
  {
    key:       "quote_declined_reply",
    channel:   "whatsapp",
    variables: ["quote_reference","phone"],
    body: `Understood — quote {{quote_reference}} has been declined. No work will be carried out.

If you change your mind or have questions, call us on {{phone}}.`,
  },
  {
    key:       "quote_discuss_reply",
    channel:   "whatsapp",
    variables: ["phone"],
    body: `No problem — the office will call you shortly to discuss.
📞 {{phone}}`,
  },
  {
    key:       "quote_unclear_reply",
    channel:   "whatsapp",
    variables: ["phone"],
    body: `To approve your quote reply *YES*, to decline reply *NO*, or call us on {{phone}}.`,
  },
  {
    key:       "second_visit_needed",
    channel:   "whatsapp",
    variables: ["customer_name","plumber_name","reason","is_chargeable","callout_fee","phone"],
    body: `Hi {{customer_name}},

Unfortunately {{plumber_name}} was unable to complete the job today.

Reason: {{reason}}

{{#if is_chargeable}}A return visit call-out charge of £{{callout_fee}} will apply.{{/if}}

Reply *YES* to schedule a return visit or call us: {{phone}}`,
  },
  {
    key:       "plumber_variation_approved",
    channel:   "whatsapp",
    variables: ["customer_name","booking_reference","extra_total"],
    body: `✅ {{customer_name}} has approved the additional work (£{{extra_total}}).

You can proceed. Booking ref: {{booking_reference}}`,
  },
  {
    key:       "plumber_variation_declined",
    channel:   "whatsapp",
    variables: ["customer_name","office_phone"],
    body: `❌ {{customer_name}} has declined the additional work.

Please stop the extra work and contact the office.
📞 {{office_phone}}`,
  },
  {
    key:       "job_complete",
    channel:   "whatsapp",
    variables: ["customer_name","booking_reference","review_link"],
    body: `Hi {{customer_name}}, your job ({{booking_reference}}) is now complete.

Thank you for choosing Peterborough Plumbers! ⭐

We'd love your feedback: {{review_link}}`,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 7. APPROVAL KEYWORDS
// ═══════════════════════════════════════════════════════════════════════════════

const APPROVAL_KEYWORDS: { word: string; intent: "approve" | "decline" | "discuss" }[] = [
  // Approve
  { word: "yes",         intent: "approve" },
  { word: "approve",     intent: "approve" },
  { word: "approved",    intent: "approve" },
  { word: "ok",          intent: "approve" },
  { word: "okay",        intent: "approve" },
  { word: "yep",         intent: "approve" },
  { word: "yup",         intent: "approve" },
  { word: "sure",        intent: "approve" },
  { word: "confirmed",   intent: "approve" },
  { word: "confirm",     intent: "approve" },
  { word: "proceed",     intent: "approve" },
  { word: "go ahead",    intent: "approve" },
  { word: "do it",       intent: "approve" },
  { word: "1",           intent: "approve" },
  { word: "sounds good", intent: "approve" },
  { word: "agreed",      intent: "approve" },
  { word: "accept",      intent: "approve" },
  { word: "accepted",    intent: "approve" },
  // Decline
  { word: "no",          intent: "decline" },
  { word: "decline",     intent: "decline" },
  { word: "declined",    intent: "decline" },
  { word: "cancel",      intent: "decline" },
  { word: "cancelled",   intent: "decline" },
  { word: "stop",        intent: "decline" },
  { word: "dont",        intent: "decline" },
  { word: "don't",       intent: "decline" },
  { word: "refuse",      intent: "decline" },
  { word: "no thanks",   intent: "decline" },
  { word: "3",           intent: "decline" },
  { word: "not now",     intent: "decline" },
  { word: "hold off",    intent: "decline" },
  // Discuss
  { word: "discuss",     intent: "discuss" },
  { word: "question",    intent: "discuss" },
  { word: "query",       intent: "discuss" },
  { word: "call me",     intent: "discuss" },
  { word: "ring me",     intent: "discuss" },
  { word: "talk",        intent: "discuss" },
  { word: "2",           intent: "discuss" },
  { word: "not sure",    intent: "discuss" },
  { word: "unsure",      intent: "discuss" },
  { word: "maybe",       intent: "discuss" },
  { word: "can we talk", intent: "discuss" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 8. CONFIG SETTINGS
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG_SETTINGS = [
  {
    key:         "quote.valid_hours",
    value:       "48",
    valueType:   "number",
    group:       "quotes",
    label:       "Quote validity (hours)",
    description: "Hours before an unanswered quote expires",
  },
  {
    key:         "quote.vat_rate",
    value:       "0",
    valueType:   "number",
    group:       "pricing",
    label:       "VAT rate (%)",
    description: "Set to 0 if not VAT registered",
  },
  {
    key:         "variation.office_approval_above",
    value:       "50",
    valueType:   "number",
    group:       "variations",
    label:       "Office approval threshold (£)",
    description: "Variations above this amount require office sign-off before sending",
  },
  {
    key:         "variation.auto_send_below",
    value:       "50",
    valueType:   "number",
    group:       "variations",
    label:       "Auto-send threshold (£)",
    description: "Variations below this amount are sent automatically",
  },
  {
    key:         "quote.reminder_after_hours",
    value:       "24",
    valueType:   "number",
    group:       "quotes",
    label:       "Quote reminder after (hours)",
    description: "Hours before expiry to send a reminder",
  },
  {
    key:         "revisit.default_callout_fee",
    value:       "75",
    valueType:   "number",
    group:       "variations",
    label:       "Default revisit call-out fee (£)",
    description: "Charged for customer-fault return visits",
  },
  {
    key:         "booking.quote_expiry_action",
    value:       "cancel",
    valueType:   "string",
    group:       "quotes",
    label:       "Quote expiry action",
    description: "cancel = release slot, hold = keep slot for admin",
  },
  {
    key:         "plumber.variation_photo_required",
    value:       "true",
    valueType:   "boolean",
    group:       "variations",
    label:       "Require photo for variations",
    description: "Plumber must upload photo evidence before submitting a variation",
  },
  {
    key:         "upload.max_files",
    value:       "5",
    valueType:   "number",
    group:       "general",
    label:       "Max file uploads per booking",
    description: "",
  },
  {
    key:         "upload.max_size_mb",
    value:       "5",
    valueType:   "number",
    group:       "general",
    label:       "Max upload file size (MB)",
    description: "",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {

  // ── 1. Service Categories ──────────────────────────────────────────────────
  console.log("Seeding service categories…");
  for (const cat of SERVICE_CATEGORIES) {
    await prisma.serviceCategory.upsert({
      where:  { slug: cat.slug },
      create: { ...cat },
      update: { name: cat.name, icon: cat.icon, requiresGasSafe: cat.requiresGasSafe, sortOrder: cat.sortOrder },
    });
  }
  console.log(`  ✓ ${SERVICE_CATEGORIES.length} categories`);

  // ── 2. Service Items ───────────────────────────────────────────────────────
  console.log("Seeding service items…");
  let itemCount = 0;
  for (const [categorySlug, items] of Object.entries(SERVICE_ITEMS)) {
    const category = await prisma.serviceCategory.findUnique({ where: { slug: categorySlug } });
    if (!category) {
      console.warn(`  ⚠ Category not found: ${categorySlug} — skipping items`);
      continue;
    }
    for (const item of items) {
      await prisma.serviceItem.upsert({
        where:  { slug: item.slug },
        create: {
          categoryId:       category.id,
          name:             item.name,
          slug:             item.slug,
          defaultQuoteType: item.defaultQuoteType,
          hasQuantity:      item.hasQuantity  ?? false,
          requiresGasSafe:  item.requiresGasSafe ?? false,
          sortOrder:        item.sortOrder,
        },
        update: {
          name:             item.name,
          defaultQuoteType: item.defaultQuoteType,
          hasQuantity:      item.hasQuantity  ?? false,
          requiresGasSafe:  item.requiresGasSafe ?? false,
          sortOrder:        item.sortOrder,
        },
      });
      itemCount++;
    }
  }
  console.log(`  ✓ ${itemCount} service items`);

  // ── 3. Pricing Rules (global) ──────────────────────────────────────────────
  console.log("Seeding pricing rules…");
  // No natural unique key — check by ruleType+label to avoid duplicates on re-run
  for (const rule of PRICING_RULES) {
    const existing = await prisma.pricingRule.findFirst({
      where: { ruleType: rule.ruleType, label: rule.label, serviceItemId: null },
    });
    if (existing) {
      await prisma.pricingRule.update({
        where: { id: existing.id },
        data: {
          valueType:  rule.valueType,
          value:      rule.value,
          conditions: rule.conditions ?? undefined,
          isActive:   true,
        },
      });
    } else {
      await prisma.pricingRule.create({
        data: {
          serviceItemId: null,
          ruleType:      rule.ruleType,
          label:         rule.label,
          valueType:     rule.valueType,
          value:         rule.value,
          conditions:    rule.conditions ?? undefined,
          isActive:      true,
        },
      });
    }
  }
  console.log(`  ✓ ${PRICING_RULES.length} pricing rules`);

  // ── 4. Variation Reasons ───────────────────────────────────────────────────
  console.log("Seeding variation reasons…");
  for (const reason of VARIATION_REASONS) {
    await prisma.variationReason.upsert({
      where:  { key: reason.key },
      create: {
        key:                   reason.key,
        label:                 reason.label,
        isChargeable:          reason.isChargeable,
        requiresManagerReview: reason.requiresManagerReview,
        autoApproveBelow:      reason.autoApproveBelow ?? undefined,
        sortOrder:             reason.sortOrder,
      },
      update: {
        label:                 reason.label,
        isChargeable:          reason.isChargeable,
        requiresManagerReview: reason.requiresManagerReview,
        autoApproveBelow:      reason.autoApproveBelow ?? undefined,
        sortOrder:             reason.sortOrder,
      },
    });
  }
  console.log(`  ✓ ${VARIATION_REASONS.length} variation reasons`);

  // ── 5. Revisit Reasons ────────────────────────────────────────────────────
  console.log("Seeding revisit reasons…");
  for (const reason of REVISIT_REASONS) {
    await prisma.revisitReason.upsert({
      where:  { key: reason.key },
      create: {
        key:               reason.key,
        label:             reason.label,
        isChargeable:      reason.isChargeable,
        requiresManager:   reason.requiresManager,
        defaultBlameParty: reason.defaultBlameParty,
        sortOrder:         reason.sortOrder,
      },
      update: {
        label:             reason.label,
        isChargeable:      reason.isChargeable,
        requiresManager:   reason.requiresManager,
        defaultBlameParty: reason.defaultBlameParty,
        sortOrder:         reason.sortOrder,
      },
    });
  }
  console.log(`  ✓ ${REVISIT_REASONS.length} revisit reasons`);

  // ── 6. Message Templates ───────────────────────────────────────────────────
  console.log("Seeding message templates…");
  for (const tpl of MESSAGE_TEMPLATES) {
    await prisma.messageTemplate.upsert({
      where:  { key: tpl.key },
      create: {
        key:       tpl.key,
        channel:   tpl.channel,
        body:      tpl.body,
        variables: tpl.variables,
        isActive:  true,
        version:   1,
      },
      update: {
        channel:   tpl.channel,
        body:      tpl.body,
        variables: tpl.variables,
        isActive:  true,
      },
    });
  }
  console.log(`  ✓ ${MESSAGE_TEMPLATES.length} message templates`);

  // ── 7. Approval Keywords ───────────────────────────────────────────────────
  console.log("Seeding approval keywords…");
  let kwCount = 0;
  for (const kw of APPROVAL_KEYWORDS) {
    await prisma.approvalKeyword.upsert({
      where:  { word_language: { word: kw.word, language: "en" } },
      create: { word: kw.word, intent: kw.intent, language: "en", isActive: true },
      update: { intent: kw.intent, isActive: true },
    });
    kwCount++;
  }
  console.log(`  ✓ ${kwCount} approval keywords`);

  // ── 8. Config Settings ────────────────────────────────────────────────────
  console.log("Seeding config settings…");
  for (const setting of CONFIG_SETTINGS) {
    await prisma.configSetting.upsert({
      where:  { key: setting.key },
      create: {
        key:         setting.key,
        value:       setting.value,
        valueType:   setting.valueType,
        group:       setting.group,
        label:       setting.label,
        description: setting.description,
      },
      update: {
        value:       setting.value,
        valueType:   setting.valueType,
        group:       setting.group,
        label:       setting.label,
        description: setting.description,
      },
    });
  }
  console.log(`  ✓ ${CONFIG_SETTINGS.length} config settings`);

  console.log("\n✅ Quote system seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
