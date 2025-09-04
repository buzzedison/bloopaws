'use client';

import { useState } from 'react';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeSnippet({ code, language = 'typescript', title }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Basic syntax highlighting colors for TypeScript/React
  const highlightCode = (code: string) => {
    return code
      // Keywords
      .replace(/\b(const|let|var|function|async|await|return|if|else|for|while|try|catch|finally|throw|import|export|from|default)\b/g, '<span class="text-blue-400">$1</span>')
      // Types and classes
      .replace(/\b(String|Number|Boolean|Object|Array|Promise|useState|useEffect|useCallback)\b/g, '<span class="text-yellow-400">$1</span>')
      // Strings
      .replace(/(["'`])((?:\\.|(?!\1)[^\\\n])*)(\1)/g, '<span class="text-green-400">$1$2$3</span>')
      // Comments
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
      // Function calls
      .replace(/(\w+)\s*\(/g, '<span class="text-purple-400">$1</span>(')
      // Object properties
      .replace(/\.(\w+)/g, '.<span class="text-cyan-400">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>');
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 my-4 shadow-lg">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Code editor dots */}
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {title && (
            <span className="text-gray-300 text-sm font-medium ml-2">{title}</span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Language badge */}
          <span className="text-gray-400 text-xs uppercase tracking-wide bg-gray-700 px-2 py-1 rounded">
            {language}
          </span>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={`text-xs px-3 py-1 rounded transition-all duration-200 ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            title="Copy code"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="relative">
        <pre className="p-4 text-sm overflow-x-auto bg-gray-900 leading-relaxed">
          <code
            className="language-typescript font-mono text-gray-100"
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          />
        </pre>

        {/* Line numbers (optional) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 text-xs text-gray-500 font-mono">
          {code.split('\n').map((_, index) => (
            <div key={index} className="leading-relaxed h-5 flex items-center">
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
