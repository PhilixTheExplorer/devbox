"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useShellSidebar } from "@/components/shell/contexts/sidebar-context";
import { TOOL_CATEGORIES, TOOLS } from "@/tools";

const SIDEBAR_CATEGORIES = TOOL_CATEGORIES.map((category) => ({
  id: category,
  label: category,
  tools: TOOLS.filter((tool) => tool.category === category),
}));

export function useSidebarModel() {
  const segment = useSelectedLayoutSegment();
  const sidebar = useShellSidebar();

  const finishNavigation = () => {
    sidebar.clearSearch();
    sidebar.closeMobileSidebar();
  };

  return {
    activeAbout: segment === "about",
    activeToolId: segment && segment !== "about" ? segment : null,
    mobileOpen: sidebar.mobileSidebarOpen,
    search: {
      value: sidebar.search,
      ref: sidebar.searchRef,
      results: sidebar.filteredTools,
      setValue: sidebar.setSearch,
    },
    categories: SIDEBAR_CATEGORIES,
    actions: {
      closeMobile: sidebar.closeMobileSidebar,
      finishNavigation,
    },
  };
}
