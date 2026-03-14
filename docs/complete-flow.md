# Complete End-to-End Flow
**Date:** 14 March 2026

---

## PART A — Customer on Website → WhatsApp

```
Customer visits peterboroughplumbers.com
           │
           │  Clicks ANY of these:
           │  • "Book a Plumber" (hero)
           │  • "Book Now" (CTA sections)
           │  • "Book Online" (footer)
           ▼
  ┌─────────────────────────────────────┐
  │        SimpleBookingModal           │
  │  "Book a Plumber"                   │
  │  What do you need help with?        │
  │                                     │
  │  [Boiler issue]  [No heating]       │
  │  [No hot water]  [Leak]             │
  │  [Blocked drain] [Toilet issue]     │
  │  [Tap issue]     [Other]            │
  │                                     │
  │  ─── or describe your issue ───     │
  │  [ free text box                  ] │
  │                                     │
  │  [ Continue on WhatsApp 🟢 ]        │
  └─────────────────────────────────────┘
           │
           │  Customer picks option OR types free text
           │  Clicks "Continue on WhatsApp"
           ▼
  Opens WhatsApp with pre-filled message:
  "Hi, I need help with a boiler issue."
  → wa.me/441733797074?text=...

  STORED IN DB: nothing yet (modal is client-only)
```

---

## PART B — WhatsApp Bot Conversation

```
Customer sends the WhatsApp message
           │
           ▼
  Meta webhook → n8n workflow picks up
           │
           ▼
  n8n calls POST /api/whatsapp/chat
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_wa_chats  — upsert chat thread       │
  │    waId, customerPhone, lastMessageAt    │
  │    serviceType (auto-detected: Boiler)   │
  │  pb_wa_messages — user message           │
  │    role: "user"                          │
  │    content: "Hi, I need help with..."   │
  │    waMessageId (dedup key)               │
  └──────────────────────────────────────────┘
           │
           ▼
  n8n AI Agent generates reply
  Bot: "Hi! I can help with that.
        Would you like a price estimate first,
        or shall we get you booked in?"
           │
           ▼
  n8n calls POST /api/whatsapp/chat/bot-reply
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_wa_messages — bot reply              │
  │    role: "assistant"                     │
  │    content: bot message text             │
  └──────────────────────────────────────────┘
```

---

## PART B1 — Customer Wants an Estimate

```
  Customer: "How much will it cost?"
           │
  Bot asks Q1:
  "Is this urgent?
   1️⃣ Emergency — need someone today
   2️⃣ Same day — ideally today
   3️⃣ Standard — within a few days"
           │
  Customer: "2"
           │
  Bot asks Q2:
  "Do you have the parts, or need us to supply?
   1️⃣ Please supply parts
   2️⃣ I have the parts"
           │
  Customer: "1"
           │
           ▼
  n8n calls POST /api/whatsapp/estimate
  {
    waId: "447700900123",
    serviceItemSlug: "boiler-repair",
    urgencyKey: "same_day",
    customerSupplied: false,
    quantity: 1
  }
           │
           ▼
  Endpoint runs calculateQuote() against
  live pb_pricing_rules from database
           │
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_quotes — new row                     │
  │    quoteRef:    "PP-1"                   │
  │    estimateRef: "PP-1"                   │
  │    waChatId:    (linked to chat)         │
  │    status:      "bot_estimate"           │
  │    quoteType:   "estimate"               │
  │    createdBy:   "bot"                    │
  │    total:       174.00                   │
  │    validUntil:  +48 hours                │
  │  pb_quote_line_items — line items        │
  │    Labour — Boiler repair   £80.00       │
  │    Parts & materials        £35.00       │
  │    Same-day surcharge       £30.00       │
  │    VAT (20%)                £29.00       │
  └──────────────────────────────────────────┘
           │
           ▼
  Bot sends estimate to customer:

  ┌──────────────────────────────────────────┐
  │ Ref: PP-1                                │
  │ Service: Boiler Repair                   │
  │ Estimated Total: £174.00                 │
  │ Estimated Time: 1–2 hours                │
  │                                          │
  │ Note: This is an estimate only based on  │
  │ the details provided. Final cost may     │
  │ change after inspection or once the      │
  │ plumber checks the full issue on site.   │
  │                                          │
  │ To proceed, reply: YES BOOK              │
  │ 01733797074                              │
  └──────────────────────────────────────────┘

  STORED IN DB:
    pb_wa_messages — bot message (role: assistant)
```

---

## PART B2 — Customer Replies YES BOOK

```
  Customer: "YES BOOK"
           │
           ▼
  Bot: "Great! Can I take your name and postcode
        so we can confirm your booking?"

  Customer gives name + postcode
           │
           ▼
  n8n calls POST /api/whatsapp/lead/upsert
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_leads — new lead                     │
  │    name:        "John Smith"             │
  │    phone:       "07700900123"            │
  │    postcode:    "PE1 1AA"                │
  │    serviceType: "Boiler Repair"          │
  │    source:      "whatsapp"               │
  │    status:      "new"                    │
  │  pb_wa_chats — updated                   │
  │    customerName: "John Smith"            │
  │    leadCaptured: true                    │
  │  pb_quotes — updated                     │
  │    leadId: (linked to new lead)          │
  │    status: "bot_accepted"                │
  └──────────────────────────────────────────┘
           │
           ▼
  Admin sees new lead in /admin/leads
  Admin sees PP-1 in /admin/quotes (Bot Estimates tab)
```

---

## PART C — Admin Converts Estimate → Formal Quote

```
  Admin opens /admin/quotes → Bot Estimates tab
  Sees: PP-1 | Boiler Repair | £174.00 | John Smith
           │
           │  Admin clicks "Convert to Quote"
           ▼
  Quote status: "bot_estimate" → "draft"
  quoteRef stays PP-1 (or admin can regenerate)
           │
           │  Admin reviews, edits if needed
           │  Admin clicks "Send Quote"
           ▼
  POST /api/quotes/[id]/send
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_quotes — updated                     │
  │    status: "sent"                        │
  │    sentAt: now()                         │
  │  pb_quote_messages — outbound            │
  │    direction: "outbound"                 │
  │    channel:   "whatsapp"                 │
  │    body:      full quote message         │
  │  pb_activity_logs — quote_sent           │
  └──────────────────────────────────────────┘
           │
           ▼
  Customer receives formal WhatsApp quote
```

---

## PART D — Customer Approves Quote

```
  Customer replies: "yes", "confirm", "go ahead"
           │
           ▼
  n8n calls POST /api/whatsapp/quote/respond
  Detects intent: "approve" (from pb_approval_keywords)
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_quotes — updated                     │
  │    status:         "approved"            │
  │    approvedAt:     now()                 │
  │    approvedByWaId: customer waId         │
  │    approvedByText: "yes"                 │
  │  pb_quote_messages — inbound reply       │
  │  pb_bookings — updated                   │
  │    status: "pending_assignment"          │
  │  pb_activity_logs — customer_approved    │
  └──────────────────────────────────────────┘
```

---

## PART E — Admin Assigns to Plumber

```
  Admin opens /admin/bookings
  Sees booking in "Pending Assignment" column
           │
           │  Admin clicks "Dispatch"
           │  Selects plumber → sends offer
           ▼
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_booking_offers — new offer           │
  │    plumberId: selected plumber           │
  │    status:    "offered"                  │
  └──────────────────────────────────────────┘
           │
  Plumber receives WhatsApp offer notification
  Plumber accepts in /plumber portal or WhatsApp reply
           │
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_bookings — updated                   │
  │    status:            "assigned"         │
  │    assignedPlumberId: plumber id         │
  │  pb_booking_offers — updated             │
  │    status: "accepted"                    │
  └──────────────────────────────────────────┘
```

---

## PART F — Plumber Completes Job → Invoice Auto-Generated

```
  Plumber on site, updates status step by step:
  accepted → en_route → arrived → in_progress → completed

  Each step: POST /api/plumber/bookings/[id]/status
  ┌──────────────────────────────────────────┐
  │ STORED IN DB (each step):                │
  │  pb_bookings — status updated            │
  │  pb_booking_events — event logged        │
  │    eventType: "en_route" / "arrived" etc │
  └──────────────────────────────────────────┘
           │
           │  Plumber marks: COMPLETED
           ▼
  pb_bookings:
    status:      "completed"
    completedAt: now()
           │
           │  AUTO-TRIGGER fires immediately
           ▼
  buildInvoiceFromBooking() runs in background
  Pulls:
    ✓ Approved Quote line items (PP-1)
    ✓ Any approved Variations (extra work)
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_invoices — new row                   │
  │    invoiceNumber: "INV-260314-0001"      │
  │    bookingId:     (linked)               │
  │    quoteId:       (linked to PP-1)       │
  │    status:        "draft"                │
  │    subtotal:      145.00                 │
  │    vatRate:       20                     │
  │    vatAmount:     29.00                  │
  │    total:         174.00                 │
  │    dueDate:       +7 days                │
  │    createdBy:     "system"               │
  │  pb_invoice_line_items — all lines       │
  │    Labour — Boiler repair   £80.00       │  ← from quote
  │    Parts & materials        £35.00       │  ← from quote
  │    Same-day surcharge       £30.00       │  ← from quote
  │    (+ any variation lines if exist)      │
  └──────────────────────────────────────────┘
           │
           ▼
  Admin sees new DRAFT invoice in /admin/invoices
```

---

## PART G — Admin Sends Invoice to Customer

```
  Admin opens /admin/invoices
  Sees: INV-260314-0001 | John Smith | £174.00 | draft
           │
           │  Admin clicks "Send Invoice"
           ▼
  POST /api/invoices/[id]/send
           │
           ▼
  WhatsApp message sent to customer:

  ┌──────────────────────────────────────────┐
  │ Invoice: INV-260314-0001                 │
  │ Ref: PP-1 (your estimate)                │
  │                                          │
  │ Job: Boiler Repair                       │
  │ Engineer: James T.                       │
  │ Date completed: 14 Mar 2026              │
  │                                          │
  │ Labour — Boiler repair  £80.00           │
  │ Parts & materials       £35.00           │
  │ Same-day surcharge      £30.00           │
  │ ─────────────────────────               │
  │ Subtotal:      £145.00                   │
  │ VAT (20%):      £29.00                   │
  │ TOTAL DUE:     £174.00                   │
  │                                          │
  │ Payment due by: 21 Mar 2026              │
  │                                          │
  │ Pay by bank transfer:                    │
  │ Sort code: XX-XX-XX                      │
  │ Account: XXXXXXXX                        │
  │ Name: Peterborough Plumbers Ltd          │
  │ Ref: INV-260314-0001                     │
  │                                          │
  │ Or pay cash to your engineer.            │
  │                                          │
  │ Questions? Call 01733797074              │
  │ — Peterborough Plumbers                  │
  └──────────────────────────────────────────┘

  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_invoices — updated                   │
  │    status: "sent"                        │
  │    sentAt: now()                         │
  │  pb_invoice_messages — outbound          │
  │    direction: "outbound"                 │
  │    body:      full invoice text          │
  │  pb_activity_logs — invoice_sent         │
  └──────────────────────────────────────────┘
```

---

## PART H — Customer Pays

```
  Customer pays by bank transfer / cash
           │
           │  Admin confirms payment received
           │  Admin clicks "Mark as Paid"
           ▼
  POST /api/invoices/[id]/mark-paid
  { paymentMethod: "bank_transfer", paymentRef: "PP1-BACS" }
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_invoices — updated                   │
  │    status:        "paid"                 │
  │    paidAt:        now()                  │
  │    paymentMethod: "bank_transfer"        │
  │    paymentRef:    "PP1-BACS"             │
  │  pb_invoice_messages — receipt           │
  │  pb_activity_logs — invoice_paid         │
  └──────────────────────────────────────────┘
           │
           ▼
  Receipt WhatsApp sent to customer:

  ┌──────────────────────────────────────────┐
  │ ✅ Payment received — thank you!          │
  │                                          │
  │ Invoice INV-260314-0001 is now paid.     │
  │ Amount: £174.00                          │
  │ Paid:   14 Mar 2026                      │
  │                                          │
  │ If you need a receipt copy, reply        │
  │ "receipt".                               │
  │                                          │
  │ — Peterborough Plumbers                  │
  └──────────────────────────────────────────┘
```

---

## PART I — If Customer Does NOT Pay (Overdue)

```
  Daily cron at 09:00 runs:
  POST /api/cron/invoice-overdue
           │
  Finds all invoices where:
    status = "sent"  AND  dueDate < today
           │
  ┌──────────────────────────────────────────┐
  │ STORED IN DB:                            │
  │  pb_invoices — updated                   │
  │    status: "overdue"                     │
  │  pb_invoice_messages — reminder sent     │
  │  pb_activity_logs — invoice_overdue      │
  └──────────────────────────────────────────┘
           │
           ▼
  Overdue reminder WhatsApp sent to customer
```

---

## Complete DB Write Summary (All Tables)

| Step | Table | What's written |
|---|---|---|
| Customer messages bot | `pb_wa_chats` | Chat thread upserted |
| Every message | `pb_wa_messages` | role: user or assistant |
| Estimate requested | `pb_quotes` | status: bot_estimate, estimateRef: PP-1 |
| — | `pb_quote_line_items` | Labour, materials, surcharge lines |
| Customer says YES BOOK | `pb_leads` | New lead row |
| — | `pb_wa_chats` | leadCaptured: true |
| — | `pb_quotes` | status: bot_accepted, leadId linked |
| Admin sends formal quote | `pb_quotes` | status: sent |
| — | `pb_quote_messages` | Outbound WA message |
| — | `pb_activity_logs` | quote_sent |
| Customer approves | `pb_quotes` | status: approved, approvalText saved |
| — | `pb_quote_messages` | Inbound reply |
| — | `pb_bookings` | status: pending_assignment |
| — | `pb_activity_logs` | customer_approved |
| Plumber assigned | `pb_bookings` | assignedPlumberId set |
| — | `pb_booking_offers` | status: accepted |
| Plumber status updates | `pb_bookings` | status progresses |
| — | `pb_booking_events` | Each step logged |
| Plumber marks complete | `pb_bookings` | status: completed, completedAt |
| Auto-invoice trigger | `pb_invoices` | status: draft, all financials |
| — | `pb_invoice_line_items` | All line items from quote+variations |
| Admin sends invoice | `pb_invoices` | status: sent, sentAt |
| — | `pb_invoice_messages` | Outbound WA message |
| — | `pb_activity_logs` | invoice_sent |
| Admin marks paid | `pb_invoices` | status: paid, paidAt, paymentMethod |
| — | `pb_invoice_messages` | Receipt message |
| — | `pb_activity_logs` | invoice_paid |
| Cron overdue | `pb_invoices` | status: overdue |
| — | `pb_invoice_messages` | Reminder message |

---

## What Still Needs Configuring

| Item | Where |
|---|---|
| Bank sort code | Update `bankSortCode` in `pb_site_settings` |
| Bank account number | Update `bankAccountNumber` in `pb_site_settings` |
| Bank account name | Update `bankAccountName` in `pb_site_settings` |
| Invoice payment days | Add `invoice.payment_days` to `pb_config_settings` (default: 7) |
| Cron schedule | Add `POST /api/cron/invoice-overdue` to Vercel cron config (daily 09:00) |
| n8n: estimate intent | Add estimation intent detection to n8n AI agent prompt |
| n8n: YES BOOK detection | Add YES BOOK keyword handler in n8n flow |
| n8n: call /api/whatsapp/estimate | Add HTTP node in n8n after Q1+Q2 collected |

---

*Document created by Claude Code — 14 March 2026*
