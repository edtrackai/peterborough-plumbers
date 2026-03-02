"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
  videoUrl?: string;
  videoTitle?: string;
  suggestedActions?: string[];
  ts: number;
  isNew?: boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { emoji: "🚰", label: "Leaking Tap",      desc: "Dripping or running tap",     message: "My tap is dripping and leaking" },
  { emoji: "🚿", label: "Blocked Drain",    desc: "Sink, bath or shower",        message: "I have a blocked drain" },
  { emoji: "🚽", label: "Running Toilet",   desc: "Won't stop filling up",       message: "My toilet keeps running and won't stop" },
  { emoji: "💧", label: "Burst Pipe",       desc: "Emergency — act fast",        message: "I have a burst pipe emergency", emergency: true },
  { emoji: "📋", label: "Get a Quote",      desc: "Free upfront estimate",       message: "I'd like a quote for plumbing work" },
  { emoji: "📅", label: "Book an Engineer", desc: "Same or next-day available",  message: "I want to book an engineer visit" },
];

const STORAGE_KEY   = "pp_chat_session_id";
const SEEN_KEY      = "pp_chat_seen";
const DISMISS_KEY   = "pp_chat_greeting_dismissed";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
    );
    const isEmpty = line.trim() === "";
    return isEmpty
      ? <div key={i} className="h-1.5" />
      : <p key={i} className="mb-1 last:mb-0">{parts}</p>;
  });
}

function BotAvatar({ size = 6 }: { size?: number }) {
  return (
    <div
      className={`h-${size} w-${size} rounded-full shrink-0 flex items-center justify-center`}
      style={{ background: "linear-gradient(135deg, #C8102E 0%, #9e0d25 100%)" }}
    >
      <svg className={`h-${size === 6 ? 3 : 3} w-${size === 6 ? 3 : 3} text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen]                     = useState(false);
  const [mounted, setMounted]               = useState(false); // keep DOM alive for exit animation
  const [messages, setMessages]             = useState<Message[]>([]);
  const [input, setInput]                   = useState("");
  const [loading, setLoading]               = useState(false);
  const [sessionId, setSessionId]           = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showTooltip, setShowTooltip]       = useState(false);
  const [unread, setUnread]                 = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  // Load sessionId
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSessionId(stored);
  }, []);

  // Track cookie banner visibility so we can push chat UI above it
  useEffect(() => {
    if (!localStorage.getItem("pp_cookie_consent")) {
      setCookieBannerVisible(true);
    }
    function onConsent() { setCookieBannerVisible(false); }
    window.addEventListener("pp:cookie-consent", onConsent);
    return () => window.removeEventListener("pp:cookie-consent", onConsent);
  }, []);

  // Greeting card — shows after 2s if never opened or dismissed
  useEffect(() => {
    const seen      = localStorage.getItem(SEEN_KEY);
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (seen || dismissed) return;
    const t = setTimeout(() => setShowTooltip(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Panel lifecycle — keep DOM alive 260ms after close for exit animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      setShowTooltip(false);
      setUnread(0);
      localStorage.setItem(SEEN_KEY, "1");
      setTimeout(() => inputRef.current?.focus(), 200);
      if (messages.length === 0) {
        const hour = new Date().getHours();
        const timeGreet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
        setMessages([{
          role: "assistant",
          content: `${timeGreet}! 👋 I'm the Peterborough Plumbers assistant.\n\nAsk me about any plumbing issue — I'll give you honest advice and let you know when you need an engineer out.`,
          suggestedActions: [],
          ts: Date.now(),
          isNew: true,
        }]);
      }
    } else {
      const t = setTimeout(() => setMounted(false), 260);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMessage = text.trim();
    setInput("");
    setShowQuickActions(false);
    setMessages(prev => [...prev, { role: "user", content: userMessage, ts: Date.now(), isNew: true }]);
    setLoading(true);
    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: userMessage, pageUrl: pathname }),
      });
      const data = await res.json();
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem(STORAGE_KEY, data.sessionId);
      }
      const reply: Message = {
        role: "assistant",
        content: data.reply ?? "Sorry, something went wrong. Please call us on 02039514510.",
        videoUrl: data.videoUrl,
        videoTitle: data.videoTitle,
        suggestedActions: data.suggestedActions,
        ts: Date.now(),
        isNew: true,
      };
      setMessages(prev => [...prev, reply]);
      if (!open) setUnread(u => u + 1);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I couldn't connect. Please call us on **02039514510**.",
        ts: Date.now(),
        isNew: true,
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSuggestedAction(action: string) {
    const lower = action.toLowerCase();
    if (lower.includes("0800 111") || (lower.includes("call") && lower.includes("0800"))) {
      window.location.href = "tel:08001119999";
      return;
    }
    if (lower.includes("call") || lower.includes("02039514510")) {
      window.location.href = "tel:02039514510";
      return;
    }
    if (lower.includes("book online")) {
      window.location.href = "/book";
      return;
    }
    sendMessage(action);
  }

  function clearConversation() {
    setMessages([]);
    setShowQuickActions(true);
    setSessionId(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const charCount = input.length;
  const nearLimit = charCount > 400;

  return (
    <>
      {/* ── Keyframe animations ───────────────────────────────────────────────── */}
      <style>{`
        @keyframes pp-up   { from { opacity:0; transform:translateY(14px) scale(.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes pp-down { from { opacity:1; transform:translateY(0) scale(1) } to { opacity:0; transform:translateY(14px) scale(.97) } }
        @keyframes pp-msg  { from { opacity:0; transform:translateY(7px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pp-tip  { from{opacity:0;transform:translateY(10px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        .pp-enter { animation: pp-up   .25s cubic-bezier(.34,1.2,.64,1) forwards }
        .pp-exit  { animation: pp-down .22s ease-in forwards }
        .pp-msg   { animation: pp-msg  .18s ease-out forwards }
        .pp-tip   { animation: pp-tip  .3s cubic-bezier(.34,1.2,.64,1) forwards }
      `}</style>

      {/* ── Greeting card ─────────────────────────────────────────────────────── */}
      {showTooltip && !open && (
        <div
          className="fixed z-[9999] pp-tip"
          style={{ bottom: cookieBannerVisible ? "360px" : "calc(5rem + 72px)", right: "1.25rem", transition: "bottom 0.3s ease" }}
        >
          {/* Card */}
          <button
            onClick={() => { setShowTooltip(false); setOpen(true); }}
            className="relative block text-left w-[230px] bg-white rounded-2xl rounded-br-sm overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
            style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.16), 0 3px 10px rgba(0,0,0,0.10)", border: "1px solid rgba(0,0,0,0.07)" }}
          >
            {/* Red top strip */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #E31530, #C8102E)" }} />

            <div className="px-4 pt-3 pb-3.5">
              {/* Avatar + name row */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="relative shrink-0">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C8102E 0%, #9e0d25 100%)" }}>
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[#242424] font-bold text-[13px] leading-tight">Peterborough Plumbers</p>
                  <p className="text-emerald-500 text-[10px] font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online now
                  </p>
                </div>
              </div>

              {/* Greeting text */}
              <p className="text-[#242424] font-bold text-[13px] leading-snug mb-1">
                Got a plumbing problem?
              </p>
              <p className="text-gray-500 text-[12px] leading-snug mb-3">
                Get honest advice in seconds —<br />
                no call needed.
              </p>

              {/* CTA */}
              <div
                className="w-full rounded-xl py-2 text-center text-white text-[12px] font-bold"
                style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)" }}
              >
                Chat with us →
              </div>
            </div>
          </button>

          {/* Tail */}
          <span className="absolute -bottom-2 right-6 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white" />

          {/* Dismiss ×  */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); localStorage.setItem(DISMISS_KEY, "1"); }}
            aria-label="Dismiss"
            className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
            style={{ border: "1px solid rgba(0,0,0,0.10)" }}
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Floating button ───────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open chat — get plumbing help"}
        className="fixed bottom-20 sm:bottom-5 right-5 z-[9998] h-14 w-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C8102E]"
        style={{
          background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)",
          boxShadow: "0 8px 28px rgba(200,16,46,0.42), 0 2px 8px rgba(0,0,0,0.16)",
          ...(cookieBannerVisible ? { bottom: "280px" } : {}),
        }}
      >
        {open ? (
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}

        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
            {unread}
          </span>
        )}

        {/* Online pulse */}
        {!open && unread === 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>
        )}
      </button>

      {/* ── Chat panel ────────────────────────────────────────────────────────── */}
      {mounted && (
        <div
          role="dialog"
          aria-label="Plumbing support chat"
          className={`fixed bottom-36 sm:bottom-24 right-5 z-[9997] w-[min(360px,calc(100vw-20px))] flex flex-col rounded-2xl overflow-hidden ${open ? "pp-enter" : "pp-exit"}`}
          style={{
            height: cookieBannerVisible ? "min(580px, calc(100dvh - 380px))" : "min(580px, calc(100dvh - 160px))",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)",
            border: "1px solid rgba(0,0,0,0.07)",
            transition: "bottom 0.3s ease",
            ...(cookieBannerVisible ? { bottom: "356px" } : {}),
          }}
        >

          {/* ── Header ──────────────────────────────────────────────────────── */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ background: "linear-gradient(135deg, #C8102E 0%, #9e0d25 100%)" }}
          >
            {/* Large bot avatar with online dot */}
            <div className="relative shrink-0">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#9e0d25]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">Peterborough Plumbers</p>
              {/* Status line changes to "Typing…" while loading */}
              <p className="text-white/70 text-[11px] mt-0.5 h-4 flex items-center">
                {loading ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-flex gap-0.5 items-center">
                      <span className="h-[5px] w-[5px] rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-[5px] w-[5px] rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-[5px] w-[5px] rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                    Typing…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    Online — instant replies
                  </span>
                )}
              </p>
            </div>

            {/* Reset conversation */}
            {messages.length > 1 && (
              <button
                onClick={clearConversation}
                aria-label="Start new conversation"
                title="New conversation"
                className="text-white/50 hover:text-white/90 transition-colors p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            )}

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── Messages ────────────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto bg-[#F3F4F6] px-3 py-3 flex flex-col gap-2.5">

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"} ${msg.isNew ? "pp-msg" : ""}`}
              >
                {/* Bot avatar beside each bot message */}
                {msg.role === "assistant" && <BotAvatar size={6} />}

                <div className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"} max-w-[82%]`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-white rounded-br-sm"
                        : "bg-white text-[#242424] rounded-bl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)" }
                        : { border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }
                    }
                  >
                    <div>{renderContent(msg.content)}</div>

                    {/* Video card */}
                    {msg.videoUrl && (
                      <a
                        href={msg.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center gap-3 rounded-xl p-2.5 transition-colors"
                        style={{ background: "#F8F8F8", border: "1px solid rgba(0,0,0,0.08)" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#F0F0F0"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#F8F8F8"; }}
                      >
                        <div className="h-9 w-9 rounded-lg bg-[#FF0000] flex items-center justify-center shrink-0">
                          <svg className="h-4 w-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Watch on YouTube</p>
                          <p className="text-xs font-semibold text-[#242424] truncate">{msg.videoTitle ?? "Video guide"}</p>
                        </div>
                        <svg className="h-3.5 w-3.5 text-gray-300 ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}

                    {/* Suggested action pills */}
                    {msg.role === "assistant" && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {msg.suggestedActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => handleSuggestedAction(action)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-150 active:scale-95"
                            style={{ border: "1.5px solid #C8102E", color: "#C8102E", background: "transparent" }}
                            onMouseEnter={e => {
                              const el = e.currentTarget as HTMLButtonElement;
                              el.style.background = "#C8102E";
                              el.style.color = "#fff";
                            }}
                            onMouseLeave={e => {
                              const el = e.currentTarget as HTMLButtonElement;
                              el.style.background = "transparent";
                              el.style.color = "#C8102E";
                            }}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <p className="text-[10px] text-gray-400 px-1">{formatTime(msg.ts)}</p>
                </div>
              </div>
            ))}

            {/* Quick action cards */}
            {showQuickActions && messages.length <= 1 && (
              <div className="flex flex-col gap-2 mt-1 pp-msg">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-1">Quick topics</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {QUICK_ACTIONS.map((qa) => (
                    <button
                      key={qa.label}
                      onClick={() => sendMessage(qa.message)}
                      className="text-left px-3 py-3 bg-white rounded-xl transition-all duration-150 active:scale-[0.97]"
                      style={{
                        border: qa.emergency ? "1px solid rgba(200,16,46,0.25)" : "1px solid rgba(0,0,0,0.08)",
                        borderLeft: qa.emergency ? "3px solid #C8102E" : undefined,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.borderColor = "#C8102E";
                        el.style.boxShadow = "0 2px 8px rgba(200,16,46,0.12)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.borderColor = qa.emergency ? "rgba(200,16,46,0.25)" : "rgba(0,0,0,0.08)";
                        el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                      }}
                    >
                      <span className="text-xl leading-none block mb-1.5">{qa.emoji}</span>
                      <span className="text-xs font-semibold text-[#242424] leading-tight block">{qa.label}</span>
                      <span className="text-[10px] text-gray-400 leading-tight block mt-0.5">{qa.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-end gap-2 pp-msg">
                <BotAvatar size={6} />
                <div
                  className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5"
                  style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                >
                  <span className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "160ms" }} />
                  <span className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "320ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Gas safety disclaimer ────────────────────────────────────────── */}
          <div className="bg-amber-50 border-t border-amber-100 px-3 py-1.5 shrink-0">
            <p className="text-[10px] text-amber-700 text-center leading-snug">
              ⚠️ Boiler/gas issues?{" "}
              <a href="https://www.gassaferegister.co.uk" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                Gas Safe engineer
              </a>{" "}only. Emergency:{" "}
              <a href="tel:08001119999" className="font-bold underline">0800 111 999</a>
            </p>
          </div>

          {/* ── Input area ───────────────────────────────────────────────────── */}
          <div className="bg-white border-t border-gray-100 px-3 py-2.5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
                  }}
                  placeholder="Describe your plumbing issue…"
                  maxLength={500}
                  aria-label="Type your message"
                  disabled={loading}
                  className="w-full text-sm text-[#242424] placeholder-gray-400 bg-[#F3F4F6] rounded-xl px-3.5 py-2.5 outline-none transition-all duration-150 disabled:opacity-50"
                  style={{ border: "1.5px solid transparent" }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = "rgba(200,16,46,0.3)";
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,16,46,0.06)";
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.background = "#F3F4F6";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                {nearLimit && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none">
                    {500 - charCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-150 disabled:opacity-35 disabled:cursor-not-allowed hover:brightness-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
                style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)" }}
              >
                <svg className="h-[18px] w-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>

            {/* Footer links */}
            <div className="flex items-center justify-between mt-2 px-0.5">
              <span className="text-[10px] text-gray-300 font-medium">Peterborough Plumbers</span>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="text-[10px] text-[#C8102E] font-semibold hover:underline"
              >
                Speak to a human →
              </Link>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
