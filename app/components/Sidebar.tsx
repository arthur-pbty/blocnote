"use client";

import { useState } from "react";
import { Note, SortMode } from "../types";
import {
  Plus,
  Search,
  Pin,
  Trash2,
  ArrowDownAZ,
  Clock,
  Trash,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - ts;
  if (diff < 60000) return "À l'instant";
  if (diff < 3600000) return `il y a ${Math.floor(diff / 60000)} min`;
  if (diff < 86400000) return `il y a ${Math.floor(diff / 3600000)}h`;
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  searchQuery: string;
  sortMode: SortMode;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string) => void;
  onTogglePin: (id: string) => void;
  onSearchChange: (q: string) => void;
  onSortChange: (mode: SortMode) => void;
  onDeleteAll: () => void;
  onExportNote: (id: string) => void;
}

export default function Sidebar({
  notes,
  activeNoteId,
  searchQuery,
  sortMode,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
  onTogglePin,
  onSearchChange,
  onSortChange,
  onDeleteAll,
  onExportNote,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (collapsed) {
    return (
      <div className="sidebar sidebar-collapsed">
        <button
          className="btn-icon"
          onClick={() => setCollapsed(false)}
          title="Ouvrir le panneau"
        >
          <PanelLeftOpen size={20} />
        </button>
        <button className="btn-icon btn-new-note" onClick={onCreateNote} title="Nouvelle note">
          <Plus size={20} />
        </button>
      </div>
    );
  }

  return (
    <aside className="sidebar" role="navigation" aria-label="Liste des notes">
      <div className="sidebar-header">
        <div className="sidebar-title-row">
          <h1 className="sidebar-title">
            <FileText size={22} />
            BlocNote
          </h1>
          <button
            className="btn-icon"
            onClick={() => setCollapsed(true)}
            title="Réduire le panneau"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <div className="search-bar" role="search">
          <Search size={16} className="search-icon" aria-hidden="true" />
          <input
            type="search"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
            aria-label="Rechercher dans les notes"
          />
        </div>

        <div className="sidebar-actions">
          <button className="btn-primary" onClick={onCreateNote}>
            <Plus size={16} />
            Nouvelle note
          </button>
          <div className="sort-buttons">
            <button
              className={`btn-sort ${sortMode === "date" ? "active" : ""}`}
              onClick={() => onSortChange("date")}
              title="Trier par date"
            >
              <Clock size={14} />
            </button>
            <button
              className={`btn-sort ${sortMode === "alpha" ? "active" : ""}`}
              onClick={() => onSortChange("alpha")}
              title="Trier par ordre alphabétique"
            >
              <ArrowDownAZ size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="notes-list" role="list" aria-label="Notes">
        {notes.length === 0 && (
          <div className="empty-state">
            {searchQuery ? "Aucun résultat" : "Aucune note"}
          </div>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${activeNoteId === note.id ? "active" : ""}`}
            onClick={() => onSelectNote(note.id)}
            onMouseEnter={() => setHoveredId(note.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="note-item-content">
              <div className="note-item-title">
                {note.pinned && <Pin size={12} className="pin-indicator" />}
                <span>{note.title || "Sans titre"}</span>
              </div>
              <div className="note-item-preview">
                {note.content.slice(0, 60).replace(/[#*_~`>-]/g, "") || "Note vide..."}
              </div>
              <div className="note-item-date">{formatDate(note.updatedAt)}</div>
            </div>
            {hoveredId === note.id && (
              <div className="note-item-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className={`btn-icon-sm ${note.pinned ? "pinned" : ""}`}
                  onClick={() => onTogglePin(note.id)}
                  title={note.pinned ? "Désépingler" : "Épingler"}
                >
                  <Pin size={13} />
                </button>
                <button
                  className="btn-icon-sm"
                  onClick={() => onExportNote(note.id)}
                  title="Exporter en .txt"
                >
                  <FileText size={13} />
                </button>
                <button
                  className="btn-icon-sm btn-danger"
                  onClick={() => onDeleteNote(note.id)}
                  title="Supprimer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {notes.length > 0 && (
        <div className="sidebar-footer">
          {!confirmDeleteAll ? (
            <button
              className="btn-delete-all"
              onClick={() => setConfirmDeleteAll(true)}
            >
              <Trash size={14} />
              Tout supprimer
            </button>
          ) : (
            <div className="confirm-delete-all">
              <span>Supprimer toutes les notes ?</span>
              <button className="btn-confirm-yes" onClick={() => { onDeleteAll(); setConfirmDeleteAll(false); }}>
                Oui
              </button>
              <button className="btn-confirm-no" onClick={() => setConfirmDeleteAll(false)}>
                Non
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
