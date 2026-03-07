import type { Metadata } from "next";
import { siteSettings } from "@/content/settings";

const siteUrl = siteSettings.siteUrl;

export function buildMetadata(options: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  image?: string;
  /** Pass true on pages whose title already contains the brand name, to bypass the root template. */
  absoluteTitle?: boolean;
  /** Set to "article" for blog/guide pages. Defaults to "website". */
  ogType?: "article" | "website";
  /** Override geo meta tags for area-specific pages. */
  geo?: { lat: number; lng: number; placename?: string; region?: string };
}): Metadata {
  const url = `${siteUrl}${options.path}`;
  const ogImage = options.image
    ? [{ url: `${siteUrl}${options.image}`, width: 1200, height: 630, alt: options.title, type: "image/webp" }]
    : undefined;

  return {
    title: options.absoluteTitle ? { absolute: options.title } : options.title,
    description: options.description,
    alternates: { canonical: url },
    robots: options.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: siteSettings.companyName,
      type: options.ogType ?? "website",
      locale: "en_GB",
      ...(ogImage && { images: ogImage }),
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      ...(ogImage && { images: [{ url: ogImage[0].url, alt: options.title }] }),
    },
    other: {
      "geo.region": options.geo?.region ?? "GB-PTE",
      "geo.placename": options.geo?.placename ?? "Peterborough",
      "geo.position": options.geo ? `${options.geo.lat};${options.geo.lng}` : "52.5735;-0.2404",
      "ICBM": options.geo ? `${options.geo.lat}, ${options.geo.lng}` : "52.5735, -0.2404",
    },
  };
}
