import type { Metadata } from "next";
import { siteSettings } from "@/content/settings";

const siteUrl = siteSettings.siteUrl;

export function buildMetadata(options: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl}${options.path}`;
  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: url },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: siteSettings.companyName,
      type: "website",
    },
    robots: options.noIndex ? { index: false, follow: false } : undefined,
  };
}
