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
      streetAddress: "3 Saville Road",
      addressLocality: "Peterborough",
      addressRegion: "Cambridgeshire",
      postalCode: "PE3 7PR",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.5735,
      longitude: -0.2404,
    },
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/homepage/hero.webp`,
      width: 1200,
      height: 630,
      encodingFormat: "image/webp",
      representativeOfPage: true,
      contentLocation: {
        "@type": "Place",
        name: "Peterborough, Cambridgeshire, UK",
        geo: { "@type": "GeoCoordinates", latitude: 52.5735, longitude: -0.2404 },
      },
    },
    url: siteUrl,
    sameAs: [
      siteSettings.facebookUrl,
      siteSettings.youtubeUrl,
      siteSettings.instagramUrl,
    ],
    priceRange: "££",
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteSettings.address)}`,
    description: siteSettings.seoDescription,
    areaServed: [
      { "@type": "City", name: "Peterborough", addressCountry: "GB" },
      { "@type": "City", name: "Orton" },
      { "@type": "City", name: "Werrington" },
      { "@type": "City", name: "Hampton" },
      { "@type": "City", name: "Bretton" },
      { "@type": "City", name: "Market Deeping" },
      { "@type": "City", name: "Yaxley" },
      { "@type": "City", name: "Whittlesey" },
      { "@type": "City", name: "Stamford" },
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
      ratingValue: parseFloat(siteSettings.googleRating),
      bestRating: 5,
      worstRating: 1,
      ratingCount: parseInt(siteSettings.reviewCount, 10),
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
  image?: string;
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
      url: siteUrl,
    },
    areaServed: [
      { "@type": "City", name: "Peterborough",   addressCountry: "GB" },
      { "@type": "City", name: "Werrington" },
      { "@type": "City", name: "Bretton" },
      { "@type": "City", name: "Hampton" },
      { "@type": "City", name: "Orton" },
      { "@type": "City", name: "Yaxley" },
      { "@type": "City", name: "Whittlesey" },
      { "@type": "City", name: "Market Deeping" },
      { "@type": "City", name: "Stamford" },
    ],
    url: `${siteUrl}/services/${service.slug}`,
    ...(service.image && {
      image: {
        "@type": "ImageObject",
        url: service.image.startsWith("http") ? service.image : `${siteUrl}${service.image}`,
        width: 1200,
        height: 630,
        encodingFormat: "image/webp",
        contentLocation: {
          "@type": "Place",
          name: "Peterborough, Cambridgeshire, UK",
          geo: { "@type": "GeoCoordinates", latitude: 52.5735, longitude: -0.2404 },
        },
      },
    }),
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
  updatedAt?: string | null;
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
        url: `${siteUrl}/logos/logo-mark.png`,
        width: 512,
        height: 512,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    articleSection: post.category,
    ...(post.image && {
      image: {
        "@type": "ImageObject",
        url: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
        width: 1200,
        height: 630,
        encodingFormat: "image/webp",
        representativeOfPage: true,
        contentLocation: {
          "@type": "Place",
          name: "Peterborough, Cambridgeshire, UK",
          geo: { "@type": "GeoCoordinates", latitude: 52.5735, longitude: -0.2404 },
        },
      },
    }),
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSettings.companyName,
    url: siteUrl,
    description: siteSettings.seoDescription,
    publisher: {
      "@type": "Organization",
      name: siteSettings.companyName,
      url: siteUrl,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/guides?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
