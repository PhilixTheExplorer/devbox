/**
 * Central tool registry.
 * Every developer tool in devbox is registered here.
 */

export const TOOL_CATEGORIES = ["generate", "notebooks"] as const;

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
    id: "uuid",
    name: "uuid generator",
    category: "generate",
    description:
      "universally unique. locally generated. cryptographically random.",
    tags: ["uuid", "guid", "id", "generate", "random"],
  },
  {
    id: "ipynb",
    name: "ipynb → pdf",
    category: "notebooks",
    description: "jupyter notebook to pdf. needs nbconvert server-side.",
    tags: ["jupyter", "notebook", "ipynb", "pdf", "python"],
    soon: true,
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
