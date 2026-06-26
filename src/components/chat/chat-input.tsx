"use client";

import { useState, useRef, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { Send, Square } from "lucide-react";

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
    <div className="border-t border-[#2a2a2a] bg-[#1a1a1a] p-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a] focus-within:border-[#4a4a4a] transition-colors">
          <TextareaAutosize
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            minRows={1}
            maxRows={8}
            className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-500 resize-none focus:outline-none"
            disabled={disabled || isStreaming}
          />
          <div className="p-2">
            {isStreaming ? (
              <Button
                size="icon"
                variant="ghost"
                onClick={onStop}
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#3a3a3a]"
              >
                <Square className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={!message.trim() || disabled}
                className="h-8 w-8 bg-white text-black hover:bg-gray-200 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
