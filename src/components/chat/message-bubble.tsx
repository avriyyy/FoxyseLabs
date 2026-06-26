"use client";

import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "./markdown-renderer";
import { User } from "lucide-react";

interface MessageBubbleProps {
  role: "user" | "assistant" | "system";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "")}>
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: isUser ? "var(--accent-primary)" : "var(--border-subtle)",
        }}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5 text-white" />
        ) : (
          <span className="text-[10px] font-bold" style={{ color: "var(--foreground-primary)" }}>F</span>
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "rounded-2xl px-4 py-2.5 max-w-[85%] text-sm",
          isUser ? "rounded-tr-md" : "rounded-tl-md"
        )}
        style={{
          background: isUser ? "var(--accent-primary)" : "var(--surface-container)",
          color: isUser ? "white" : "var(--foreground-primary)",
        }}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        ) : (
          <MarkdownRenderer content={content} />
        )}
      </div>
    </div>
  );
}
