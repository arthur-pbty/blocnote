"use client";

import { useState, useEffect } from "react";
import { Theme } from "../types";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("blocnote-theme") as Theme | null;
    if (saved) {
      // Reading persisted theme must happen on client after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("blocnote-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return { theme, toggleTheme };
}
