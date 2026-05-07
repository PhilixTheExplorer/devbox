import { describe, expect, it } from "vitest";
import type { DocxMarkdownResult } from "./logic";

describe("docx-markdown tool", () => {
  it("tracks markdown conversion result shape", () => {
    const result = {
      markdown: "# Title",
      paragraphs: 1,
      messages: [],
      error: null,
    } satisfies DocxMarkdownResult;

    expect(result.markdown).toBe("# Title");
  });
});
