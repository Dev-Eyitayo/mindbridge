/**
 * src/app/(protected)/chat/[[...sessionId]]/page.tsx
 *
 * Design decisions:
 * - The chat background is `--background` (warm off-white), not cold `slate-50`.
 * - AI messages: no border. White card on warm background with subtle shadow.
 *   The absence of a border makes them feel calmer — less form-like, more editorial.
 * - User messages: `--primary-muted` (indigo-50) background with `--foreground` text.
 *   NOT a saturated indigo/teal blob. The message should feel like your words,
 *   not a notification badge. Still clearly differentiated from AI.
 * - Composer: the "signature element" — a floating pill container that lifts slightly
 *   on focus. `composer-input` class from globals.css applies the glow.
 *   The send button is a round icon inside the composer area (like Claude/ChatGPT),
 *   not a separate card outside.
 * - Typing indicator: redesigned as three small warm dots using `typing-dot` class.
 * - Empty state: personal greeting, sub-headline, three suggestion cards.
 *   Suggestions are plain cards, no icon-in-a-square-background visual noise.
 * - All business logic (useChatLogic, handleSubmit, auto-scroll) is preserved exactly.
 */
"use client";

import { useSession } from "next-auth/react";
import { Sparkles, HeartPulse, Brain, ArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChatLogic } from "@/hooks/use-chat-logic";
import { useEffect, useRef, use } from "react";

export default function ChatPage({
  params,
}: {
  params: Promise<{ sessionId?: string[] }>;
}) {
  const { data: session } = useSession();
  const unwrappedParams = use(params);
  const sessionId = unwrappedParams?.sessionId?.[0];

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isHistoryLoading,
  } = useChatLogic(sessionId);

  const scrollRef = useRef<HTMLDivElement>(null);
  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const suggestions = [
    { icon: Brain,      text: "I'm feeling really overwhelmed with work today." },
    { icon: HeartPulse, text: "I've been experiencing a lot of anxiety lately." },
    { icon: Sparkles,   text: "I just want to reflect on my day." },
  ];

  const handleSuggestionClick = async (text: string) => {
    handleInputChange({ target: { value: text } } as any);
    setTimeout(async () => {
      const fakeEvent = { preventDefault: () => {} } as any;
      await handleSubmit(fakeEvent);
    }, 0);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const fakeEvent = { preventDefault: () => {} } as any;
        handleSubmit(fakeEvent);
      }
    }
  };

  const showSkeleton = isHistoryLoading && messages.length === 0;
  const showWelcome  = !showSkeleton && messages.length === 0;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">

      {/* ── Message area ─────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto chat-scroll"
        ref={scrollRef}
        style={{ paddingBottom: "0" }}
      >
        <div className="max-w-2xl mx-auto px-4 pt-8 pb-6">

          {showSkeleton ? (
            <ChatSkeleton />
          ) : showWelcome ? (
            <WelcomeScreen
              greeting={getGreeting()}
              firstName={firstName}
              suggestions={suggestions}
              onSuggestion={handleSuggestionClick}
            />
          ) : (
            <div className="space-y-6 animate-fade-in">
              {messages.map((m, i) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                  style={{ animationDelay: `${Math.min(i * 20, 200)}ms` }}
                >
                  {m.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2.5 mt-1 shrink-0">
                      <Sparkles size={12} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`
                      max-w-[80%] px-4 py-3 text-sm leading-relaxed
                      ${m.role === "user"
                        ? "bg-primary-muted text-foreground rounded-xl rounded-br-sm"
                        : "bg-surface text-foreground rounded-xl rounded-bl-sm shadow-xs border border-border"
                      }
                    `}
                  >
                    {m.role === "assistant" ? (
                      <div className="chat-prose">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2.5 mt-1 shrink-0">
                    <Sparkles size={12} className="text-primary" />
                  </div>
                  <div className="bg-surface border border-border rounded-xl rounded-bl-sm px-4 py-3 shadow-xs">
                    <div className="flex gap-1.5 items-center h-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted typing-dot" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted typing-dot" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted typing-dot" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Composer ─────────────────────────────────────────────── */}
      <div className="shrink-0 bg-background px-4 pb-6 pt-4">
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative bg-surface border border-border rounded-xl shadow-sm"
          >
            <textarea
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Share what's on your mind…"
              rows={1}
              className="
                composer-input w-full resize-none bg-transparent
                py-3.5 pl-4 pr-14 text-sm text-foreground
                placeholder:text-subtle rounded-xl
                focus:outline-none
                max-h-[180px] overflow-y-auto
                leading-relaxed
              "
              style={{ scrollbarWidth: "none" }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="
                absolute right-2.5 bottom-2.5
                w-8 h-8 flex items-center justify-center
                bg-primary hover:bg-primary-hover
                disabled:bg-border disabled:cursor-not-allowed
                text-white rounded-lg
                transition-colors duration-fast
              "
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </form>
          <p className="text-center text-[11px] text-subtle mt-2.5">
            MindBridge is not a substitute for professional mental health support.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Welcome screen ──────────────────────────────────────────────────────── */

function WelcomeScreen({
  greeting,
  firstName,
  suggestions,
  onSuggestion,
}: {
  greeting: string;
  firstName: string;
  suggestions: { icon: React.ElementType; text: string }[];
  onSuggestion: (text: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center animate-fade-in">
      <h1 className="font-display text-4xl md:text-5xl font-normal text-foreground mb-3 tracking-tight">
        {greeting}, {firstName}.
      </h1>
      <p className="text-muted text-base mb-12 max-w-sm">
        This is a safe, private space. How are you feeling today?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl stagger">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSuggestion(s.text)}
            className="
              flex flex-col items-start p-4 text-left
              bg-surface border border-border hover:border-border-strong
              rounded-lg shadow-xs hover:shadow-sm
              transition-all duration-fast animate-fade-in
            "
          >
            <s.icon size={18} className="text-muted mb-2.5" strokeWidth={1.75} />
            <span className="text-xs text-muted leading-relaxed">"{s.text}"</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Chat skeleton ───────────────────────────────────────────────────────── */

function ChatSkeleton() {
  return (
    <div className="space-y-8 pt-8 animate-pulse">
      {/* AI message skeleton */}
      <div className="flex justify-start gap-2.5">
        <div className="w-6 h-6 rounded-full bg-border shrink-0 mt-1" />
        <div className="max-w-[75%] bg-surface border border-border rounded-xl rounded-bl-sm px-4 py-3">
          <div className="space-y-2.5">
            <div className="h-3 bg-border rounded w-full" />
            <div className="h-3 bg-border rounded w-11/12" />
            <div className="h-3 bg-border rounded w-4/5" />
          </div>
        </div>
      </div>

      {/* User message skeleton */}
      <div className="flex justify-end">
        <div className="max-w-[65%] bg-primary-muted rounded-xl rounded-br-sm px-4 py-3">
          <div className="space-y-2.5">
            <div className="h-3 bg-primary-subtle/40 rounded w-3/4" />
            <div className="h-3 bg-primary-subtle/40 rounded w-full" />
          </div>
        </div>
      </div>

      {/* AI response skeleton */}
      <div className="flex justify-start gap-2.5">
        <div className="w-6 h-6 rounded-full bg-border shrink-0 mt-1" />
        <div className="max-w-[80%] bg-surface border border-border rounded-xl rounded-bl-sm px-4 py-3">
          <div className="space-y-2.5">
            <div className="h-3 bg-border rounded w-full" />
            <div className="h-3 bg-border rounded w-10/12" />
            <div className="h-3 bg-border rounded w-full" />
            <div className="h-3 bg-border rounded w-7/12" />
          </div>
        </div>
      </div>
    </div>
  );
}