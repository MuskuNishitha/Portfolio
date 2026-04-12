'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const colors = [
  { id: 'blue', color: '#3b82f6' },
  { id: 'green', color: '#10b981' },
  { id: 'purple', color: '#8b5cf6' },
  { id: 'red', color: '#ef4444' },
  { id: 'orange', color: '#f59e0b' },
  { id: 'pink', color: '#ec489a' },
];

export default function PremiumColorPicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('purple');

  useEffect(() => {
    const saved = localStorage.getItem('primary-color');
    if (saved) {
      setActive(saved);
      document.documentElement.setAttribute('data-primary', saved);
    }
  }, []);

  const changeColor = (id) => {
    setActive(id);
    document.documentElement.setAttribute('data-primary', id);
    localStorage.setItem('primary-color', id);
  };

  return (
    <div className="relative">

      {/* FLOATING BUTTON */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full text-white"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #ec489a)',
          boxShadow: '0 10px 30px rgba(139,92,246,0.6)',
        }}
      >
        <span>🎨</span>
      </motion.button>

      {/* BACKDROP */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpen(false)}
            />

            {/* MODAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 40 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="fixed z-50 inset-0 flex items-center justify-center"
            >
              <div
                className="p-6 rounded-3xl w-72"
                style={{
                  background: 'rgba(20,20,30,0.85)',
                  backdropFilter: 'blur(25px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                }}
              >
                {/* TITLE */}
                <h3 className="text-white text-center mb-6 tracking-widest text-sm opacity-70">
                  CHOOSE COLOR
                </h3>

                {/* GRID */}
                <div className="grid grid-cols-4 gap-5 justify-items-center">
                  {colors.map((item, i) => (
                    <motion.div
                      key={item.id}
                      onClick={() => changeColor(item.id)}
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative cursor-pointer"
                    >
                      {/* GLOW RING */}
                      {active === item.id && (
                        <motion.div
                          layoutId="activeRing"
                          className="absolute -inset-2 rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${item.color}55, transparent)`,
                          }}
                        />
                      )}

                      {/* OUTER BORDER */}
                      {active === item.id && (
                        <motion.div
                          layoutId="borderRing"
                          className="absolute -inset-1 rounded-full border-2 border-white"
                        />
                      )}

                      {/* COLOR DOT */}
                      <motion.div
                        className="w-10 h-10 rounded-full"
                        style={{
                          background: item.color,
                          boxShadow:
                            active === item.id
                              ? `0 0 20px ${item.color}, 0 0 40px ${item.color}66`
                              : '0 5px 15px rgba(0,0,0,0.5)',
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* FOOTER */}
                <p className="text-center text-xs text-gray-400 mt-6">
                  Customize your theme
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}