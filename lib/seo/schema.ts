import { siteSettings } from "@/content/settings";

const siteUrl = siteSettings.siteUrl;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: siteSettings.companyName,
    telephone: siteSettings.phone,
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
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Boiler Service" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Plumber" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gas Safety Certificates" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Central Heating Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom Installations" } },
      ],
    },
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  slug: string;
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
    },
    datePublished: post.publishedAt,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    articleSection: post.category,
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
