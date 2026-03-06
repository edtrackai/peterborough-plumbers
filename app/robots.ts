import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://peterboroughplumbers.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/plumber/",   // plumber portal — not for public indexing
        "/booking/",   // personal booking confirmation pages
        "/rate/",      // rating pages (require auth context)
        "/book",       // booking flow — noIndex
        "/privacy",    // legal pages — noIndex
        "/terms",
        "/cookies",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
