"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ACCENT_DIM_OPACITY, ACCENT_PRESETS } from "@/config/theme-presets";
import { postToSameOriginParent } from "./shell-messages";
import { useShellStore } from "./shell-store";
import {
  readStoredAccentIdx,
  readStoredTheme,
  writeStoredTheme,
} from "./theme-storage";

export function DevboxShellEffects() {
  const pathname = usePathname();
  const theme = useShellStore((state) => state.theme);
  const accentIdx = useShellStore((state) => state.accentIdx);
  const mounted = useShellStore((state) => state.mounted);

  useEffect(() => {
    useShellStore.setState({
      accentIdx: readStoredAccentIdx(),
      mounted: true,
      theme: readStoredTheme(),
    });
  }, []);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    useShellStore.getState().closeMobileSidebar();
  }, [pathname]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { searchInput } = useShellStore.getState();

      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        if (window.matchMedia("(max-width: 1023px)").matches) {
          useShellStore.getState().openMobileSidebar();
        }
        requestAnimationFrame(() => searchInput?.focus());
      }

      if (event.key === "Escape" && document.activeElement === searchInput) {
        useShellStore.getState().clearSearch();
        searchInput?.blur();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<{ type?: string }>) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data?.type === "__activate_edit_mode") {
        useShellStore.getState().setTweaks(true);
      }
      if (event.data?.type === "__deactivate_edit_mode") {
        useShellStore.getState().setTweaks(false);
      }
    };

    window.addEventListener("message", handleMessage);
    postToSameOriginParent({ type: "__edit_mode_available" });
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

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
    writeStoredTheme(theme, accentIdx);
  }, [accentIdx, mounted, theme]);

  return null;
}
