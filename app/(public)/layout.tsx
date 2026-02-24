import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCtaBar from "@/components/layout/StickyCtaBar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-20 lg:pt-[136px] pb-20 lg:pb-0 bg-white">
        <div className="mx-auto max-w-[1280px] bg-[#F0F2F5] min-h-full">
          {children}
        </div>
      </main>
      <Footer />
      <StickyCtaBar />
    </>
  );
}
