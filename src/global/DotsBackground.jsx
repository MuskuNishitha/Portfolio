"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DotsBackground() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  
  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create dots with different properties
  const dots = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
    opacity: Math.random() * 0.4 + 0.1,
    type: Math.floor(Math.random() * 3), // 0, 1, or 2 for different colors
    blur: Math.random() * 2, // Random blur for depth
  }));

  // Color palettes
  const colors = {
    primary: [
      "rgba(147, 51, 234, 0.6)", // Purple
      "rgba(236, 72, 153, 0.6)", // Pink
      "rgba(59, 130, 246, 0.6)", // Blue
    ],
    secondary: [
      "rgba(168, 85, 247, 0.5)", // Light Purple
      "rgba(244, 114, 182, 0.5)", // Light Pink
      "rgba(96, 165, 250, 0.5)", // Light Blue
    ],
    glow: [
      "rgba(147, 51, 234, 0.3)",
      "rgba(236, 72, 153, 0.3)",
      "rgba(59, 130, 246, 0.3)",
    ]
  };

  // Generate star-like dots
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: `star-${i}`,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.8 + 0.2,
  }));

  // Generate floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: `particle-${i}`,
    size: Math.random() * 15 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 20 + 20,
    opacity: Math.random() * 0.15 + 0.05,
    color: i % 3 === 0 ? "rgba(147, 51, 234, 0.1)" : 
           i % 3 === 1 ? "rgba(236, 72, 153, 0.1)" : 
           "rgba(59, 130, 246, 0.1)",
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-900/10 dark:to-purple-900/20" />
      
      {/* Large floating particles (background depth) */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: particle.size * 2,
            height: particle.size * 2,
            backgroundColor: particle.color,
            top: `${particle.y}%`,
            left: `${particle.x}%`,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, -20, 20, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main decorative dots */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            background: dot.type === 0 
              ? `radial-gradient(circle at 30% 30%, ${colors.primary[0]}, ${colors.glow[0]})`
              : dot.type === 1
              ? `radial-gradient(circle at 30% 30%, ${colors.primary[1]}, ${colors.glow[1]})`
              : `radial-gradient(circle at 30% 30%, ${colors.primary[2]}, ${colors.glow[2]})`,
            top: `${dot.y}%`,
            left: `${dot.x}%`,
            opacity: dot.opacity,
            filter: `blur(${dot.blur}px)`,
            boxShadow: dot.type === 0
              ? "0 0 10px rgba(147, 51, 234, 0.3)"
              : dot.type === 1
              ? "0 0 10px rgba(236, 72, 153, 0.3)"
              : "0 0 10px rgba(59, 130, 246, 0.3)",
          }}
          animate={{
            y: [0, -40, 0, 40, 0],
            x: [0, 30, -30, 30, 0],
            scale: [1, 1.3, 0.7, 1.2, 1],
            opacity: [dot.opacity, dot.opacity * 1.5, dot.opacity * 0.5, dot.opacity * 1.2, dot.opacity],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Twinkling stars effect */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.y}%`,
            left: `${star.x}%`,
            opacity: star.opacity,
            boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
          }}
          animate={{
            opacity: [star.opacity, 1, star.opacity, 0.3, star.opacity],
            scale: [1, 1.5, 1, 0.7, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Moving light beams */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Connecting lines between nearby dots (optional) */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.1)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </linearGradient>
        </defs>
        {dots.slice(0, 20).map((dot, i) => (
          dots.slice(i + 1, i + 4).map((nextDot, j) => {
            if (Math.abs(dot.x - nextDot.x) < 15 && Math.abs(dot.y - nextDot.y) < 15) {
              return (
                <motion.line
                  key={`line-${dot.id}-${nextDot.id}`}
                  x1={`${dot.x}%`}
                  y1={`${dot.y}%`}
                  x2={`${nextDot.x}%`}
                  y2={`${nextDot.y}%`}
                  stroke="url(#line-gradient)"
                  strokeWidth="0.5"
                  strokeDasharray="5,5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.2, 0] }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3,
                  }}
                />
              );
            }
            return null;
          })
        ))}
      </svg>

      {/* Floating orbs */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            width: 300,
            height: 300,
            background: i === 1 
              ? "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)"
              : i === 2
              ? "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            top: i === 1 ? "10%" : i === 2 ? "60%" : "30%",
            left: i === 1 ? "10%" : i === 2 ? "70%" : "40%",
          }}
          animate={{
            x: [0, 50, -30, 50, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}