"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
  onPromptClick?: (prompt: string) => void;
}

const PROMPT_SUGGESTIONS = [
  ["Explain quantum computing simply", "Write a professional email"],
  ["Debug this React code", "Plan a 5-day Tokyo trip"],
  ["Summarize this article", "Give me startup ideas"],
];

export function MessageList({ messages, isStreaming, onPromptClick }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-[720px] w-full text-center px-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <svg width="60" height="60" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M31.907 3.921a47.94 47.94 0 0 0-29.652-0.801 2.957 2.957 0 0 0-2.161 3.667c0.532 2.135 1.308 4.588 2.24 6.812 0.016 0.052 0.041 0.027 0.041-0.025-0.135-1.043 0.667-2.36 2.24-2.839a36.7 36.7 0 0 1 23.188 0.307 2.19 2.19 0 0 0 2.796-1.416c0.932-3 1.308-5.037 1.401-5.547 0.016-0.095-0.068-0.131-0.093-0.157z m-23.043 6.6c-1.145 0.239-2.728 0.615-3.916 1.009-2.375 0.819-2.265 3.709-1 4.631 0.093-0.536 0.667-1.265 1.307-1.511 2.371-0.932 4.917-1.489 7.491-1.719-1.308-0.531-2.584-1.292-3.865-2.411z m18.907 5.786a28.2 28.2 0 0 0-21.932-0.869c-1.131 0.427-1.839 1.803-1.131 3.109a51 51 0 0 0 4.199 6.401c-0.224-0.776 0.172-2.213 1.692-2.683 4.204-1.292 8.615-0.744 11.547 0.443 0.828 0.333 2 0.131 2.657-0.853a53 53 0 0 0 3.052-5.36c0.041-0.083 0-0.145-0.084-0.188m-6.812 10.36a13.2 13.2 0 0 1-3.333-2.401c-0.453-0.453-1.12-1.104-1.823-1.88-1.605 0-3.163 0.161-4.829 0.693-1.547 0.484-1.692 2.271-1.015 3.203 1.145 1.427 1.948 2.197 3.229 3.521a3.655 3.655 0 0 0 5.093 0.025c1-1 1.615-1.667 2.745-2.948 0.067-0.068 0.041-0.187-0.068-0.213z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF4A8E" />
                  <stop offset="1" stopColor="#FF007F" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Welcome Text */}
          <h1
            className="font-heading text-[36px] font-bold mb-4"
            style={{ color: "var(--foreground-primary)", fontFamily: "var(--font-heading)" }}
          >
            What can I help you with?
          </h1>
          <p
            className="text-base mb-8 leading-relaxed max-w-[560px] mx-auto"
            style={{ color: "var(--foreground-muted)" }}
          >
            Ask anything — coding, writing, analysis, brainstorming, research, or just chat. I am here to help.
          </p>

          {/* Prompts Grid */}
          <div className="flex flex-col gap-3">
            {PROMPT_SUGGESTIONS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-3">
                {row.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => onPromptClick?.(prompt)}
                    className="flex-1 h-16 flex items-center px-4 text-sm transition-colors hover:border-[var(--accent-secondary)]"
                    style={{
                      background: "var(--surface-glass)",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--foreground-muted)",
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-[120px] py-8 space-y-6">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
      {isStreaming && (
        <div className="flex gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "var(--accent-primary)" }}
          >
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <div
            className="rounded-2xl px-4 py-3"
            style={{ background: "var(--surface-container)" }}
          >
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--foreground-muted)" }} />
              <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.1s]" style={{ background: "var(--foreground-muted)" }} />
              <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.2s]" style={{ background: "var(--foreground-muted)" }} />
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
