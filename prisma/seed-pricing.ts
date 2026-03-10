/**
 * Seed: pb_pricing
 * Run: npx tsx prisma/seed-pricing.ts
 *
 * Safe to re-run — uses upsert on serviceSlug (unique key).
 * Prices sourced from app/(public)/pricing/page.tsx as of March 2026.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pricingData = [
  // ── Boiler Services ────────────────────────────────────────────────────────
  {
    serviceSlug: "annual-boiler-service",
    serviceName: "Annual Boiler Service",
    price: "£79",
    priceLabel: "From",
    priceNote: "Includes written service certificate, engineer ID provided",
  },
  {
    serviceSlug: "boiler-repair-standard",
    serviceName: "Boiler Repair (diagnosis + repair)",
    price: "£95",
    priceLabel: "From",
    priceNote: "Parts quoted separately, approved before fitting",
  },
  {
    serviceSlug: "boiler-repair-complex",
    serviceName: "Boiler Repair (complex fault)",
    price: "£150",
    priceLabel: "From",
    priceNote: "Heat exchanger, PCB, gas valve — parts extra",
  },
  {
    serviceSlug: "new-combi-boiler",
    serviceName: "New Combi Boiler (supply & fit)",
    price: "£1,800",
    priceLabel: "From",
    priceNote: "Worcester Bosch, Vaillant, Baxi — 10-year warranty available",
  },
  {
    serviceSlug: "new-system-boiler",
    serviceName: "New System Boiler (supply & fit)",
    price: "£2,400",
    priceLabel: "From",
    priceNote: "Includes hot water cylinder, unvented available",
  },
  {
    serviceSlug: "new-regular-boiler",
    serviceName: "New Regular/Heat-Only Boiler",
    price: "£2,200",
    priceLabel: "From",
    priceNote: "Retain existing hot water tank",
  },
  {
    serviceSlug: "boiler-replacement",
    serviceName: "Boiler Replacement (like-for-like)",
    price: "£1,800",
    priceLabel: "From",
    priceNote: "Same position, same type — typically same-day",
  },
  {
    serviceSlug: "boiler-flue-extension",
    serviceName: "Boiler Flue Extension",
    price: "£120",
    priceLabel: "From",
    priceNote: "Per metre, includes fittings",
  },

  // ── Heating & Radiators ────────────────────────────────────────────────────
  {
    serviceSlug: "power-flush-small",
    serviceName: "Power Flush (up to 5 radiators)",
    price: "£299",
    priceLabel: "From",
    priceNote: "Includes inhibitor treatment, clears sludge & scale",
  },
  {
    serviceSlug: "power-flush-medium",
    serviceName: "Power Flush (6–10 radiators)",
    price: "£399",
    priceLabel: "From",
    priceNote: "Includes inhibitor, filter clean, and report",
  },
  {
    serviceSlug: "power-flush-large",
    serviceName: "Power Flush (11+ radiators)",
    price: "£499",
    priceLabel: "From",
    priceNote: "Full system with magnetic filter refit",
  },
  {
    serviceSlug: "radiator-replacement",
    serviceName: "Radiator Replacement (supply & fit)",
    price: "£150",
    priceLabel: "From",
    priceNote: "Per standard single or double panel radiator",
  },
  {
    serviceSlug: "radiator-addition",
    serviceName: "Radiator Added to Existing System",
    price: "£220",
    priceLabel: "From",
    priceNote: "Includes all pipework to nearest flow/return",
  },
  {
    serviceSlug: "trv-replacement",
    serviceName: "TRV Replacement",
    price: "£60",
    priceLabel: "From",
    priceNote: "Per thermostatic radiator valve",
  },
  {
    serviceSlug: "magnetic-filter",
    serviceName: "Magnetic System Filter (supply & fit)",
    price: "£120",
    priceLabel: "From",
    priceNote: "Adey MagnaClean or equivalent",
  },
  {
    serviceSlug: "underfloor-heating-electric",
    serviceName: "Underfloor Heating (electric, per room)",
    price: "£500",
    priceLabel: "From",
    priceNote: "Mat system, suitable for tiles and LVT",
  },
  {
    serviceSlug: "zone-valve-replacement",
    serviceName: "Zone Valve Replacement",
    price: "£110",
    priceLabel: "From",
    priceNote: "Mid-position or 2-port",
  },

  // ── Plumbing Repairs & Installations ──────────────────────────────────────
  {
    serviceSlug: "tap-repair",
    serviceName: "Dripping Tap Repair",
    price: "£65",
    priceLabel: "From",
    priceNote: "Washer, cartridge, or ceramic disc replacement",
  },
  {
    serviceSlug: "drain-blocked-internal",
    serviceName: "Blocked Drain (internal)",
    price: "£75",
    priceLabel: "From",
    priceNote: "Rodding or jetting, internal pipework",
  },
  {
    serviceSlug: "leak-detection",
    serviceName: "Leak Detection & Repair",
    price: "£95",
    priceLabel: "From",
    priceNote: "Acoustic or thermal trace included",
  },
  {
    serviceSlug: "stopcock-replacement",
    serviceName: "Stopcock Replacement",
    price: "£90",
    priceLabel: "From",
    priceNote: "Supply and fit standard or quarter-turn",
  },
  {
    serviceSlug: "cistern-repair",
    serviceName: "Overflow / Cistern Repair",
    price: "£70",
    priceLabel: "From",
    priceNote: "Ballcock, float valve, or fill valve",
  },
  {
    serviceSlug: "pipe-repair",
    serviceName: "Pipe Repair (single joint / section)",
    price: "£85",
    priceLabel: "From",
    priceNote: "Soldered, push-fit, or compression",
  },
  {
    serviceSlug: "outside-tap",
    serviceName: "Outside Tap Installation",
    price: "£150",
    priceLabel: "From",
    priceNote: "Supply, fit, and insulate — includes isolation valve",
  },
  {
    serviceSlug: "water-softener",
    serviceName: "Water Softener Installation",
    price: "£350",
    priceLabel: "From",
    priceNote: "Labour only — unit supplied separately or by us",
  },
  {
    serviceSlug: "hot-water-cylinder",
    serviceName: "Hot Water Cylinder Replacement",
    price: "£600",
    priceLabel: "From",
    priceNote: "Vented or unvented, includes commissioning",
  },

  // ── Bathroom Installations ─────────────────────────────────────────────────
  {
    serviceSlug: "bathroom-refit-basic",
    serviceName: "Basic Bathroom Refit (suite swap)",
    price: "£2,500",
    priceLabel: "From",
    priceNote: "Existing layout retained, new suite fitted",
  },
  {
    serviceSlug: "bathroom-renovation-full",
    serviceName: "Full Bathroom Renovation",
    price: "£4,000",
    priceLabel: "From",
    priceNote: "New layout, new suite, tiling labour included",
  },
  {
    serviceSlug: "ensuite-installation",
    serviceName: "En-Suite Installation",
    price: "£2,000",
    priceLabel: "From",
    priceNote: "Shower, close-coupled WC, basin — all plumbing",
  },
  {
    serviceSlug: "wet-room-conversion",
    serviceName: "Wet Room Conversion",
    price: "£3,500",
    priceLabel: "From",
    priceNote: "Tanking, tray, waste, screen, plumbing",
  },
  {
    serviceSlug: "shower-electric",
    serviceName: "Electric Shower Installation",
    price: "£350",
    priceLabel: "From",
    priceNote: "Supply and fit, includes new circuit if needed",
  },
  {
    serviceSlug: "shower-mixer",
    serviceName: "Mixer Shower Installation",
    price: "£400",
    priceLabel: "From",
    priceNote: "Thermostatic mixer, riser rail, and tray",
  },
  {
    serviceSlug: "toilet-installation",
    serviceName: "Toilet Installation (close-coupled)",
    price: "£150",
    priceLabel: "From",
    priceNote: "Supply and fit, wax seal, isolation valve",
  },
  {
    serviceSlug: "basin-installation",
    serviceName: "Basin and Pedestal (supply & fit)",
    price: "£180",
    priceLabel: "From",
    priceNote: "Includes waste, taps, and bottle trap",
  },
  {
    serviceSlug: "bath-installation",
    serviceName: "Bath Installation (standard)",
    price: "£250",
    priceLabel: "From",
    priceNote: "Panel bath, includes waste and taps",
  },

  // ── Gas Safety & Certification ─────────────────────────────────────────────
  {
    serviceSlug: "gas-safety-cp12-1",
    serviceName: "Gas Safety Certificate (CP12) — 1 appliance",
    price: "£65",
    priceLabel: "From",
    priceNote: "Mandatory annual requirement for landlords",
  },
  {
    serviceSlug: "gas-safety-cp12-extra",
    serviceName: "Gas Safety Certificate — each extra appliance",
    price: "£15",
    priceLabel: "+",
    priceNote: "Boiler, hob, fire, warm air unit",
  },
  {
    serviceSlug: "co-alarm",
    serviceName: "Carbon Monoxide Alarm (supply & fit)",
    price: "£45",
    priceLabel: "From",
    priceNote: "BS EN 50291 approved detector",
  },
  {
    serviceSlug: "gas-pressure-test",
    serviceName: "Gas Pressure Test",
    price: "£75",
    priceLabel: "From",
    priceNote: "Full pipework test to BS 6891",
  },
  {
    serviceSlug: "gas-appliance-service",
    serviceName: "Gas Appliance Service (standalone)",
    price: "£79",
    priceLabel: "From",
    priceNote: "Hob, gas fire, or warm air heater",
  },

  // ── Drain Blockages & CCTV ─────────────────────────────────────────────────
  {
    serviceSlug: "drain-clearance-internal",
    serviceName: "Internal Drain Clearance (jetting)",
    price: "£75",
    priceLabel: "From",
    priceNote: "Kitchen, bathroom, or soil stack",
  },
  {
    serviceSlug: "drain-clearance-external",
    serviceName: "External Drain Clearance (jetting)",
    price: "£120",
    priceLabel: "From",
    priceNote: "Manhole to manhole, includes CCTV scan",
  },
  {
    serviceSlug: "drain-cctv-survey",
    serviceName: "CCTV Drain Survey",
    price: "£150",
    priceLabel: "From",
    priceNote: "Full recorded inspection with written report",
  },
  {
    serviceSlug: "drain-repair-patch",
    serviceName: "Drain Repair (patch lining)",
    price: "£250",
    priceLabel: "From",
    priceNote: "No-dig repair for cracks and root ingress",
  },
  {
    serviceSlug: "drain-unblocking-emergency",
    serviceName: "Drain Unblocking (emergency, 24hr)",
    price: "£149",
    priceLabel: "From",
    priceNote: "Out-of-hours response",
  },

  // ── Emergency Call-Out ─────────────────────────────────────────────────────
  {
    serviceSlug: "emergency-daytime",
    serviceName: "Daytime Emergency (Mon–Fri 8am–6pm)",
    price: "£99",
    priceLabel: "From",
    priceNote: "Includes call-out + first 30 min labour",
  },
  {
    serviceSlug: "emergency-evening",
    serviceName: "Evening Emergency (Mon–Fri after 6pm)",
    price: "£149",
    priceLabel: "From",
    priceNote: "Includes call-out + first 30 min labour",
  },
  {
    serviceSlug: "emergency-weekend",
    serviceName: "Weekend & Bank Holiday Emergency",
    price: "£149",
    priceLabel: "From",
    priceNote: "Includes call-out + first 30 min labour",
  },
  {
    serviceSlug: "emergency-labour-hourly",
    serviceName: "Additional labour (per hour)",
    price: "£60–£90",
    priceLabel: "",
    priceNote: "After first included period",
  },
  {
    serviceSlug: "emergency-parts",
    serviceName: "Parts & materials",
    price: "Cost + fitting",
    priceLabel: "",
    priceNote: "Quoted separately, your approval required",
  },

  // ── Landlord Services ──────────────────────────────────────────────────────
  {
    serviceSlug: "landlord-gas-boiler-combined",
    serviceName: "Annual Gas Safety + Boiler Service (combined)",
    price: "£120",
    priceLabel: "From",
    priceNote: "CP12 + service certificate, best value",
  },
  {
    serviceSlug: "landlord-gas-safety-only",
    serviceName: "Annual Gas Safety Certificate only",
    price: "£65",
    priceLabel: "From",
    priceNote: "CP12, up to 2 appliances",
  },
  {
    serviceSlug: "landlord-maintenance-package",
    serviceName: "Landlord Annual Maintenance Package",
    price: "POA",
    priceLabel: "",
    priceNote: "CP12, boiler service, plumbing check — call for quote",
  },
  {
    serviceSlug: "landlord-emergency-callout",
    serviceName: "Emergency Tenanted Property Call-Out",
    price: "£99",
    priceLabel: "From",
    priceNote: "Priority response, invoice to landlord",
  },
] as const;

async function main() {
  console.log(`Seeding ${pricingData.length} pricing records…`);

  let upserted = 0;
  for (const item of pricingData) {
    await prisma.pricing.upsert({
      where: { serviceSlug: item.serviceSlug },
      update: {
        serviceName: item.serviceName,
        price: item.price,
        priceLabel: item.priceLabel,
        priceNote: item.priceNote ?? null,
      },
      create: {
        serviceSlug: item.serviceSlug,
        serviceName: item.serviceName,
        price: item.price,
        priceLabel: item.priceLabel,
        priceNote: item.priceNote ?? null,
        isActive: true,
      },
    });
    upserted++;
  }

  console.log(`✅ Done — ${upserted} pricing records upserted.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
