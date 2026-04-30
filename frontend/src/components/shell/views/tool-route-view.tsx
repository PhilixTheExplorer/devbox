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
        <h2 className="text-[36px] mb-4 font-normal mt-0">coming soon</h2>
        <div className="text-[13px] mb-1.5">{tool.name}</div>
        <div className="text-[11px]">
          this tool needs a server. coming soon.
        </div>
      </section>
    );
  }

  const ActiveTool = TOOL_COMPONENTS[tool.id as AvailableToolId];

  return <ActiveTool />;
}
