"use client";

import { useMemo, useState } from "react";
import { CopyBtn } from "@/components/ui/copy-button";
import { searchMimeTypes } from "@/lib/tools/mime-type";

export default function MimeTypeTool() {
  const [query, setQuery] = useState("json");
  const entries = useMemo(() => searchMimeTypes(query), [query]);

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            mime type lookup
          </h1>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder=".json, image, application..."
            className="min-h-status-bar-compact w-full rounded-sm border border-border bg-bg px-2.5 py-1 text-ui-xs text-text focus:border-accent focus:outline-none md:w-80"
          />
        </header>

        <div className="overflow-hidden rounded-sm border border-border">
          {entries.map((entry) => (
            <div
              key={`${entry.extension}-${entry.mime}`}
              className="grid gap-2 border-b border-border px-3 py-2 text-xs last:border-b-0 md:grid-cols-[6rem_1fr_8rem_auto]"
            >
              <code className="text-accent">{entry.extension}</code>
              <span>{entry.mime}</span>
              <span className="text-muted">{entry.category}</span>
              <CopyBtn text={entry.mime} />
            </div>
          ))}
        </div>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{entries.length} results</span>
          <span>{query.trim() || "all types"}</span>
        </footer>
      </div>
    </div>
  );
}
