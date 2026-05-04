"use client";

import { useCallback, useEffect, useState } from "react";
import { ACCENT_DIM_OPACITY, ACCENT_PRESETS } from "@/config/theme-presets";

export type DevboxTheme = "light" | "dark";

const ACCENT_STORAGE_KEY = "devbox:accent";
const THEME_STORAGE_KEY = "devbox:theme";

function isDevboxTheme(value: string | null): value is DevboxTheme {
  return value === "light" || value === "dark";
}

function readStoredTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isDevboxTheme(stored)) {
      return stored;
    }
  } catch {
    return "dark";
  }

  return "dark";
}

function readStoredAccentIdx() {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const stored = Number(window.localStorage.getItem(ACCENT_STORAGE_KEY));
    if (!Number.isInteger(stored)) {
      return 0;
    }

    return Math.min(ACCENT_PRESETS.length - 1, Math.max(0, stored));
  } catch {
    return 0;
  }
}

export function useShellTheme() {
  const [theme, setTheme] = useState<DevboxTheme>(readStoredTheme);
  const [accentIdx, setAccentIdx] = useState(readStoredAccentIdx);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const preset = ACCENT_PRESETS[accentIdx];
    const color = theme === "dark" ? preset.dark : preset.light;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty("--accent", color);

    const dimOpacity = ACCENT_DIM_OPACITY[theme];
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    document.documentElement.style.setProperty(
      "--accent-dim",
      `rgba(${r},${g},${b},${dimOpacity})`,
    );
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      window.localStorage.setItem(ACCENT_STORAGE_KEY, String(accentIdx));
    } catch {
      // Ignore storage failures; the live theme can still be applied.
    }
  }, [accentIdx, mounted, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }, []);

  return {
    theme,
    setTheme,
    accentIdx,
    setAccentIdx,
    toggleTheme,
    mounted,
  };
}
