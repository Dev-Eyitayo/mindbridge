import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useChatStore,
  selectActiveMessages,
  type ChatMessage,
} from '@/store/useChatStore';

export function useChatLogic(sessionId?: string) {
  const router = useRouter();

  const messages = useChatStore(selectActiveMessages);
  const setMessages = useChatStore((s) => s.setMessages);
  const startDraftSession = useChatStore((s) => s.startDraftSession);
  const promoteDraftToSession = useChatStore((s) => s.promoteDraftToSession);
  const loadHistoryForSession = useChatStore((s) => s.loadHistoryForSession);
  const isHydrated = useChatStore((s) => s.isHydrated);
  const triggerSidebarRefresh = useChatStore((s) => s.triggerRefresh);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const draftKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const isNewChat = !sessionId || sessionId === 'new';

    if (isNewChat) {
      if (!draftKeyRef.current) {
        setMessages([]);
      }
      setIsHistoryLoading(false);
      return;
    }
    if (isHydrated(sessionId)) {
      setIsHistoryLoading(false);
      draftKeyRef.current = null; // promotion complete, clear the draft marker
      return;
    }

    let cancelled = false;
    const fetchHistory = async () => {
      setIsHistoryLoading(true);
      try {
        const res = await fetch(`/api/chat/history?sessionId=${sessionId}`, {
          credentials: 'include',
        });
        if (res.ok && !cancelled) {
          const data: ChatMessage[] = await res.json();
          loadHistoryForSession(sessionId, data);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        if (!cancelled) setIsHistoryLoading(false);
      }
    };

    fetchHistory();
    return () => {
      cancelled = true;
    };
  }, [sessionId, isHydrated, loadHistoryForSession, setMessages]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const currentInput = input.trim();
      if (!currentInput) return;

      const isNewChat = !sessionId || sessionId === 'new';

      if (isNewChat && !draftKeyRef.current) {
        draftKeyRef.current = startDraftSession();
      }

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: currentInput,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            sessionId: sessionId || 'new',
          }),
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Server error');

        const newSessionId = response.headers.get('X-Session-Id');

        if (isNewChat && newSessionId) {
          promoteDraftToSession(newSessionId);
          draftKeyRef.current = newSessionId;

          router.replace(`/chat/${newSessionId}`, { scroll: false });
          triggerSidebarRefresh();
        }

        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const assistantMessageId = (Date.now() + 1).toString();

        setMessages((prev) => [
          ...prev,
          { id: assistantMessageId, role: 'assistant', content: '' },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessageId ? { ...m, content: m.content + chunk } : m
            )
          );
        }
      } catch (err) {
        console.error('Chat Error:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [input, messages, sessionId, router, triggerSidebarRefresh, setMessages, startDraftSession, promoteDraftToSession]
  );

  return {
    messages,
    input,
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value),
    handleSubmit,
    isLoading,
    isHistoryLoading,
  };
}