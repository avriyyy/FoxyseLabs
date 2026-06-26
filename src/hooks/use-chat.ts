import { create } from "zustand";
import { ChatState, Conversation } from "@/types";

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversation: null,
  isLoading: false,
  isStreaming: false,
  sidebarOpen: false,

  setConversations: (conversations: Conversation[]) =>
    set({ conversations }),

  addConversation: (conversation: Conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
    })),

  updateConversation: (id: string, updates: Partial<Conversation>) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
      activeConversation:
        state.activeConversation?.id === id
          ? { ...state.activeConversation, ...updates }
          : state.activeConversation,
    })),

  deleteConversation: (id: string) =>
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
      activeConversation:
        state.activeConversation?.id === id ? null : state.activeConversation,
    })),

  setActiveConversation: (conversation: Conversation | null) =>
    set({ activeConversation: conversation }),

  setLoading: (isLoading: boolean) => set({ isLoading }),

  setStreaming: (isStreaming: boolean) => set({ isStreaming }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
}));
