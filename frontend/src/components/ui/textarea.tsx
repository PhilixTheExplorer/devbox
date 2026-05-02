"use client";

import type { ChangeEvent, CSSProperties } from "react";

interface ToolTextareaProps {
  value: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function ToolTextarea({
  value,
  onChange,
  placeholder,
  rows = 14,
  readOnly,
  style,
  className = "",
}: ToolTextareaProps) {
  return (
    <textarea
      className={`w-full px-3 py-2.5 rounded-sm resize-y leading-relaxed bg-bg text-text border border-border focus:border-accent focus:outline-none font-inherit ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      readOnly={readOnly}
      style={style}
    />
  );
}
