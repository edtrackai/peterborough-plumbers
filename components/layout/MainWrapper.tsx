"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      id="main-content"
      className={`flex-1 pb-20 lg:pb-0 bg-white ${
        isHome ? "pt-20 lg:pt-[160px]" : "pt-20 lg:pt-[112px]"
      }`}
    >
      {children}
    </main>
  );
}
