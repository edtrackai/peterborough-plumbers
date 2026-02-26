export const siteSettings = {
  companyName: "Peterborough Plumbers",
  phone: "02039514510",
  phoneHref: "+442039514510",
  whatsappNumber: "442039514510",
  email: "info@peterboroughplumbers.com",
  address: "Peterborough, Cambridgeshire",
  gasSafeNumber: "123456",
  googleRating: "4.6",
  reviewCount: "120",
  yearsExperience: "30+",
  engineersCount: "12+",
  primaryCtaLabel: "Book Now",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: "WhatsApp Chat",
  whatsappPrefillMessage: "Hi, I'd like to book a plumbing service.",
  facebookUrl: "https://www.facebook.com/profile.php?id=61587839547753",
  youtubeUrl: "https://www.youtube.com/@Peterboroughplumbers",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://peterboroughplumbers.com",
  seoTitle: "Peterborough Plumbers | 30+ Years Established | Gas Safe Registered",
  seoDescription:
    "Peterborough's leading plumbers with 30+ years experience. Gas Safe registered engineers for boiler service, central heating, bathroom installations, emergency plumbing and more.",
} as const;

export function getWhatsAppUrl() {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(siteSettings.whatsappPrefillMessage)}`;
}
