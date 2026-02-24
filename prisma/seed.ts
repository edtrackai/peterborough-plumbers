import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { services } from "../content/services";
import { blogPosts as posts } from "../content/blog";
import { guides } from "../content/guides";
import { areas } from "../content/areas";
import { reviews } from "../content/reviews";
import { siteSettings } from "../content/settings";

const prisma = new PrismaClient();

// ── Booking system seed data ───────────────────────────────────────────────

const SERVICE_ZONES = [
  { prefix: "PE1", zoneName: "City Centre", travelBufferMins: 10 },
  { prefix: "PE2", zoneName: "Werrington & Paston", travelBufferMins: 15 },
  { prefix: "PE3", zoneName: "Longthorpe & Walton", travelBufferMins: 15 },
  { prefix: "PE4", zoneName: "Bretton & Ravensthorpe", travelBufferMins: 20 },
  { prefix: "PE6", zoneName: "Crowland & Deeping", travelBufferMins: 25 },
  { prefix: "PE7", zoneName: "Whittlesey & Coates", travelBufferMins: 20 },
  { prefix: "PE8", zoneName: "Oundle & Warmington", travelBufferMins: 30 },
  { prefix: "PE9", zoneName: "Stamford", travelBufferMins: 35 },
];

const DAILY_SLOTS = [
  { startTime: "08:00", endTime: "10:00" },
  { startTime: "10:00", endTime: "12:00" },
  { startTime: "12:00", endTime: "14:00" },
  { startTime: "14:00", endTime: "16:00" },
  { startTime: "16:00", endTime: "18:00" },
];

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  // ── 1. Site Settings ────────────────────────────────────────────────────
  console.log("Seeding site settings...");
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      companyName: siteSettings.companyName,
      phone: siteSettings.phone,
      phoneHref: siteSettings.phoneHref,
      whatsappNumber: siteSettings.whatsappNumber,
      email: siteSettings.email,
      address: siteSettings.address,
      gasSafeNumber: siteSettings.gasSafeNumber,
      googleRating: siteSettings.googleRating,
      reviewCount: siteSettings.reviewCount,
      yearsExperience: siteSettings.yearsExperience,
      engineersCount: siteSettings.engineersCount,
      primaryCtaLabel: siteSettings.primaryCtaLabel,
      primaryCtaHref: siteSettings.primaryCtaHref,
      secondaryCtaLabel: siteSettings.secondaryCtaLabel,
      whatsappPrefillMessage: siteSettings.whatsappPrefillMessage,
      siteUrl: "https://peterboroughplumbers.com",
      seoTitle: siteSettings.seoTitle,
      seoDescription: siteSettings.seoDescription,
    },
    update: {
      companyName: siteSettings.companyName,
      phone: siteSettings.phone,
      phoneHref: siteSettings.phoneHref,
      whatsappNumber: siteSettings.whatsappNumber,
      email: siteSettings.email,
      address: siteSettings.address,
      gasSafeNumber: siteSettings.gasSafeNumber,
      googleRating: siteSettings.googleRating,
      reviewCount: siteSettings.reviewCount,
      yearsExperience: siteSettings.yearsExperience,
      engineersCount: siteSettings.engineersCount,
      primaryCtaLabel: siteSettings.primaryCtaLabel,
      primaryCtaHref: siteSettings.primaryCtaHref,
      secondaryCtaLabel: siteSettings.secondaryCtaLabel,
      whatsappPrefillMessage: siteSettings.whatsappPrefillMessage,
      siteUrl: "https://peterboroughplumbers.com",
      seoTitle: siteSettings.seoTitle,
      seoDescription: siteSettings.seoDescription,
    },
  });
  console.log("  ✓ Site settings");

  // ── 2. Services ──────────────────────────────────────────────────────────
  console.log(`Seeding ${services.length} services...`);
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      create: {
        name: s.name,
        slug: s.slug,
        shortDescription: s.shortDescription,
        heroHeading: s.heroHeading,
        heroSubheading: s.heroSubheading,
        content: s.content,
        faqs: s.faqs,
        seoTitle: s.seoTitle,
        seoDescription: s.seoDescription,
        featured: s.featured,
        sortOrder: s.sortOrder,
        image: s.image ?? null,
        heroImage: s.heroImage ?? null,
      },
      update: {
        name: s.name,
        shortDescription: s.shortDescription,
        heroHeading: s.heroHeading,
        heroSubheading: s.heroSubheading,
        content: s.content,
        faqs: s.faqs,
        seoTitle: s.seoTitle,
        seoDescription: s.seoDescription,
        featured: s.featured,
        sortOrder: s.sortOrder,
        image: s.image ?? null,
        heroImage: s.heroImage ?? null,
      },
    });
  }
  console.log(`  ✓ ${services.length} services`);

  // ── 3. Blog Posts ────────────────────────────────────────────────────────
  console.log(`Seeding ${posts.length} blog posts...`);
  for (const p of posts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      create: {
        title: p.title,
        slug: p.slug,
        category: p.category,
        excerpt: p.excerpt,
        content: p.content,
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        status: p.status,
        publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
      },
      update: {
        title: p.title,
        category: p.category,
        excerpt: p.excerpt,
        content: p.content,
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        status: p.status,
        publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
      },
    });
  }
  console.log(`  ✓ ${posts.length} blog posts`);

  // ── 4. Guides ────────────────────────────────────────────────────────────
  console.log(`Seeding ${guides.length} guides...`);
  for (const g of guides) {
    await prisma.guide.upsert({
      where: { slug: g.slug },
      create: {
        name: g.name,
        slug: g.slug,
        excerpt: g.excerpt,
        category: g.category,
        readTime: g.readTime,
        publishedAt: new Date(g.publishedAt),
        content: g.content,
      },
      update: {
        name: g.name,
        excerpt: g.excerpt,
        category: g.category,
        readTime: g.readTime,
        publishedAt: new Date(g.publishedAt),
        content: g.content,
      },
    });
  }
  console.log(`  ✓ ${guides.length} guides`);

  // ── 5. Areas ─────────────────────────────────────────────────────────────
  console.log(`Seeding ${areas.length} areas...`);
  for (const a of areas) {
    await prisma.area.upsert({
      where: { slug: a.slug },
      create: {
        name: a.name,
        slug: a.slug,
        intro: a.intro,
        landmarks: a.landmarks,
        postcodes: a.postcodes,
        seoTitle: a.seoTitle,
        seoDescription: a.seoDescription,
      },
      update: {
        name: a.name,
        intro: a.intro,
        landmarks: a.landmarks,
        postcodes: a.postcodes,
        seoTitle: a.seoTitle,
        seoDescription: a.seoDescription,
      },
    });
  }
  console.log(`  ✓ ${areas.length} areas`);

  // ── 6. Reviews ───────────────────────────────────────────────────────────
  console.log(`Seeding ${reviews.length} reviews...`);
  // Reviews have no unique slug — delete all and re-insert to avoid duplicates
  await prisma.review.deleteMany();
  await prisma.review.createMany({
    data: reviews.map((r) => ({
      customerName: r.customerName,
      areaName: r.areaName,
      rating: r.rating,
      body: r.body,
      source: r.source,
      featured: r.featured,
    })),
  });
  console.log(`  ✓ ${reviews.length} reviews`);

  // ── 7. Booking system: Service Zones ────────────────────────────────────
  console.log("Seeding service zones...");
  for (const zone of SERVICE_ZONES) {
    await prisma.serviceZone.upsert({
      where: { prefix: zone.prefix },
      create: zone,
      update: { zoneName: zone.zoneName, travelBufferMins: zone.travelBufferMins },
    });
  }
  console.log(`  ✓ ${SERVICE_ZONES.length} service zones`);

  // ── 8. Booking system: Time Slots (next 21 days, Mon–Sat) ────────────────
  console.log("Seeding time slots...");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let slotsCreated = 0;
  for (let dayOffset = 1; dayOffset <= 21; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    if (date.getDay() === 0) continue; // Skip Sundays
    for (const slot of DAILY_SLOTS) {
      await prisma.timeSlot.upsert({
        where: { date_startTime: { date, startTime: slot.startTime } },
        create: { date, startTime: slot.startTime, endTime: slot.endTime, capacity: 2, bookedCount: 0, isActive: true },
        update: {},
      });
      slotsCreated++;
    }
  }
  console.log(`  ✓ ${slotsCreated} time slots`);

  // ── 9. Plumbers ──────────────────────────────────────────────────────────
  console.log("Seeding plumbers...");
  const PLUMBERS = [
    { name: "Dave Wilson", email: "plumber1@local.test", phone: "07700 900001", password: "Plumber123!", isOnDuty: true },
    { name: "Sam Carter",  email: "plumber2@local.test", phone: "07700 900002", password: "Plumber123!", isOnDuty: false },
  ];
  for (const p of PLUMBERS) {
    const passwordHash = await hash(p.password, 10);
    await prisma.plumber.upsert({
      where: { email: p.email },
      create: { name: p.name, email: p.email, phone: p.phone, passwordHash, isActive: true, isOnDuty: p.isOnDuty },
      update: { name: p.name, phone: p.phone, passwordHash, isOnDuty: p.isOnDuty },
    });
  }
  console.log(`  ✓ ${PLUMBERS.length} plumbers`);

  console.log("\nSeed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
