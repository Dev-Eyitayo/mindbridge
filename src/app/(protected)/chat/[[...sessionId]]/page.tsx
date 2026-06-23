"use client";

import { use, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Brain, Heart, Sparkles } from "lucide-react";
import { useChatLogic } from "@/hooks/use-chat-logic";

export default function ChatPage({ params }: { params: Promise<{ sessionId?: string[] }> }) {
  const { data: session } = useSession();
  const { sessionId: sessionIdArr } = use(params);
  const sessionId = sessionIdArr?.[0];

  const { messages, input, handleInputChange, handleSubmit, isLoading, isHistoryLoading } =
    useChatLogic(sessionId);

  const scrollRef = useRef<HTMLDivElement>(null);
  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const suggestions = [
    { icon: Sparkles, text: "I just need to vent about my day." },
    { icon: Brain,    text: "I've been feeling really anxious lately." },
    { icon: Heart,    text: "I want to reflect on something personal." },
  ];

  const handleSuggestion = (text: string) => {
    handleInputChange({ target: { value: text } } as any);
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as any);
    }, 0);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) handleSubmit({ preventDefault: () => {} } as any);
    }
  };

  const showSkeleton = isHistoryLoading && messages.length === 0;
  const showWelcome  = !showSkeleton && messages.length === 0;

  return (
    <div
      className="flex-1 flex flex-col h-full overflow-hidden"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="flex-1 overflow-y-auto scroll-thin" ref={scrollRef}>
        <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-4">

          {showSkeleton && <ChatSkeleton />}

          {showWelcome && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center fade-up">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "var(--violet-light)" }}
              >
                <Sparkles size={22} style={{ color: "var(--violet)" }} />
              </div>
              <h1
                className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                {getGreeting()}, {firstName}.
              </h1>
              <p className="text-[15px] mb-10 max-w-sm" style={{ color: "var(--text-secondary)" }}>
                This is a safe space. What's on your mind today?
              </p>

              <div className="grid sm:grid-cols-3 gap-3 w-full">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(s.text)}
                    className="flex flex-col items-start p-4 rounded-xl text-left transition-all fade-up"
                    style={{
                      background:   "var(--card)",
                      border:       "1px solid var(--border)",
                      animationDelay: `${i * 60}ms`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--violet-subtle)";
                      e.currentTarget.style.background  = "var(--violet-light)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background  = "var(--card)";
                    }}
                  >
                    <s.icon size={16} style={{ color: "var(--violet)", marginBottom: 10 }} />
                    <span className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {s.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!showSkeleton && !showWelcome && (
            <div className="space-y-5 pb-2">
              {messages.map((m, i) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} fade-up`}
                  style={{ animationDelay: `${Math.min(i * 15, 150)}ms` }}
                >
                  {/* AI avatar */}
                  {m.role === "assistant" && (
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mr-2.5 mt-0.5"
                      style={{ background: "var(--violet-light)" }}
                    >
                      <Sparkles size={13} style={{ color: "var(--violet)" }} />
                    </div>
                  )}

                  <div
                    className="max-w-[82%] sm:max-w-[75%] px-4 py-3 text-sm rounded-2xl"
                    style={m.role === "user" ? {
                      background: "var(--violet-light)",
                      color:      "var(--text-primary)",
                      borderBottomRightRadius: 4,
                    } : {
                      background: "var(--card)",
                      border:     "1px solid var(--border)",
                      color:      "var(--text-primary)",
                      boxShadow:  "var(--shadow-xs)",
                      borderBottomLeftRadius: 4,
                    }}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose-chat" style={{ lineHeight: 1.65 }}>
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p style={{ lineHeight: 1.65 }}>{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mr-2.5 mt-0.5"
                    style={{ background: "var(--violet-light)" }}
                  >
                    <Sparkles size={13} style={{ color: "var(--violet)" }} />
                  </div>
                  <div
                    className="px-4 py-3.5 rounded-2xl"
                    style={{
                      background: "var(--card)",
                      border:     "1px solid var(--border)",
                      boxShadow:  "var(--shadow-xs)",
                      borderBottomLeftRadius: 4,
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      {[0,1,2].map((i) => (
                        <span
                          key={i}
                          className="typing-dot block w-1.5 h-1.5 rounded-full"
                          style={{
                            background:      "var(--text-tertiary)",
                            animationDelay:  `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className="shrink-0 px-4 py-4"
        style={{
          background:  "var(--bg)",
          borderTop:   "1px solid var(--border)",
        }}
      >
        <div className="w-full max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-xl overflow-hidden"
            style={{
              background: "var(--card)",
              border:     "1px solid var(--border)",
              boxShadow:  "var(--shadow-sm)",
            }}
          >
            <textarea
              value={input}
              onChange={handleTextarea}
              onKeyDown={handleKey}
              placeholder="Share what's on your mind…"
              rows={1}
              className="w-full resize-none bg-transparent text-sm outline-none leading-relaxed scroll-thin"
              style={{
                padding:   "14px 52px 14px 16px",
                color:     "var(--text-primary)",
                maxHeight: "180px",
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send"
              className={`absolute right-2.5 bottom-2.5 w-8 h-8 flex items-center justify-center rounded-lg transition-all ${isLoading ? "btn-send-loading" : ""}`}
              style={{
                background: (isLoading || !input.trim()) ? "var(--bg-muted)" : "var(--violet)",
                color:      (isLoading || !input.trim()) ? "var(--text-tertiary)" : "white",
                cursor:     (isLoading || !input.trim()) ? "not-allowed" : "pointer",
              }}
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </form>
          <p className="text-center text-[11px] mt-2.5" style={{ color: "var(--text-tertiary)" }}>
            MindBridge is not a substitute for professional mental health support.
          </p>
        </div>
      </div>
    </div>
  );
}


function ChatSkeleton() {
  return (
    <div className="space-y-6 pb-2">
      {/* AI message skeleton */}
      <div className="flex justify-start">
        <div className="skeleton w-7 h-7 rounded-lg shrink-0 mr-2.5 mt-0.5" style={{ borderRadius: 8 }} />
        <div
          className="w-full max-w-[82%] sm:max-w-[75%] rounded-2xl overflow-hidden"
          style={{
            background:            "var(--card)",
            border:                "1px solid var(--border)",
            borderBottomLeftRadius: 4,
            boxShadow:             "var(--shadow-xs)",
          }}
        >
          <div className="px-4 py-3 space-y-2.5">
            <div className="skeleton h-3.5 w-full" />
            <div className="skeleton h-3.5 w-[92%]" />
            <div className="skeleton h-3.5 w-[78%]" />
            <div className="skeleton h-3.5 w-[85%]" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div
          className="w-full max-w-[70%] sm:max-w-[60%] rounded-2xl overflow-hidden"
          style={{
            background:             "var(--violet-light)",
            borderBottomRightRadius: 4,
          }}
        >
          <div className="px-4 py-3 space-y-2.5">
            <div className="skeleton h-3.5 w-[88%]" style={{ background: "var(--violet-subtle)", opacity: 0.5 }} />
            <div className="skeleton h-3.5 w-full"  style={{ background: "var(--violet-subtle)", opacity: 0.5 }} />
            <div className="skeleton h-3.5 w-[65%]" style={{ background: "var(--violet-subtle)", opacity: 0.5 }} />
          </div>
        </div>
      </div>


      <div className="flex justify-start">
        <div className="skeleton w-7 h-7 rounded-lg shrink-0 mr-2.5 mt-0.5" style={{ borderRadius: 8 }} />
        <div
          className="w-full max-w-[82%] sm:max-w-[75%] rounded-2xl overflow-hidden"
          style={{
            background:            "var(--card)",
            border:                "1px solid var(--border)",
            borderBottomLeftRadius: 4,
            boxShadow:             "var(--shadow-xs)",
          }}
        >
          <div className="px-4 py-3 space-y-2.5">
            <div className="skeleton h-3.5 w-[95%]" />
            <div className="skeleton h-3.5 w-full" />
            <div className="skeleton h-3.5 w-[88%]" />
            <div className="skeleton h-3.5 w-full" />
            <div className="skeleton h-3.5 w-[55%]" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div
          className="w-full max-w-[55%] sm:max-w-[45%] rounded-2xl overflow-hidden"
          style={{ background: "var(--violet-light)", borderBottomRightRadius: 4 }}
        >
          <div className="px-4 py-3 space-y-2.5">
            <div className="skeleton h-3.5 w-full"  style={{ background: "var(--violet-subtle)", opacity: 0.5 }} />
            <div className="skeleton h-3.5 w-[72%]" style={{ background: "var(--violet-subtle)", opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </div>
  );
}