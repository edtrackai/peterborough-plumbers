import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { siteSettings } from "@/content/settings";
import { localBusinessSchema } from "@/lib/seo/schema";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${sora.variable}`}>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-pp-teal focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        {children}
      </body>
    </html>
  );
}
