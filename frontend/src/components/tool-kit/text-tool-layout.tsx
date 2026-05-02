"use client";

import type { ReactNode } from "react";
import { CopyBtn } from "@/components/ui/copy-button";
import { ToolTextarea } from "@/components/ui/textarea";

type TextToolLayoutProps = {
  title: string;
  input: string;
  output: string;
  error?: string | null;
  placeholder?: string;
  controls?: ReactNode;
  footer?: ReactNode;
  outputView?: ReactNode;
  onInputChange?: (value: string) => void;
  inputReadOnly?: boolean;
  inputVisible?: boolean;
};

export function TextToolLayout({
  title,
  input,
  output,
  error = null,
  placeholder,
  controls,
  footer,
  outputView,
  onInputChange,
  inputReadOnly = false,
  inputVisible = true,
}: TextToolLayoutProps) {
  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="m-0 text-2xl font-normal leading-tight text-text">
              {title}
            </h1>
          </div>

          {controls && (
            <div className="flex flex-wrap items-center gap-2">{controls}</div>
          )}
        </header>

        <section className="grid gap-4 lg:grid-cols-2">
          {inputVisible && (
            <div className="min-w-0">
              <ToolPaneHeader label="input" />
              <ToolTextarea
                value={input}
                onChange={(event) => onInputChange?.(event.target.value)}
                placeholder={placeholder}
                rows={20}
                readOnly={inputReadOnly}
                className="h-tool-editor min-h-tool-editor resize-none text-xs lg:h-tool-editor-lg lg:min-h-tool-editor-lg"
              />
            </div>
          )}

          <div className={inputVisible ? "min-w-0" : "min-w-0 lg:col-span-2"}>
            <ToolPaneHeader label="output">
              <CopyBtn text={output} disabled={!output} />
            </ToolPaneHeader>
            {outputView ?? (
              <pre
                className={`m-0 h-tool-editor min-h-tool-editor overflow-auto rounded-sm border px-3 py-2.5 font-inherit text-xs leading-relaxed lg:h-tool-editor-lg lg:min-h-tool-editor-lg ${
                  error
                    ? "border-red text-red bg-bg"
                    : "border-border text-text bg-bg"
                }`}
              >
                {error || output}
              </pre>
            )}
          </div>
        </section>

        {footer && (
          <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

function ToolPaneHeader({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-1.5 flex min-h-status-bar-compact items-center justify-between gap-3">
      <div className="text-2xs text-muted tracking-widest uppercase">
        {label}
      </div>
      {children}
    </div>
  );
}
