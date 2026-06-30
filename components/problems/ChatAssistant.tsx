"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Loader2, Sparkles, Lock } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatAssistantProps {
  problemTitle: string;
  problemDescription: string;
  disabled?: boolean;
}

export function ChatAssistant({ problemTitle, problemDescription, disabled }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: `Bună! Sunt asistentul tău pentru „${problemTitle}". Te ajut cu idei și sugestii — dar nu îți dau soluția 😊\n\nCe problemă ai?`,
      }]);
    }
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen, problemTitle, messages.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, problemTitle, problemDescription }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: data.response ?? "Ceva nu a mers. Încearcă din nou.",
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Eroare de conexiune. Încearcă din nou.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2">
      {/* ── Guest locked panel ── */}
      {isOpen && disabled && (
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border shadow-2xl p-6 text-center"
          style={{ width: "280px", background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>Asistent AI blocat</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Conecteaza-te pentru a primi sugestii si idei de la asistentul AI.
            </p>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
          >
            Conecteaza-te
          </Link>
        </div>
      )}

      {/* ── Popup — anchored above the button ── */}
      {isOpen && !disabled && (
        <div
          className="flex flex-col rounded-2xl border shadow-2xl overflow-hidden"
          style={{
            width: "320px",
            height: "420px",
            background: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Asistent AI</p>
                <p className="text-xs text-indigo-200">Sugestii · fără soluție directă</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2.5">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-indigo-400" />
                  </div>
                )}
                <div
                  className="max-w-[82%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap"
                  style={
                    m.role === "user"
                      ? { background: "#6366f1", color: "#fff", borderBottomRightRadius: "4px" }
                      : { background: "var(--bg-hover)", color: "var(--text)", borderBottomLeftRadius: "4px" }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3 h-3 text-indigo-400" />
                </div>
                <div
                  className="rounded-2xl px-3 py-2 flex items-center gap-1.5 text-xs"
                  style={{ background: "var(--bg-hover)", color: "var(--text-muted)", borderBottomLeftRadius: "4px" }}
                >
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Gândesc...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex gap-1.5 px-3 py-2.5 border-t shrink-0"
            style={{ borderColor: "var(--border)" }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Scrie întrebarea... (Enter)"
              rows={2}
              className="flex-1 px-2.5 py-1.5 rounded-xl text-xs border resize-none outline-none focus:border-indigo-500 transition-colors"
              style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="self-end p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* ── Bubble button ── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ background: isOpen ? "#ef4444" : "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
        title="Asistent AI"
      >
        {isOpen
          ? <X className="w-5 h-5 text-white" />
          : <Sparkles className="w-5 h-5 text-white" />}
      </button>
    </div>
  );
}
