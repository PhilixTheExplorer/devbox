"use client";

import Link from "next/link";
import type { ToolMeta } from "@/tools";

type SidebarItemProps = {
  tool: ToolMeta;
  active: boolean;
  onNavigate: () => void;
};

export function SidebarItem({ tool, active, onNavigate }: SidebarItemProps) {
  const isSoon = "soon" in tool && tool.soon;
  const className = `block w-full text-left px-4 py-1.5 border-none font-inherit text-xs border-l-2 transition-all duration-100 ${
    active
      ? "bg-accent-dim text-accent border-accent"
      : isSoon
        ? "bg-transparent text-muted2 border-transparent cursor-default opacity-50"
        : "bg-transparent text-muted2 border-transparent cursor-pointer hover:bg-hover-subtle hover:text-text"
  }`;
  const content = (
    <>
      {tool.name}
      {isSoon && <span className="text-3xs ml-1.5 opacity-60">soon</span>}
    </>
  );

  if (isSoon) {
    return (
      <button type="button" disabled={true} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link
      href={`/${tool.id}`}
      onClick={onNavigate}
      className={`${className} no-underline`}
    >
      {content}
    </Link>
  );
}
