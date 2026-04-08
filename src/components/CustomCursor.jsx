// components/CustomCursor.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

// Color options for the quick bar
const COLOR_OPTIONS = [
  { name: 'purple', value: '135, 80, 247', rgb: '135, 80, 247' },
  { name: 'pink', value: '236, 72, 153', rgb: '236, 72, 153' },
  { name: 'blue', value: '59, 130, 246', rgb: '59, 130, 246' },
  { name: 'cyan', value: '6, 182, 212', rgb: '6, 182, 212' },
  { name: 'green', value: '34, 197, 94', rgb: '34, 197, 94' },
  { name: 'orange', value: '249, 115, 22', rgb: '249, 115, 22' },
  { name: 'red', value: '239, 68, 68', rgb: '239, 68, 68' },
  { name: 'yellow', value: '234, 179, 8', rgb: '234, 179, 8' }
];

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const { isDarkMode } = useTheme();
  
  // Cursor position with spring physics for smooth following
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring configurations with extra bounce for drop effect
  const springConfig = { damping: 22, stiffness: 550, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Bouncier spring for the drop effect
  const bounceSpringConfig = { damping: 18, stiffness: 400, mass: 0.6 };
  const bounceX = useSpring(cursorX, bounceSpringConfig);
  const bounceY = useSpring(cursorY, bounceSpringConfig);
  
  // Trail positions with bounce simulation
  const trailCount = 10;
  const trailPositions = useRef(Array(trailCount).fill({ x: 0, y: 0, vx: 0, vy: 0 }));
  const [trail, setTrail] = useState(Array(trailCount).fill({ x: 0, y: 0, bounceOffset: 0 }));
  
  // Animation frame for trail bounce effect
  const timeRef = useRef(0);
  
  // Get theme-based colors - now using selected color
  const getCursorColor = () => {
    return `rgba(${selectedColor.rgb}, ${isDarkMode ? 1 : 0.95})`;
  };
  
  const getTrailColor = (opacity, index) => {
    const adjustedOpacity = opacity * (index === 0 ? 0.9 : 0.7 - index * 0.04);
    return `rgba(${selectedColor.rgb}, ${Math.max(0.15, adjustedOpacity)})`;
  };
  
  const getRingColor = () => {
    return `rgba(${selectedColor.rgb}, ${isDarkMode ? 0.6 : 0.5})`;
  };
  
  const getDropColor = () => {
    return `rgba(${selectedColor.rgb}, ${isDarkMode ? 0.8 : 0.7})`;
  };
  
  useEffect(() => {
    setMounted(true);
    
    // Check if device is touch-enabled (mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      return;
    }
    
    // Add global styles for cursor hiding
    const style = document.createElement('style');
    style.id = 'custom-cursor-styles';
    style.textContent = `
      html, body, * {
        cursor: none !important;
      }
      input, textarea, select {
        cursor: text !important;
      }
      .custom-cursor-container {
        display: block !important;
      }
    `;
    document.head.appendChild(style);
    
    setIsVisible(true);
    
    // Track previous positions for velocity calculation
    let prevX = 0, prevY = 0;
    let lastTime = 0;
    
    const updateCursorPosition = (e) => {
      const currentTime = Date.now();
      const deltaTime = Math.min(32, currentTime - lastTime);
      
      // Calculate velocity for bounce effect
      const velX = deltaTime > 0 ? (e.clientX - prevX) / deltaTime : 0;
      const velY = deltaTime > 0 ? (e.clientY - prevY) / deltaTime : 0;
      
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Update trail positions with bounce simulation
      trailPositions.current.unshift({ 
        x: e.clientX, 
        y: e.clientY,
        vx: velX,
        vy: velY
      });
      trailPositions.current.pop();
      
      prevX = e.clientX;
      prevY = e.clientY;
      lastTime = currentTime;
    };
    
    // Animation loop for bounce and drop effect
    let animationId;
    const animateTrail = () => {
      timeRef.current += 0.016;
      
      const newTrail = trailPositions.current.map((pos, idx) => {
        if (!pos.x && pos.x !== 0) return { x: 0, y: 0, bounceOffset: 0 };
        
        // Create bouncy drop effect - each particle has its own bounce rhythm
        const bounceSpeed = 3 + idx * 0.4;
        const bounceAmplitude = isHovering ? 12 : 6;
        const verticalBounce = Math.sin(timeRef.current * bounceSpeed + idx * 0.8) * bounceAmplitude * (1 - idx / trailCount);
        
        // Add horizontal sway for fluid motion
        const horizontalSway = Math.cos(timeRef.current * 2.5 + idx) * 3;
        
        // Drop effect - when moving fast, particles stretch downward
        const speedFactor = Math.min(1, Math.abs(pos.vx || 0) + Math.abs(pos.vy || 0)) * 0.5;
        const dropOffset = speedFactor * 8 * (1 - idx / trailCount);
        
        return {
          x: pos.x + horizontalSway * (idx === 0 ? 0.5 : 1),
          y: pos.y + verticalBounce + dropOffset + (isClicking ? 4 : 0),
          bounceOffset: verticalBounce
        };
      });
      
      setTrail(newTrail);
      animationId = requestAnimationFrame(animateTrail);
    };
    
    animationId = requestAnimationFrame(animateTrail);
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseOver = (e) => {
      const isHoverable = e.target.closest('a, button, [role="button"], input, textarea, .hoverable, .btn-primary, .btn-secondary, .social-link, .card');
      setIsHovering(!!isHoverable);
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animationId) cancelAnimationFrame(animationId);
      const styleElement = document.getElementById('custom-cursor-styles');
      if (styleElement) styleElement.remove();
    };
  }, [cursorX, cursorY, isHovering, isClicking]);
  
  if (!mounted) return null;
  
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;
  
  return (
    <>
      <div 
        className="custom-cursor-container fixed inset-0 pointer-events-none z-[99999]"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}
      >
        {/* Bouncy Trail Drops - Animated with bounce effect */}
        {trail.map((pos, index) => {
          const size = Math.max(3, 8 - (index * 0.45));
          const opacity = Math.max(0.15, 0.65 - (index * 0.05));
          
          if (!pos.x || !pos.y) return null;
          
          return (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                left: pos.x,
                top: pos.y,
                width: size,
                height: size,
                backgroundColor: getTrailColor(opacity, index),
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                boxShadow: index === 0 ? `0 0 6px ${getCursorColor()}` : 'none',
              }}
              animate={{
                scale: isClicking ? [1, 1.3, 1] : (isHovering && index < 3 ? [1, 1.2, 1] : 1),
              }}
              transition={{
                duration: 0.3,
                repeat: isClicking ? 0 : Infinity,
                repeatDelay: 0.5,
              }}
            />
          );
        })}
        
        {/* Main Cursor Dot with Bounce Effect */}
        <motion.div
          className="absolute rounded-full"
          style={{
            left: bounceX,
            top: bounceY,
            x: '-50%',
            y: '-50%',
            width: isClicking ? 8 : (isHovering ? 12 : 10),
            height: isClicking ? 8 : (isHovering ? 12 : 10),
            backgroundColor: getCursorColor(),
            boxShadow: `0 0 ${isHovering ? '20px' : '12px'} ${getCursorColor()}`,
          }}
          animate={{
            scale: isClicking ? 0.7 : (isHovering ? 1.4 : 1),
            y: isClicking ? 3 : (isHovering ? -2 : 0),
          }}
          transition={{ 
            type: "spring", 
            stiffness: 550, 
            damping: 15,
            mass: 0.7,
            bounce: 0.4
          }}
        />
        
        {/* Outer Ring with Drop Animation */}
        <motion.div
          className="absolute rounded-full"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            x: '-50%',
            y: '-50%',
            width: 28,
            height: 28,
            border: `2.5px solid ${getRingColor()}`,
          }}
          animate={{
            scale: isClicking ? 0.8 : (isHovering ? 1.7 : 1.1),
            rotate: isHovering ? [0, 8, -8, 0] : 0,
            opacity: isHovering ? 0.9 : 0.5,
          }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 20,
            bounce: 0.5,
            rotate: { duration: 0.5, ease: "easeInOut" }
          }}
        />
        
        {/* Color Quick Bar - Circular Mode */}
        <motion.div
          className="absolute"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => setShowColorPicker(true)}
          onMouseLeave={() => setShowColorPicker(false)}
        >
          <AnimatePresence>
            {showColorPicker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex gap-2 p-3 rounded-full bg-black/80 backdrop-blur-md border border-white/20"
                style={{
                  position: 'relative',
                  marginLeft: '30px',
                  marginTop: '-60px'
                }}
              >
                {COLOR_OPTIONS.map((color, index) => (
                  <motion.button
                    key={color.name}
                    className="w-8 h-8 rounded-full transition-all hover:scale-110 active:scale-95"
                    style={{
                      backgroundColor: `rgb(${color.rgb})`,
                      boxShadow: selectedColor.name === color.name 
                        ? `0 0 15px rgba(${color.rgb}, 0.8)`
                        : 'none',
                      border: selectedColor.name === color.name 
                        ? '2px solid white'
                        : '1px solid rgba(255,255,255,0.3)'
                    }}
                    onClick={() => setSelectedColor(color)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Bouncing Droplets on Hover */}
        <AnimatePresence>
          {isHovering && (
            <>
              {[...Array(10)].map((_, i) => {
                const angle = (i * 36) * (Math.PI / 180);
                const distance = 22;
                const delay = i * 0.06;
                return (
                  <motion.div
                    key={`drop-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: cursorXSpring,
                      top: cursorYSpring,
                      width: 4 + (i % 3),
                      height: 4 + (i % 3),
                      backgroundColor: getDropColor(),
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.2, 0],
                      x: [0, Math.cos(angle) * distance],
                      y: [0, Math.sin(angle) * distance + 8],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: delay,
                      ease: "easeOut",
                      repeatDelay: 0.3
                    }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>
        
        {/* Click Splash Effect */}
        <AnimatePresence>
          {isClicking && (
            <motion.div
              initial={{ opacity: 0.8, scale: 0 }}
              animate={{ opacity: [0.8, 0.4, 0], scale: [0, 1.8, 2.2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                position: 'absolute',
                left: cursorXSpring,
                top: cursorYSpring,
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${getCursorColor()}, transparent)`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>
        
        {/* Extra Bounce Ring on Hover */}
        {isHovering && (
          <motion.div
            style={{
              position: 'absolute',
              left: cursorXSpring,
              top: cursorYSpring,
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: `1.5px solid ${getRingColor()}`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </>
  );
}