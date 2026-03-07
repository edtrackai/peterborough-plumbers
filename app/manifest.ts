import type { MetadataRoute } from "next";
import { siteSettings } from "@/content/settings";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSettings.companyName,
    short_name: "PB Plumbers",
    description: siteSettings.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#C8102E",
    icons: [
      {
        src: "/logos/logo-mark.webp",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logos/logo-mark.webp",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
