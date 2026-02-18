import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/content/services";
import { getAllAreaSlugs } from "@/content/areas";
import { getAllBlogSlugs } from "@/content/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://peterboroughplumbers.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/services",
    "/areas",
    "/reviews",
    "/blog",
    "/book",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const servicePages = getAllServiceSlugs().map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const areaPages = getAllAreaSlugs().map((slug) => ({
    url: `${siteUrl}/areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = getAllBlogSlugs().map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...areaPages, ...blogPages];
}
