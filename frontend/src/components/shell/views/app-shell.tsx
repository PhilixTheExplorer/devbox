"use client";

import { useShellStore } from "@/components/shell/state/shell-store";
import { DevboxSidebar } from "./sidebar";
import { DevboxStatusBar } from "./status-bar";
import { DevboxTopbar } from "./topbar";
import { TweaksPanel } from "./tweaks-panel";

type DevboxShellProps = {
  children: React.ReactNode;
};

export function DevboxShell({ children }: DevboxShellProps) {
  const mobileSidebarOpen = useShellStore((state) => state.mobileSidebarOpen);
  const closeMobileSidebar = useShellStore((state) => state.closeMobileSidebar);
  const tweaks = useShellStore((state) => state.tweaks);

  return (
    <div className="flex h-screen overflow-hidden">
      <DevboxSidebar />

      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="close navigation menu"
          onClick={closeMobileSidebar}
          className="fixed inset-0 layer-mobile-overlay border-none bg-overlay cursor-pointer lg:hidden"
        />
      )}

      <div className="relative layer-content flex-1 flex flex-col overflow-hidden min-w-0">
        <DevboxTopbar />

        <main className="flex-1 overflow-auto">{children}</main>

        <DevboxStatusBar />
      </div>

      {tweaks && <TweaksPanel />}
    </div>
  );
}
