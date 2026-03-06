import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://peterboroughplumbers.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",      // API endpoints — no public content
        "/admin/",    // admin panel — private
        "/plumber/",  // plumber portal — private
        // NOTE: /book, /booking/, /rate/, /privacy, /terms, /cookies
        // are public pages with noindex set at the page level.
        // Blocking them here is incorrect — Google would still index
        // the URL from external links but couldn't crawl to see noindex.
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
