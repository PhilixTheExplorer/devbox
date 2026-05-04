/**
 * Central tool registry.
 * Every developer tool in devbox is registered here.
 */

export const TOOL_CATEGORIES = [
  "format",
  "convert",
  "generate",
  "inspect",
] as const;

export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export type ToolMeta = {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  tags: readonly string[];
  soon?: boolean;
};

export const TOOLS = [
  {
    id: "env-file",
    name: "env file formatter",
    category: "format",
    description: "format, sort, and inspect env files locally.",
    tags: ["env", "dotenv", "environment", "secret", "format"],
  },
  {
    id: "json",
    name: "json formatter",
    category: "format",
    description: "format, minify, validate, and sort json locally.",
    tags: ["json", "format", "formatter", "minify", "validate", "sort"],
  },
  {
    id: "sql",
    name: "sql formatter",
    category: "format",
    description: "format sql queries locally.",
    tags: ["sql", "query", "database", "format", "formatter"],
  },
  {
    id: "url",
    name: "url formatter",
    category: "format",
    description: "parse, encode, decode, and normalize urls locally.",
    tags: ["url", "uri", "format", "encode", "decode", "query", "params"],
  },
  {
    id: "base64",
    name: "base64",
    category: "convert",
    description: "encode and decode base64 locally.",
    tags: ["base64", "encode", "decode", "convert"],
  },
  {
    id: "case-converter",
    name: "case converter",
    category: "convert",
    description: "convert text between common identifier cases locally.",
    tags: ["case", "camel", "pascal", "snake", "kebab", "format", "convert"],
  },
  {
    id: "color-converter",
    name: "color converter",
    category: "convert",
    description: "convert color formats locally.",
    tags: ["color", "hex", "rgb", "hsl", "css", "convert"],
  },
  {
    id: "curl-converter",
    name: "curl converter",
    category: "convert",
    description: "convert curl commands into fetch snippets locally.",
    tags: ["curl", "fetch", "http", "request", "convert"],
  },
  {
    id: "docx-html",
    name: "docx → html",
    category: "convert",
    description: "convert docx to html locally.",
    tags: ["docx", "word", "html", "convert"],
  },
  {
    id: "docx-markdown",
    name: "docx → markdown",
    category: "convert",
    description: "convert docx text to markdown locally.",
    tags: ["docx", "word", "markdown", "convert"],
  },
  {
    id: "html-markdown",
    name: "html ↔ markdown",
    category: "convert",
    description: "convert html and markdown locally.",
    tags: ["html-markdown", "convert"],
  },
  {
    id: "ipynb",
    name: "ipynb → pdf",
    category: "convert",
    description: "jupyter notebook to pdf. needs nbconvert server-side.",
    tags: ["jupyter", "notebook", "ipynb", "pdf", "python"],
    soon: true,
  },
  {
    id: "json-csv",
    name: "json ↔ csv",
    category: "convert",
    description: "convert json and csv locally.",
    tags: ["json", "csv", "spreadsheet", "table", "convert"],
  },
  {
    id: "json-typescript",
    name: "json → typescript",
    category: "convert",
    description: "infer typescript types from json locally.",
    tags: ["json", "typescript", "interface", "type", "convert"],
  },
  {
    id: "json-yaml",
    name: "json ↔ yaml",
    category: "convert",
    description: "convert json and yaml locally.",
    tags: ["json", "yaml", "convert", "config"],
  },
  {
    id: "timestamp",
    name: "unix timestamp",
    category: "convert",
    description: "convert unix timestamps and dates locally.",
    tags: ["unix", "timestamp", "time", "date", "epoch", "convert"],
  },
  {
    id: "hash",
    name: "hash generator",
    category: "generate",
    description: "generate message digests locally.",
    tags: ["hash", "digest", "sha", "sha-256", "generate"],
  },
  {
    id: "uuid",
    name: "uuid generator",
    category: "generate",
    description:
      "universally unique. locally generated. cryptographically random.",
    tags: ["uuid", "guid", "id", "generate", "random"],
  },
  {
    id: "cron-parser",
    name: "cron parser",
    category: "inspect",
    description: "explain cron expressions and preview upcoming runs locally.",
    tags: ["cron", "schedule", "job", "time", "inspect"],
  },
  {
    id: "diff-viewer",
    name: "diff viewer",
    category: "inspect",
    description: "compare two text snippets locally.",
    tags: ["diff", "compare", "patch", "text", "inspect"],
  },
  {
    id: "http-status",
    name: "http status codes",
    category: "inspect",
    description: "look up http status codes and meanings locally.",
    tags: ["http", "status", "code", "response", "inspect"],
  },
  {
    id: "json-path",
    name: "json path explorer",
    category: "inspect",
    description: "query json with path expressions locally.",
    tags: ["json", "path", "query", "selector", "inspect"],
  },
  {
    id: "jwt",
    name: "jwt decoder",
    category: "inspect",
    description: "decode jwt headers and payloads locally.",
    tags: ["jwt", "token", "decode", "inspect", "header", "payload"],
  },
  {
    id: "markdown-preview",
    name: "markdown preview",
    category: "inspect",
    description: "preview markdown locally.",
    tags: ["markdown", "preview", "md", "inspect"],
  },
  {
    id: "mime-type",
    name: "mime type lookup",
    category: "inspect",
    description: "look up mime types and file extensions locally.",
    tags: ["mime", "content-type", "extension", "file", "inspect"],
  },
  {
    id: "regex",
    name: "regex tester",
    category: "inspect",
    description: "test regular expressions against sample text locally.",
    tags: ["regex", "regexp", "pattern", "match", "inspect"],
  },
  {
    id: "user-agent",
    name: "user agent",
    category: "inspect",
    description: "inspect browser, os, device, and engine hints locally.",
    tags: ["user-agent", "ua", "browser", "os", "device", "inspect"],
  },
] as const satisfies readonly ToolMeta[];

export type RegisteredToolMeta = (typeof TOOLS)[number];
export type ToolId = RegisteredToolMeta["id"];
export type AvailableToolId = Exclude<RegisteredToolMeta, { soon: true }>["id"];

const TOOL_MAP = new Map<string, RegisteredToolMeta>(
  TOOLS.map((t) => [t.id, t]),
);

/** Look up a tool by its id. Returns undefined if not found. */
export function getToolById(toolId: string): RegisteredToolMeta | undefined {
  return TOOL_MAP.get(toolId);
}
