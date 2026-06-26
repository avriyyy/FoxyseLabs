"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useChatStore } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Plus, MessageSquare, Trash2, X, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function Sidebar() {
  const router = useRouter();
  const params = useParams();
  const activeId = params.id as string | undefined;

  const {
    conversations,
    sidebarOpen,
    setConversations,
    addConversation,
    deleteConversation,
    setSidebarOpen,
  } = useChatStore();

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/chats");
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  const handleNewChat = async () => {
    try {
      const res = await fetch("/api/chats", { method: "POST" });
      if (res.ok) {
        const conversation = await res.json();
        addConversation(conversation);
        router.push(`/${conversation.id}`);
        setSidebarOpen(false);
      }
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  const handleDeleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const res = await fetch(`/api/chats?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        deleteConversation(id);
        if (activeId === id) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-white">FoxyseLabs</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            onClick={handleNewChat}
            className="w-full justify-start gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-[#3a3a3a]"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {conversations.map((conv) => (
            <a
              key={conv.id}
              href={`/${conv.id}`}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                activeId === conv.id
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-400 hover:bg-[#2a2a2a]/50 hover:text-white"
              }`}
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{conv.title}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(conv.updatedAt)}
                </p>
              </div>
              <button
                onClick={(e) => handleDeleteChat(conv.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#2a2a2a]">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
}
