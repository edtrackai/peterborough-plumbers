import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCtaBar from "@/components/layout/StickyCtaBar";
import MainWrapper from "@/components/layout/MainWrapper";
import ClientOnlyWidgets from "@/components/layout/ClientOnlyWidgets";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MainWrapper>
        <div className="mx-auto max-w-[1280px] min-h-full">
          {children}
        </div>
      </MainWrapper>
      <Footer />
      <StickyCtaBar />
      <WhatsAppFloat />
      <ClientOnlyWidgets />
    </>
  );
}
