import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://peterboroughplumbers.com";

// Stamped at build time — never midnight
const BUILD_LASTMOD = new Date().toISOString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with representative hero images
  const staticPageDefs = [
    { path: "",           priority: 1.0,  freq: "weekly"  as const, image: "/images/homepage/hero.webp" },
    { path: "/services",  priority: 0.9,  freq: "weekly"  as const, image: "/images/services/hero.webp" },
    { path: "/emergency", priority: 0.9,  freq: "weekly"  as const, image: "/images/emergency/hero.webp" },
    { path: "/pricing",   priority: 0.9,  freq: "monthly" as const, image: "/images/pricing/hero.webp" },
    { path: "/guides",    priority: 0.85, freq: "weekly"  as const, image: "/images/guides/hero.webp" },
    { path: "/areas",     priority: 0.85, freq: "monthly" as const, image: "/images/areas/hero.webp" },
    { path: "/faqs",      priority: 0.8,  freq: "monthly" as const, image: "/images/faqs/hero.webp" },
    { path: "/reviews",   priority: 0.8,  freq: "monthly" as const, image: "/images/reviews/hero.webp" },
    { path: "/blog",      priority: 0.75, freq: "weekly"  as const, image: "/images/homepage/plumbing-repairs.webp" },
    { path: "/about",     priority: 0.7,  freq: "monthly" as const, image: "/images/about/hero.webp" },
    { path: "/contact",   priority: 0.7,  freq: "monthly" as const, image: "/images/contact/hero.webp" },
    // /book, /privacy, /terms, /cookies are noIndex — excluded from sitemap
  ];
  const staticPages = staticPageDefs.map(({ path, priority, freq, image }) => ({
    url: `${siteUrl}${path}`,
    lastModified: BUILD_LASTMOD,
    changeFrequency: freq,
    priority,
    images: [`${siteUrl}${image}`],
  }));

  const [services, areas, guides, blogPosts] = await Promise.all([
    prisma.service.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.area.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.guide.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({
      where: { status: "Published", publishedAt: { not: null } },
      select: { slug: true, publishedAt: true, updatedAt: true, image: true },
    }),
  ]);

  // Each service has /images/services/{slug}/hero.webp
  const servicePages = services.map(({ slug, updatedAt }) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    images: [`${siteUrl}/images/services/${slug}/hero.webp`],
  }));

  // Areas share a single hero image
  const areaPages = areas.map(({ slug, updatedAt }) => ({
    url: `${siteUrl}/areas/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [`${siteUrl}/images/areas/hero.webp`],
  }));

  const guidePages = guides.map(({ slug, updatedAt }) => ({
    url: `${siteUrl}/guides/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPages = blogPosts.map(({ slug, publishedAt, updatedAt, image }) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: updatedAt ?? publishedAt!,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    ...(image ? { images: [image.startsWith("http") ? image : `${siteUrl}${image}`] } : {}),
  }));

  return [...staticPages, ...servicePages, ...areaPages, ...guidePages, ...blogPages];
}
