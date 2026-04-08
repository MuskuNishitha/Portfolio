'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const colorThemes = [
  { id: 'purple', name: 'Purple', color: '#8750f7', gradient: 'from-purple-500 to-purple-700' },
  { id: 'pink', name: 'Pink', color: '#ec489a', gradient: 'from-pink-500 to-pink-700' },
  { id: 'blue', name: 'Blue', color: '#3b82f6', gradient: 'from-blue-500 to-blue-700' },
  { id: 'red', name: 'Red', color: '#ef4444', gradient: 'from-red-500 to-red-700' },
  { id: 'yellow', name: 'Yellow', color: '#eab308', gradient: 'from-yellow-500 to-yellow-700' },
  { id: 'orange', name: 'Orange', color: '#f97316', gradient: 'from-orange-500 to-orange-700' },
  { id: 'green', name: 'Green', color: '#22c55e', gradient: 'from-green-500 to-green-700' },
  { id: 'cyan', name: 'Cyan', color: '#06b6d4', gradient: 'from-cyan-500 to-cyan-700' },
];

export default function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('purple');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved color preference
    const savedColor = localStorage.getItem('primary-color');
    if (savedColor && colorThemes.some(theme => theme.id === savedColor)) {
      setCurrentColor(savedColor);
      document.documentElement.setAttribute('data-primary', savedColor);
    } else {
      document.documentElement.setAttribute('data-primary', 'purple');
    }
  }, []);

  const handleColorChange = (colorId) => {
    setCurrentColor(colorId);
    document.documentElement.setAttribute('data-primary', colorId);
    localStorage.setItem('primary-color', colorId);
    setIsOpen(false);
  };

  const currentTheme = colorThemes.find(theme => theme.id === currentColor);

  if (!mounted) return null;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-2)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change primary color"
      >
        <div 
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: currentTheme?.color }}
        />
        <span className="text-sm hidden sm:inline" style={{ color: 'var(--text-body)' }}>
          {currentTheme?.name}
        </span>
        <FiChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-muted)' }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl z-50 overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="p-2">
                <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2" 
                   style={{ color: 'var(--text-muted)' }}>
                  Choose Color
                </p>
                {colorThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleColorChange(theme.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group"
                    style={{
                      color: currentColor === theme.id ? 'var(--primary)' : 'var(--text-body)',
                      backgroundColor: currentColor === theme.id ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (currentColor !== theme.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentColor !== theme.id) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <div 
                      className="w-5 h-5 rounded-full shadow-sm"
                      style={{ backgroundColor: theme.color }}
                    />
                    <span className="flex-1 text-left text-sm font-medium">
                      {theme.name}
                    </span>
                    {currentColor === theme.id && (
                      <FiCheck className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}