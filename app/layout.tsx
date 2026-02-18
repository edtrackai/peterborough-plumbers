import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCtaBar from "@/components/layout/StickyCtaBar";
import { siteSettings } from "@/content/settings";
import { localBusinessSchema } from "@/lib/seo/schema";

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
    <html lang="en-GB">
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
        <Header />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  );
}
