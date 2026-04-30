"use client";

import Link from "next/link";
import { useSidebarModel } from "@/components/shell/state/use-sidebar-model";
import { OSS_LINKS } from "@/config/site";
import { SidebarItem } from "./sidebar-item";

export function DevboxSidebar() {
  const { activeAbout, activeToolId, mobileOpen, search, categories, actions } =
    useSidebarModel();

  return (
    <aside
      className={`relative w-[216px] shrink-0 flex flex-col border-r border-border bg-surface overflow-hidden max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-[min(86vw,300px)] max-lg:z-[70] max-lg:shadow-[10px_0_38px_rgba(0,0,0,0.35)] max-lg:transition-transform max-lg:duration-200 max-lg:ease-in-out ${
        mobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-[108%]"
      }`}
    >
      <header className="px-4 pt-[13px] pb-[11px] border-b border-border shrink-0 flex items-center justify-between">
        <Link
          href="/"
          onClick={actions.finishNavigation}
          className="bg-none border-none cursor-pointer p-0 font-inherit text-[14px] font-bold text-text no-underline"
        >
          <span className="text-accent">[</span>devbox
          <span className="text-accent">]</span>
        </Link>

        <button
          type="button"
          aria-label="close navigation"
          onClick={actions.closeMobile}
          className="hidden max-lg:inline-flex bg-none border border-border rounded-sm text-muted text-[12px] leading-none px-2 py-[5px] cursor-pointer"
        >
          close
        </button>
      </header>

      <div className="px-2.5 py-2 border-b border-border shrink-0">
        <input
          ref={search.ref}
          value={search.value}
          onChange={(e) => search.setValue(e.target.value)}
          placeholder="⌘K  search tools"
          className="w-full px-[9px] py-[5px] rounded-sm text-[12px] bg-bg text-text border border-border font-inherit placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>

      <nav className="flex-1 overflow-auto py-1.5">
        {search.value.trim() ? (
          search.results.length ? (
            search.results.map((tool) => (
              <SidebarItem
                key={tool.id}
                tool={tool}
                active={activeToolId === tool.id}
                onNavigate={actions.finishNavigation}
              />
            ))
          ) : (
            <div className="px-4 py-2.5 text-muted text-[11px]">no matches</div>
          )
        ) : (
          categories.map((category) => (
            <div key={category.id}>
              <div className="px-4 pt-2 pb-[3px] text-[9px] text-muted tracking-[2px] uppercase">
                {category.label}
              </div>
              {category.tools.map((tool) => (
                <SidebarItem
                  key={tool.id}
                  tool={tool}
                  active={activeToolId === tool.id}
                  onNavigate={actions.finishNavigation}
                />
              ))}
            </div>
          ))
        )}
      </nav>

      <footer className="border-t border-border shrink-0">
        <Link
          href="/about"
          onClick={actions.finishNavigation}
          className={`block w-full text-left px-4 py-[7px] border-none border-l-2 cursor-pointer font-inherit text-[12px] hover:bg-white/[0.03] transition-colors duration-100 no-underline ${
            activeAbout
              ? "bg-accent-dim text-accent border-accent hover:bg-accent-dim"
              : "bg-transparent text-muted border-transparent hover:text-text"
          }`}
        >
          about
        </Link>
        <a
          href={OSS_LINKS.repo}
          target="_blank"
          rel="noreferrer"
          onClick={actions.finishNavigation}
          className="block w-full text-left px-4 py-[7px] border-none border-l-2 cursor-pointer font-inherit text-[12px] hover:bg-white/[0.03] transition-colors duration-100 no-underline bg-transparent text-muted border-transparent hover:text-text"
        >
          github ↗
        </a>
      </footer>
    </aside>
  );
}
