import { describe, expect, it } from "vitest";
import { getMarkdownPreviewStats } from "./logic";

describe("markdown-preview tool", () => {
  it("counts common markdown document stats", () => {
    const result = getMarkdownPreviewStats(
      "# Title\n\n- one\n- two\n\n[site](https://example.com)",
    );

    expect(result.stats.headings).toBe(1);
    expect(result.stats.links).toBe(1);
    expect(result.stats.words).toBeGreaterThan(2);
  });
});
