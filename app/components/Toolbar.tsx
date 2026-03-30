"use client";

import { RefObject } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Minus,
} from "lucide-react";

interface ToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onContentChange: (content: string) => void;
}

type FormatAction = {
  icon: React.ReactNode;
  label: string;
  prefix: string;
  suffix: string;
  block?: boolean;
  defaultText?: string;
};

const FORMAT_ACTIONS: FormatAction[] = [
  { icon: <Bold size={16} />, label: "Gras", prefix: "**", suffix: "**", defaultText: "texte en gras" },
  { icon: <Italic size={16} />, label: "Italique", prefix: "*", suffix: "*", defaultText: "texte en italique" },
  { icon: <Strikethrough size={16} />, label: "Barré", prefix: "~~", suffix: "~~", defaultText: "texte barré" },
  { icon: <Heading size={16} />, label: "Titre", prefix: "## ", suffix: "", block: true, defaultText: "Titre" },
  { icon: <List size={16} />, label: "Liste à puces", prefix: "- ", suffix: "", block: true, defaultText: "Élément" },
  { icon: <ListOrdered size={16} />, label: "Liste numérotée", prefix: "1. ", suffix: "", block: true, defaultText: "Élément" },
  { icon: <Quote size={16} />, label: "Citation", prefix: "> ", suffix: "", block: true, defaultText: "Citation" },
  { icon: <Code size={16} />, label: "Bloc de code", prefix: "```\n", suffix: "\n```", defaultText: "code" },
  { icon: <Link size={16} />, label: "Lien", prefix: "[", suffix: "](url)", defaultText: "texte du lien" },
  { icon: <Minus size={16} />, label: "Ligne horizontale", prefix: "\n---\n", suffix: "", defaultText: "" },
];

export default function Toolbar({ textareaRef, onContentChange }: ToolbarProps) {
  const applyFormat = (action: FormatAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const hasSelection = selected.length > 0;

    let insertText: string;
    let cursorPos: number;

    if (action.defaultText === "" && !hasSelection) {
      // For horizontal rule, just insert without placeholder
      insertText = action.prefix;
      cursorPos = start + action.prefix.length;
    } else if (hasSelection) {
      if (action.block) {
        // For block elements, check if we need a newline before
        const needsNewline = start > 0 && text[start - 1] !== "\n";
        const nl = needsNewline ? "\n" : "";
        insertText = nl + action.prefix + selected + action.suffix;
        cursorPos = start + nl.length + action.prefix.length + selected.length + action.suffix.length;
      } else {
        insertText = action.prefix + selected + action.suffix;
        cursorPos = start + action.prefix.length + selected.length + action.suffix.length;
      }
    } else {
      const placeholder = action.defaultText || "";
      if (action.block) {
        const needsNewline = start > 0 && text[start - 1] !== "\n";
        const nl = needsNewline ? "\n" : "";
        insertText = nl + action.prefix + placeholder + action.suffix;
        cursorPos = start + nl.length + action.prefix.length;
      } else {
        insertText = action.prefix + placeholder + action.suffix;
        cursorPos = start + action.prefix.length;
      }
    }

    const newText = text.substring(0, start) + insertText + text.substring(end);
    onContentChange(newText);

    // Restore focus and cursor position
    requestAnimationFrame(() => {
      textarea.focus();
      if (hasSelection || action.defaultText === "") {
        textarea.setSelectionRange(cursorPos, cursorPos);
      } else {
        const selectStart = cursorPos;
        const selectEnd = cursorPos + (action.defaultText?.length || 0);
        textarea.setSelectionRange(selectStart, selectEnd);
      }
    });
  };

  return (
    <div className="toolbar" role="toolbar" aria-label="Barre d'outils de mise en forme Markdown">
      {FORMAT_ACTIONS.map((action) => (
        <button
          key={action.label}
          className="toolbar-btn"
          onClick={() => applyFormat(action)}
          title={action.label}
          type="button"
        >
          {action.icon}
        </button>
      ))}
    </div>
  );
}
