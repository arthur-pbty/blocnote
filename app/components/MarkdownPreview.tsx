"use client";

import { useMemo } from "react";
import { marked } from "marked";

interface MarkdownPreviewProps {
  content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const html = useMemo(() => {
    if (!content) return '<p class="preview-empty">Commencez à écrire pour voir l\'aperçu...</p>';
    try {
      return marked.parse(content, { breaks: true, gfm: true }) as string;
    } catch {
      return content;
    }
  }, [content]);

  return (
    <div
      className="markdown-preview prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
