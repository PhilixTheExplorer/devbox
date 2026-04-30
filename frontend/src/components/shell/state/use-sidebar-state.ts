"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useSidebarState() {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    setMobileSidebarOpen(false);
  }, [pathname]);

  const toggleMobileSidebar = useCallback(
    () => setMobileSidebarOpen((value) => !value),
    [],
  );
  const openMobileSidebar = useCallback(() => setMobileSidebarOpen(true), []);
  const closeMobileSidebar = useCallback(() => setMobileSidebarOpen(false), []);

  return {
    mobileSidebarOpen,
    toggleMobileSidebar,
    openMobileSidebar,
    closeMobileSidebar,
  };
}
