export const siteSettings = {
  companyName: "Peterborough Plumbers",
  phone: "02039514510",
  phoneHref: "+442039514510",
  whatsappNumber: "442039514510",
  email: "info@peterboroughplumbers.com",
  address: "3 Saville Road, Peterborough PE3 7PR",
  gasSafeNumber: "",
  googleRating: "4.6",
  reviewCount: "120",
  yearsExperience: "50+",
  engineersCount: "",
  primaryCtaLabel: "Book Now",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: "WhatsApp Chat",
  whatsappPrefillMessage: "Hi, I'd like to book a plumbing service.",
  facebookUrl: "https://www.facebook.com/profile.php?id=61587839547753",
  youtubeUrl: "https://www.youtube.com/@Peterboroughplumbers",
  instagramUrl: "https://www.instagram.com/peterboroughplumbers",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://peterboroughplumbers.com",
  seoTitle: "Peterborough Plumbing & Heating | Emergency Call-Outs",
  seoDescription:
    "50+ years experience in Peterborough. Boiler servicing, repairs, central heating & emergency call-outs. Qualified engineers, clear upfront quotes.",
} as const;

export function getWhatsAppUrl() {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(siteSettings.whatsappPrefillMessage)}`;
}
