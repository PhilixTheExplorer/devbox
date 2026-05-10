"use client";

import type { AvailableToolId, RegisteredToolMeta } from "@/tools";
import { TOOL_COMPONENTS } from "@/tools/components";

type ToolRouteViewProps = {
  tool: RegisteredToolMeta;
};

export function ToolRouteView({ tool }: ToolRouteViewProps) {
  if ("soon" in tool && tool.soon) {
    return (
      <div className="flex flex-col gap-5">
        <section className="p-10 text-center text-muted">
          <h2 className="text-4xl mb-4 font-normal mt-0">coming soon</h2>
          <div className="text-ui mb-1.5">{tool.name}</div>
          <div className="text-ui-xs">
            this tool needs a server. coming soon.
          </div>
        </section>
        <ToolDescription tool={tool} />
      </div>
    );
  }

  const ActiveTool = TOOL_COMPONENTS[tool.id as AvailableToolId];

  if (!ActiveTool) {
    return (
      <section className="p-10 text-center text-muted">
        <h2 className="text-2xl mb-4 font-normal mt-0">tool unavailable</h2>
        <div className="text-ui mb-1.5">{tool.name}</div>
        <div className="text-ui-xs">
          this tool is registered, but its component is missing.
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <ActiveTool />
      <ToolDescription tool={tool} />
    </div>
  );
}

function ToolDescription({ tool }: { tool: RegisteredToolMeta }) {
  const overview = tool.content?.overview ?? tool.description;
  const explanation =
    tool.content?.explanation ??
    `Use this ${tool.seo.primaryKeyword} free in your browser with no upload, no account, and no tracking.`;
  const highlights = tool.content?.highlights ?? tool.seo.secondaryKeywords;

  return (
    <section className="mx-auto w-full max-w-tool border-t border-border px-4 py-5 text-ui-xs text-muted sm:px-7">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.55fr)]">
        <div className="min-w-0">
          <h2 className="m-0 text-ui font-normal text-text">{overview}</h2>
          <p className="mb-0 mt-2 max-w-readable leading-relaxed">
            {explanation}
          </p>
        </div>

        <div className="min-w-0">
          <div className="mb-2 text-2xs uppercase tracking-widest text-muted">
            useful for
          </div>
          <ul className="m-0 grid gap-1.5 p-0">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2 leading-relaxed text-muted2"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
