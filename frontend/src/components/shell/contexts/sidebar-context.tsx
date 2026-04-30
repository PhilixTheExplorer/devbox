"use client";

import { createContext, useContext } from "react";
import { useShellSearch } from "@/components/shell/state/use-shell-search";
import { useSidebarState } from "@/components/shell/state/use-sidebar-state";

type ShellSidebarContextType = ReturnType<typeof useSidebarState> &
  ReturnType<typeof useShellSearch>;

const ShellSidebarContext = createContext<ShellSidebarContextType | null>(null);

export function ShellSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarState = useSidebarState();
  const searchState = useShellSearch({
    openMobileSidebar: sidebarState.openMobileSidebar,
  });

  return (
    <ShellSidebarContext.Provider value={{ ...sidebarState, ...searchState }}>
      {children}
    </ShellSidebarContext.Provider>
  );
}

export function useShellSidebar() {
  const context = useContext(ShellSidebarContext);
  if (!context) {
    throw new Error("useShellSidebar must be used within ShellSidebarProvider");
  }

  return context;
}
