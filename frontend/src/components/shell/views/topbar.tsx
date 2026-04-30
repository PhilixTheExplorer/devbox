"use client";

import Link from "next/link";
import { TuneIcon } from "@/components/icons";
import { useShellSidebar } from "@/components/shell/contexts/sidebar-context";
import { useShellThemeContext } from "@/components/shell/contexts/theme-context";
import { useShellTweaks } from "@/components/shell/contexts/tweaks-context";
import { SupportLinks } from "@/components/support-link";

export function DevboxTopbar() {
  const { mobileSidebarOpen, toggleMobileSidebar } = useShellSidebar();
  const { theme, toggleTheme, mounted } = useShellThemeContext();
  const { tweaks, toggleTweaks } = useShellTweaks();

  const menuLabel = mobileSidebarOpen ? "close navigation" : "open navigation";
  const themeLabel =
    theme === "dark" ? "switch to light theme" : "switch to dark theme";

  return (
    <header className="flex items-center border-b border-border shrink-0 bg-surface h-10 gap-2 px-2.5 lg:gap-2.5 lg:px-4">
      <button
        type="button"
        aria-label={menuLabel}
        title={menuLabel}
        onClick={toggleMobileSidebar}
        className={`bg-transparent border rounded-sm cursor-pointer font-[inherit] text-[13px] w-[30px] h-[24px] p-0 shrink-0 hidden max-lg:inline-flex items-center justify-center transition-colors duration-100 ${
          mobileSidebarOpen
            ? "border-accent text-accent"
            : "border-border text-muted hover:border-accent hover:text-accent"
        }`}
      >
        {mobileSidebarOpen ? "x" : "☰"}
      </button>

      <Link
        href="/"
        className="text-[11px] text-muted whitespace-nowrap overflow-hidden text-ellipsis flex-1 lg:flex-initial"
      >
        <span className="text-accent">[</span>devbox
        <span className="text-accent">]</span>
      </Link>

      <div className="ml-auto flex items-center gap-1.5 lg:gap-2">
        <SupportLinks variant="topbar" />
        <button
          type="button"
          aria-label="toggle tweaks panel"
          title="toggle tweaks panel"
          onClick={toggleTweaks}
          className={`bg-transparent border rounded-sm cursor-pointer font-[inherit] inline-flex items-center justify-center transition-colors duration-100 ${
            tweaks
              ? "border-accent text-accent"
              : "border-border text-muted hover:border-accent hover:text-accent"
          } text-[13px] p-0 w-[30px] h-[24px] lg:text-[10px] lg:px-[9px] lg:py-[3px] lg:w-auto lg:leading-none lg:gap-1`}
        >
          <TuneIcon size={11} />
          <span className="hidden lg:inline">tweaks</span>
        </button>
        {mounted ? (
          <button
            type="button"
            aria-label={themeLabel}
            title={themeLabel}
            onClick={toggleTheme}
            className="bg-transparent border border-border rounded-sm cursor-pointer font-[inherit] text-muted inline-flex items-center justify-center transition-colors duration-100 hover:border-accent hover:text-accent text-[13px] p-0 w-[30px] h-[24px] lg:text-[10px] lg:px-[9px] lg:py-[3px] lg:w-auto lg:leading-none lg:gap-1"
          >
            <span>{theme === "dark" ? "☀" : "☾"}</span>
            <span className="hidden lg:inline">
              {theme === "dark" ? "light" : "dark"}
            </span>
          </button>
        ) : (
          <div className="w-[30px] h-[24px] lg:w-[48px] border border-border rounded-sm bg-transparent" />
        )}
      </div>
    </header>
  );
}
