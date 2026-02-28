"use client";

import dynamic from "next/dynamic";

// Lazy-load ChatWidget — it is client-only and not needed for initial page render.
// Deferring it keeps ~30 KB out of the critical JS bundle on first load.
// ssr: false must live in a Client Component — it cannot be used in a Server Component.
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
});

export default function ChatWidgetLoader() {
  return <ChatWidget />;
}
