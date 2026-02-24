# TASK: Postcode-First "Book a Plumber" System

Implement a cab-style booking flow using Neon Postgres + Prisma + Next.js App Router.

---

## ABSOLUTE RULES

- Do NOT redesign existing site/theme — colours, spacing, animations, tokens unchanged.
- Only add: new booking feature pages, API routes, Prisma models, seed script.
- Must work on localhost.
- No unrelated changes. Minimal diffs.
- Load `.claude/skills/peterborough-master/SKILL.md` and follow all coding, SEO, and QA rules.
- UK English throughout. All phone numbers as `<a href="tel:+44...">`.

---

## USER FLOW (5 Steps)

### Step 1 — Postcode Gate (`/book-a-plumber`)

**UI:**
- H1: "Book a Plumber in Peterborough"
- Input field: "Enter your postcode" (placeholder: "e.g. PE1 2AB")
- Button: "Check Availability"
- Trust badges below: Gas Safe / 30+ Years / No Call-Out Fee

**API call:** `POST /api/availability/check` with `{ postcode }`

**API logic:**
1. Normalise UK postcode: uppercase, trim, extract outward prefix (e.g. "pe1 2ab" → "PE1")
2. Look up `ServiceZone` where `prefix = extracted prefix` AND `isActive = true`
3. If no matching zone → return `{ covered: false }` → UI shows: "Sorry, we don't currently cover [postcode]. Call us on [phone] and we may be able to help."
4. If zone found → query `TimeSlot` for slots where `date` is within next 7 days, `isActive = true`, and `bookedCount < capacity`, ordered by date+startTime ASC
5. Return `{ covered: true, zonePrefix, zoneName, travelBufferMins, slots: [ {id, date, startTime, endTime, spotsLeft} ] }`

### Step 2 — Slot Selection (same page, revealed after postcode check)

**UI (shown only when covered=true):**
- Heading: "Choose a time slot"
- Slots grouped by date (e.g. "Monday 24 Feb", "Tuesday 25 Feb")
- Each slot shown as a tappable card: `"09:00 – 11:00"` with `"2 spots left"` badge
- Slots with 0 spots: greyed out, not clickable
- If no slots at all in next 7 days: show "No slots available this week. Call us on [phone] for emergency service."
- Highlight: first available slot has a subtle "Earliest available" badge

**On slot tap:** slot card highlights (selected state). Show "Reserve This Slot" button.

**API call:** `POST /api/slots/reserve` with `{ slotId, postcode, zonePrefix }`

**API logic (atomic transaction):**
1. Begin transaction
2. Re-read the `TimeSlot` row with a row lock (`SELECT ... FOR UPDATE`)
3. Verify `bookedCount < capacity` — if not, rollback, return `{ success: false, reason: "slot_full" }`
4. Increment `bookedCount` by 1
5. Create `Booking` with:
   - `status: "reserved"`
   - `postcode`, `zonePrefix`, `slotId`
   - `bookingRef`: generate as `PB-[YYMMDD]-[4-digit sequential or random]` (e.g. `PB-260224-0042`)
   - `reservedAt: now()`
   - `expiresAt: now() + 15 minutes`
6. Commit transaction
7. Return `{ success: true, bookingId, bookingRef, expiresAt }`

**UI after reserve:**
- Show: "Slot reserved! Complete your details within 15 minutes."
- Auto-advance to Step 3

**If slot_full returned:** Show toast/alert: "Sorry, that slot just filled up. Please choose another." Re-fetch available slots.

### Step 3 — Booking Details Form (same page, next section)

**UI:**
- Countdown timer showing minutes remaining on reservation (from `expiresAt`)
- Booking ref shown: "Ref: PB-260224-0042"

**Form fields:**
| Field | Required | Validation |
|---|---|---|
| Service type | Yes | Button group: Emergency / Boiler / Heating / Bathroom / Drain / Leak / Gas Safety / General |
| Brief description | Yes | Textarea, 10–500 chars. Placeholder: "e.g. Boiler not firing, no hot water" |
| Your name | Yes | 2–100 chars |
| Phone number | Yes | UK phone regex: `^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3,4}$` or landline |
| Email | No | Valid email format if provided |
| Property address | No | Free text, max 200 chars |
| Access notes | No | Free text, max 300 chars. Placeholder: "e.g. Side gate code 1234, park on drive" |

**Submit button:** "Confirm Booking"

**API call:** `POST /api/bookings/confirm` with `{ bookingId, serviceType, description, customerName, phone, email?, address?, accessNotes? }`

**API logic:**
1. Look up Booking by `bookingId`
2. Verify `status = "reserved"` — if not, return error
3. Verify `expiresAt > now()` — if expired, return `{ success: false, reason: "expired" }` with message "Your reservation expired. Please start again."
4. If expired: also decrement the `TimeSlot.bookedCount` by 1 and delete the booking (or set status="expired")
5. Update Booking: fill in all detail fields, set `status = "new"`, clear `expiresAt`
6. Return `{ success: true, bookingId, bookingRef }`

**On success:** redirect to `/booking/[bookingRef]`

**On expired:** show message with "Start Over" button linking back to `/book-a-plumber`

### Step 4 — Confirmation Page (`/booking/[ref]`)

**UI:**
- H1: "Booking Confirmed"
- Green checkmark icon
- Details card:
  - Booking reference: `PB-260224-0042`
  - Postcode: `PE1 2AB`
  - Time slot: `Monday 24 Feb, 09:00 – 11:00`
  - Service: `Boiler Repair`
  - Issue: `"Boiler not firing, no hot water"`
  - Name: `John Smith`
  - Phone: `07700 900123`
- Trust message: "A Gas Safe registered engineer will attend. No call-out fee."
- **WhatsApp button:** "Message Us on WhatsApp" → opens `https://wa.me/44XXXXXXXXXXX?text=Hi, I've just booked (ref: PB-260224-0042). [Service type] at [postcode], [date] [time]. [Description]`
- **Call button:** "Call to Discuss" → `tel:+44XXXXXXXXXXX`
- **"Book Another"** link back to `/book-a-plumber`

**API:** `GET /api/bookings/[ref]` — look up by `bookingRef`, return details. Only return if `status` is not `"expired"` or `"cancelled"`.

### Step 5 — Admin Dashboard (`/admin/bookings`)

**UI:**
- H1: "Booking Management"
- Table columns: Ref | Date/Time | Postcode | Customer | Phone | Service | Status | Actions
- Sorted: newest first (by `createdAt`)
- Status badges: colour-coded (reserved=amber, new=blue, confirmed=green, completed=grey, cancelled=red)
- **Actions per row:**
  - Status dropdown: can change to `confirmed` / `completed` / `cancelled`
  - "Call" button (tel: link)
  - "WhatsApp" button
- **Filters:** status dropdown, date range picker
- Simple pagination (20 per page)

**API:** `GET /api/admin/bookings?status=&page=&from=&to=` — return paginated bookings with slot details joined.
**API:** `PATCH /api/admin/bookings/[id]` — update status only. Validate status transition is valid.

**No auth for now** (localhost only) — add a `TODO: add auth before production` comment.

---

## DATABASE (Prisma Schema)

```prisma
model ServiceZone {
  id               String   @id @default(cuid())
  prefix           String   @unique          // "PE1", "PE2", etc.
  zoneName         String                    // "City Centre", "Werrington"
  isActive         Boolean  @default(true)
  travelBufferMins Int      @default(15)
  createdAt        DateTime @default(now())

  @@index([prefix, isActive])
}

model TimeSlot {
  id          String    @id @default(cuid())
  date        DateTime  @db.Date             // 2026-02-24
  startTime   String                         // "09:00"
  endTime     String                         // "11:00"
  capacity    Int       @default(2)
  bookedCount Int       @default(0)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  bookings    Booking[]

  @@unique([date, startTime])
  @@index([date, isActive])
  @@index([bookedCount])
}

model Booking {
  id            String    @id @default(cuid())
  bookingRef    String    @unique             // "PB-260224-0042"
  status        String    @default("reserved") // reserved | new | confirmed | completed | cancelled | expired
  postcode      String
  zonePrefix    String
  slotId        String
  slot          TimeSlot  @relation(fields: [slotId], references: [id])
  serviceType   String?
  description   String?
  customerName  String?
  phone         String?
  email         String?
  address       String?
  accessNotes   String?
  reservedAt    DateTime  @default(now())
  expiresAt     DateTime?
  confirmedAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([bookingRef])
  @@index([status])
  @@index([createdAt(sort: Desc)])
  @@index([zonePrefix])
}
```

---

## SEED SCRIPT (`prisma/seed.ts`)

### Service Zones
Insert zones for PE1 through PE8, all active:

| Prefix | Zone Name | Travel Buffer |
|---|---|---|
| PE1 | City Centre | 10 |
| PE2 | Orton / City Centre South | 15 |
| PE3 | Bretton / Westwood | 15 |
| PE4 | Werrington / Gunthorpe | 20 |
| PE5 | Ailsworth / Castor | 25 |
| PE6 | Market Deeping / Eye | 25 |
| PE7 | Yaxley / Hampton / Whittlesey | 20 |
| PE8 | Oundle / Wansford | 30 |

### Time Slots
Generate slots for the **next 14 days** from seed run date:
- Days: Monday to Saturday only (skip Sunday)
- Windows: `09:00–11:00`, `11:00–13:00`, `13:00–15:00`, `15:00–17:00`
- Capacity: 2 per slot
- `bookedCount`: 0
- `isActive`: true

Use a loop with `date-fns` or native Date to generate. Skip Sundays.

**Note:** Add a comment in seed script: `// Re-run weekly to generate new slots, or build a cron job for production`

---

## RESERVATION EXPIRY (Cleanup)

Create a utility function `lib/booking/cleanupExpired.ts`:
```typescript
// Finds all bookings where status="reserved" AND expiresAt < now()
// For each: set status="expired", decrement TimeSlot.bookedCount by 1
// Run this at the start of every /api/availability/check and /api/slots/reserve call
```

This ensures expired reservations free up slots without needing a cron job on localhost.

---

## API ENDPOINTS SUMMARY

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/availability/check` | Postcode lookup + available slots |
| POST | `/api/slots/reserve` | Atomic slot reservation |
| POST | `/api/bookings/confirm` | Complete booking with details |
| GET | `/api/bookings/[ref]` | Fetch booking by reference |
| GET | `/api/admin/bookings` | List bookings (paginated, filterable) |
| PATCH | `/api/admin/bookings/[id]` | Update booking status |

All POST endpoints: validate with Zod. Return structured JSON. Field-level errors on 400.

---

## ERROR HANDLING

| Scenario | API Response | UI Behaviour |
|---|---|---|
| Postcode not covered | `{ covered: false }` | "Sorry, we don't cover this area" + phone CTA |
| No slots available | `{ covered: true, slots: [] }` | "No availability this week" + phone CTA |
| Slot filled during reserve | `{ success: false, reason: "slot_full" }` | Toast: "Slot just filled" + re-fetch slots |
| Reservation expired | `{ success: false, reason: "expired" }` | "Reservation expired" + "Start Over" button |
| Booking not found | 404 | "Booking not found" page |
| Validation failure | 400 + field errors | Inline field-level error messages |
| Server error | 500 generic message | "Something went wrong, please call us" + phone |

---

## FILE STRUCTURE (Expected New Files)

```
app/
  book-a-plumber/
    page.tsx                    # Postcode gate + slot selection + booking form
  booking/
    [ref]/
      page.tsx                  # Confirmation page
  admin/
    bookings/
      page.tsx                  # Admin dashboard
  api/
    availability/
      check/route.ts            # Postcode + slots lookup
    slots/
      reserve/route.ts          # Atomic reservation
    bookings/
      confirm/route.ts          # Complete booking
      [ref]/route.ts            # Get booking by ref
    admin/
      bookings/
        route.ts                # List bookings
        [id]/route.ts           # Update booking status

components/
  booking/
    PostcodeGate.tsx            # Postcode input + check button
    SlotPicker.tsx              # Date-grouped slot cards
    BookingDetailsForm.tsx      # Service type + details form
    ReservationTimer.tsx        # Countdown timer component
    BookingConfirmation.tsx     # Confirmation card
    AdminBookingTable.tsx       # Admin data table

lib/
  booking/
    cleanupExpired.ts           # Expired reservation cleanup
    generateRef.ts              # Booking reference generator
  validations/
    booking.ts                  # Zod schemas for all endpoints

prisma/
  schema.prisma                 # Add 3 new models (don't touch existing)
  seed.ts                       # Zone + slot seeding
```

---

## DELIVERABLE CHECKLIST

- [ ] `npx prisma migrate dev` runs clean
- [ ] `npx prisma db seed` populates zones + 14 days of slots
- [ ] Full flow works: postcode → slots → reserve → details → confirm → confirmation page
- [ ] Expired reservations cleaned up automatically
- [ ] Admin can view and update bookings
- [ ] WhatsApp button prefills correct message
- [ ] All components accessible (labels, focus states, keyboard nav, 44px touch targets)
- [ ] Mobile-first: works at 375px
- [ ] No changes to existing pages, components, or styles
- [ ] UK English throughout
- [ ] No placeholder phone numbers in final output (use env var or config)
