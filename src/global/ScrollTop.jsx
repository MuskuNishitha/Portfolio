'use client'

import { useState, useEffect } from 'react'



export default function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`fixed bottom-7 right-7 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl cursor-pointer transition-all z-[999] border-none shadow-[0_4px_20px_rgba(135,80,247,0.5)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
      } hover:bg-primary-2 hover:-translate-y-1`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  )
}