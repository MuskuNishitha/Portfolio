// components/OptimizedOutput.jsx
'use client';

import { motion } from 'framer-motion';

export default function OptimizedOutput({ result, loading, isDarkMode }) {
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-text-body' : 'text-gray-700';
  const textMuted = isDarkMode ? 'text-text-muted' : 'text-gray-500';
  const bgEditor = isDarkMode ? 'bg-bg-2' : 'bg-gray-100';
  const borderColor = isDarkMode ? 'border-border' : 'border-gray-200';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className={`${textSecondary} animate-pulse`}>AI is analyzing your code...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={`flex flex-col items-center justify-center h-[400px] ${bgEditor} rounded-xl border ${borderColor} text-center p-6`}>
        <div className="text-6xl mb-4">✨</div>
        <h4 className={`text-lg font-semibold ${textPrimary} mb-2`}>Ready to Optimize</h4>
        <p className={`text-sm ${textMuted} max-w-xs`}>
          Paste your code in the editor and click Optimize Code to get AI-powered improvements
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Optimized Code */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={`text-sm font-medium ${textPrimary}`}>✨ Optimized Code</label>
          <button
            onClick={() => navigator.clipboard.writeText(result.optimizedCode)}
            className={`text-xs ${textMuted} hover:text-primary transition-colors`}
          >
            Copy
          </button>
        </div>
        <pre className={`${bgEditor} border ${borderColor} rounded-xl p-4 overflow-auto max-h-[250px] text-sm font-mono ${textSecondary}`}>
          <code>{result.optimizedCode}</code>
        </pre>
      </div>

      {/* Explanation / Improvements */}
      {result.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`${bgEditor} border ${borderColor} rounded-xl p-4`}
        >
          <h4 className={`text-sm font-semibold ${textPrimary} mb-2 flex items-center gap-2`}>
            <span>📈</span> Improvements & Explanation
          </h4>
          <p className={`text-sm ${textSecondary} leading-relaxed`}>{result.explanation}</p>
        </motion.div>
      )}

      {/* Performance Metrics (if available) */}
      {result.metrics && (
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(result.metrics).map(([key, value]) => (
            <div key={key} className={`${bgEditor} rounded-xl p-3 text-center border ${borderColor}`}>
              <p className={`text-xs ${textMuted} uppercase`}>{key}</p>
              <p className={`text-lg font-bold text-primary-3`}>{String(value)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}