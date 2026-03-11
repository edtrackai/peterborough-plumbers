"use client";

import { createContext, useContext } from "react";

export type PublicSettings = {
  companyName: string;
  phone: string;
  phoneHref: string;
  whatsappNumber: string;
  whatsappPrefillMessage: string;
  email: string;
  address: string;
  gasSafeNumber: string;
  googleRating: string;
  reviewCount: string;
  yearsExperience: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
};

const SettingsContext = createContext<PublicSettings | null>(null);

export function SettingsProvider({
  settings,
  children,
}: {
  settings: PublicSettings;
  children: React.ReactNode;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): PublicSettings {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
