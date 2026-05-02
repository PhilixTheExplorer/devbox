"use client";

import { TOOL_COMPONENTS } from "@/registry/tool-components";
import type { AvailableToolId, RegisteredToolMeta } from "@/registry/tools";

type ToolRouteViewProps = {
  tool: RegisteredToolMeta;
};

export function ToolRouteView({ tool }: ToolRouteViewProps) {
  if ("soon" in tool && tool.soon) {
    return (
      <section className="p-10 text-center text-muted">
        <h2 className="text-4xl mb-4 font-normal mt-0">coming soon</h2>
        <div className="text-ui mb-1.5">{tool.name}</div>
        <div className="text-ui-xs">this tool needs a server. coming soon.</div>
      </section>
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

  return <ActiveTool />;
}
