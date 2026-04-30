"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { AvailableToolId } from "@/registry/tools";

const ToolLoading = () => (
  <div className="text-[12px] text-muted px-[2px] py-2">loading tool...</div>
);

const UuidGen = dynamic(() => import("@/components/tools/uuid"), {
  loading: ToolLoading,
});

type ToolComponent = ComponentType;

export const TOOL_COMPONENTS = {
  uuid: UuidGen,
} satisfies Record<AvailableToolId, ToolComponent>;
