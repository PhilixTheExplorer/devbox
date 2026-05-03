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

const UrlFormatter = dynamic(() => import("@/components/tools/url"), {
  loading: ToolLoading,
});

const TimestampConverter = dynamic(
  () => import("@/components/tools/timestamp"),
  {
    loading: ToolLoading,
  },
);

const CaseConverterTool = dynamic(
  () => import("@/components/tools/case-converter"),
  {
    loading: ToolLoading,
  },
);

const Base64Tool = dynamic(() => import("@/components/tools/base64"), {
  loading: ToolLoading,
});

const HashTool = dynamic(() => import("@/components/tools/hash"), {
  loading: ToolLoading,
});

const JwtTool = dynamic(() => import("@/components/tools/jwt"), {
  loading: ToolLoading,
});

const RegexTool = dynamic(() => import("@/components/tools/regex"), {
  loading: ToolLoading,
});

const DiffViewerTool = dynamic(() => import("@/components/tools/diff-viewer"), {
  loading: ToolLoading,
});

const JsonPathTool = dynamic(() => import("@/components/tools/json-path"), {
  loading: ToolLoading,
});

const CurlConverterTool = dynamic(
  () => import("@/components/tools/curl-converter"),
  {
    loading: ToolLoading,
  },
);

const HttpStatusTool = dynamic(() => import("@/components/tools/http-status"), {
  loading: ToolLoading,
});

const MimeTypeTool = dynamic(() => import("@/components/tools/mime-type"), {
  loading: ToolLoading,
});

const JsonCsvTool = dynamic(() => import("@/components/tools/json-csv"), {
  loading: ToolLoading,
});

const ColorConverterTool = dynamic(
  () => import("@/components/tools/color-converter"),
  {
    loading: ToolLoading,
  },
);

type ToolComponent = ComponentType;

export const TOOL_COMPONENTS = {
  "color-converter": ColorConverterTool,
  "json-csv": JsonCsvTool,
  "mime-type": MimeTypeTool,
  "http-status": HttpStatusTool,
  "curl-converter": CurlConverterTool,
  "json-path": JsonPathTool,
  "diff-viewer": DiffViewerTool,
  jwt: JwtTool,
  hash: HashTool,
  regex: RegexTool,
  base64: Base64Tool,
  "case-converter": CaseConverterTool,
  json: JsonFormatter,
  timestamp: TimestampConverter,
  url: UrlFormatter,
  uuid: UuidGen,
} satisfies Record<AvailableToolId, ToolComponent>;
