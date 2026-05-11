"use client";

import { create } from "zustand";
import type { DevboxTheme } from "./theme-storage";

type ShellState = {
  mobileSidebarOpen: boolean;
  search: string;
  searchInput: HTMLInputElement | null;
  theme: DevboxTheme;
  accentIdx: number;
  mounted: boolean;
  tweaks: boolean;
  toggleMobileSidebar: () => void;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  setSearch: (search: string) => void;
  clearSearch: () => void;
  setSearchInput: (input: HTMLInputElement | null) => void;
  setTheme: (theme: DevboxTheme) => void;
  setAccentIdx: (accentIdx: number) => void;
  toggleTheme: () => void;
  setMounted: (mounted: boolean) => void;
  setTweaks: (tweaks: boolean) => void;
  toggleTweaks: () => void;
  closeTweaks: () => void;
};

export const useShellStore = create<ShellState>((set) => ({
  mobileSidebarOpen: false,
  search: "",
  searchInput: null,
  theme: "dark",
  accentIdx: 0,
  mounted: false,
  tweaks: false,
  toggleMobileSidebar: () =>
    set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
  openMobileSidebar: () => set({ mobileSidebarOpen: true }),
  closeMobileSidebar: () => set({ mobileSidebarOpen: false }),
  setSearch: (search) => set({ search }),
  clearSearch: () => set({ search: "" }),
  setSearchInput: (searchInput) => set({ searchInput }),
  setTheme: (theme) => set({ theme }),
  setAccentIdx: (accentIdx) => set({ accentIdx }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark",
    })),
  setMounted: (mounted) => set({ mounted }),
  setTweaks: (tweaks) => set({ tweaks }),
  toggleTweaks: () => set((state) => ({ tweaks: !state.tweaks })),
  closeTweaks: () => set({ tweaks: false }),
}));
