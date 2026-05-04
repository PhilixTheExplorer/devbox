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

export type ToolSeo = {
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  longTailKeywords: readonly string[];
};

export type ToolMeta = {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  tags: readonly string[];
  seo: ToolSeo;
  soon?: boolean;
};

export const TOOLS = [
  {
    id: "env-file",
    name: "env file formatter",
    category: "format",
    description: "format, sort, and inspect env files locally.",
    tags: ["env", "dotenv", "environment", "secret", "format"],
    seo: {
      primaryKeyword: "env formatter",
      secondaryKeywords: [
        "dotenv formatter",
        "env file formatter",
        "env sorter",
        "environment variable formatter",
      ],
      longTailKeywords: [
        "format env files without uploading",
        "sort environment variables online",
        "validate dotenv files in browser",
      ],
    },
  },
  {
    id: "json",
    name: "json formatter",
    category: "format",
    description: "format, minify, validate, and sort json locally.",
    tags: ["json", "format", "formatter", "minify", "validate", "sort"],
    seo: {
      primaryKeyword: "json formatter",
      secondaryKeywords: [
        "json validator",
        "json beautifier",
        "json minifier",
        "format json online",
      ],
      longTailKeywords: [
        "format json without uploading files",
        "validate json in browser",
        "sort json keys online",
      ],
    },
  },
  {
    id: "sql",
    name: "sql formatter",
    category: "format",
    description: "format sql queries locally.",
    tags: ["sql", "query", "database", "format", "formatter"],
    seo: {
      primaryKeyword: "sql formatter",
      secondaryKeywords: [
        "sql beautifier",
        "sql query formatter",
        "format sql online",
        "sql prettifier",
      ],
      longTailKeywords: [
        "format sql query in browser",
        "sql formatter without upload",
        "pretty print sql online",
      ],
    },
  },
  {
    id: "url",
    name: "url formatter",
    category: "format",
    description: "parse, encode, decode, and normalize urls locally.",
    tags: ["url", "uri", "format", "encode", "decode", "query", "params"],
    seo: {
      primaryKeyword: "url encoder decoder",
      secondaryKeywords: [
        "url formatter",
        "url parser",
        "query string parser",
        "uri encoder",
      ],
      longTailKeywords: [
        "parse url query parameters online",
        "encode and decode urls in browser",
        "format urls without uploading",
      ],
    },
  },
  {
    id: "base64",
    name: "base64",
    category: "convert",
    description: "encode and decode base64 locally.",
    tags: ["base64", "encode", "decode", "convert"],
    seo: {
      primaryKeyword: "base64 decoder",
      secondaryKeywords: [
        "base64 encoder",
        "base64 encode",
        "base64 decode",
        "base64 converter",
      ],
      longTailKeywords: [
        "decode base64 in browser",
        "encode text to base64 online",
        "base64 converter without upload",
      ],
    },
  },
  {
    id: "case-converter",
    name: "case converter",
    category: "convert",
    description: "convert text between common identifier cases locally.",
    tags: ["case", "camel", "pascal", "snake", "kebab", "format", "convert"],
    seo: {
      primaryKeyword: "case converter",
      secondaryKeywords: [
        "camel case converter",
        "snake case converter",
        "kebab case converter",
        "pascal case converter",
      ],
      longTailKeywords: [
        "convert text to camel case online",
        "convert snake case to camel case",
        "identifier case converter in browser",
      ],
    },
  },
  {
    id: "color-converter",
    name: "color converter",
    category: "convert",
    description: "convert color formats locally.",
    tags: ["color", "hex", "rgb", "hsl", "css", "convert"],
    seo: {
      primaryKeyword: "color converter",
      secondaryKeywords: [
        "hex to rgb",
        "rgb to hex",
        "hsl converter",
        "css color converter",
      ],
      longTailKeywords: [
        "convert hex to rgb in browser",
        "convert rgb to hsl online",
        "css color format converter",
      ],
    },
  },
  {
    id: "curl-converter",
    name: "curl converter",
    category: "convert",
    description: "convert curl commands into fetch snippets locally.",
    tags: ["curl", "fetch", "http", "request", "convert"],
    seo: {
      primaryKeyword: "curl to fetch",
      secondaryKeywords: [
        "curl converter",
        "convert curl command",
        "fetch generator",
        "curl to javascript",
      ],
      longTailKeywords: [
        "convert curl to fetch in browser",
        "generate javascript fetch from curl",
        "curl command converter without upload",
      ],
    },
  },
  {
    id: "docx-html",
    name: "docx → html",
    category: "convert",
    description: "convert docx to html locally.",
    tags: ["docx", "word", "html", "convert"],
    seo: {
      primaryKeyword: "docx to html",
      secondaryKeywords: [
        "word to html",
        "convert docx to html",
        "docx html converter",
        "word document to html",
      ],
      longTailKeywords: [
        "convert docx to html in browser",
        "word to html without uploading",
        "extract html from docx online",
      ],
    },
  },
  {
    id: "docx-markdown",
    name: "docx → markdown",
    category: "convert",
    description: "convert docx text to markdown locally.",
    tags: ["docx", "word", "markdown", "convert"],
    seo: {
      primaryKeyword: "docx to markdown",
      secondaryKeywords: [
        "word to markdown",
        "convert docx to markdown",
        "docx md converter",
        "word document to markdown",
      ],
      longTailKeywords: [
        "convert docx to markdown in browser",
        "word to markdown without uploading",
        "extract markdown from docx online",
      ],
    },
  },
  {
    id: "html-markdown",
    name: "html ↔ markdown",
    category: "convert",
    description: "convert html and markdown locally.",
    tags: ["html-markdown", "convert"],
    seo: {
      primaryKeyword: "html to markdown",
      secondaryKeywords: [
        "markdown to html",
        "html markdown converter",
        "convert html to markdown",
        "convert markdown to html",
      ],
      longTailKeywords: [
        "convert html to markdown in browser",
        "markdown to html without uploading",
        "html markdown converter online",
      ],
    },
  },
  {
    id: "ipynb",
    name: "ipynb → pdf",
    category: "convert",
    description: "jupyter notebook to pdf. needs nbconvert server-side.",
    tags: ["jupyter", "notebook", "ipynb", "pdf", "python"],
    seo: {
      primaryKeyword: "ipynb to pdf",
      secondaryKeywords: [
        "jupyter notebook to pdf",
        "convert ipynb to pdf",
        "notebook to pdf",
        "jupyter pdf converter",
      ],
      longTailKeywords: [
        "convert jupyter notebook to pdf online",
        "export ipynb to pdf",
        "python notebook to pdf converter",
      ],
    },
    soon: true,
  },
  {
    id: "json-csv",
    name: "json ↔ csv",
    category: "convert",
    description: "convert json and csv locally.",
    tags: ["json", "csv", "spreadsheet", "table", "convert"],
    seo: {
      primaryKeyword: "json to csv",
      secondaryKeywords: [
        "csv to json",
        "json csv converter",
        "convert json to csv",
        "convert csv to json",
      ],
      longTailKeywords: [
        "convert json array to csv online",
        "json to csv without uploading files",
        "csv to json browser tool",
      ],
    },
  },
  {
    id: "json-typescript",
    name: "json → typescript",
    category: "convert",
    description: "infer typescript types from json locally.",
    tags: ["json", "typescript", "interface", "type", "convert"],
    seo: {
      primaryKeyword: "json to typescript",
      secondaryKeywords: [
        "json to interface",
        "typescript type generator",
        "json to ts",
        "generate typescript from json",
      ],
      longTailKeywords: [
        "infer typescript types from json online",
        "generate interface from json in browser",
        "json to typescript without upload",
      ],
    },
  },
  {
    id: "json-yaml",
    name: "json ↔ yaml",
    category: "convert",
    description: "convert json and yaml locally.",
    tags: ["json", "yaml", "convert", "config"],
    seo: {
      primaryKeyword: "json to yaml",
      secondaryKeywords: [
        "yaml to json",
        "json yaml converter",
        "convert json to yaml",
        "convert yaml to json",
      ],
      longTailKeywords: [
        "convert json to yaml in browser",
        "yaml to json without uploading",
        "config file converter online",
      ],
    },
  },
  {
    id: "timestamp",
    name: "unix timestamp",
    category: "convert",
    description: "convert unix timestamps and dates locally.",
    tags: ["unix", "timestamp", "time", "date", "epoch", "convert"],
    seo: {
      primaryKeyword: "unix timestamp converter",
      secondaryKeywords: [
        "epoch converter",
        "timestamp to date",
        "date to timestamp",
        "unix time converter",
      ],
      longTailKeywords: [
        "convert unix timestamp to date online",
        "date to epoch time converter",
        "timestamp converter in browser",
      ],
    },
  },
  {
    id: "hash",
    name: "hash generator",
    category: "generate",
    description: "generate message digests locally.",
    tags: ["hash", "digest", "sha", "sha-256", "generate"],
    seo: {
      primaryKeyword: "hash generator",
      secondaryKeywords: [
        "sha256 generator",
        "sha hash generator",
        "message digest generator",
        "checksum generator",
      ],
      longTailKeywords: [
        "generate sha256 hash in browser",
        "hash text without uploading",
        "message digest generator online",
      ],
    },
  },
  {
    id: "uuid",
    name: "uuid generator",
    category: "generate",
    description:
      "universally unique. locally generated. cryptographically random.",
    tags: ["uuid", "guid", "id", "generate", "random"],
    seo: {
      primaryKeyword: "uuid generator",
      secondaryKeywords: [
        "guid generator",
        "random uuid",
        "uuid v4",
        "generate uuid",
      ],
      longTailKeywords: [
        "generate uuid v4 in browser",
        "random uuid generator without tracking",
        "local guid generator online",
      ],
    },
  },
  {
    id: "cron-parser",
    name: "cron parser",
    category: "inspect",
    description: "explain cron expressions and preview upcoming runs locally.",
    tags: ["cron", "schedule", "job", "time", "inspect"],
    seo: {
      primaryKeyword: "cron parser",
      secondaryKeywords: [
        "cron expression parser",
        "cron schedule preview",
        "cron explainer",
        "cron expression tester",
      ],
      longTailKeywords: [
        "explain cron expression online",
        "preview next cron run times",
        "cron parser in browser",
      ],
    },
  },
  {
    id: "diff-viewer",
    name: "diff viewer",
    category: "inspect",
    description: "compare two text snippets locally.",
    tags: ["diff", "compare", "patch", "text", "inspect"],
    seo: {
      primaryKeyword: "diff viewer",
      secondaryKeywords: [
        "text compare",
        "compare text online",
        "patch viewer",
        "text diff tool",
      ],
      longTailKeywords: [
        "compare two text snippets online",
        "diff viewer without uploading files",
        "browser text comparison tool",
      ],
    },
  },
  {
    id: "http-status",
    name: "http status codes",
    category: "inspect",
    description: "look up http status codes and meanings locally.",
    tags: ["http", "status", "code", "response", "inspect"],
    seo: {
      primaryKeyword: "http status codes",
      secondaryKeywords: [
        "status code lookup",
        "http response codes",
        "http code meanings",
        "http status lookup",
      ],
      longTailKeywords: [
        "look up http status codes online",
        "http response code meaning",
        "developer http status code reference",
      ],
    },
  },
  {
    id: "json-path",
    name: "json path explorer",
    category: "inspect",
    description: "query json with path expressions locally.",
    tags: ["json", "path", "query", "selector", "inspect"],
    seo: {
      primaryKeyword: "json path explorer",
      secondaryKeywords: [
        "jsonpath tester",
        "json query tool",
        "json path tester",
        "json selector tool",
      ],
      longTailKeywords: [
        "test json path expressions online",
        "query json data in browser",
        "json path explorer without upload",
      ],
    },
  },
  {
    id: "jwt",
    name: "jwt decoder",
    category: "inspect",
    description: "decode jwt headers and payloads locally.",
    tags: ["jwt", "token", "decode", "inspect", "header", "payload"],
    seo: {
      primaryKeyword: "jwt decoder",
      secondaryKeywords: [
        "jwt parser",
        "decode jwt token",
        "jwt payload viewer",
        "jwt header decoder",
      ],
      longTailKeywords: [
        "decode jwt without uploading",
        "view jwt payload in browser",
        "jwt decoder without tracking",
      ],
    },
  },
  {
    id: "markdown-preview",
    name: "markdown preview",
    category: "inspect",
    description: "preview markdown locally.",
    tags: ["markdown", "preview", "md", "inspect"],
    seo: {
      primaryKeyword: "markdown preview",
      secondaryKeywords: [
        "markdown viewer",
        "md preview",
        "markdown renderer",
        "preview markdown online",
      ],
      longTailKeywords: [
        "preview markdown in browser",
        "markdown preview without upload",
        "render markdown locally online",
      ],
    },
  },
  {
    id: "mime-type",
    name: "mime type lookup",
    category: "inspect",
    description: "look up mime types and file extensions locally.",
    tags: ["mime", "content-type", "extension", "file", "inspect"],
    seo: {
      primaryKeyword: "mime type lookup",
      secondaryKeywords: [
        "content type lookup",
        "file extension mime type",
        "mime type checker",
        "media type lookup",
      ],
      longTailKeywords: [
        "look up mime type by extension",
        "content type reference for developers",
        "file extension mime type lookup online",
      ],
    },
  },
  {
    id: "regex",
    name: "regex tester",
    category: "inspect",
    description: "test regular expressions against sample text locally.",
    tags: ["regex", "regexp", "pattern", "match", "inspect"],
    seo: {
      primaryKeyword: "regex tester",
      secondaryKeywords: [
        "regular expression tester",
        "regexp tester",
        "regex matcher",
        "test regex online",
      ],
      longTailKeywords: [
        "test regular expressions in browser",
        "regex tester without uploading text",
        "javascript regex tester online",
      ],
    },
  },
  {
    id: "user-agent",
    name: "user agent",
    category: "inspect",
    description: "inspect browser, os, device, and engine hints locally.",
    tags: ["user-agent", "ua", "browser", "os", "device", "inspect"],
    seo: {
      primaryKeyword: "user agent parser",
      secondaryKeywords: [
        "user agent analyzer",
        "browser detector",
        "user agent lookup",
        "device detector",
      ],
      longTailKeywords: [
        "parse user agent string online",
        "detect browser from user agent",
        "user agent parser in browser",
      ],
    },
  },
] as const satisfies readonly ToolMeta[];

export type RegisteredToolMeta = (typeof TOOLS)[number];
export type ToolId = RegisteredToolMeta["id"];
export type AvailableToolId = Exclude<RegisteredToolMeta, { soon: true }>["id"];

const TOOL_MAP = new Map<string, RegisteredToolMeta>(
  TOOLS.map((t) => [t.id, t]),
);

export const AVAILABLE_TOOLS = TOOLS.filter(
  (tool): tool is Exclude<RegisteredToolMeta, { soon: true }> =>
    !("soon" in tool && tool.soon),
);

/** Look up a tool by its id. Returns undefined if not found. */
export function getToolById(toolId: string): RegisteredToolMeta | undefined {
  return TOOL_MAP.get(toolId);
}
