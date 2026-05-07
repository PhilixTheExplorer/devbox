import { describe, expect, it } from "vitest";
import type { DocxHtmlResult } from "./logic";

describe("docx-html tool", () => {
  it("tracks html conversion result shape", () => {
    const result = {
      html: "<p>Hello</p>",
      messages: [],
      error: null,
    } satisfies DocxHtmlResult;

    expect(result.html).toContain("Hello");
  });
});
