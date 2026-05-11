"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useShellStore } from "@/components/shell/state/shell-store";
import { TOOL_CATEGORIES, TOOLS } from "@/tools";

const SIDEBAR_CATEGORIES = TOOL_CATEGORIES.map((category) => ({
  id: category,
  label: category,
  tools: TOOLS.filter((tool) => tool.category === category),
}));

export function useSidebarModel() {
  const segment = useSelectedLayoutSegment();
  const mobileSidebarOpen = useShellStore((state) => state.mobileSidebarOpen);
  const closeMobileSidebar = useShellStore((state) => state.closeMobileSidebar);
  const search = useShellStore((state) => state.search);
  const setSearch = useShellStore((state) => state.setSearch);
  const clearSearch = useShellStore((state) => state.clearSearch);
  const setSearchInput = useShellStore((state) => state.setSearchInput);

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return [];
    }

    return TOOLS.filter(
      (tool) =>
        tool.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query),
    );
  }, [search]);

  const finishNavigation = () => {
    clearSearch();
    closeMobileSidebar();
  };

  const searchRef = useCallback(
    (input: HTMLInputElement | null) => {
      setSearchInput(input);
    },
    [setSearchInput],
  );

  return {
    activeAbout: segment === "about",
    activeToolId: segment && segment !== "about" ? segment : null,
    mobileOpen: mobileSidebarOpen,
    search: {
      value: search,
      ref: searchRef,
      results: filteredTools,
      setValue: setSearch,
    },
    categories: SIDEBAR_CATEGORIES,
    actions: {
      closeMobile: closeMobileSidebar,
      finishNavigation,
    },
  };
}
