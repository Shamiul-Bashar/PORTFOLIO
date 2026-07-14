"use client";
import { useCallback } from "react";
import { useAIAssistant } from "@/hooks/use-ai-assistant";
import { AIButton } from "@/components/ui/ai-assistant/ai-button";
import { AIChatPanel } from "@/components/ui/ai-assistant/ai-chat-panel";

/**
 * AI Layout container that orchestrates the AI assistant button and chat panel.
 * Uses memoized handlers to ensure smooth performance and interaction.
 */
export const AILayout = () => {
  const {
    isOpen,
    messages,
    isTyping,
    inputValue,
    toggleAssistant,
    closeAssistant,
    setInputValue,
    sendMessage,
    executeAction,
  } = useAIAssistant();

  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
  }, [inputValue, sendMessage]);

  const handleQuickAction = useCallback((action: string) => {
    executeAction(action);
  }, [executeAction]);

  return (
    <>
      <AIButton 
        onClick={toggleAssistant} 
        isOpen={isOpen} 
      />
      
      <AIChatPanel
        isOpen={isOpen}
        messages={messages}
        inputValue={inputValue}
        isTyping={isTyping}
        onInputChange={setInputValue}
        onSend={handleSend}
        onClose={closeAssistant}
        onQuickAction={handleQuickAction}
      />
    </>
  );
};