"use client";

import { type ReactNode, useMemo, useState } from "react";
import { ToolSegmentedControl } from "@/components/tool-kit/tool-controls";
import { CopyBtn } from "@/components/ui/copy-button";
import { searchHttpStatuses } from "./logic";

type Category = "all" | "1xx" | "2xx" | "3xx" | "4xx" | "5xx";

export default function HttpStatusTool() {
  const [query, setQuery] = useState("404");
  const [category, setCategory] = useState<Category>("all");
  const statuses = useMemo(
    () => searchHttpStatuses(query, category),
    [query, category],
  );

  return (
    <LookupShell title="http status codes">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="404, rate, server..."
          className="min-h-status-bar-compact w-64 rounded-sm border border-border bg-bg px-2.5 py-1 text-ui-xs text-text focus:border-accent focus:outline-none"
        />
        <ToolSegmentedControl
          value={category}
          options={[
            { value: "all", label: "all" },
            { value: "2xx", label: "2xx" },
            { value: "3xx", label: "3xx" },
            { value: "4xx", label: "4xx" },
            { value: "5xx", label: "5xx" },
          ]}
          onChange={setCategory}
        />
      </div>

      <div className="overflow-hidden rounded-sm border border-border">
        {statuses.map((status) => (
          <div
            key={status.code}
            className="grid gap-2 border-b border-border px-3 py-2 text-xs last:border-b-0 md:grid-cols-[5rem_12rem_1fr_auto]"
          >
            <code className="text-accent">{status.code}</code>
            <span>{status.name}</span>
            <span className="text-muted">{status.description}</span>
            <CopyBtn text={`${status.code} ${status.name}`} />
          </div>
        ))}
      </div>

      <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
        <span>{statuses.length} results</span>
        <span>{category}</span>
        <span>{query.trim() || "all statuses"}</span>
      </footer>
    </LookupShell>
  );
}

function LookupShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="border-b border-border pb-4">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            {title}
          </h1>
        </header>
        {children}
      </div>
    </div>
  );
}
