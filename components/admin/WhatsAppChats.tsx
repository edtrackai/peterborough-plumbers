"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface WaMessage {
  id: string;
  role: string;
  content: string;
  category: string | null;
  createdAt: string;
}

interface CallInfo {
  id: string;
  status: string;
  outcome: string | null;
  durationSeconds: number | null;
  startedAt: string;
  summary: {
    serviceType: string | null;
    issueSummary: string | null;
    urgency: string | null;
    needsHuman: boolean;
  } | null;
}

interface WaChat {
  id: string;
  waId: string;
  customerName: string | null;
  customerPhone: string | null;
  postcode: string | null;
  serviceType: string | null;
  botActive: boolean;
  isEmergency: boolean;
  lastMessageAt: string;
  createdAt: string;
  messages: WaMessage[];
  calls: CallInfo[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(date: string) {
  const mins = Math.round((Date.now() - new Date(date).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`;
  return `${Math.round(mins / 1440)}d ago`;
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function displayName(chat: WaChat) {
  return chat.customerName || `+${chat.waId}`;
}

function initials(chat: WaChat) {
  if (chat.customerName) {
    return chat.customerName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  return chat.waId.slice(-2);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function WhatsAppChats({
  initialChats,
}: {
  initialChats: WaChat[];
}) {
  const [chats, setChats] = useState<WaChat[]>(initialChats);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialChats[0]?.id ?? null
  );
  const [togglingBot, setTogglingBot] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selected = chats.find((c) => c.id === selectedId) ?? null;

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected?.messages.length]);

  // Auto-refresh chats every 8 seconds
  const refreshChats = useCallback(async () => {
    try {
      const res = await fetch("/api/whatsapp/chats/refresh");
      if (res.ok) {
        const data = await res.json();
        setChats(data.chats);
      }
    } catch {
      // silent fail — will retry on next interval
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(refreshChats, 8000);
    return () => clearInterval(interval);
  }, [refreshChats]);

  // Toggle bot active
  async function toggleBot(chat: WaChat) {
    setTogglingBot(true);
    try {
      const res = await fetch(`/api/whatsapp/chat/${chat.waId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ botActive: !chat.botActive }),
      });
      if (res.ok) {
        setChats((prev) =>
          prev.map((c) =>
            c.id === chat.id ? { ...c, botActive: !c.botActive } : c
          )
        );
      }
    } catch (err) {
      console.error("Toggle bot failed:", err);
    } finally {
      setTogglingBot(false);
    }
  }

  // Send manual message
  async function sendMessage() {
    if (!selected || !messageText.trim() || sending) return;

    const text = messageText.trim();
    setSending(true);
    setMessageText("");

    // Optimistic update — show message immediately
    const tempMsg: WaMessage = {
      id: `temp-${Date.now()}`,
      role: "assistant",
      content: text,
      category: "admin_manual",
      createdAt: new Date().toISOString(),
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? { ...c, messages: [...c.messages, tempMsg], lastMessageAt: tempMsg.createdAt }
          : c
      )
    );

    try {
      const res = await fetch("/api/whatsapp/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ waId: selected.waId, message: text }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(`Failed to send: ${data.error || "Unknown error"}`);
        // Remove optimistic message
        setChats((prev) =>
          prev.map((c) =>
            c.id === selected.id
              ? { ...c, messages: c.messages.filter((m) => m.id !== tempMsg.id) }
              : c
          )
        );
        setMessageText(text);
      }
    } catch (err) {
      console.error("Send failed:", err);
      alert("Failed to send message. Check your connection.");
      setChats((prev) =>
        prev.map((c) =>
          c.id === selected.id
            ? { ...c, messages: c.messages.filter((m) => m.id !== tempMsg.id) }
            : c
        )
      );
      setMessageText(text);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  // Handle Enter to send (Shift+Enter for new line)
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Left panel: Chat list ── */}
      <div
        className="w-80 shrink-0 flex flex-col border-r overflow-hidden"
        style={{ borderColor: "rgba(0,0,0,0.06)" }}
      >
        <div className="px-4 py-4 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <h1 className="text-lg font-bold text-slate-900">WhatsApp</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {chats.length} conversation{chats.length !== 1 ? "s" : ""} · auto-refreshing
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-slate-400">No conversations yet</p>
              <p className="text-xs text-slate-300 mt-1">
                Messages will appear here when customers contact you on WhatsApp.
              </p>
            </div>
          )}

          {chats.map((chat) => {
            const lastMsg = chat.messages[chat.messages.length - 1];
            const isSelected = chat.id === selectedId;

            return (
              <button
                key={chat.id}
                onClick={() => setSelectedId(chat.id)}
                className="w-full text-left px-4 py-3 flex items-start gap-3 transition-colors hover:bg-slate-50"
                style={
                  isSelected
                    ? { background: "rgba(200,16,46,0.06)" }
                    : undefined
                }
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-[0.65rem] font-black text-white"
                    style={{
                      background: chat.isEmergency
                        ? "linear-gradient(135deg, #DC2626, #991B1B)"
                        : "linear-gradient(135deg, #25D366, #128C7E)",
                    }}
                  >
                    {initials(chat)}
                  </div>
                  {/* Bot status dot */}
                  <span
                    className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white"
                    style={{
                      background: chat.botActive ? "#22C55E" : "#9CA3AF",
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {displayName(chat)}
                    </p>
                    <span className="text-[0.6rem] text-slate-400 shrink-0 ml-2">
                      {timeAgo(chat.lastMessageAt)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {lastMsg
                      ? `${lastMsg.role === "assistant" ? (lastMsg.category === "admin_manual" ? "You: " : "Bot: ") : ""}${lastMsg.content.slice(0, 50)}`
                      : "No messages"}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    {chat.isEmergency && (
                      <span className="text-[0.55rem] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-600">
                        EMERGENCY
                      </span>
                    )}
                    {!chat.botActive && (
                      <span className="text-[0.55rem] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-600">
                        BOT OFF
                      </span>
                    )}
                    {(chat.calls?.length ?? 0) > 0 && (
                      <span className="text-[0.55rem] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                        {chat.calls.length} CALL{chat.calls.length > 1 ? "S" : ""}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right panel: Conversation ── */}
      <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div
                className="h-16 w-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: "rgba(37,211,102,0.1)" }}
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#25D366" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-600">
                Select a conversation
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Choose a chat from the left panel
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div
              className="px-5 py-3 flex items-center justify-between bg-white border-b shrink-0"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-[0.6rem] font-black text-white"
                  style={{
                    background: selected.isEmergency
                      ? "linear-gradient(135deg, #DC2626, #991B1B)"
                      : "linear-gradient(135deg, #25D366, #128C7E)",
                  }}
                >
                  {initials(selected)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {displayName(selected)}
                  </p>
                  <p className="text-[0.65rem] text-slate-400">
                    +{selected.waId}
                    {selected.postcode ? ` · ${selected.postcode}` : ""}
                    {selected.serviceType ? ` · ${selected.serviceType}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Emergency badge */}
                {selected.isEmergency && (
                  <span className="text-[0.65rem] font-bold px-2 py-1 rounded-lg bg-red-100 text-red-600">
                    EMERGENCY
                  </span>
                )}

                {/* Bot toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Bot</span>
                  <button
                    onClick={() => toggleBot(selected)}
                    disabled={togglingBot}
                    className="relative h-6 w-11 rounded-full transition-colors"
                    style={{
                      background: selected.botActive ? "#22C55E" : "#D1D5DB",
                    }}
                  >
                    <span
                      className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                      style={{
                        transform: selected.botActive
                          ? "translateX(22px)"
                          : "translateX(2px)",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Bot status banner */}
            {!selected.botActive && (
              <div className="px-5 py-2 bg-amber-50 border-b flex items-center gap-2 shrink-0"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-xs font-semibold text-amber-700">
                  Bot is OFF — you are replying manually to this conversation
                </span>
              </div>
            )}

            {/* Call history banner — shown if same number has calls */}
            {(selected.calls?.length ?? 0) > 0 && (
              <div
                className="px-5 py-3 border-b bg-blue-50 shrink-0"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                <p className="text-[0.65rem] font-bold text-blue-700 mb-2 uppercase tracking-wider">
                  Call History ({selected.calls.length})
                </p>
                <div className="space-y-2">
                  {selected.calls.map((call) => {
                    const outcomeColour =
                      call.outcome === "emergency_escalated" ? "#DC2626"
                      : call.outcome === "human_handoff" ? "#D97706"
                      : call.outcome === "qualified_lead_captured" ? "#16A34A"
                      : "#2563EB";
                    const durationLabel = call.durationSeconds
                      ? `${Math.floor(call.durationSeconds / 60)}m ${call.durationSeconds % 60}s`
                      : null;
                    return (
                      <div
                        key={call.id}
                        className="flex items-start gap-3 rounded-lg px-3 py-2 bg-white border border-blue-100"
                      >
                        {/* Phone icon */}
                        <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L8.5 10.5s1.5 3 5 5l1.113-1.724a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="text-[0.6rem] font-bold px-1.5 py-0.5 rounded"
                              style={{
                                background: `${outcomeColour}18`,
                                color: outcomeColour,
                              }}
                            >
                              {call.outcome?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "—"}
                            </span>
                            {call.summary?.needsHuman && (
                              <span className="text-[0.6rem] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-600">
                                Needs Human
                              </span>
                            )}
                            {durationLabel && (
                              <span className="text-[0.6rem] text-slate-400">{durationLabel}</span>
                            )}
                          </div>
                          {call.summary?.issueSummary && (
                            <p className="text-[0.72rem] text-slate-600 mt-0.5 truncate">
                              {call.summary.issueSummary}
                            </p>
                          )}
                          <p className="text-[0.62rem] text-slate-400 mt-0.5">
                            {new Date(call.startedAt).toLocaleDateString("en-GB", {
                              day: "numeric", month: "short", year: "numeric",
                            })} · {new Date(call.startedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {selected.messages.map((msg) => {
                const isBot = msg.role === "assistant";
                const isAdminManual = msg.category === "admin_manual";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                      style={
                        isBot
                          ? {
                              background: isAdminManual ? "#E0F2FE" : "#fff",
                              color: "#1E293B",
                              border: `1px solid ${isAdminManual ? "rgba(59,130,246,0.15)" : "rgba(0,0,0,0.06)"}`,
                              borderTopLeftRadius: "4px",
                            }
                          : {
                              background: "#DCF8C6",
                              color: "#1E293B",
                              borderTopRightRadius: "4px",
                            }
                      }
                    >
                      {/* Label for admin vs bot messages */}
                      {isBot && (
                        <p className="text-[0.55rem] font-bold mb-1"
                          style={{ color: isAdminManual ? "#2563EB" : "#25D366" }}
                        >
                          {isAdminManual ? "ADMIN" : "BOT"}
                        </p>
                      )}
                      <p className="whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                      <p
                        className="text-[0.6rem] mt-1 text-right"
                        style={{ color: isBot ? "#94A3B8" : "#6B8F5B" }}
                      >
                        {formatTime(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Message input bar ── */}
            <div
              className="px-4 py-3 bg-white border-t shrink-0"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
            >
              {/* Info bar */}
              <div className="flex items-center gap-3 mb-2 text-[0.65rem] text-slate-400">
                <span>
                  {selected.messages.length} message{selected.messages.length !== 1 ? "s" : ""}
                </span>
                <span className="ml-auto">
                  Started {new Date(selected.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>

              {/* Input */}
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    selected.botActive
                      ? "Type a message (bot is active — your message will also be sent)"
                      : "Type a message to reply manually..."
                  }
                  rows={1}
                  className="flex-1 resize-none rounded-xl border px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
                  style={{
                    borderColor: "rgba(0,0,0,0.1)",
                    maxHeight: "120px",
                    minHeight: "42px",
                  }}
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = "auto";
                    t.style.height = Math.min(t.scrollHeight, 120) + "px";
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!messageText.trim() || sending}
                  className="h-[42px] px-4 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40"
                  style={{
                    background: messageText.trim()
                      ? "linear-gradient(135deg, #25D366, #128C7E)"
                      : "#D1D5DB",
                  }}
                >
                  {sending ? (
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
