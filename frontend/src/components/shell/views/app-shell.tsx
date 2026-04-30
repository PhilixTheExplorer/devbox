"use client";

import { useShellSidebar } from "@/components/shell/contexts/sidebar-context";
import { useShellTweaks } from "@/components/shell/contexts/tweaks-context";
import { DevboxSidebar } from "./sidebar";
import { DevboxStatusBar } from "./status-bar";
import { DevboxTopbar } from "./topbar";
import { TweaksPanel } from "./tweaks-panel";

type DevboxShellProps = {
  children: React.ReactNode;
};

export function DevboxShell({ children }: DevboxShellProps) {
  const { mobileSidebarOpen, closeMobileSidebar } = useShellSidebar();
  const { tweaks } = useShellTweaks();

  return (
    <div className="flex h-screen overflow-hidden">
      <DevboxSidebar />

      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="close navigation menu"
          onClick={closeMobileSidebar}
          className="fixed inset-0 border-none bg-black/45 z-[60] cursor-pointer lg:hidden"
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <DevboxTopbar />

        <main className="flex-1 overflow-auto">{children}</main>

        <DevboxStatusBar />
      </div>

      {tweaks && <TweaksPanel />}
    </div>
  );
}
