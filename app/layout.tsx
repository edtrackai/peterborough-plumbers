import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCtaBar from "@/components/layout/StickyCtaBar";
import { siteSettings } from "@/content/settings";
import { localBusinessSchema } from "@/lib/seo/schema";

// Self-hosted via Next.js — no render-blocking external request
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: siteSettings.seoTitle,
    template: `%s | ${siteSettings.companyName}`,
  },
  description: siteSettings.seoDescription,
  metadataBase: new URL(siteSettings.siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        {/* Skip to main content — WCAG 2.1 AA */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-pp-teal focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
        <Header />
        <main id="main-content" className="flex-1 pt-20 lg:pt-[136px] pb-20 lg:pb-0 bg-white">
          <div className="mx-auto max-w-[1280px] bg-[#F0F2F5] min-h-full">
            {children}
          </div>
        </main>
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  );
}
