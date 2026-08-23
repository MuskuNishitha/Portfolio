'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import CodeEditor from '@/components/CodeEditor';
import OptimizedOutput from '@/components/OptimizedOutput';
import { apiClient, unwrapApiData } from '@/utils/api';

export default function DevBoostAI() {
  const { isDarkMode } = useTheme();
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const handleOptimize = async () => {
    if (!code) return;
    setLoading(true);

    try {
      const res = await apiClient.post("/api/v1/optimize/optimize", {
        code,
      });
      const data = unwrapApiData(res.data);
      setResult(data);
      setLimitReached(false);
    } catch (err) {
      if (err.response?.data?.isLimitReached) {
        setLimitReached(true);
        setResult(null);
      } else {
        console.error(err);
      }
    }

    setLoading(false);
  };

  // Theme-based styles matching AboutUs page
  const bgColor = isDarkMode ? 'bg-bg-2' : 'bg-gray-50';
  const cardBg = isDarkMode ? 'from-bg-card to-bg-3' : 'from-white to-gray-100';
  const borderColor = isDarkMode ? 'border-border' : 'border-gray-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-text-body' : 'text-gray-700';
  const textMuted = isDarkMode ? 'text-text-muted' : 'text-gray-500';

  return (
    <section 
      id="devboost-ai" 
      className={`py-[60px] sm:py-[80px] md:py-[100px] ${bgColor} relative overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10`}
    >
      {/* Animated Background */}
      <div
        className={`absolute inset-0 ${isDarkMode
          ? 'bg-[linear-gradient(rgba(135,80,247,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(135,80,247,0.04)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]'
          } bg-[length:40px_40px] sm:bg-[length:60px_60px]`}
      />
      <div
        className={`absolute top-[-20%] right-[-10%] w-[300px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[500px] md:h-[700px] ${isDarkMode
          ? 'bg-[radial-gradient(circle,rgba(135,80,247,0.1)_0%,transparent_70%)]'
          : 'bg-[radial-gradient(circle,rgba(135,80,247,0.05)_0%,transparent_70%)]'
          } rounded-full animate-float`}
      />
      <div
        className={`absolute bottom-[-20%] left-[-10%] w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] ${isDarkMode
          ? 'bg-[radial-gradient(circle,rgba(135,80,247,0.08)_0%,transparent_70%)]'
          : 'bg-[radial-gradient(circle,rgba(135,80,247,0.03)_0%,transparent_70%)]'
          } rounded-full animate-float [animation-delay:2s]`}
      />

      <div className="relative z-10 container-custom max-w-7xl mx-auto">
        {/* Heading Section */}
        <motion.div
          className="text-center mb-8 sm:mb-[40px] md:mb-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4"
            style={{
              backgroundColor: isDarkMode ? 'rgba(135,80,247,0.2)' : 'rgba(135,80,247,0.1)',
              color: isDarkMode ? '#a78bfa' : '#7c3aed'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AI Tool
          </motion.span>
          <motion.h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${textPrimary} mb-3 sm:mb-4`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            🚀 DevBoost AI
          </motion.h1>
          <motion.div
            className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full"
            style={{
              background: `linear-gradient(to right, #8750f7, #6c3bd8)`
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.p
            className={`${textSecondary} mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Optimize your code with AI for better performance & readability
          </motion.p>
        </motion.div>

        {/* Limit Reached Alert */}
        {limitReached && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2.5 sm:py-3 px-4 rounded-lg mb-4 sm:mb-6 font-semibold text-sm sm:text-base"
          >
            🚫 Daily limit reached. Please try again tomorrow.
          </motion.div>
        )}

        {/* Optimize Button */}
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOptimize}
            disabled={loading || limitReached}
            className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-lg transition-all duration-300 text-sm sm:text-base ${
              loading || limitReached
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:shadow-primary/25 hover:shadow-2xl'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Optimizing...
              </span>
            ) : (
              'Optimize Code'
            )}
          </motion.button>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-[50px]">
          {/* Code Editor Section - Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <div
              className={`bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-4 sm:p-5 md:p-6 h-full transition-all duration-300 hover:border-primary/50`}
            >
              <h3 className={`text-base sm:text-lg md:text-xl font-bold ${textPrimary} mb-3 sm:mb-4 md:mb-5 flex items-center gap-2`}>
                <span className="text-primary-3">✏️</span> Your Code
              </h3>
              <div className="w-full min-w-0 overflow-hidden">
                <CodeEditor code={code} setCode={setCode} isDarkMode={isDarkMode} />
              </div>
            </div>
          </motion.div>

          {/* Optimized Output Section - Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <div
              className={`bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-4 sm:p-5 md:p-6 h-full transition-all duration-300 hover:border-primary/50`}
            >
              <h3 className={`text-base sm:text-lg md:text-xl font-bold ${textPrimary} mb-3 sm:mb-4 md:mb-5 flex items-center gap-2`}>
                <span className="text-primary-3">⚡</span> Optimized Code
              </h3>
              <div className="w-full min-w-0 overflow-hidden">
                <OptimizedOutput result={result} loading={loading} isDarkMode={isDarkMode} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}