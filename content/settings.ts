export const siteSettings = {
  companyName: "Peterborough Plumbers",
  phone: "01733797074",
  phoneHref: "+441733797074",
  whatsappNumber: "441733797074",
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
  xUrl: "https://x.com/PboroPlumbers",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://peterboroughplumbers.com",
  seoTitle: "Plumbers in Peterborough | Boiler, Heating & Repairs",
  seoDescription:
    "Trusted plumbers in Peterborough for boiler servicing, plumbing repairs & central heating. Qualified engineers, clear upfront quotes, fast response.",
} as const;

export function getWhatsAppUrl() {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(siteSettings.whatsappPrefillMessage)}`;
}
