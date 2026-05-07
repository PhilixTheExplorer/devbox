import { describe, expect, it } from "vitest";
import { transformBase64 } from "./logic";

describe("base64 tool", () => {
  it("encodes unicode text", () => {
    expect(transformBase64("hello ✓", "encode")).toEqual({
      output: "aGVsbG8g4pyT",
      error: null,
    });
  });

  it("decodes base64 text", () => {
    expect(transformBase64("aGVsbG8g4pyT", "decode")).toEqual({
      output: "hello ✓",
      error: null,
    });
  });

  it("returns an error for invalid base64", () => {
    const result = transformBase64("%%%not-base64", "decode");

    expect(result.output).toBe("");
    expect(result.error).toBeTruthy();
  });
});
