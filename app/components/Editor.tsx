"use client";

import { useRef, useState } from "react";
import { Note } from "../types";
import Toolbar from "./Toolbar";
import MarkdownPreview from "./MarkdownPreview";
import { Pencil, Eye, Columns2 } from "lucide-react";

type ViewMode = "edit" | "preview" | "split";

interface EditorProps {
  note: Note;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
}

export default function Editor({ note, onUpdateNote }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onUpdateNote(note.id, { title: newTitle });
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onUpdateNote(note.id, { content: newContent });
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <input
          type="text"
          className="editor-title-input"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Titre de la note..."
        />
        <div className="view-mode-buttons">
          <button
            className={`btn-view ${viewMode === "edit" ? "active" : ""}`}
            onClick={() => setViewMode("edit")}
            title="Éditeur seul"
          >
            <Pencil size={16} />
          </button>
          <button
            className={`btn-view ${viewMode === "split" ? "active" : ""}`}
            onClick={() => setViewMode("split")}
            title="Vue partagée"
          >
            <Columns2 size={16} />
          </button>
          <button
            className={`btn-view ${viewMode === "preview" ? "active" : ""}`}
            onClick={() => setViewMode("preview")}
            title="Aperçu seul"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {(viewMode === "edit" || viewMode === "split") && (
        <Toolbar textareaRef={textareaRef} onContentChange={handleContentChange} />
      )}

      <div className={`editor-body ${viewMode}`}>
        {(viewMode === "edit" || viewMode === "split") && (
          <div className="editor-pane">
            <label htmlFor="note-editor" className="sr-only">Contenu de la note en Markdown</label>
            <textarea
              id="note-editor"
              ref={textareaRef}
              className="editor-textarea"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Écrivez en Markdown..."
              spellCheck={false}
              aria-label="Contenu de la note"
            />
          </div>
        )}
        {(viewMode === "preview" || viewMode === "split") && (
          <div className="preview-pane" role="region" aria-label="Aperçu Markdown" aria-live="polite">
            <MarkdownPreview content={content} />
          </div>
        )}
      </div>
    </div>
  );
}
