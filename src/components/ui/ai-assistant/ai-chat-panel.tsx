"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, ExternalLink } from "lucide-react";
import { ChatMessage } from "@/types/ai";
import { QUICK_ACTIONS } from "@/data/ai/quick-actions";
import { Button } from "@/components/ui/button";

interface AIChatPanelProps {
  isOpen: boolean;
  messages: ChatMessage[];
  inputValue: string;
  isTyping: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
  onQuickAction: (action: string) => void;
}

export const AIChatPanel = ({
  isOpen,
  messages,
  inputValue,
  isTyping,
  onInputChange,
  onSend,
  onClose,
  onQuickAction,
}: AIChatPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed bottom-24 right-6 z-50 flex h-[70vh] w-[calc(100vw-48px)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-surface/90 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan/10">
              <Bot className="h-6 w-6 text-accent-cyan" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">Ask Siam AI</h3>
              <p className="text-xs text-text-secondary">Your personal portfolio assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.role === "user"
                    ? "bg-accent-cyan text-white"
                    : "border border-border bg-surface text-text-primary"
                }`}
              >
                {msg.content}
              </div>

              {msg.links && msg.links.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 max-w-[85%]">
                  {msg.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-primary transition-all hover:border-accent-cyan hover:text-accent-cyan hover:bg-accent-cyan/5"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1 px-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="h-1.5 w-1.5 rounded-full bg-text-secondary"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="border-t border-border bg-surface/50 p-3 overflow-x-auto">
          <motion.div className="flex gap-2">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                onClick={() => onQuickAction(action.action)}
                className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1.5 text-xs transition-colors hover:border-accent-cyan hover:text-accent-cyan"
              >
                {action.label}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="border-t border-border p-4 bg-surface">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && inputValue.trim() && onSend()}
              placeholder="Ask me anything..."
              className="flex-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm focus:border-accent-cyan focus:outline-none"
            />
            <Button size="sm" onClick={onSend} disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};