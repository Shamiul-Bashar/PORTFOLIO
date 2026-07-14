import { motion } from "framer-motion";
import { Bot, X } from "lucide-react";

interface AIButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

/**
 * Premium floating AI assistant button
 */
export const AIButton = ({ onClick, isOpen }: AIButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={onClick}
        aria-label="Ask Siam AI"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: isOpen ? 0 : [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: isOpen ? 0 : Infinity,
            ease: "easeInOut",
          },
          scale: { duration: 0.3 },
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface glass-surface shadow-[0_4_20px_-4px_rgba(34,211,238,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
      >
        <motion.div
          animate={{
            scale: isOpen ? 1 : [1, 1.2, 1],
            opacity: isOpen ? 0 : [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: isOpen ? 0 : Infinity,
          }}
          className="absolute inset-0 rounded-full border-2 border-accent-cyan/30"
        />

        {!isOpen && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-surface bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        )}

        {isOpen ? (
          <X className="h-8 w-8 text-accent-cyan" />
        ) : (
          <Bot className="h-8 w-8 text-accent-cyan" />
        )}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 hidden whitespace-nowrap rounded-lg border border-border bg-surface px-4 py-2 shadow-xl md:block"
        >
          <span className="block font-bold text-text-primary">
            {isOpen ? "Close AI" : "Ask Siam AI"}
          </span>
          <span className="block text-xs text-text-secondary">
            Always here to help
          </span>
        </motion.div>
      </motion.button>
    </div>
  );
};