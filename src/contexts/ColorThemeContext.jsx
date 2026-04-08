// contexts/ColorThemeContext.jsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ColorThemeContext = createContext()

const colorThemes = {
  purple: {
    name: 'Purple',
    primary: '#8750f7',
    primary2: '#6c3fd4',
    primary3: '#a97bff',
    secondary: '#2a1454',
    rgb: '135, 80, 247'
  },
  blue: {
    name: 'Blue',
    primary: '#3b82f6',
    primary2: '#2563eb',
    primary3: '#60a5fa',
    secondary: '#1e3a8a',
    rgb: '59, 130, 246'
  },
  pink: {
    name: 'Pink',
    primary: '#ec489a',
    primary2: '#db2777',
    primary3: '#f472b6',
    secondary: '#831843',
    rgb: '236, 72, 153'
  },
  green: {
    name: 'Green',
    primary: '#10b981',
    primary2: '#059669',
    primary3: '#34d399',
    secondary: '#064e3b',
    rgb: '16, 185, 129'
  },
  orange: {
    name: 'Orange',
    primary: '#f97316',
    primary2: '#ea580c',
    primary3: '#fb923c',
    secondary: '#7c2d12',
    rgb: '249, 115, 22'
  },
  cyan: {
    name: 'Cyan',
    primary: '#06b6d4',
    primary2: '#0891b2',
    primary3: '#22d3ee',
    secondary: '#155e75',
    rgb: '6, 182, 212'
  },
  red: {
    name: 'Red',
    primary: '#ef4444',
    primary2: '#dc2626',
    primary3: '#f87171',
    secondary: '#991b1b',
    rgb: '239, 68, 68'
  },
  indigo: {
    name: 'Indigo',
    primary: '#6366f1',
    primary2: '#4f46e5',
    primary3: '#818cf8',
    secondary: '#3730a3',
    rgb: '99, 102, 241'
  }
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext)
  if (!context) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider')
  }
  return context
}

export default function ColorThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('purple')
  const [mounted, setMounted] = useState(false)

  const applyTheme = (themeName) => {
    const theme = colorThemes[themeName]
    if (!theme) return

    const root = document.documentElement
    
    // Apply CSS custom properties
    root.style.setProperty('--primary', theme.primary)
    root.style.setProperty('--primary-2', theme.primary2)
    root.style.setProperty('--primary-3', theme.primary3)
    root.style.setProperty('--secondary', theme.secondary)
    root.style.setProperty('--primary-rgb', theme.rgb)
    
    // Also update the meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.primary)
    }
  }

  const changeColorTheme = (themeName) => {
    if (colorThemes[themeName]) {
      setCurrentTheme(themeName)
      applyTheme(themeName)
      localStorage.setItem('colorTheme', themeName)
    }
  }

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('colorTheme')
    if (savedTheme && colorThemes[savedTheme]) {
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme('purple')
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ColorThemeContext.Provider value={{
      currentTheme,
      changeColorTheme,
      colorThemes,
      colors: colorThemes[currentTheme]
    }}>
      {children}
    </ColorThemeContext.Provider>
  )
}