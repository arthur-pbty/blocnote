"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Note, SortMode } from "../types";

const STORAGE_KEY = "blocnote-notes";
const AUTOSAVE_INTERVAL = 2000;

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("date");
  const [loaded, setLoaded] = useState(false);
  const notesRef = useRef(notes);

  // Keep ref in sync
  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadNotes();
    // This hydration step must run after mount to avoid server/client mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotes(loaded);
    if (loaded.length > 0) {
      setActiveNoteId(loaded[0].id);
    }
    setLoaded(true);
  }, []);

  // Autosave every 2 seconds
  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
      saveNotes(notesRef.current);
    }, AUTOSAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [loaded]);

  // Also save on notes change (debounced via ref + interval above)
  useEffect(() => {
    if (loaded) {
      saveNotes(notes);
    }
  }, [notes, loaded]);

  const createNote = useCallback(() => {
    const now = Date.now();
    const newNote: Note = {
      id: generateId(),
      title: "Nouvelle note",
      content: "",
      createdAt: now,
      updatedAt: now,
      pinned: false,
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: Date.now() }
          : note
      )
    );
  }, []);

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => {
        const filtered = prev.filter((n) => n.id !== id);
        if (activeNoteId === id) {
          setActiveNoteId(filtered.length > 0 ? filtered[0].id : null);
        }
        return filtered;
      });
    },
    [activeNoteId]
  );

  const deleteAllNotes = useCallback(() => {
    setNotes([]);
    setActiveNoteId(null);
  }, []);

  const togglePin = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned, updatedAt: Date.now() } : note
      )
    );
  }, []);

  const exportNote = useCallback(
    (id: string) => {
      const note = notes.find((n) => n.id === id);
      if (!note) return;
      const blob = new Blob([note.content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${note.title.replace(/[^a-zA-Z0-9À-ÿ\s-_]/g, "")}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    },
    [notes]
  );

  const activeNote = notes.find((n) => n.id === activeNoteId) ?? null;

  // Filter & sort
  const filteredNotes = notes
    .filter((note) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      // Pinned first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      // Then sort
      if (sortMode === "date") return b.updatedAt - a.updatedAt;
      return a.title.localeCompare(b.title, "fr");
    });

  return {
    notes: filteredNotes,
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
  };
}
