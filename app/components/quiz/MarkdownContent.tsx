'use client';

import CodeSnippet from './CodeSnippet';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Simple markdown parser for code blocks
  const parseContent = (text: string) => {
    const parts = text.split(/```(\w+)?\n?([\s\S]*?)```/g);

    return parts.map((part, index) => {
      // If this is a code block (odd indices after split)
      if (index % 3 === 2) {
        const language = parts[index - 1] || 'typescript';
        const code = part.trim();
        return (
          <CodeSnippet
            key={index}
            code={code}
            language={language}
          />
        );
      }

      // If this is language specifier, skip it
      if (index % 3 === 1) {
        return null;
      }

      // Regular text - convert line breaks to paragraphs
      if (part.trim()) {
        return part.split('\n\n').map((paragraph, pIndex) => {
          if (paragraph.trim()) {
            // Handle bold text
            const formattedParagraph = paragraph
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>');

            return (
              <p
                key={`${index}-${pIndex}`}
                className="mb-3 text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formattedParagraph }}
              />
            );
          }
          return null;
        });
      }

      return null;
    }).filter(Boolean);
  };

  return (
    <div className="text-gray-700">
      {parseContent(content)}
    </div>
  );
}
