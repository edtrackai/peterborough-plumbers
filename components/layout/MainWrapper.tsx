"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      id="main-content"
      className={`flex-1 pb-20 lg:pb-0 bg-white ${
        isHome ? "pt-20 lg:pt-[192px]" : "pt-20 lg:pt-[128px]"
      }`}
    >
      {children}
    </main>
  );
}
