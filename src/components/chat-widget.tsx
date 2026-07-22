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
    "John works across the AI and backend stack - LlamaIndex, FAISS, OpenAI, and Ollama on the AI/RAG side; TypeScript, Python, Node.js, NestJS, and FastAPI for backend; PostgreSQL, Redis, and Prisma for data; Next.js and Tailwind CSS on the frontend; and Docker and AWS for DevOps.",

  "How do I get in touch with him?":
    "You can reach John at altijohnvessly@gmail.com, connect on LinkedIn (linkedin.com/in/zavxai), follow him on GitHub (github.com/zavxai) or X (@zavxai), and watch his content on YouTube (@zavxai).",

  "What's he good at?":
    "John specializes in AI architecture, scalability, and performance - specifically building production-grade RAG pipelines, agentic systems, and LLM-powered features that go beyond demos. He thinks in systems: how context flows, where models fail, and how to engineer around those limits with the right retrieval, memory, and tooling strategies.",
};

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey! I'm Byte, John's AI assistant. Ask me anything about his work, tech, or how to reach him.",
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
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    if (CANNED[content]) {
      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setLoading(true);
      const full = CANNED[content];
      let i = 0;
      const interval = setInterval(() => {
        i += 18;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: full.slice(0, i) } : m
          )
        );
        if (i >= full.length) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: full } : m
            )
          );
          clearInterval(interval);
          setLoading(false);
        }
      }, 28);
      return;
    }

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
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
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Something went wrong." }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const content = text.trim();
    if (!content || loading) return;
    setText("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (res.status === 503) {
        const { error } = await res.json();
        const msg =
          error === "missing_key"
            ? "There's a technical issue on our end right now. In the meantime, reach John directly at altijohnvessly@gmail.com."
            : "There's a technical issue on our end. Please try again shortly.";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: msg } : m
          )
        );
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
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Something went wrong. Try again." }
            : m
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
          className="fixed bottom-[72px] right-4 z-50 flex w-80 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl sm:right-auto sm:left-4"
          style={{ maxHeight: 420 }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              <span className="text-sm font-medium text-neutral-200">
                Byte - John&apos;s AI
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-500 transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "border border-white/15 bg-white text-black"
                      : "border border-white/[0.08] bg-white/[0.04] text-neutral-300"
                  }`}
                >
                  {m.content || (
                    <span className="flex items-center gap-1 py-0.5">
                      {[0, 150, 300].map((d) => (
                        <span
                          key={d}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400"
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
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-400 transition-all duration-150 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={send}
            className="shrink-0 border-t border-white/[0.08] p-3"
          >
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 transition-colors focus:border-white/20 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {bubble && !open && (
        <div className="fixed bottom-[68px] right-3 z-50 animate-in fade-in slide-in-from-bottom-2 whitespace-nowrap rounded-full border border-white/10 bg-neutral-950 px-3.5 py-2 text-xs font-medium text-neutral-200 duration-300 sm:right-auto sm:left-3">
          Hey! Click me to know more about John&nbsp;👋
          <span className="absolute -bottom-[5px] right-4 h-2.5 w-2.5 rotate-45 border-b border-r border-white/10 bg-neutral-950 sm:right-auto sm:left-4" />
        </div>
      )}

      <button
        onClick={() => {
          setBubble(false);
          setOpen((v) => !v);
        }}
        className="fixed bottom-4 right-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-200 hover:scale-110 hover:border-white/20 hover:bg-white/[0.08] sm:right-auto sm:left-4"
        aria-label="Chat with AI"
      >
        <DogScratch />
      </button>
    </>
  );
}
