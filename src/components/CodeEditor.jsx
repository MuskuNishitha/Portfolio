// components/CodeEditor.jsx
'use client';

export default function CodeEditor({ code, setCode, isDarkMode }) {
  const bgEditor = isDarkMode ? 'bg-bg-2' : 'bg-gray-100';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-border' : 'border-gray-200';

  return (
    <div className="space-y-3">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className={`w-full h-[400px] p-4 ${bgEditor} ${textPrimary} border ${borderColor} rounded-xl outline-none focus:border-primary transition-colors font-mono text-sm resize-none`}
      />
      <p className={`text-xs ${isDarkMode ? 'text-text-muted' : 'text-gray-500'} mt-2`}>
        Tip: Paste any JavaScript, Python, or Java code for AI-powered optimization
      </p>
    </div>
  );
}