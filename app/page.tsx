"use client";

import { useEffect } from "react";
import { useNotes } from "./hooks/useNotes";
import { useTheme } from "./hooks/useTheme";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { Sun, Moon, FileText } from "lucide-react";

export default function Home() {
  const {
    notes,
    activeNote,
    activeNoteId,
    searchQuery,
    sortMode,
    loaded,
    setActiveNoteId,
    setSearchQuery,
    setSortMode,
    createNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
    togglePin,
    exportNote,
  } = useNotes();

  const { theme, toggleTheme } = useTheme();

  // Ctrl+N shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        createNote();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [createNote]);

  if (!loaded) {
    return (
      <div className="loading-screen" role="status" aria-label="Chargement de l'application">
        <div className="loading-spinner" aria-hidden="true" />
        <span className="sr-only">Chargement en cours...</span>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar
        notes={notes}
        activeNoteId={activeNoteId}
        searchQuery={searchQuery}
        sortMode={sortMode}
        onSelectNote={setActiveNoteId}
        onCreateNote={createNote}
        onDeleteNote={deleteNote}
        onTogglePin={togglePin}
        onSearchChange={setSearchQuery}
        onSortChange={setSortMode}
        onDeleteAll={deleteAllNotes}
        onExportNote={exportNote}
      />

      <main id="main-content" className="main-content" role="main" aria-label="Éditeur de notes">
        <div className="theme-toggle-wrapper">
          <button
            className="btn-theme"
            onClick={toggleTheme}
            title="Changer de thème"
            aria-label={theme === "light" ? "Passer au mode sombre" : "Passer au mode clair"}
          >
            {theme === "light" ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          </button>
        </div>

        {activeNote ? (
          <Editor key={activeNote.id} note={activeNote} onUpdateNote={updateNote} />
        ) : (
          <div className="empty-editor">
            <FileText size={64} strokeWidth={1} />
            <h2>BlocNote</h2>
            <p>Sélectionnez une note ou créez-en une nouvelle</p>
            <button className="btn-primary" onClick={createNote}>
              Nouvelle note
            </button>
            <span className="shortcut-hint">
              ou <kbd>Ctrl</kbd> + <kbd>N</kbd>
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
