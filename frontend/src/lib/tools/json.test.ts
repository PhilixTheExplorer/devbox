import { describe, expect, it } from "vitest";
import { formatJson, sortJson } from "./json";

describe("json tool", () => {
  it("formats json with indentation", () => {
    const result = formatJson('{"b":2,"a":1}', "format", false);

    expect(result.error).toBeNull();
    expect(result.output).toBe('{\n  "b": 2,\n  "a": 1\n}');
  });

  it("minifies json", () => {
    const result = formatJson('{ "ok": true }', "minify", false);

    expect(result.output).toBe('{"ok":true}');
  });

  it("sorts nested object keys", () => {
    expect(sortJson({ b: 2, a: { d: 4, c: 3 } })).toEqual({
      a: { c: 3, d: 4 },
      b: 2,
    });
  });

  it("returns an error for invalid json", () => {
    const result = formatJson("{bad", "format", false);

    expect(result.output).toBe("");
    expect(result.error).toBeTruthy();
  });
});
