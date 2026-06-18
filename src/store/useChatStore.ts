import { create } from 'zustand';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

interface ActiveChatSlice {
  activeKey: string | null;
  messages: ChatMessage[];

  hydratedSessionIds: Set<string>;

  isAwaitingSessionId: boolean;

  startDraftSession: () => string;
  setMessages: (updater: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  promoteDraftToSession: (realSessionId: string) => void;
  loadHistoryForSession: (sessionId: string, messages: ChatMessage[]) => void;
  markAwaitingSessionId: (waiting: boolean) => void;
  resetActiveChat: () => void;
  isHydrated: (sessionId: string) => boolean;
}

interface SidebarSlice {
  shouldRefresh: boolean;
  triggerRefresh: () => void;
  resetRefresh: () => void;
}

type ChatStore = ActiveChatSlice & SidebarSlice;

export const useChatStore = create<ChatStore>((set, get) => ({
  activeKey: null,
  messages: [],
  hydratedSessionIds: new Set(),
  isAwaitingSessionId: false,

  startDraftSession: () => {
    const draftKey = `draft-${Date.now()}`;
    set({ activeKey: draftKey, messages: [], isAwaitingSessionId: false });
    return draftKey;
  },

  setMessages: (updater) =>
    set((state) => ({
      messages: typeof updater === 'function' ? (updater as (prev: ChatMessage[]) => ChatMessage[])(state.messages) : updater,
    })),

  promoteDraftToSession: (realSessionId) =>
    set((state) => ({
      activeKey: realSessionId,
      hydratedSessionIds: new Set(state.hydratedSessionIds).add(realSessionId),
      isAwaitingSessionId: false,
    })),

  loadHistoryForSession: (sessionId, messages) =>
    set((state) => ({
      activeKey: sessionId,
      messages,
      hydratedSessionIds: new Set(state.hydratedSessionIds).add(sessionId),
    })),

  markAwaitingSessionId: (waiting) => set({ isAwaitingSessionId: waiting }),

  resetActiveChat: () => set({ activeKey: null, messages: [], isAwaitingSessionId: false }),

  isHydrated: (sessionId) => get().hydratedSessionIds.has(sessionId),

  shouldRefresh: false,
  triggerRefresh: () => set({ shouldRefresh: true }),
  resetRefresh: () => set({ shouldRefresh: false }),
}));

export const selectActiveMessages = (s: ChatStore) => s.messages;
export const selectActiveKey = (s: ChatStore) => s.activeKey;
export const selectSidebarRefresh = (s: ChatStore) => s.shouldRefresh;