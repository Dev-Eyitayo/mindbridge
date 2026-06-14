import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useChatLogic(sessionId?: string) {
  const router = useRouter();
  const [messages, setMessages] = useState<{ id: string, role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false); // New state for loading history

  // Load history when sessionId changes
  useEffect(() => {
    if (!sessionId || sessionId === "new") {
      setMessages([]);
      setIsHistoryLoading(false);
      return;
    }

    const fetchHistory = async () => {
      setIsHistoryLoading(true); // Start spinner
      try {
        const res = await fetch(`/api/chat/history?sessionId=${sessionId}`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        setIsHistoryLoading(false); // Stop spinner
      }
    };
    fetchHistory();
  }, [sessionId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = input.trim();
    if (!currentInput) return;

    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: currentInput };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const payload = {
        messages: newMessages.map(({ role, content }) => ({ role, content })),
        sessionId,
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include', 
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      
      const newSessionId = response.headers.get('X-Session-Id');
      
      // If we were on "new" and got a real ID, navigate smoothly
      if (sessionId === 'new' && newSessionId) {
        router.replace(`/dashboard/${newSessionId}`);
        return; 
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantMessageId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages(prev => prev.map(m => 
          m.id === assistantMessageId ? { ...m, content: m.content + chunk } : m
        ));
      }
    } catch (err) {
      console.error("Chat Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, sessionId, router]);

  // Return the new isHistoryLoading state
  return { 
    messages, 
    setMessages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    isHistoryLoading 
  };
}