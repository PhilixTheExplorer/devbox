"use client";

import { ThemeProvider } from "next-themes";
import { ShellSidebarProvider } from "./sidebar-context";
import { ShellThemeProvider } from "./theme-context";
import { ShellTweaksProvider } from "./tweaks-context";

export function DevboxShellProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <ShellSidebarProvider>
        <ShellThemeProvider>
          <ShellTweaksProvider>{children}</ShellTweaksProvider>
        </ShellThemeProvider>
      </ShellSidebarProvider>
    </ThemeProvider>
  );
}
