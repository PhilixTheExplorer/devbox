/**
 * Tool registry — aggregates per-tool metadata.
 *
 * Each tool's metadata lives in `./<id>/meta.ts`. Adding a tool means:
 *   1. create the folder via `pnpm create:tool <id>`
 *   2. import the meta below and add it to the TOOLS array
 *
 * The lazy UI components are aggregated separately in `./components.tsx`,
 * so this module stays free of React imports and is server-safe.
 */

import base64 from "./base64/meta";
import caseConverter from "./case-converter/meta";
import colorConverter from "./color-converter/meta";
import cronParser from "./cron-parser/meta";
import curlConverter from "./curl-converter/meta";
import diffViewer from "./diff-viewer/meta";
import docxHtml from "./docx-html/meta";
import docxMarkdown from "./docx-markdown/meta";
import envFile from "./env-file/meta";
import hash from "./hash/meta";
import htmlMarkdown from "./html-markdown/meta";
import httpStatus from "./http-status/meta";
import ipynb from "./ipynb/meta";
import json from "./json/meta";
import jsonCsv from "./json-csv/meta";
import jsonPath from "./json-path/meta";
import jsonTypescript from "./json-typescript/meta";
import jsonYaml from "./json-yaml/meta";
import jwt from "./jwt/meta";
import markdownPreview from "./markdown-preview/meta";
import mimeType from "./mime-type/meta";
import qrCode from "./qr-code/meta";
import regex from "./regex/meta";
import sql from "./sql/meta";
import timestamp from "./timestamp/meta";
import url from "./url/meta";
import userAgent from "./user-agent/meta";
import uuid from "./uuid/meta";

export {
  defineTool,
  TOOL_CATEGORIES,
  type ToolCategory,
  type ToolContent,
  type ToolMeta,
  type ToolSeo,
} from "./_define";

export const TOOLS = [
  envFile,
  json,
  sql,
  url,
  base64,
  caseConverter,
  colorConverter,
  curlConverter,
  docxHtml,
  docxMarkdown,
  htmlMarkdown,
  ipynb,
  jsonCsv,
  jsonTypescript,
  jsonYaml,
  timestamp,
  hash,
  qrCode,
  uuid,
  cronParser,
  diffViewer,
  httpStatus,
  jsonPath,
  jwt,
  markdownPreview,
  mimeType,
  regex,
  userAgent,
] as const;

export type RegisteredToolMeta = (typeof TOOLS)[number];
export type ToolId = RegisteredToolMeta["id"];
export type AvailableToolId = Exclude<RegisteredToolMeta, { soon: true }>["id"];

const TOOL_MAP = new Map<string, RegisteredToolMeta>(
  TOOLS.map((tool) => [tool.id, tool]),
);

export const AVAILABLE_TOOLS = TOOLS.filter(
  (tool): tool is Exclude<RegisteredToolMeta, { soon: true }> =>
    !("soon" in tool && tool.soon),
);

/** Look up a tool by its id. Returns undefined if not found. */
export function getToolById(toolId: string): RegisteredToolMeta | undefined {
  return TOOL_MAP.get(toolId);
}
