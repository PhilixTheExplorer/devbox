"use client";

import { ACCENT_PRESETS } from "@/config/theme-presets";

export type DevboxTheme = "light" | "dark";

const ACCENT_STORAGE_KEY = "devbox:accent";
const THEME_STORAGE_KEY = "devbox:theme";

function isDevboxTheme(value: string | null): value is DevboxTheme {
  return value === "light" || value === "dark";
}

export function readStoredTheme() {
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

export function readStoredAccentIdx() {
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

export function writeStoredTheme(theme: DevboxTheme, accentIdx: number) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    window.localStorage.setItem(ACCENT_STORAGE_KEY, String(accentIdx));
  } catch {
    // Ignore storage failures; the live theme can still be applied.
  }
}
