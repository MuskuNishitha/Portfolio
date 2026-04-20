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
    <section id="devboost-ai" className={`py-[100px] ${bgColor} relative overflow-hidden px-6 md:px-10`}>
      {/* Animated Background */}
      <div
        className={`absolute inset-0 ${isDarkMode
          ? 'bg-[linear-gradient(rgba(135,80,247,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(135,80,247,0.04)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]'
          } bg-[length:60px_60px]`}
      />
      <div
        className={`absolute top-[-20%] right-[-10%] w-[700px] h-[700px] ${isDarkMode
          ? 'bg-[radial-gradient(circle,rgba(135,80,247,0.1)_0%,transparent_70%)]'
          : 'bg-[radial-gradient(circle,rgba(135,80,247,0.05)_0%,transparent_70%)]'
          } rounded-full animate-float`}
      />
      <div
        className={`absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] ${isDarkMode
          ? 'bg-[radial-gradient(circle,rgba(135,80,247,0.08)_0%,transparent_70%)]'
          : 'bg-[radial-gradient(circle,rgba(135,80,247,0.03)_0%,transparent_70%)]'
          } rounded-full animate-float [animation-delay:2s]`}
      />

      <div className="relative z-10 container-custom">
        {/* Heading Section */}
        <motion.div
          className="text-center mb-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AI Tool
          </motion.span>
          <motion.h1
            className={`section-title ${textPrimary}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            🚀 DevBoost AI
          </motion.h1>
          <motion.div
            className="section-divider section-divider-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.p
            className={`${textSecondary} mt-4 max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Optimize your code with AI for better performance & readability
          </motion.p>
        </motion.div>
{limitReached && (
  <div className="text-center bg-red-100 text-red-600 py-2 px-4 rounded-lg mb-4 font-semibold">
    🚫 Daily limit reached. Please try again tomorrow.
  </div>
)}
        {/* Button at the top between both sections */}
        <motion.div
          className="flex justify-center mb-8"
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
           className={`px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-lg transition-all duration-300 ${
  loading || limitReached
    ? 'opacity-70 cursor-not-allowed'
    : 'hover:shadow-primary/25'
}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
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
        <div className="grid lg:grid-cols-2 gap-[50px]">
          {/* Code Editor Section - Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/50`}
            >
              <h3 className={`text-lg font-bold ${textPrimary} mb-5 flex items-center gap-2`}>
                <span className="text-primary-3">✏️</span> Your Code
              </h3>
              <CodeEditor code={code} setCode={setCode} isDarkMode={isDarkMode} />
            </div>
          </motion.div>

          {/* Optimized Output Section - Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/50`}
            >
              <h3 className={`text-lg font-bold ${textPrimary} mb-5 flex items-center gap-2`}>
                <span className="text-primary-3">⚡</span> Optimized Code
              </h3>
              <OptimizedOutput result={result} loading={loading} isDarkMode={isDarkMode} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}