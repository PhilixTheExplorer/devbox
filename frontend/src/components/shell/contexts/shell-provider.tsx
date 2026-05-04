"use client";

import { ShellSidebarProvider } from "./sidebar-context";
import { ShellThemeProvider } from "./theme-context";
import { ShellTweaksProvider } from "./tweaks-context";

export function DevboxShellProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShellSidebarProvider>
      <ShellThemeProvider>
        <ShellTweaksProvider>{children}</ShellTweaksProvider>
      </ShellThemeProvider>
    </ShellSidebarProvider>
  );
}
