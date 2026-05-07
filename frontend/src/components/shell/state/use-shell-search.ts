"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TOOLS } from "@/tools";

type UseShellSearchOptions = {
  openMobileSidebar: () => void;
};

export function useShellSearch({ openMobileSidebar }: UseShellSearchOptions) {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        openMobileSidebar();
        requestAnimationFrame(() => searchRef.current?.focus());
      }

      if (
        event.key === "Escape" &&
        document.activeElement === searchRef.current
      ) {
        setSearch("");
        searchRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [openMobileSidebar]);

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

  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  return {
    search,
    setSearch,
    clearSearch,
    searchRef,
    filteredTools,
  };
}
