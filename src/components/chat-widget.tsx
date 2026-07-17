"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import DogScratch from "./dog-scratch";

type Message = { id: string; role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What has John built?",
  "What tech does he work with?",
  "How do I get in touch with him?",
  "What's he good at?",
];

const CANNED: Record<string, string> = {
  "What has John built?":
    "John has built 5 projects: PG RAG (a full RAG pipeline with FAISS semantic search and real-time streaming), DevNest (a modular NestJS social platform with JWT auth, Redis caching, and BullMQ workers), XOXO (real-time multiplayer Tic-Tac-Toe using Nakama game server), LiftLog (a fitness analytics platform with optimized PostgreSQL queries), and SubTrackr (a multi-tenant subscription SaaS). You can find them all on his GitHub: github.com/zavxai.",

  "What tech does he work with?":
    "John works across the AI and backend stack — LlamaIndex, FAISS, OpenAI, and Ollama on the AI/RAG side; TypeScript, Python, Node.js, NestJS, and FastAPI for backend; PostgreSQL, Redis, and Prisma for data; Next.js and Tailwind CSS on the frontend; and Docker and AWS for DevOps.",

  "How do I get in touch with him?":
    "You can reach John at altijohnvessly@gmail.com, connect on LinkedIn (linkedin.com/in/zavxai), follow him on GitHub (github.com/zavxai) or X (@zavxai), and watch his content on YouTube (@zavxai).",

  "What's he good at?":
    "John specializes in AI architecture, scalability, and performance — specifically building production-grade RAG pipelines, agentic systems, and LLM-powered features that go beyond demos. He thinks in systems: how context flows, where models fail, and how to engineer around those limits with the right retrieval, memory, and tooling strategies.",
};

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hey! I'm Byte, John's AI assistant. Ask me anything about his work, tech, or how to reach him.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const show = setTimeout(() => setBubble(true), 1200);
    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onlyWelcome = messages.length === 1;

  async function quickSend(content: string) {
    if (loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };

    if (CANNED[content]) {
      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, userMsg, { id: assistantId, role: "assistant", content: "" }]);
      setLoading(true);
      const full = CANNED[content];
      let i = 0;
      const interval = setInterval(() => {
        i += 18;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: full.slice(0, i) } : m))
        );
        if (i >= full.length) {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: full } : m))
          );
          clearInterval(interval);
          setLoading(false);
        }
      }, 28);
      return;
    }

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, userMsg, { id: assistantId, role: "assistant", content: "" }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m)));
      }
    } catch {
      setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: "Something went wrong." } : m)));
    } finally {
      setLoading(false);
    }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const content = text.trim();
    if (!content || loading) return;
    setText("");

    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, userMsg, { id: assistantId, role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.status === 503) {
        const { error } = await res.json();
        const msg = error === "missing_key"
          ? "There's a technical issue on our end right now. In the meantime, reach John directly at altijohnvessly@gmail.com."
          : "There's a technical issue on our end. Please try again shortly.";
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: msg } : m)));
        setLoading(false);
        return;
      }
      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: "Something went wrong. Try again." } : m
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed bottom-[72px] right-4 sm:right-auto sm:left-4 z-50 w-80 flex flex-col rounded-2xl overflow-hidden
                     bg-white/10 dark:bg-black/50
                     backdrop-blur-2xl
                     border border-white/30 dark:border-white/10"
          style={{ maxHeight: 420 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Byte — John's AI
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-500 hover:text-neutral-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 min-h-0">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-cyan-500/20 text-neutral-100 border border-cyan-500/30"
                      : "bg-white/10 text-neutral-300 border border-white/10"
                  }`}
                >
                  {m.content || (
                    <span className="flex gap-1 items-center py-0.5">
                      {[0, 150, 300].map((d) => (
                        <span
                          key={d}
                          className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${d}ms` }}
                        />
                      ))}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {onlyWelcome && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => quickSend(q)}
                    className="px-2.5 py-1 rounded-lg text-xs
                               bg-white/10 border border-white/15 text-neutral-400
                               hover:bg-white/15 hover:border-white/30 hover:text-white
                               transition-all duration-150"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={send} className="p-3 border-t border-white/10 shrink-0">
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm
                           text-neutral-200 placeholder:text-neutral-500
                           focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0
                           bg-cyan-500/20 border border-cyan-500/30 text-cyan-400
                           hover:bg-cyan-500/30 hover:text-cyan-300
                           disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Speech bubble */}
      {bubble && !open && (
        <div
          className="block fixed bottom-[68px] right-3 sm:right-auto sm:left-3 z-50
                     px-3 py-2 rounded-xl text-xs font-medium
                     bg-white dark:bg-neutral-900
                     border border-neutral-200 dark:border-neutral-800
                     text-neutral-800 dark:text-neutral-200
                     whitespace-nowrap
                     animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          Hey! Click me to know more about John&nbsp;👋
          {/* tail */}
          <span
            className="absolute -bottom-[6px] right-4 sm:right-auto sm:left-4
                       w-3 h-3 rotate-45
                       bg-white dark:bg-neutral-900
                       border-r border-b border-neutral-200 dark:border-neutral-800"
          />
        </div>
      )}

      {/* Dog button */}
      <button
        onClick={() => { setBubble(false); setOpen((v) => !v); }}
        className="flex fixed bottom-4 right-4 sm:right-auto sm:left-4 z-50 w-11 h-11
                   items-center justify-center rounded-full
                   bg-white/10 dark:bg-white/5
                   backdrop-blur-xl
                   border border-white/20 dark:border-white/10
                   shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                   hover:bg-white/20 dark:hover:bg-white/10
                   hover:scale-110 transition-all duration-200 cursor-pointer"
        aria-label="Chat with AI"
      >
        <DogScratch />
      </button>
    </>
  );
}
