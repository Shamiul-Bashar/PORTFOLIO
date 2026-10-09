import { motion } from "framer-motion";
import { Bot, X } from "lucide-react";

interface AIButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

/**
 * Premium Floating AI Assistant Button
 */
export const AIButton = ({ onClick, isOpen }: AIButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <motion.button
        onClick={onClick}
        aria-label="Ask Siam AI"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: isOpen ? 0 : [0, -8, 0],
        }}
        transition={{
          y: {
            duration: 3.8,
            repeat: isOpen ? 0 : Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 0.35,
          },
        }}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="
        group
        relative
        flex
        h-16
        w-16
        items-center
        justify-center
        overflow-hidden
        rounded-full

        border
        border-yellow-400/20

        bg-gradient-to-br
        from-[#201d12]
        via-[#14130f]
        to-[#0e0e0b]

        backdrop-blur-xl

        shadow-[0_10px_35px_rgba(0,0,0,.45)]

        transition-all
        duration-500

        hover:border-yellow-400/40
        hover:shadow-[0_0_40px_rgba(250,204,21,.23)]
      "
      >
        {/* Glow Ring */}

        <motion.div
          animate={{
            scale: isOpen ? 1 : [1, 1.15, 1],
            opacity: isOpen ? 0 : [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 2,
            repeat: isOpen ? 0 : Infinity,
          }}
          className="
          absolute
          inset-0
          rounded-full
          border
          border-yellow-400/30
        "
        />

        {/* Background Glow */}

        <div
          className="
          absolute
          inset-0
          rounded-full
          bg-yellow-400/5
          blur-xl
        "
        />

        {/* Notification */}

        {!isOpen && (
          <span
            className="
            absolute
            -right-1
            -top-1

            h-4
            w-4

            rounded-full

            border-2
            border-[#0e0e0b]

            bg-yellow-400

            shadow-[0_0_12px_rgba(250,204,21,.65)]
          "
          />
        )}

        {/* Icon */}

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          {isOpen ? (
            <X className="h-7 w-7 text-yellow-300" />
          ) : (
            <Bot className="h-7 w-7 text-yellow-300" />
          )}
        </motion.div>

        {/* Tooltip */}

        <motion.div
          initial={{
            opacity: 0,
            x: 15,
          }}
          whileHover={{
            opacity: 1,
            x: 0,
          }}
          className="
          absolute
          right-full
          mr-4
          hidden
          whitespace-nowrap

          rounded-xl

          border
          border-yellow-400/15

          bg-[#1a1915]

          px-4
          py-2

          shadow-2xl

          md:block
        "
        >
          <span className="block font-semibold text-white">
            {isOpen ? "Close AI" : "Ask Siam AI"}
          </span>

          <span className="block text-xs text-slate-400">
            Powered by Siam Portfolio
          </span>
        </motion.div>
      </motion.button>
    </div>
  );
}