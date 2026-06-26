"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useChatStore } from "@/hooks/use-chat";
import { Plus, Trash2, X, Search, Settings, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function Sidebar() {
  const router = useRouter();
  const params = useParams();
  const activeId = params.id as string | undefined;
  const { data: session } = useSession();

  const {
    conversations,
    sidebarOpen,
    setConversations,
    addConversation,
    deleteConversation,
    setSidebarOpen,
  } = useChatStore();

  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[280px] h-full
          flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          background: "#2C1B1F80",
          borderRight: "1px solid var(--border-subtle)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 shrink-0">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M31.907 3.921a47.94 47.94 0 0 0-29.652-0.801 2.957 2.957 0 0 0-2.161 3.667c0.532 2.135 1.308 4.588 2.24 6.812 0.016 0.052 0.041 0.027 0.041-0.025-0.135-1.043 0.667-2.36 2.24-2.839a36.7 36.7 0 0 1 23.188 0.307 2.19 2.19 0 0 0 2.796-1.416c0.932-3 1.308-5.037 1.401-5.547 0.016-0.095-0.068-0.131-0.093-0.157z m-23.043 6.6c-1.145 0.239-2.728 0.615-3.916 1.009-2.375 0.819-2.265 3.709-1 4.631 0.093-0.536 0.667-1.265 1.307-1.511 2.371-0.932 4.917-1.489 7.491-1.719-1.308-0.531-2.584-1.292-3.865-2.411z m18.907 5.786a28.2 28.2 0 0 0-21.932-0.869c-1.131 0.427-1.839 1.803-1.131 3.109a51 51 0 0 0 4.199 6.401c-0.224-0.776 0.172-2.213 1.692-2.683 4.204-1.292 8.615-0.744 11.547 0.443 0.828 0.333 2 0.131 2.657-0.853a53 53 0 0 0 3.052-5.36c0.041-0.083 0-0.145-0.084-0.188m-6.812 10.36a13.2 13.2 0 0 1-3.333-2.401c-0.453-0.453-1.12-1.104-1.823-1.88-1.605 0-3.163 0.161-4.829 0.693-1.547 0.484-1.692 2.271-1.015 3.203 1.145 1.427 1.948 2.197 3.229 3.521a3.655 3.655 0 0 0 5.093 0.025c1-1 1.615-1.667 2.745-2.948 0.067-0.068 0.041-0.187-0.068-0.213z"
                fill="url(#sidebar-gradient)"
              />
              <defs>
                <linearGradient id="sidebar-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF4A8E" />
                  <stop offset="1" stopColor="#FF007F" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-semibold text-sm" style={{ color: "var(--foreground-primary)" }}>
              FoxyseLabs
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-md hover:bg-white/5"
            style={{ color: "var(--text-subtle)" }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-3 pb-3 shrink-0">
          <button
            onClick={handleNewChat}
            className="w-full h-9 flex items-center justify-center gap-2 font-mono text-xs font-semibold tracking-wider text-white rounded-md hover:opacity-90 transition-opacity"
            style={{ background: "var(--accent-primary)" }}
          >
            <Plus className="w-4 h-4" />
            NEW CHAT
          </button>
        </div>

        {/* Recent Header + Search */}
        <div className="px-3 space-y-2 shrink-0">
          <p
            className="font-mono text-[10px] font-semibold tracking-[0.12em] px-1"
            style={{ color: "var(--text-subtle)" }}
          >
            RECENT CONVERSATIONS
          </p>
          <div
            className="h-9 flex items-center gap-2 px-3 rounded-md"
            style={{
              background: "var(--surface-glass)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <Search className="w-4 h-4 shrink-0" style={{ color: "var(--accent-primary)" }} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs outline-none flex-1 min-w-0 placeholder:text-[var(--text-subtle)]"
              style={{ color: "var(--foreground-primary)" }}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto mt-2 px-1 min-h-0">
          {filteredConversations.length === 0 ? (
            <p className="text-xs text-center py-4" style={{ color: "var(--text-subtle)" }}>
              No conversations yet
            </p>
          ) : (
            filteredConversations.map((conv) => (
              <a
                key={conv.id}
                href={`/${conv.id}`}
                onClick={() => setSidebarOpen(false)}
                className="group flex items-center gap-2 px-3 h-9 rounded-md transition-colors mx-1 mb-0.5 hover:bg-white/5"
                style={{
                  color: activeId === conv.id ? "var(--foreground-primary)" : "var(--foreground-muted)",
                  background: activeId === conv.id ? "var(--surface-glass)" : undefined,
                }}
              >
                <span className="text-xs truncate flex-1">{conv.title}</span>
                <button
                  onClick={(e) => handleDeleteChat(conv.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 transition-opacity shrink-0"
                  style={{ color: "var(--text-subtle)" }}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </a>
            ))
          )}
        </div>

        {/* User Profile */}
        <div
          className="p-3 flex items-center justify-between shrink-0"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
              style={{ background: "var(--border-subtle)", color: "var(--foreground-primary)" }}
            >
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium truncate" style={{ color: "var(--foreground-primary)" }}>
                {session?.user?.name || "User"}
              </p>
              <p className="font-mono text-[9px]" style={{ color: "var(--text-subtle)" }}>
                Pro Plan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
              style={{ color: "var(--text-subtle)" }}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
              style={{ color: "var(--text-subtle)" }}
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
