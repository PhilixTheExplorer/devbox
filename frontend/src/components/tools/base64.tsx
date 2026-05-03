"use client";

import { type ReactNode, useMemo, useState } from "react";
import { ToolSegmentedControl } from "@/components/tool-kit/tool-controls";
import { Btn, CopyBtn, ToolTextarea } from "@/components/ui";
import { type Base64Mode, transformBase64 } from "@/lib/tools/base64";

const sampleInput = "devbox keeps clipboard-shaped secrets local";

export default function Base64Tool() {
  const [input, setInput] = useState(sampleInput);
  const [mode, setMode] = useState<Base64Mode>("encode");
  const result = useMemo(() => transformBase64(input, mode), [input, mode]);

  const useOutputAsInput = () => {
    if (!result.output) {
      return;
    }

    setInput(result.output);
    setMode(mode === "encode" ? "decode" : "encode");
  };

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            base64
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <ToolSegmentedControl
              value={mode}
              options={[
                { value: "encode", label: "encode" },
                { value: "decode", label: "decode" },
              ]}
              onChange={setMode}
            />
            <Btn
              size="sm"
              variant="ghost"
              onClick={() => setInput(sampleInput)}
            >
              sample
            </Btn>
            <Btn
              size="sm"
              variant="danger"
              onClick={() => setInput("")}
              disabled={!input}
            >
              clear
            </Btn>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0">
            <PaneHeader label={mode === "encode" ? "plain text" : "base64"} />
            <ToolTextarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                mode === "encode" ? "text to encode" : "base64 to decode"
              }
              rows={16}
              className="h-64 min-h-64 resize-y text-xs lg:h-[30rem]"
            />
          </div>

          <div className="flex items-center justify-start lg:min-h-[32rem] lg:justify-center">
            <Btn
              size="sm"
              variant="default"
              onClick={useOutputAsInput}
              disabled={!result.output}
            >
              swap
            </Btn>
          </div>

          <div className="min-w-0">
            <PaneHeader label={mode === "encode" ? "base64" : "plain text"}>
              <CopyBtn text={result.output} disabled={!result.output} />
            </PaneHeader>
            <pre
              className={`m-0 h-64 min-h-64 overflow-auto rounded-sm border px-3 py-2.5 font-inherit text-xs leading-relaxed lg:h-[30rem] ${
                result.error
                  ? "border-red bg-bg text-red"
                  : "border-border bg-bg text-text"
              }`}
            >
              {result.error || result.output}
            </pre>
          </div>
        </section>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{mode}</span>
          <span>{input.length} input chars</span>
          <span>{result.output.length} output chars</span>
          <span>{result.error ? "invalid input" : "ready"}</span>
        </footer>
      </div>
    </div>
  );
}

function PaneHeader({
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
