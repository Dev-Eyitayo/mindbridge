"use client";

import { useSession } from "next-auth/react";
import { Sparkles, HeartPulse, Brain, ArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChatLogic } from "@/hooks/use-chat-logic";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useEffect, useRef, use } from "react";

export default function DashboardPage({ params }: { params: Promise<{ sessionId?: string }> }) {
  const { data: session } = useSession();
  const unwrappedParams = use(params);
  const sessionId = unwrappedParams?.sessionId;
  
  // Destructure isHistoryLoading from the hook
  const { messages, input, handleInputChange, handleSubmit, isLoading, isHistoryLoading } = useChatLogic(sessionId);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  const greeting = getGreeting();

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-50 relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide" ref={scrollRef}>
        <div className="max-w-3xl mx-auto h-full flex flex-col">
          
          {/* Conditional Rendering Logic */}
          {isHistoryLoading ? (
            <ChatSkeleton />
          ) : messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-700">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-teal-100">
                <Sparkles className="text-teal-600" size={32} />
              </div>
              <h1 className="font-serif text-4xl font-bold text-slate-900 mb-3 text-center">
                {greeting}, {firstName}.
              </h1>
              <p className="text-slate-500 text-lg mb-12 text-center max-w-lg">
                This is a safe space. How are you feeling today?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => handleSuggestionClick(s.text)} className="flex flex-col items-start p-4 bg-white border border-slate-200 rounded-2xl hover:border-teal-300 transition-all text-left shadow-sm hover:shadow-md">
                    <s.icon size={20} className="text-slate-600 mb-2" />
                    <span className="text-sm font-medium text-slate-700">"{s.text}"</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 pt-8 pb-32">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none prose prose-slate max-w-none'}`}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && <TypingIndicator />}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
        <div className="max-w-3xl mx-auto relative">
          <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              rows={1}
              placeholder="Type your thoughts here..."
              className="w-full py-4 pl-6 pr-16 bg-white border border-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all font-sans text-slate-900 placeholder:text-slate-400 resize-none min-h-[60px] max-h-[200px] scrollbar-hide shadow-sm"
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 bottom-2 p-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 text-white rounded-full transition-colors shadow-md">
              <ArrowUp size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Added the skeleton component outside the main function
const ChatSkeleton = () => (
  <div className="space-y-6 pt-8 max-w-3xl mx-auto w-full animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
        <div className={`h-16 w-3/4 rounded-2xl ${i % 2 === 0 ? 'bg-teal-100' : 'bg-slate-200'}`} />
      </div>
    ))}
  </div>
);