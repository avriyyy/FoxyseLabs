"use client";

import { useState, useRef, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Send, Paperclip, Globe, Lightbulb, Bot, ChevronDown, Square } from "lucide-react";

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
    <div className="shrink-0 px-4 lg:px-[100px] pb-4 pt-3">
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "var(--surface-glass)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {/* Textarea */}
        <div className="px-4 pt-3 pb-2">
          <TextareaAutosize
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Foxyse..."
            minRows={2}
            maxRows={6}
            className="bg-transparent text-sm resize-none focus:outline-none w-full placeholder:text-[var(--text-subtle)]"
            style={{ color: "var(--foreground-primary)" }}
            disabled={disabled || isStreaming}
          />
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 py-2">
          {/* Left tools */}
          <div className="flex items-center gap-1.5">
            <ToolButton icon={<Paperclip className="w-4 h-4" />} />
            <ToolButton icon={<Globe className="w-3.5 h-3.5" />} label="Browser" />
            <ToolButton icon={<Lightbulb className="w-3.5 h-3.5" />} label="Thinking" />
            <ToolButton icon={<Bot className="w-3.5 h-3.5" />} label="Agent" />
          </div>

          {/* Right tools */}
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] hover:bg-white/5 transition-colors"
              style={{ color: "var(--foreground-muted)" }}
            >
              Foxyse K2.6
              <ChevronDown className="w-3 h-3" style={{ color: "var(--text-subtle)" }} />
            </button>
            <button
              onClick={isStreaming ? onStop : handleSubmit}
              disabled={!message.trim() && !isStreaming}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-opacity disabled:opacity-30"
              style={{ background: "var(--accent-primary)" }}
            >
              {isStreaming ? (
                <Square className="w-3.5 h-3.5 text-white" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <p
        className="text-center font-mono text-[10px] mt-2.5"
        style={{ color: "var(--text-subtle)" }}
      >
        Foxyse can make mistakes. Please verify important information.
      </p>
    </div>
  );
}

function ToolButton({ icon, label }: { icon: React.ReactNode; label?: string }) {
  return (
    <button
      className="flex items-center gap-1 px-2 py-1.5 rounded-md text-[10px] font-mono hover:bg-white/5 transition-colors"
      style={{
        color: "var(--text-subtle)",
      }}
    >
      <span style={{ color: "var(--accent-primary)" }}>{icon}</span>
      {label && <span>{label}</span>}
    </button>
  );
}
