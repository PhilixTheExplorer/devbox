import { describe, expect, it } from "vitest";
import { compareText } from "./diff-viewer";

describe("diff-viewer tool", () => {
  it("compares text line by line", () => {
    const result = compareText("one\ntwo", "one\nthree");

    expect(result.stats).toEqual({ added: 1, removed: 1, unchanged: 1 });
    expect(result.patch).toContain("- two");
    expect(result.patch).toContain("+ three");
  });

  it("can ignore whitespace changes", () => {
    const result = compareText("one  two", "one two", "words", true);

    expect(result.stats.removed).toBe(0);
    expect(result.stats.added).toBe(0);
  });
});
