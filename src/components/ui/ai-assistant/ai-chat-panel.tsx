"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  X,
  Send,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { QUICK_ACTIONS } from "@/data/ai/quick-actions";
import { ChatMessage } from "@/types/ai";

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
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.96,
        }}
        transition={{
          duration: .35,
        }}
        className="
        fixed
        bottom-24
        right-6
        z-[60]

        flex
        h-[72vh]
        w-[calc(100vw-48px)]
        max-w-[420px]
        flex-col
        overflow-hidden

        rounded-3xl

        border
        border-cyan-400/15

        bg-[#0B1220]/95

        backdrop-blur-2xl

        shadow-[0_25px_80px_rgba(0,0,0,.55)]

        "
      >

        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between

          border-b
          border-white/5

          bg-gradient-to-r
          from-yellow-400/5
          via-transparent
          to-yellow-500/5

          px-5
          py-4
        "
        >

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-full

              bg-cyan-400/10

              shadow-[0_0_20px_rgba(244,204,39,.18)]
            "
            >
              <Bot className="h-6 w-6 text-cyan-300" />
            </div>

            <div>

              <h3 className="font-semibold text-white">
                Ask Siam AI
              </h3>

              <p className="text-xs text-slate-400">
                Personal Portfolio Assistant
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            aria-label="Close AI"

            className="
            rounded-full

            p-2

            text-slate-400

            transition-all

            hover:bg-white/5
            hover:text-white
            "
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Chat */}

        <div
          ref={scrollRef}
          className="
          flex-1
          space-y-5
          overflow-y-auto
          p-5
          "
        >

          {messages.map((msg) => {

            const isUser = msg.role === "user";

            return (

              <motion.div
                key={msg.id}

                initial={{
                  opacity: 0,
                  y: 12,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                className={`flex ${
                  isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`
                  max-w-[84%]
                  rounded-2xl
                  px-4
                  py-3
                  text-sm
                  leading-7

                  ${
                    isUser
                      ? `
                      bg-gradient-to-r
                      from-yellow-500
                      to-sky-500

                      text-white

                      shadow-[0_8px_30px_rgba(244,204,39,.28)]
                      `
                      : `
                      border
                      border-white/6

                      bg-[#182235]

                      text-slate-100

                      shadow-[0_10px_25px_rgba(0,0,0,.30)]
                      `
                  }
                  `}
                >

                  {msg.content}

                </div>
                                {msg.links && msg.links.length > 0 && (

                  <div className="mt-3 flex flex-wrap gap-2">

                    {msg.links.map((link, idx) => (

                      <motion.a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"

                        whileHover={{
                          y: -2,
                        }}

                        className="
                        flex
                        items-center
                        gap-2

                        rounded-xl

                        border
                        border-cyan-400/15

                        bg-cyan-400/5

                        px-3
                        py-2

                        text-xs
                        text-cyan-300

                        transition-all

                        hover:border-cyan-400/40
                        hover:bg-cyan-400/10
                        "
                      >

                        {link.label}

                        <ExternalLink className="h-3.5 w-3.5" />

                      </motion.a>

                    ))}

                  </div>

                )}

              </motion.div>

            );

          })}

          {/* Typing Indicator */}

          {isTyping && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex"
            >

              <div
                className="
                flex
                items-center
                gap-1.5

                rounded-2xl

                border
                border-white/6

                bg-[#182235]

                px-4
                py-3
                "
              >

                {[0, 1, 2].map((i) => (

                  <motion.div
                    key={i}

                    animate={{
                      y: [0, -5, 0],
                    }}

                    transition={{
                      duration: .7,
                      repeat: Infinity,
                      delay: i * .15,
                    }}

                    className="
                    h-2
                    w-2
                    rounded-full
                    bg-cyan-300
                    "
                  />

                ))}

              </div>

            </motion.div>

          )}

        </div>

        {/* Quick Actions */}

        <div
          className="
          border-t
          border-white/5

          bg-[#0F172A]

          px-4
          py-3
          overflow-x-auto
          "
        >

          <div className="flex gap-2">

            {QUICK_ACTIONS.map((action) => (

              <button
                key={action.id}
                onClick={() => onQuickAction(action.action)}

                className="
                whitespace-nowrap

                rounded-full

                border
                border-white/8

                bg-white/[0.03]

                px-3
                py-2

                text-xs
                text-slate-300

                transition-all

                hover:border-cyan-400/40
                hover:bg-cyan-400/10
                hover:text-cyan-300
                "
              >
                {action.label}
              </button>

            ))}

          </div>

        </div>

        {/* Input */}

        <div
          className="
          border-t
          border-white/5

          bg-[#111827]

          p-4
          "
        >

          <div className="flex items-center gap-3">

            <input
              type="text"

              value={inputValue}

              onChange={(e) =>
                onInputChange(e.target.value)
              }

              onKeyDown={(e) =>
                e.key === "Enter" &&
                inputValue.trim() &&
                onSend()
              }

              placeholder="Ask anything about Siam..."

              className="
              flex-1

              rounded-xl

              border
              border-white/8

              bg-[#1A2438]

              px-4
              py-3

              text-sm
              text-white

              placeholder:text-slate-500

              outline-none

              transition-all

              focus:border-cyan-400/40
              focus:ring-2
              focus:ring-cyan-400/10
              "
            />

            <Button
              onClick={onSend}
              disabled={!inputValue.trim()}
              className="
              h-11
              w-11

              rounded-xl

              bg-gradient-to-r
              from-yellow-500
              to-sky-500

              p-0

              shadow-[0_8px_25px_rgba(244,204,39,.25)]

              hover:from-yellow-400
              hover:to-sky-400
              "
            >

              <Send className="h-4 w-4" />

            </Button>

          </div>

        </div>

      </motion.div>

    </AnimatePresence>

  );

};