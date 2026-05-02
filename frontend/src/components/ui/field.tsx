"use client";

import type { ReactNode } from "react";
import { CopyBtn } from "./copy-button";

interface TagProps {
  children: ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="text-2xs text-muted border border-border rounded-sm px-1.5 py-0.5 tracking-wide">
      {children}
    </span>
  );
}

interface SectionLabelProps {
  children: ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="text-2xs text-muted tracking-widest uppercase mb-1.5">
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
    <div className="flex items-center gap-2.5 px-3 py-2 border-b border-border">
      <span className="text-muted min-w-20 text-ui-xs shrink-0">{label}</span>
      <code className="flex-1 text-xs break-all">{value}</code>
      {copyable && <CopyBtn text={value} />}
    </div>
  );
}
