import { describe, expect, it } from "vitest";
import { formatUrl, transformUrl } from "./url";

describe("url tool", () => {
  it("formats a url into useful parts", () => {
    const output = formatUrl("https://example.com/a?b=2&a=1#x", true);

    expect(output).toContain("origin: https://example.com");
    expect(output).toContain("pathname: /a");
    expect(output).toContain("  a: 1\n  b: 2");
  });

  it("encodes input", () => {
    const result = transformUrl("hello world?", "encode", false);

    expect(result).toEqual({ output: "hello%20world%3F", error: null });
  });

  it("decodes input", () => {
    const result = transformUrl("hello%20world%3F", "decode", false);

    expect(result).toEqual({ output: "hello world?", error: null });
  });

  it("returns decode errors", () => {
    const result = transformUrl("%", "decode", false);

    expect(result.output).toBe("");
    expect(result.error).toBeTruthy();
  });
});
