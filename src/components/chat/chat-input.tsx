"use client";

import { useState, useRef, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Send, Paperclip, Globe, Lightbulb, Bot, ChevronDown } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  onStop,
  isStreaming,
  disabled,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = message.trim();
    if (!trimmed || disabled || isStreaming) return;

    onSend(trimmed);
    setMessage("");
    textareaRef.current?.focus();
  }, [message, disabled, isStreaming, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="px-[120px] pb-8 pt-5">
      <div
        className="flex flex-col justify-between"
        style={{
          background: "var(--surface-glass)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-subtle)",
          minHeight: "120px",
          padding: "14px 16px",
        }}
      >
        {/* Textarea */}
        <TextareaAutosize
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Foxyse..."
          minRows={2}
          maxRows={6}
          className="bg-transparent text-sm resize-none focus:outline-none w-full"
          style={{ color: "var(--foreground-primary)" }}
          disabled={disabled || isStreaming}
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between mt-3">
          {/* Left tools */}
          <div className="flex items-center gap-2">
            <button
              className="p-1.5 rounded-md"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--accent-primary)",
              }}
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-subtle)",
              }}
            >
              <Globe className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
              <span className="font-mono text-[9px]">Browser</span>
            </button>
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-subtle)",
              }}
            >
              <Lightbulb className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
              <span className="font-mono text-[9px]">Thinking</span>
            </button>
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-subtle)",
              }}
            >
              <Bot className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
              <span className="font-mono text-[9px]">Agent</span>
            </button>
          </div>

          {/* Right tools */}
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--foreground-muted)",
              }}
            >
              <span className="text-[11px]">Foxyse K2.6</span>
              <ChevronDown className="w-2 h-2" style={{ color: "var(--text-subtle)" }} />
            </button>
            <button
              onClick={isStreaming ? onStop : handleSubmit}
              disabled={!message.trim() && !isStreaming}
              className="w-9 h-9 flex items-center justify-center"
              style={{
                background: "var(--accent-primary)",
                borderRadius: "var(--radius-sm)",
                opacity: !message.trim() && !isStreaming ? 0.5 : 1,
              }}
            >
              <Send className="w-[18px] h-[18px] text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <p
        className="text-center font-mono text-[9px] mt-3"
        style={{ color: "var(--text-subtle)" }}
      >
        Foxyse can make mistakes. Please verify important information.
      </p>
    </div>
  );
}
