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

  // Reduced number of dots from 100 to 40
  const dots = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2, // Slightly smaller
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 8 + 10, // Faster animation
    opacity: Math.random() * 0.3 + 0.1,
    colorIndex: Math.floor(Math.random() * 3),
  }));

  // Colors - simplified
  const colors = [
    "rgba(147, 51, 234, 0.5)", // Purple
    "rgba(236, 72, 153, 0.5)", // Pink
    "rgba(59, 130, 246, 0.5)", // Blue
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Simple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-900/5" />
      
      {/* Main dots - simplified animation */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor: colors[dot.colorIndex],
            top: `${dot.y}%`,
            left: `${dot.x}%`,
            opacity: dot.opacity,
            boxShadow: `0 0 8px ${colors[dot.colorIndex]}`,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 15, -15, 15, 0],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Single floating orb for depth - reduced from 3 to 1 */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 250,
          height: 250,
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}