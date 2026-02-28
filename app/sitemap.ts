import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://peterboroughplumbers.com";

// Stamped at build time — never midnight
const BUILD_LASTMOD = new Date().toISOString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: "",           priority: 1.0,  freq: "weekly"  as const },
    { path: "/services",  priority: 0.9,  freq: "weekly"  as const },
    { path: "/emergency", priority: 0.9,  freq: "weekly"  as const },
    { path: "/pricing",   priority: 0.9,  freq: "monthly" as const },
    { path: "/guides",    priority: 0.85, freq: "weekly"  as const },
    { path: "/areas",     priority: 0.85, freq: "monthly" as const },
    { path: "/faqs",      priority: 0.8,  freq: "monthly" as const },
    { path: "/reviews",   priority: 0.8,  freq: "monthly" as const },
    { path: "/blog",      priority: 0.75, freq: "weekly"  as const },
    { path: "/about",     priority: 0.7,  freq: "monthly" as const },
    { path: "/contact",   priority: 0.7,  freq: "monthly" as const },
    // /book, /privacy, /terms, /cookies are noIndex — excluded from sitemap
  ].map(({ path, priority, freq }) => ({
    url: `${siteUrl}${path}`,
    lastModified: BUILD_LASTMOD,
    changeFrequency: freq,
    priority,
  }));

  const [services, areas, guides, blogPosts] = await Promise.all([
    prisma.service.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.area.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.guide.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({
      where: { status: "Published", publishedAt: { not: null } },
      select: { slug: true, publishedAt: true, updatedAt: true },
    }),
  ]);

  const servicePages = services.map(({ slug, updatedAt }) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const areaPages = areas.map(({ slug, updatedAt }) => ({
    url: `${siteUrl}/areas/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guidePages = guides.map(({ slug, updatedAt }) => ({
    url: `${siteUrl}/guides/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPages = blogPosts.map(({ slug, publishedAt, updatedAt }) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: updatedAt ?? publishedAt!,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...areaPages, ...guidePages, ...blogPages];
}
