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
}

// ── Quick-action topics ───────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { label: "🚰 Leaking Tap", message: "My tap is dripping and leaking" },
  { label: "🚿 Blocked Drain", message: "I have a blocked drain" },
  { label: "🚽 Toilet Running", message: "My toilet keeps running and won't stop" },
  { label: "💧 Burst Pipe", message: "I have a burst pipe emergency" },
  { label: "📋 Get a Quote", message: "I'd like a quote for plumbing work" },
  { label: "📅 Book a Visit", message: "I want to book an engineer visit" },
];

const STORAGE_KEY = "pp_chat_session_id";

// ── Markdown-lite renderer ────────────────────────────────────────────────────
// Renders **bold**, bullet points, and line breaks safely without a library.

function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    // Bold text
    const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
    );
    const isEmpty = line.trim() === "";
    return isEmpty ? <br key={i} /> : <p key={i} className="mb-1 last:mb-0">{parts}</p>;
  });
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load sessionId from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSessionId(stored);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (messages.length === 0) {
        setMessages([
          {
            role: "assistant",
            content:
              "Hi! 👋 I'm the Peterborough Plumbers assistant.\n\nI can help with common plumbing issues. Tap a topic below or type your question.",
            suggestedActions: [],
          },
        ]);
      }
    }
  }, [open]);

  // Close on escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMessage = text.trim();
    setInput("");
    setShowQuickActions(false);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
          pageUrl: pathname,
        }),
      });

      const data = await res.json();

      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem(STORAGE_KEY, data.sessionId);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? "Sorry, something went wrong. Please call us on 02039514510.",
          videoUrl: data.videoUrl,
          videoTitle: data.videoTitle,
          suggestedActions: data.suggestedActions,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't connect. Please call us on **02039514510**.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSuggestedAction(action: string) {
    const lower = action.toLowerCase();
    if (lower.includes("call") && lower.includes("0800")) {
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

  return (
    <>
      {/* ── Floating button ──────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat — get plumbing help"}
        className="fixed bottom-5 right-5 z-[9998] h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C8102E]"
        style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)" }}
      >
        {open ? (
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {/* Pulse dot */}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>
        )}
      </button>

      {/* ── Chat panel ───────────────────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="Plumbing support chat"
          className="fixed bottom-24 right-5 z-[9997] w-[min(360px,calc(100vw-24px))] flex flex-col rounded-2xl overflow-hidden"
          style={{
            height: "min(560px, calc(100dvh - 120px))",
            boxShadow: "0 20px 60px rgba(0,0,0,0.22), 0 6px 20px rgba(0,0,0,0.14)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ background: "linear-gradient(135deg, #C8102E 0%, #9e0d25 100%)" }}
          >
            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">Peterborough Plumbers</p>
              <p className="text-white/70 text-xs">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online — usually replies instantly
                </span>
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto bg-[#F5F5F5] px-3 py-4 flex flex-col gap-3">

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-br-sm"
                      : "bg-white text-[#242424] rounded-bl-sm shadow-sm border border-gray-100"
                  }`}
                  style={
                    msg.role === "user"
                      ? { background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)" }
                      : undefined
                  }
                >
                  <div>{renderContent(msg.content)}</div>

                  {/* Video link */}
                  {msg.videoUrl && (
                    <a
                      href={msg.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 flex items-center gap-2 bg-[#F5F5F5] rounded-xl px-3 py-2 text-xs font-semibold text-[#C8102E] hover:bg-gray-200 transition-colors"
                    >
                      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.19a8.2 8.2 0 004.81 1.55V6.29a4.85 4.85 0 01-1.04-.4z"/>
                      </svg>
                      ▶ {msg.videoTitle ?? "Watch video guide"}
                    </a>
                  )}

                  {/* Suggested actions */}
                  {msg.role === "assistant" && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action) => (
                        <button
                          key={action}
                          onClick={() => handleSuggestedAction(action)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#C8102E] text-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-colors duration-150"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Quick action buttons — show only at start */}
            {showQuickActions && messages.length <= 1 && (
              <div className="flex flex-col gap-1.5 mt-1">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide px-1">Quick topics</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {QUICK_ACTIONS.map((qa) => (
                    <button
                      key={qa.label}
                      onClick={() => sendMessage(qa.message)}
                      className="text-left text-xs font-medium px-3 py-2.5 bg-white rounded-xl border border-gray-200 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors duration-150 shadow-sm"
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer disclaimer */}
          <div className="bg-amber-50 border-t border-amber-100 px-3 py-1.5 shrink-0">
            <p className="text-[10px] text-amber-700 text-center leading-tight">
              ⚠️ For boiler/gas issues, please call a{" "}
              <a href="https://www.gassaferegister.co.uk" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                Gas Safe engineer
              </a>
              . Gas emergency: <a href="tel:08001119999" className="font-bold underline">0800 111 999</a>
            </p>
          </div>

          {/* Input area */}
          <div className="bg-white border-t border-gray-100 px-3 py-3 shrink-0 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Type your plumbing question…"
              maxLength={500}
              aria-label="Type your message"
              disabled={loading}
              className="flex-1 text-sm text-[#242424] placeholder-gray-400 bg-[#F5F5F5] rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#C8102E]/30 transition-all disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)" }}
            >
              <svg className="h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Branding footer */}
          <div className="bg-white border-t border-gray-50 px-3 pb-2.5 pt-1 shrink-0 flex items-center justify-between">
            <span className="text-[10px] text-gray-300">Powered by Peterborough Plumbers</span>
            <Link href="/contact" className="text-[10px] text-[#C8102E] font-semibold hover:underline">
              Speak to a human →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
