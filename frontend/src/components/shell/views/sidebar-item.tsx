"use client";

import Link from "next/link";
import type { ToolMeta } from "@/registry/tools";

type SidebarItemProps = {
  tool: ToolMeta;
  active: boolean;
  onNavigate: () => void;
};

export function SidebarItem({ tool, active, onNavigate }: SidebarItemProps) {
  const isSoon = "soon" in tool && tool.soon;
  const className = `block w-full text-left px-4 py-[5px] border-none font-inherit text-[12px] border-l-2 transition-all duration-100 ${
    active
      ? "bg-accent-dim text-accent border-accent"
      : isSoon
        ? "bg-transparent text-muted2 border-transparent cursor-default opacity-50"
        : "bg-transparent text-muted2 border-transparent cursor-pointer hover:bg-white/[0.03] hover:text-text"
  }`;
  const content = (
    <>
      {tool.name}
      {isSoon && <span className="text-[8px] ml-1.5 opacity-60">soon</span>}
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
