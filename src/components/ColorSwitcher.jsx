// components/ColorSwitcher.jsx - FIXED VERSION
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { FiPalette, FiCheck } from 'react-icons/fi'

export default function ColorSwitcher() {
  const { currentColorTheme, changeColorTheme, isDarkMode, colorThemes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.color-switcher-container')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative color-switcher-container">
      {/* Color Switcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          isDarkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-gray-100 border border-gray-200"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change color theme"
      >
        <div 
          className="w-4 h-4 lg:w-5 lg:h-5 rounded-full"
          style={{ backgroundColor: `var(--primary)` }}
        />
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && colorThemes && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl overflow-hidden z-50 ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
            style={{
              border: `1px solid var(--border-2)`
            }}
          >
            {/* Header */}
            <div className={`p-4 border-b ${
              isDarkMode ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-2">
                <FiPalette className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                <span className={`text-sm font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Color Theme
                </span>
              </div>
              <p className={`text-xs mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Choose your preferred color
              </p>
            </div>

            {/* Color Options Grid */}
            <div className="p-4 max-h-[380px] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(colorThemes).map(([name, theme]) => (
                  <motion.button
                    key={name}
                    onClick={() => {
                      changeColorTheme(name)
                      setTimeout(() => setIsOpen(false), 200)
                    }}
                    className="relative flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className={`w-12 h-12 rounded-full shadow-md transition-all duration-300 ${
                        currentColorTheme === name ? 'ring-2 ring-offset-2 scale-110' : 'group-hover:scale-105'
                      }`}
                      style={{ 
                        backgroundColor: theme.primary,
                        ringColor: currentColorTheme === name ? theme.primary : undefined
                      }}
                    />
                    <span className={`text-xs capitalize transition-colors ${
                      currentColorTheme === name 
                        ? 'font-semibold' 
                        : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                    style={{ 
                      color: currentColorTheme === name ? 'var(--primary)' : undefined 
                    }}>
                      {name}
                    </span>
                    {currentColorTheme === name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        <FiCheck className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Preview Section */}
            <div className={`p-4 border-t ${
              isDarkMode ? 'border-gray-800 bg-gray-800/30' : 'border-gray-200 bg-gray-50'
            }`}>
              <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Live Preview
              </p>
              <div className="flex gap-2">
                <button 
                  className="flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all hover:shadow-md text-white"
                  style={{
                    backgroundColor: 'var(--primary)'
                  }}
                >
                  Primary Button
                </button>
                <div 
                  className="flex-1 px-3 py-2 text-xs font-medium rounded-lg text-center"
                  style={{
                    backgroundColor: `rgba(var(--primary-rgb), 0.1)`,
                    color: 'var(--primary)'
                  }}
                >
                  Accent Color
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}