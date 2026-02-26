import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCtaBar from "@/components/layout/StickyCtaBar";
import MainWrapper from "@/components/layout/MainWrapper";
import ChatWidget from "@/components/ChatWidget";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MainWrapper>
        <div className="mx-auto max-w-[1280px] bg-[#F0F2F5] min-h-full">
          {children}
        </div>
      </MainWrapper>
      <Footer />
      <StickyCtaBar />
      <ChatWidget />
    </>
  );
}
