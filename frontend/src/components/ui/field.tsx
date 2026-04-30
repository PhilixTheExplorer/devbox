"use client";

import type { ReactNode } from "react";
import { CopyBtn } from "./copy-button";

interface TagProps {
  children: ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="text-[10px] text-muted border border-border rounded-sm px-1.5 py-[1px] tracking-[0.5px]">
      {children}
    </span>
  );
}

interface SectionLabelProps {
  children: ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="text-[10px] text-muted tracking-[1.5px] uppercase mb-[6px]">
      {children}
    </div>
  );
}

interface KVProps {
  label: string;
  value: string | number;
  copyable?: boolean;
}

export function KV({ label, value, copyable = true }: KVProps) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-[7px] border-b border-border">
      <span className="text-muted min-w-[80px] text-[11px] shrink-0">
        {label}
      </span>
      <code className="flex-1 text-[12px] break-all">{value}</code>
      {copyable && <CopyBtn text={value} />}
    </div>
  );
}
