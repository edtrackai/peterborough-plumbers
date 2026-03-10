import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { siteSettings } from "@/content/settings";
import { localBusinessSchema, webSiteSchema } from "@/lib/seo/schema";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const defaultOgImage = `${siteSettings.siteUrl}/images/homepage/hero.webp`;

export const metadata: Metadata = {
  title: {
    default: siteSettings.seoTitle,
    template: `%s | ${siteSettings.companyName}`,
  },
  description: siteSettings.seoDescription,
  metadataBase: new URL(siteSettings.siteUrl),
  alternates: {
    canonical: siteSettings.siteUrl,
  },
  openGraph: {
    siteName: siteSettings.companyName,
    locale: "en_GB",
    type: "website",
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: siteSettings.companyName }],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${sora.variable}`}>
      <head>
        {/* Resource hints — load GTM/GA4 domains earlier to reduce RTT once consent is given */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Preload manifest to remove it from the late network dependency chain */}
        <link rel="preload" href="/manifest.webmanifest" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-pp-teal focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [localBusinessSchema(), webSiteSchema()],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
