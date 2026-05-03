"use client";

import { useMemo, useState } from "react";
import { Btn } from "@/components/ui/button";
import { CopyBtn } from "@/components/ui/copy-button";
import { convertColor } from "@/lib/tools/color-converter";

const sampleInput = "#2a7a50";

export default function ColorConverterTool() {
  const [input, setInput] = useState(sampleInput);
  const result = useMemo(() => convertColor(input), [input]);
  const rows = [
    ["hex", result.hex],
    ["rgb", result.rgb],
    ["hsl", result.hsl],
    ["css", result.css],
  ];

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-readable flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            color converter
          </h1>
          <div className="flex flex-wrap items-center gap-2">
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

        <section className="grid gap-4 md:grid-cols-[12rem_1fr]">
          <div
            className="min-h-48 rounded-sm border border-border"
            style={{
              background: result.error ? "transparent" : result.preview,
            }}
          />
          <div className="flex min-w-0 flex-col gap-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="#2a7a50, rgb(42,122,80), hsl(149 49% 32%)"
              className="w-full rounded-sm border border-border bg-bg px-3 py-2.5 font-inherit text-ui text-text focus:border-accent focus:outline-none"
            />

            <div className="overflow-hidden rounded-sm border border-border">
              {rows.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 border-b border-border px-3 py-2 text-xs last:border-b-0 sm:grid-cols-[5rem_1fr_auto]"
                >
                  <span className="text-muted">{label}</span>
                  <code className="break-all">{value || "empty"}</code>
                  <CopyBtn text={value} disabled={!value} />
                </div>
              ))}
            </div>

            {result.error && (
              <div className="rounded-sm border border-red px-3 py-2 text-xs text-red">
                {result.error}
              </div>
            )}
          </div>
        </section>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{result.error ? "invalid color" : "ready"}</span>
          <span>{result.hex || "no hex"}</span>
        </footer>
      </div>
    </div>
  );
}
