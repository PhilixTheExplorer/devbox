"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { AvailableToolId } from "@/registry/tools";

const ToolLoading = () => (
  <div className="text-xs text-muted px-1 py-2">loading tool...</div>
);

const UuidGen = dynamic(() => import("@/components/tools/uuid"), {
  loading: ToolLoading,
});

const JsonFormatter = dynamic(() => import("@/components/tools/json"), {
  loading: ToolLoading,
});

type ToolComponent = ComponentType;

export const TOOL_COMPONENTS = {
  json: JsonFormatter,
  uuid: UuidGen,
} satisfies Record<AvailableToolId, ToolComponent>;
