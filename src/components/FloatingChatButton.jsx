// components/FloatingChatButton.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { FaRobot, FaRocket } from "react-icons/fa";

export default function FloatingChatButton() {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Theme-based colors
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: -100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200, delay: 0.5 }}
      className="fixed bottom-4 left-4 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle, var(--primary) 0%, var(--secondary) 100%)`,
        }}
      />

      {/* Pulsing Ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          border: `2px solid var(--primary)`,
        }}
      />

      {/* Main Button */}
      <Link href="/devboost-ai">
        <motion.button
          className={`relative w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg cursor-pointer group overflow-hidden`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isHovered 
              ? "0 0 25px rgba(135,80,247,0.6)"
              : "0 4px 15px rgba(135,80,247,0.3)",
          }}
        >
          {/* Ripple Effect Background */}
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? { scale: 1.5, opacity: 0 } : {}}
            transition={{ duration: 0.6 }}
          />

          {/* Water Wave Effect on Hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-white/10 to-transparent"
            animate={{
              y: isHovered ? ["100%", "0%", "100%"] : "100%",
            }}
            transition={{
              duration: 1,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          />

          {/* Icon Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: isHovered ? [0, 10, -10, 0] : 0,
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 1,
              }}
            >
              <FaRobot className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          {/* Sparkle Effects */}
          {isHovered && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: [0, (i % 2 === 0 ? -20 : 20), (i % 2 === 0 ? -40 : 40)],
                    y: [0, -30, -60],
                    opacity: [1, 0.5, 0],
                    scale: [1, 1.5, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </>
          )}

          {/* Tooltip - Now on the left side since button is on left */}
          <motion.div
            className={`absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg ${bgColor} ${borderColor} border`}
            initial={{ opacity: 0, x: -10 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-body)",
            }}
          >
            <div className="flex items-center gap-1">
              <FaRocket className="text-primary-3 text-xs" />
              <span>Try DevBoost AI</span>
            </div>
            {/* Tooltip Arrow - Now pointing left */}
            <div
              className={`absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] ${
                isDarkMode ? "border-r-gray-900" : "border-r-white"
              }`}
            />
          </motion.div>
        </motion.button>
      </Link>

      {/* Chat Notification Badge */}
      <motion.div
        className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>
    </motion.div>
  );
}