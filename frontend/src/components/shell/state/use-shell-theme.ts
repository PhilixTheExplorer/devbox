"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { ACCENT_DIM_OPACITY, ACCENT_PRESETS } from "@/config/theme-presets";

export type DevboxTheme = "light" | "dark";

const ACCENT_STORAGE_KEY = "devbox:accent";

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
  const { resolvedTheme, setTheme } = useTheme();
  const [accentIdx, setAccentIdx] = useState(readStoredAccentIdx);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (resolvedTheme as DevboxTheme) : "light";

  useEffect(() => {
    if (!mounted) return;

    const preset = ACCENT_PRESETS[accentIdx];
    const color = currentTheme === "dark" ? preset.dark : preset.light;
    document.documentElement.style.setProperty("--accent", color);

    const dimOpacity = ACCENT_DIM_OPACITY[currentTheme];
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    document.documentElement.style.setProperty(
      "--accent-dim",
      `rgba(${r},${g},${b},${dimOpacity})`,
    );
    try {
      window.localStorage.setItem(ACCENT_STORAGE_KEY, String(accentIdx));
    } catch {
      // Ignore storage failures; the live theme can still be applied.
    }
  }, [accentIdx, currentTheme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }, [currentTheme, setTheme]);

  return {
    theme: currentTheme,
    setTheme,
    accentIdx,
    setAccentIdx,
    toggleTheme,
    mounted,
  };
}
