"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { useChatStore } from "@/hooks/use-chat";
import { Menu, Share2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export function ChatInterface() {
  const params = useParams();
  const conversationId = params.id as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [conversationTitle, setConversationTitle] = useState("New Chat");
  const abortControllerRef = useRef<AbortController | null>(null);
  const { setSidebarOpen } = useChatStore();

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/chats/${conversationId}/messages`);
        if (res.ok) {
          const data = await res.json();
          setMessages(
            data.map((m: { id: string; role: string; content: string }) => ({
              id: m.id,
              role: m.role as "user" | "assistant" | "system",
              content: m.content,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
    setMessages([]);
  }, [conversationId]);

  const handleSend = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);

      // Update title from first message
      if (messages.length === 0) {
        setConversationTitle(content.slice(0, 50) + (content.length > 50 ? "..." : ""));
      }

      abortControllerRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
            conversationId,
            modelId: "gpt-4o",
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to send message");
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";
        const assistantId = (Date.now() + 1).toString();

        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "" },
        ]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("0:")) {
                try {
                  const text = JSON.parse(line.slice(2));
                  assistantContent += text;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: assistantContent }
                        : m
                    )
                  );
                } catch {
                  // Skip invalid chunks
                }
              }
            }
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
          },
        ]);
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [messages, conversationId]
  );

  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  }, []);

  const handlePromptClick = useCallback(
    (prompt: string) => {
      handleSend(prompt);
    },
    [handleSend]
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div
          className="animate-spin rounded-full h-8 w-8 border-b-2"
          style={{ borderColor: "var(--accent-primary)" }}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col" style={{ background: "var(--background)" }}>
      {/* Chat Header */}
      <div
        className="h-16 flex items-center justify-between px-7"
        style={{
          background: "#2C1B1F60",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1"
            style={{ color: "var(--accent-primary)" }}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--foreground-primary)", fontFamily: "var(--font-heading)" }}>
              {conversationTitle}
            </h2>
          </div>
        </div>
        <button
          className="p-2 rounded-md"
          style={{
            border: "1px solid var(--border-subtle)",
            color: "var(--accent-primary)",
          }}
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <MessageList
        messages={messages}
        isStreaming={isStreaming}
        onPromptClick={handlePromptClick}
      />
      <ChatInput
        onSend={handleSend}
        onStop={handleStop}
        isStreaming={isStreaming}
      />
    </div>
  );
}
