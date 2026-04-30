"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { ACCENT_PRESETS } from "@/config/theme-presets";

export type DevboxTheme = "light" | "dark";

export function useShellTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [accentIdx, setAccentIdx] = useState(0);
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

    const dimOpacity = currentTheme === "dark" ? 0.1 : 0.08;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    document.documentElement.style.setProperty(
      "--accent-dim",
      `rgba(${r},${g},${b},${dimOpacity})`,
    );
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
