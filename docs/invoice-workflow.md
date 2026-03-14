# Invoice System — Workflow Design
**Date:** 14 March 2026
**Status:** Pre-build planning document

---

## 1. Where Invoice Fits in the Existing Flow

```
Customer contacts (WhatsApp / website)
        │
        ▼
   Lead created (pb_leads)
        │
        ▼
  Admin generates Quote (pb_quotes → status: draft)
        │
        ▼
  Admin sends Quote via WhatsApp (status: sent)
        │
        ▼
  Customer replies "yes" → Quote approved (status: approved)
        │
        ▼
  Booking assigned to Plumber (pb_bookings → status: assigned)
        │
        ▼
  Plumber completes job (status: completed)
        │
        ▼
  ★ INVOICE GENERATED HERE ★  ← new
        │
        ▼
  Invoice sent to customer via WhatsApp  ← new
        │
        ▼
  Customer pays  ← new
        │
        ▼
  Admin marks as paid → Receipt sent  ← new
        │
        ▼
  Customer rates the job (pb_booking_ratings)
```

---

## 2. Invoice Trigger Points

There are two valid trigger points. Both will be supported:

| Trigger | Who | When |
|---|---|---|
| **Auto** | System | When plumber sets booking status → `completed` |
| **Manual** | Admin | Admin clicks "Generate Invoice" in admin panel |

Auto-trigger is the default. Manual exists as a fallback (e.g. plumber forgot to mark complete, or job had variations to resolve first).

**Rule:** Only one invoice per booking. If one already exists, block creation and show existing.

---

## 3. Invoice Line Item Sources

An invoice is a **snapshot** of everything billed for a job. It pulls from three places:

```
Invoice
 ├── Quote line items (original agreed price)
 │     ├── Labour — Boiler service ×1         £120.00
 │     ├── Parts & materials                   £45.00
 │     └── Standard callout fee                £65.00
 │
 ├── Approved variations (extra work done on site)
 │     ├── Additional part — pump seal          £28.00
 │     └── Extra labour — 1hr overflow repair   £60.00
 │
 └── Totals
       ├── Subtotal                            £318.00
       ├── VAT (20%)                            £63.60
       └── TOTAL DUE                           £381.60
```

**Variations** come from `pb_variations` where `status = "approved"`. Each approved variation adds its own line items to the invoice.

**If no approved quote exists:** Admin can still generate a manual invoice with custom line items (for cash jobs that bypassed the quote flow).

---

## 4. Invoice Number Format

```
INV-YYMMDD-NNNN

Examples:
  INV-260314-0001   ← first invoice on 14 March 2026
  INV-260314-0002
  INV-260315-0001   ← counter resets daily
```

Sequential counter per day, zero-padded to 4 digits. Stored in `pb_invoices.invoiceNumber` as a unique string.

---

## 5. Invoice Status Lifecycle

```
draft ──► sent ──► paid ──► void
              │
              └──► overdue  (auto, cron job)
```

| Status | Meaning | Who sets it |
|---|---|---|
| `draft` | Generated but not sent to customer | System / admin |
| `sent` | Sent to customer via WhatsApp | System on send |
| `overdue` | Payment not received after due date | Cron job (daily) |
| `paid` | Payment confirmed | Admin manually |
| `void` | Cancelled (job dispute, error) | Admin manually |

**Due date:** 7 days from `sentAt` by default (configurable via `ConfigSetting: invoice.payment_days`).

---

## 6. Payment Methods

The site does not have online payments (no Stripe). Payment is collected off-platform:

| Method | How tracked |
|---|---|
| Cash | Plumber collects on site — admin marks paid |
| Bank transfer (BACS) | Customer pays direct — admin marks paid on receipt |
| Card (future) | Placeholder field — no integration yet |

**No payment gateway in this phase.** Admin manually marks invoices as paid. Payment reference / note field available for bank transfer references.

---

## 7. Database Design

### New table: `pb_invoices`

```
pb_invoices
  id               cuid PK
  invoiceNumber    String UNIQUE        -- INV-260314-0001
  bookingId        String? FK → pb_bookings
  quoteId          String? FK → pb_quotes
  leadId           String? FK → pb_leads  (for non-booking cash jobs)

  status           String               -- draft|sent|overdue|paid|void
  paymentMethod    String?              -- cash|bank_transfer|card
  paymentRef       String?              -- bank ref, cheque number etc.
  paymentNote      String?

  subtotal         Decimal(10,2)
  vatRate          Decimal(5,2)         -- snapshot of VAT% at time of issue
  vatAmount        Decimal(10,2)
  total            Decimal(10,2)

  dueDate          DateTime?
  sentAt           DateTime?
  paidAt           DateTime?
  voidedAt         DateTime?
  voidReason       String?

  createdBy        String?              -- "system"|"admin"|plumberId
  createdAt        DateTime
  updatedAt        DateTime

  lineItems        InvoiceLineItem[]
  messages         InvoiceMessage[]
```

### New table: `pb_invoice_line_items`

```
pb_invoice_line_items
  id             cuid PK
  invoiceId      String FK → pb_invoices (cascade delete)
  description    String
  quantity       Decimal(10,2)
  unitPrice      Decimal(10,2)
  lineTotal      Decimal(10,2)
  lineType       String               -- labour|materials|callout|surcharge|discount|variation
  sourceType     String               -- quote_line|variation|manual
  sourceId       String?              -- QuoteLineItem.id or Variation.id
  sortOrder      Int
```

### New table: `pb_invoice_messages`

Stores every WhatsApp message sent/received about the invoice (same pattern as `pb_quote_messages`).

```
pb_invoice_messages
  id           cuid PK
  invoiceId    String FK → pb_invoices (cascade delete)
  direction    String     -- outbound|inbound
  channel      String     -- whatsapp|email
  recipient    String
  body         String (Text)
  waMessageId  String? UNIQUE
  status       String     -- sent|delivered|read|failed
  sentAt       DateTime
```

---

## 8. API Routes

| Method | Route | Who | What |
|---|---|---|---|
| `POST` | `/api/invoices/generate` | System / Admin | Generate invoice from booking + quote + variations |
| `POST` | `/api/invoices/[id]/send` | Admin | Send invoice to customer via WhatsApp |
| `POST` | `/api/invoices/[id]/mark-paid` | Admin | Record payment, set status → paid, send receipt |
| `POST` | `/api/invoices/[id]/void` | Admin | Void invoice with reason |
| `GET`  | `/api/invoices/[id]` | Admin | Fetch invoice detail |
| `GET`  | `/api/admin/invoices` | Admin | List all invoices with filters |
| `GET`  | `/api/invoices/[id]/pdf` | Admin | Render PDF (future phase) |
| `POST` | `/api/cron/invoice-overdue` | Cron | Mark sent invoices past due date as overdue |

---

## 9. WhatsApp Message Templates

### 9.1 Invoice sent to customer

```
Hi [customer_name],

Your job is complete — here's your invoice.

📋 Invoice: [invoice_number]
🔧 Job: [job_summary]
📅 Date: [job_date]
👷 Engineer: [plumber_name]

[line_items]

──────────────────
Subtotal:  £[subtotal]
VAT (20%): £[vat_amount]
TOTAL DUE: £[total]
──────────────────

💳 Payment due by: [due_date]

Please pay by bank transfer to:
  Sort code: [sort_code]
  Account:   [account_number]
  Reference: [invoice_number]

Or pay cash to your engineer if they are still on site.

Questions? Call us on [phone].

Thank you — Peterborough Plumbers
```

### 9.2 Payment receipt

```
Hi [customer_name],

✅ Payment received — thank you!

Invoice [invoice_number] is now marked as paid.
Amount: £[total]
Paid:   [paid_date]

If you need a copy of this receipt, reply "receipt" and we'll send it over.

— Peterborough Plumbers
```

### 9.3 Overdue reminder (sent by cron, 1 day after due date)

```
Hi [customer_name],

This is a friendly reminder that invoice [invoice_number] for £[total] was due on [due_date].

Please arrange payment at your earliest convenience:
  Sort code: [sort_code]
  Account:   [account_number]
  Reference: [invoice_number]

If you've already paid, please ignore this message or reply "paid" and we'll confirm.

Questions? Call [phone].

— Peterborough Plumbers
```

---

## 10. Admin Panel Pages

### 10.1 Invoice list (`/admin/invoices`)

Table columns:
- Invoice number
- Customer name
- Job / booking ref
- Total (£)
- Status badge (draft / sent / overdue / paid / void)
- Due date
- Actions: View, Send, Mark Paid, Void

Filters: status, date range, plumber, amount range

### 10.2 Invoice detail (`/admin/invoices/[id]`)

Sections:
- Header: invoice number, status, customer, booking ref, plumber
- Line items table (same layout as quote detail)
- Totals: subtotal, VAT, total due
- Payment section: method dropdown, reference input, "Mark as Paid" button
- WhatsApp message log (all messages sent/received about this invoice)
- Void button (with reason input)

### 10.3 Booking detail — invoice panel

On the existing booking detail page, add an "Invoice" panel at the bottom showing:
- If no invoice: "Generate Invoice" button
- If invoice exists: status + link to invoice detail

---

## 11. Auto-Generation Logic

When plumber sets booking → `completed`:

```
1. Check if invoice already exists for this bookingId → if yes, skip
2. Find the most recent approved Quote for this booking
3. Find all approved Variations for this booking
4. Build line items:
   a. Copy all QuoteLineItems → InvoiceLineItem (sourceType: "quote_line")
   b. For each approved Variation:
      - Add variation line items (sourceType: "variation")
5. Calculate subtotal, VAT, total
6. Generate invoiceNumber (INV-YYMMDD-NNNN)
7. Create pb_invoices row (status: "draft")
8. Create pb_invoice_line_items rows
9. Log to pb_activity_logs: invoice_generated
10. Notify admin in panel (badge count update)
```

Auto-generated invoices start as `draft`. Admin reviews and clicks "Send" to dispatch to customer. This gives admin a chance to check before sending.

---

## 12. Cron Job: Overdue Detection

Route: `POST /api/cron/invoice-overdue`
Schedule: Daily at 09:00

Logic:
```
Find all invoices where:
  status = "sent"
  dueDate < now()

For each:
  Update status → "overdue"
  Send WhatsApp reminder to customer
  Log to pb_invoice_messages (outbound)
  Log to pb_activity_logs: invoice_overdue
```

---

## 13. What Is NOT in Scope (This Phase)

| Feature | Reason excluded |
|---|---|
| PDF generation | Requires Puppeteer or react-pdf — separate phase |
| Stripe / online payment | No payment gateway — manual only |
| Recurring invoices | Not needed for one-off plumbing jobs |
| Credit notes | Edge case — void + reissue is simpler |
| Email delivery | WhatsApp only for now (matches existing comms channel) |
| Customer invoice portal | No customer login exists |
| Accountant export (CSV/Xero) | Future phase |

---

## 14. Build Order

When ready to build, execute in this order:

```
1. Prisma schema  — add Invoice, InvoiceLineItem, InvoiceMessage models
2. DB push        — npx prisma db push
3. lib/invoices/  — generateRef.ts, buildFromQuote.ts, engine.ts
4. API routes     — generate, send, mark-paid, void, list, detail
5. Cron route     — invoice-overdue
6. Admin UI       — InvoicesTable, InvoiceDetail, InvoicePanel on booking page
7. WhatsApp templates — add invoice_sent, payment_receipt, overdue_reminder
8. Auto-trigger   — hook into booking completion status update
9. QA             — full flow test: complete booking → invoice → pay → receipt
```

---

*Document created by Claude Code — 14 March 2026. Ready for review before build.*
