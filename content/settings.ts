export const siteSettings = {
  companyName: "Peterborough Plumbers",
  phone: "02039514510",
  phoneHref: "+442039514510",
  whatsappNumber: "442039514510",
  email: "info@peterboroughplumbers.com",
  address: "Peterborough, Cambridgeshire",
  gasSafeNumber: "",
  googleRating: "4.6",
  reviewCount: "120",
  yearsExperience: "",
  engineersCount: "",
  primaryCtaLabel: "Book Now",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: "WhatsApp Chat",
  whatsappPrefillMessage: "Hi, I'd like to book a plumbing service.",
  facebookUrl: "https://www.facebook.com/profile.php?id=61587839547753",
  youtubeUrl: "https://www.youtube.com/@Peterboroughplumbers",
  instagramUrl: "https://www.instagram.com/peterboroughplumbers",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://peterboroughplumbers.com",
  seoTitle: "Peterborough Plumbers | Plumbing & Heating | Emergency Call-Outs",
  seoDescription:
    "Peterborough Plumbers provides plumbing repairs, boiler servicing, heating support and emergency call-outs across Peterborough and surrounding areas. Clear upfront quotes.",
} as const;

export function getWhatsAppUrl() {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(siteSettings.whatsappPrefillMessage)}`;
}
