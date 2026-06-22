"use client";

import { useSession } from "next-auth/react";
import { Sparkles, HeartPulse, Brain, ArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChatLogic } from "@/hooks/use-chat-logic";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useEffect, useRef, use } from "react";

export default function DashboardPage({ params }: { params: Promise<{ sessionId?: string[] }> }) {
  const { data: session } = useSession();
  const unwrappedParams = use(params);
  const sessionId = unwrappedParams?.sessionId?.[0];

  const { messages, input, handleInputChange, handleSubmit, isLoading, isHistoryLoading } = useChatLogic(sessionId);

  const scrollRef = useRef<HTMLDivElement>(null);

  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const suggestions = [
    { icon: Brain, text: "I'm feeling really overwhelmed with work today." },
    { icon: HeartPulse, text: "I've been experiencing a lot of anxiety lately." },
    { icon: Sparkles, text: "I just want to reflect on my day." },
  ];

  const handleSuggestionClick = async (text: string) => {
    handleInputChange({ target: { value: text } } as any);
    setTimeout(async () => {
      const fakeEvent = { preventDefault: () => {} } as any;
      await handleSubmit(fakeEvent);
    }, 0);
  };

  // Auto-scroll to bottom smoothly
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
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

  // ---- Render decision, in priority order ----
  //
  // 1. We have messages -> always render the chat thread. This is checked
  //    FIRST and is the load-bearing fix: messages now come from the
  //    Zustand store (see useChatLogic), which is re-keyed (not cleared)
  //    when "new" becomes a real sessionId. So at the exact moment
  //    router.replace fires, `messages` is already the same non-empty
  //    array it was a millisecond earlier. There is no render frame in
  //    which sessionId is the new uuid AND messages is empty, because
  //    those two facts are now updated in the same synchronous store
  //    write (promoteDraftToSession), not across a fetch boundary.
  //
  // 2. Only if there are truly zero messages AND we're fetching a cold
  //    session's history do we show the skeleton. This path is only ever
  //    hit for a direct link / refresh into an existing session, never
  //    for the new -> uuid transition.
  //
  // 3. Otherwise, zero messages and not loading -> the welcome screen.
  const showSkeleton = isHistoryLoading && messages.length === 0;
  const showWelcome = !showSkeleton && messages.length === 0;

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-50">
      <div className="flex-1 overflow-y-auto p-6 md:p-8" ref={scrollRef}>
        <div className="max-w-3xl mx-auto">
          {showSkeleton ? (
            <ChatSkeleton />
          ) : showWelcome ? (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="text-teal-600" size={36} />
              </div>
              <h1 className="font-serif text-4xl font-semibold text-slate-900 mb-3">
                {getGreeting()}, {firstName}.
              </h1>
              <p className="text-slate-600 text-lg mb-12 max-w-md">
                This is a safe space. How are you feeling today?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s.text)}
                    className="flex flex-col items-start p-5 bg-white border border-slate-200 hover:border-teal-200 rounded-xl text-left transition-colors hover:bg-slate-50"
                  >
                    <s.icon size={22} className="text-slate-600 mb-3" />
                    <span className="text-sm text-slate-700 leading-snug">"{s.text}"</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-9 pb-24">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-6 py-4 text-[15.5px] leading-relaxed rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-teal-600 text-white rounded-br-md'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md'
                  }`}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && <TypingIndicator />}
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 bg-slate-50 p-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="w-full resize-none bg-white border border-slate-200 focus:border-slate-300 focus:outline-none rounded-2xl py-4 pl-6 pr-16 text-slate-900 placeholder:text-slate-400 text-[15.5px] leading-relaxed max-h-[180px] overflow-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 bottom-3 p-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white rounded-xl transition-colors"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const ChatSkeleton = () => (
  <div className="space-y-10 pt-8 max-w-3xl mx-auto">
    <div className="flex justify-start animate-pulse">
      <div className="w-full max-w-[88%] sm:max-w-[82%]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-slate-100 rounded-full" />
          <div className="h-3.5 w-24 bg-slate-100 rounded" />
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-6 py-6">
          <div className="space-y-3">
            <div className="h-4 bg-slate-100 rounded w-11/12" />
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className="h-4 bg-slate-100 rounded w-4/5" />
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-end animate-pulse">
      <div className="w-full max-w-[85%] sm:max-w-[78%]">
        <div className="bg-teal-100 rounded-2xl rounded-br-md px-6 py-6">
          <div className="space-y-3">
            <div className="h-4 bg-teal-50 rounded w-4/5" />
            <div className="h-4 bg-teal-50 rounded w-full" />
            <div className="h-4 bg-teal-50 rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  </div>
);