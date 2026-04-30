"use client";

import { createContext, useContext } from "react";
import { useShellTheme } from "@/components/shell/state/use-shell-theme";

type ShellThemeContextType = ReturnType<typeof useShellTheme>;

const ShellThemeContext = createContext<ShellThemeContextType | null>(null);

export function ShellThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeState = useShellTheme();

  return (
    <ShellThemeContext.Provider value={themeState}>
      {children}
    </ShellThemeContext.Provider>
  );
}

export function useShellThemeContext() {
  const context = useContext(ShellThemeContext);
  if (!context) {
    throw new Error(
      "useShellThemeContext must be used within ShellThemeProvider",
    );
  }

  return context;
}
