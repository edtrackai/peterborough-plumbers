# WhatsApp Bot — Customer Estimation Workflow
**Date:** 14 March 2026
**Status:** Pre-build planning document

---

## 1. The Gap (Current State)

When a customer asks **"how much will it cost?"** today:

```
Customer: "How much to fix a dripping tap?"
Bot:      Searches pb_knowledge_chunks → returns generic pricing text
          e.g. "Prices vary depending on the job..."
```

The bot has **no access to the live pricing rules** in `pb_pricing_rules`. It cannot calculate a real estimate. It can only return whatever static text is in the knowledge base.

**Result:** Customer gets a vague answer, loses confidence, may go elsewhere.

---

## 2. What We're Building

A live, DB-driven estimation flow inside the WhatsApp chat. When a customer asks for a price:

1. Bot asks a few short questions to clarify the job
2. Bot calls a new API endpoint with the answers
3. Endpoint runs the existing `calculateQuote()` pricing engine against live `pb_pricing_rules`
4. Bot sends a formatted estimate to the customer in the chat
5. Estimate saved in `pb_quotes` (new status: `bot_estimate`)
6. Bot asks customer if they want to proceed → captures lead if yes

---

## 3. Full Conversation Flow

```
Customer: "How much would it cost to fix a leaking pipe?"
                │
                ▼
        Bot detects estimation intent
        (keywords: "how much", "cost", "price", "estimate", "quote", "charge")
                │
                ▼
        Bot asks Q1: Urgency
        ┌─────────────────────────────────────────┐
        │ Is this urgent?                          │
        │ 1️⃣  Emergency — need someone today       │
        │ 2️⃣  Same day — ideally today             │
        │ 3️⃣  Standard — within a few days is fine │
        └─────────────────────────────────────────┘
                │
        Customer: "2"  (same_day)
                │
                ▼
        Bot asks Q2: Parts
        ┌─────────────────────────────────────────┐
        │ Do you have the parts already, or do    │
        │ you need us to supply them?             │
        │ 1️⃣  Please supply parts                 │
        │ 2️⃣  I have the parts                    │
        └─────────────────────────────────────────┘
                │
        Customer: "1"  (we supply)
                │
                ▼
        n8n calls POST /api/whatsapp/estimate
        with: { waId, serviceItemSlug, urgencyKey, customerSupplied, quantity }
                │
                ▼
        Endpoint runs calculateQuote() against live pb_pricing_rules
        Creates pb_quotes row (status: "bot_estimate")
                │
                ▼
        Bot sends estimate to customer:

        ┌─────────────────────────────────────────┐
        │ 💧 Estimated cost for: Leak repair       │
        │                                         │
        │ • Labour                    £80.00      │
        │ • Parts & materials         £35.00      │
        │ • Same-day surcharge        £30.00      │
        │ ─────────────────────────────────       │
        │ Subtotal                   £145.00      │
        │ VAT (20%)                   £29.00      │
        │ ESTIMATED TOTAL            £174.00      │
        │                                         │
        │ ⚠️ This is an estimate. Final price      │
        │ confirmed after engineer assesses        │
        │ the job on site.                        │
        │                                         │
        │ Quote ref: Q-260314-0042               │
        │ Valid for 48 hours.                     │
        └─────────────────────────────────────────┘

                │
                ▼
        Bot asks: "Would you like to book an engineer?"
                │
          ┌─────┴──────┐
         YES           NO
          │             │
          ▼             ▼
    Bot collects    Bot replies:
    name + postcode "No problem! We're here
    → Lead created  if you change your mind.
    → Admin notified Call us on [phone]."
    → Quote linked    Quote stays as bot_estimate
    to Lead           (visible in admin panel)
```

---

## 4. Exact WhatsApp Message Template

This is the **exact format** sent to the customer:

```
Ref: PP-001
Service: Tap Repair
Estimated Total: £174.00
Estimated Time: 1–2 hours

Note: This is an estimate only based on the details provided.
Final cost may change after inspection or once the plumber
checks the full issue on site.

To proceed, reply: YES BOOK
01733797074
```

### Field mapping

| Template field | Source |
|---|---|
| `Ref: PP-001` | New `PP-NNN` sequential counter (see §6) |
| `Service: [Issue Type]` | `ServiceItem.name` |
| `Estimated Total: £[X]` | `calculateQuote().total` (inc. VAT) |
| `Estimated Time: [X hours]` | Derived from `ServiceItem.defaultLabourMins` |
| `01733797074` | `SiteSettings.phone` (live from DB) |

### Estimated Time derivation

```
defaultLabourMins → display label

0–60 mins    → "Under 1 hour"
61–90 mins   → "1–2 hours"
91–150 mins  → "1.5–2.5 hours"
151–210 mins → "2–3.5 hours"
211+ mins    → "Half day (4+ hours)"
null         → "Varies — engineer will advise"
```

### YES BOOK keyword

When customer replies `YES BOOK` (case-insensitive, trimmed):
- n8n detects it as booking intent (separate from quote approval keywords)
- Bot collects name + postcode if not already known
- `/api/whatsapp/lead/upsert` called → lead created
- Quote `status` updated: `bot_estimate` → `bot_accepted`
- Admin notified in panel

---

## 4. Estimation Intent Detection

The bot (n8n AI agent) detects estimation intent when a message contains any of:

```
"how much"       "what's the cost"    "cost me"
"price"          "pricing"            "how much does"
"estimate"       "estimation"         "quotation"
"quote"          "charge"             "fee"
"ballpark"       "rough price"        "how much would"
```

This is handled entirely in the n8n AI agent prompt — no code change needed on the API side.

---

## 5. Service → ServiceItem Mapping

The bot passes a `serviceItemSlug` to the estimation endpoint. The AI agent maps what the customer described to a known slug:

| Customer says | serviceItemSlug |
|---|---|
| "dripping tap", "leaking tap" | `tap-repair` |
| "leaking pipe", "burst pipe" | `leak-repair` |
| "boiler not working", "no heating" | `boiler-repair` |
| "boiler service", "annual service" | `boiler-service` |
| "no hot water" | `boiler-repair` |
| "blocked drain", "blocked toilet" | `drain-unblocking` |
| "radiator cold", "radiator not working" | `radiator-repair` |
| "toilet running", "cistern issue" | `toilet-repair` |
| "gas safety certificate", "CP12" | `gas-safety-certificate` |

If the bot cannot map the service with confidence, it replies:
> *"For that type of job I'd need to get one of our engineers to assess it first. Can I take your details and we'll call you back with a price?"*

This falls back to the standard lead capture flow.

---

## 6. API: New Endpoint

### `POST /api/whatsapp/estimate`

**Auth:** `x-api-key` (same as all n8n → API calls)

**Request body:**
```json
{
  "waId": "447700900123",
  "serviceItemSlug": "tap-repair",
  "urgencyKey": "same_day",
  "customerSupplied": false,
  "quantity": 1
}
```

**What it does:**
1. Validates input
2. Looks up `ServiceItem` by slug — if not found returns `{ canEstimate: false }`
3. Loads active `PricingRule` rows for that service + global rules
4. Reads VAT rate + valid hours from `ConfigSetting`
5. Runs existing `calculateQuote()` engine (no changes to engine)
6. Generates `quoteRef` via existing `generateQuoteRef()`
7. Creates `pb_quotes` row:
   - `status: "bot_estimate"`
   - `quoteType: "estimate"`
   - `createdBy: "bot"`
   - links to `WaChat` via `waId` (new optional field `waChatId` on Quote)
8. Creates `pb_quote_line_items` rows
9. Returns formatted estimate data

**Response:**
```json
{
  "canEstimate": true,
  "estimateRef": "PP-001",
  "quoteId": "clxxx...",
  "serviceName": "Tap Repair",
  "total": 174.00,
  "estimatedTime": "1–2 hours",
  "validUntilHours": 48,
  "whatsappMessage": "Ref: PP-001\nService: Tap Repair\nEstimated Total: £174.00\nEstimated Time: 1–2 hours\n\nNote: This is an estimate only based on the details provided. Final cost may change after inspection or once the plumber checks the full issue on site.\n\nTo proceed, reply: YES BOOK\n01733797074"
}
```

The `whatsappMessage` field is the **ready-to-send string** — n8n passes it directly to the WhatsApp send API without any further formatting.
```

**If service cannot be estimated:**
```json
{
  "canEstimate": false,
  "reason": "service_not_found"
}
```

---

## 6b. Estimate Reference Format

Bot estimates use a **separate reference sequence** from admin quotes:

```
PP-001   PP-002   PP-003  ...  PP-999  PP-1000

PP = Peterborough Plumbers
NNN = global sequential counter (never resets)
```

**Why separate from Q-YYMMDD-XXXX?**
- Shorter — fits cleanly in a WhatsApp message
- Visually distinct from admin-generated quotes
- Customer can quote "PP-001" when calling in

**Counter storage:** `ConfigSetting` row with key `estimate.ref_counter`. On each new estimate: read → increment → write → use.

```typescript
// lib/quotes/generateEstimateRef.ts
async function generateEstimateRef(): Promise<string> {
  const counter = await incrementConfigCounter("estimate.ref_counter");
  return `PP-${counter}`;
}
```

---

## 7. Quote Statuses — Updated Set

Adding one new status to `pb_quotes`:

| Status | Who sets it | Meaning |
|---|---|---|
| `draft` | Admin | Admin created quote, not yet sent |
| `bot_estimate` | Bot (new) | Bot sent estimate to customer, awaiting reply |
| `bot_accepted` | Bot (new) | Customer replied `YES BOOK` — lead captured |
| `sent` | Admin | Admin formally sent quote to customer |
| `approved` | Customer reply | Customer confirmed admin quote |
| `declined` | Customer reply | Customer declined |
| `expired` | Cron | validUntil passed with no response |
| `superseded` | Admin | Replaced by newer quote |

**`bot_estimate` → `bot_accepted` transition:**
- Triggered when customer replies `YES BOOK`
- Bot captures name + postcode → creates Lead → links to Quote
- Admin sees it in "Bot Estimates" tab with a "Convert to Quote" action
- Admin clicks Convert → status becomes `draft` → admin can edit line items → send formally

**`bot_estimate` expiry:**
- After 48 hours with no `YES BOOK` reply → cron sets `expired`
- Same cron job as `quote-expiry` — just includes `bot_estimate` status

---

## 8. DB Change — One field on Quote

Add `waChatId` to the existing `Quote` model so bot estimates are traceable back to the WhatsApp conversation:

```prisma
model Quote {
  ...existing fields...
  waChatId   String?   // new — links bot_estimate quotes to the chat
  waChat     WaChat?   @relation(fields: [waChatId], references: [id])
}
```

This is the only schema change. Everything else reuses existing tables.

---

## 9. What Gets Stored

| When | Table | What |
|---|---|---|
| Customer asks price | `pb_wa_messages` | User message (role: user) |
| Bot asks Q1 (urgency) | `pb_wa_messages` | Bot question (role: assistant) |
| Customer answers Q1 | `pb_wa_messages` | User answer |
| Bot asks Q2 (parts) | `pb_wa_messages` | Bot question |
| Customer answers Q2 | `pb_wa_messages` | User answer |
| n8n calls /estimate | `pb_quotes` | Quote row (status: bot_estimate) |
| — | `pb_quote_line_items` | Line items |
| Bot sends estimate | `pb_wa_messages` | Bot message with formatted estimate |
| Customer replies `YES BOOK` | `pb_wa_messages` | User reply |
| — | `pb_quotes` | Status updated: `bot_estimate` → `bot_accepted` |
| — | `pb_leads` | New lead (via /api/whatsapp/lead/upsert) |
| — | `pb_quotes` | Updated: `leadId` linked to quote |

---

## 10. Admin View

In the admin quotes panel, add a **"Bot Estimates"** tab:

| Column | Detail |
|---|---|
| Quote ref | Q-260314-0042 |
| Service | Tap Repair |
| Customer | John Smith (via WhatsApp) |
| Total | £174.00 |
| Urgency | Same day |
| Created | 14 Mar 2026 14:32 |
| Status | bot_estimate |
| Actions | View chat · Promote to Quote · Discard |

**"Promote to Quote"** → sets status to `draft`, links to customer if lead exists, admin can then edit and formally send.

---

## 11. Caveats the Bot Always Includes

The bot **always** appends this disclaimer to every estimate:

> *⚠️ This is an estimate based on standard pricing. The final price is confirmed by your engineer after assessing the job on site. Additional parts or complications may affect the total.*

This is important because:
- Some jobs are `inspection_first` by nature (hidden pipes, boiler faults)
- Material costs vary by brand/spec customer chooses
- Access difficulty can add labour time

---

## 12. Fallback: Cannot Estimate

If the bot cannot map to a ServiceItem, or the service is `quoteType: "inspection_first"` (e.g. full bathroom install, boiler replacement), it does **not** attempt an estimate. Instead:

```
Bot: "For that type of job, pricing depends on what the
      engineer finds on site.

      The best next step is a free call-back — one of
      our team will give you a rough price over the phone.

      Can I take your name, postcode, and best time to call?"
```

This still captures the lead. Admin follows up manually.

---

## 13. Build Order

```
1. Schema change — add waChatId to Quote model + new relation on WaChat
2. prisma db push
3. API route — POST /api/whatsapp/estimate
4. n8n workflow update:
   a. Add estimation intent detection node
   b. Add Q1 (urgency) + Q2 (parts) question nodes
   c. Add /api/whatsapp/estimate HTTP call node
   d. Add estimate formatting node (builds WhatsApp message from response)
   e. Add "proceed?" follow-up node → branches to lead capture or end
5. Admin UI — "Bot Estimates" tab on /admin/quotes
6. QA — end-to-end test: ask for price → estimate appears → confirm → lead created
```

---

## 14. Flows Compared

| Scenario | What happens |
|---|---|
| Customer asks price, says yes | Estimate → Lead → Admin promotes to Quote → Admin sends formally → Customer approves → Booking → Job → Invoice |
| Customer asks price, says no | Estimate stored as bot_estimate, expires after 48h |
| Service cannot be estimated | Bot collects lead for manual follow-up |
| Customer asks price mid-booking | Estimation flow runs in parallel, estimate linked to existing booking |

---

*Document created by Claude Code — 14 March 2026. Ready for review before build.*
