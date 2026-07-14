"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { ChatMessage } from "@/types/ai";
import { generateAIResponse } from "@/lib/ai/assistant-engine";

const WELCOME_MESSAGE: ChatMessage = {
  id: "1",
  role: "assistant",
  content: "Hi! I'm Ask Siam AI. How can I help you learn more about my work today?",
};

/**
 * Custom hook for managing Ask Siam AI assistant state and interaction logic.
 */
export function useAIAssistant() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const openAssistant = useCallback(() => setIsOpen(true), []);
  const closeAssistant = useCallback(() => setIsOpen(false), []);
  const toggleAssistant = useCallback(() => setIsOpen((prev) => !prev), []);

  const sendMessage = useCallback((content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    typingTimeoutRef.current = setTimeout(() => {
      const response = generateAIResponse(trimmed);
      
      const assistantResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        links: response.links,
      };
      
      setMessages((prev) => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 700);
  }, [isTyping]);

  const clearConversation = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
  }, []);

  /** Navigates to sections or triggers specific actions based on quick-action identifiers */
  const executeAction = useCallback((action: string) => {
    switch (action) {
      case "NAV_ABOUT":
      case "NAV_PROJECTS":
      case "NAV_SKILLS":
      case "NAV_LEARNING":
      case "NAV_EDUCATION":
      case "NAV_CERTIFICATES":
      case "NAV_ACHIEVEMENTS":
      case "NAV_CONTACT":
      case "NAV_CAREER": {
        const id = action.replace("NAV_", "").toLowerCase();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          closeAssistant();
        }
        break;
      }
      case "DOWNLOAD_RESUME": {
        window.open("/resume.pdf", "_blank");
        break;
      }
      default:
        console.warn(`Action ${action} not implemented.`);
    }
  }, [closeAssistant]);

  return {
    isOpen,
    messages,
    isTyping,
    inputValue,
    openAssistant,
    closeAssistant,
    toggleAssistant,
    setInputValue,
    sendMessage,
    clearConversation,
    executeAction,
  };
}