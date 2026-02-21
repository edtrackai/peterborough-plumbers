import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/content/services";
import { getAllAreaSlugs } from "@/content/areas";
import { blogPosts } from "@/content/blog";
import { getAllGuideSlugs } from "@/content/guides";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://peterboroughplumbers.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "",           priority: 1.0,  freq: "weekly"  as const },
    { path: "/services",  priority: 0.9,  freq: "weekly"  as const },
    { path: "/emergency", priority: 0.95, freq: "weekly"  as const },
    { path: "/pricing",   priority: 0.9,  freq: "monthly" as const },
    { path: "/guides",    priority: 0.85, freq: "weekly"  as const },
    { path: "/areas",     priority: 0.85, freq: "monthly" as const },
    { path: "/faqs",      priority: 0.8,  freq: "monthly" as const },
    { path: "/reviews",   priority: 0.8,  freq: "monthly" as const },
    { path: "/blog",      priority: 0.75, freq: "weekly"  as const },
    { path: "/about",     priority: 0.7,  freq: "monthly" as const },
    { path: "/book",      priority: 0.85, freq: "monthly" as const },
    { path: "/contact",   priority: 0.7,  freq: "monthly" as const },
    { path: "/privacy",   priority: 0.2,  freq: "yearly"  as const },
    { path: "/terms",     priority: 0.2,  freq: "yearly"  as const },
    { path: "/cookies",   priority: 0.2,  freq: "yearly"  as const },
  ].map(({ path, priority, freq }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
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

  const guidePages = getAllGuideSlugs().map((slug) => ({
    url: `${siteUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPages = blogPosts
    .filter((p) => p.status === "Published" && p.publishedAt)
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt!),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...servicePages, ...areaPages, ...guidePages, ...blogPages];
}
