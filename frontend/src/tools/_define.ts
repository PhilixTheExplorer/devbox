/**
 * Tool registry foundation.
 *
 * Each tool lives in its own folder under `src/tools/<id>/`:
 *   - meta.ts        metadata (server-safe)
 *   - ui.tsx         component (client)
 *   - logic.ts       pure logic
 *   - logic.test.ts  unit tests
 *
 * Aggregation happens in `src/tools/index.ts` (meta) and
 * `src/tools/components.tsx` (lazy components).
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

export type ToolContent = {
  overview: string;
  explanation: string;
  highlights: readonly string[];
};

export type ToolMeta = {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  tags: readonly string[];
  seo: ToolSeo;
  content: ToolContent;
  soon?: boolean;
};

/**
 * Identity helper that preserves literal types so consumers can narrow on
 * `id`, `category`, and `soon`. Keep the `<const T>` — without it, every
 * string would widen to `string` and the discriminated union would collapse.
 */
export function defineTool<const T extends ToolMeta>(meta: T): T {
  return meta;
}
