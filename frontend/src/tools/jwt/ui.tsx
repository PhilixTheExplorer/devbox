"use client";

import { useMemo, useState } from "react";
import { Btn, CopyBtn, SectionLabel, ToolTextarea } from "@/components/ui";
import { decodeJwt } from "./logic";

const sampleInput =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiZGV2Ym94IiwiaWF0IjoxNzE0NTI5NjAwfQ.signature";

function prettyJson(value: unknown) {
  return value ? JSON.stringify(value, null, 2) : "";
}

export default function JwtTool() {
  const [input, setInput] = useState(sampleInput);
  const result = useMemo(() => decodeJwt(input), [input]);
  const header = prettyJson(result.header);
  const payload = prettyJson(result.payload);
  const signature = input.trim().split(".")[2] ?? "";

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            jwt decoder
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

        <section className="grid gap-4 xl:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)]">
          <div className="min-w-0">
            <SectionLabel>token</SectionLabel>
            <ToolTextarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="header.payload.signature"
              rows={9}
              className="min-h-44 resize-y break-all text-xs xl:h-72"
            />
          </div>

          <div className="grid min-w-0 gap-3 md:grid-cols-2">
            <JwtPanel label="header" value={header} />
            <JwtPanel label="payload" value={payload} />
            <div className="min-w-0 md:col-span-2">
              <div className="mb-1.5 flex min-h-status-bar-compact items-center justify-between gap-3">
                <SectionLabel>signature</SectionLabel>
                <CopyBtn text={signature} disabled={!signature} />
              </div>
              <code className="block min-h-12 overflow-auto rounded-sm border border-border bg-surface px-3 py-2 text-xs break-all text-muted2">
                {signature || "empty"}
              </code>
            </div>
          </div>
        </section>

        {result.error && (
          <div className="rounded-sm border border-red bg-bg px-3 py-2 text-xs text-red">
            {result.error}
          </div>
        )}

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{input.trim().split(".").filter(Boolean).length} segments</span>
          <span>{header ? "header decoded" : "no header"}</span>
          <span>{payload ? "payload decoded" : "no payload"}</span>
          <span>{signature ? "signature present" : "no signature"}</span>
        </footer>
      </div>
    </div>
  );
}

function JwtPanel({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="mb-1.5 flex min-h-status-bar-compact items-center justify-between gap-3">
        <SectionLabel>{label}</SectionLabel>
        <CopyBtn text={value} disabled={!value} />
      </div>
      <pre className="m-0 h-56 overflow-auto rounded-sm border border-border bg-bg px-3 py-2.5 font-inherit text-xs leading-relaxed text-text">
        {value || "empty"}
      </pre>
    </div>
  );
}
