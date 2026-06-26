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
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          isUser ? "" : ""
        )}
        style={{
          background: isUser ? "var(--accent-primary)" : "var(--border-subtle)",
        }}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <span className="text-xs font-bold" style={{ color: "var(--foreground-primary)" }}>F</span>
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn("rounded-2xl px-4 py-3 max-w-[85%]")}
        style={{
          background: isUser ? "var(--accent-primary)" : "var(--surface-container)",
          color: isUser ? "white" : "var(--foreground-primary)",
        }}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        ) : (
          <MarkdownRenderer content={content} />
        )}
      </div>
    </div>
  );
}
