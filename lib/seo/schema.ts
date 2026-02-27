import { siteSettings } from "@/content/settings";

const siteUrl = siteSettings.siteUrl;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: siteSettings.companyName,
    telephone: siteSettings.phoneHref, // E.164 format: +442039514510
    email: siteSettings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Peterborough",
      addressLocality: "Peterborough",
      addressRegion: "Cambridgeshire",
      postalCode: "PE1",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.5735,
      longitude: -0.2404,
    },
    image: `${siteUrl}/images/homepage/hero.png`,
    url: siteUrl,
    priceRange: "££",
    description: siteSettings.seoDescription,
    areaServed: [
      "Peterborough", "Orton", "Werrington", "Hampton", "Bretton",
      "Market Deeping", "Yaxley", "Whittlesey", "Stamford",
    ],
    openingHours: [
      "Mo-Fr 08:00-18:00",
      "Sa 08:00-17:00",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteSettings.googleRating,
      bestRating: "5",
      worstRating: "1",
      ratingCount: siteSettings.reviewCount,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing & Heating Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Boiler Service", url: `${siteUrl}/services/boiler-service` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Plumber", url: `${siteUrl}/services/emergency-plumber` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gas Safety Certificates", url: `${siteUrl}/services/gas-safety-certificates` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Central Heating Services", url: `${siteUrl}/services/central-heating-services` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom Installations", url: `${siteUrl}/services/bathroom-installations` } },
      ],
    },
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  slug: string;
  offers?: { price: string; priceCurrency?: string; description?: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Plumber",
      name: siteSettings.companyName,
    },
    areaServed: {
      "@type": "City",
      name: "Peterborough",
    },
    url: `${siteUrl}/services/${service.slug}`,
    ...(service.offers && {
      offers: {
        "@type": "Offer",
        price: service.offers.price,
        priceCurrency: service.offers.priceCurrency ?? "GBP",
        description: service.offers.description,
      },
    }),
  };
}

export function howToSchema(how: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: how.name,
    description: how.description,
    step: how.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt?: string | null;
  category: string;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: siteSettings.companyName,
    },
    publisher: {
      "@type": "Organization",
      name: siteSettings.companyName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    articleSection: post.category,
    ...(post.image && {
      image: {
        "@type": "ImageObject",
        url: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
      },
    }),
  };
}

export function breadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };
}
