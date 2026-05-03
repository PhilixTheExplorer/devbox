import { describe, expect, it } from "vitest";
import { queryJsonPath } from "./json-path";

describe("json-path tool", () => {
  it("queries dotted and indexed paths", () => {
    const result = queryJsonPath(
      '{"users":[{"name":"Ada"}]}',
      "$.users[0].name",
    );

    expect(result.error).toBeNull();
    expect(result.output).toBe('"Ada"');
  });

  it("supports wildcards", () => {
    const result = queryJsonPath(
      '{"users":[{"id":1},{"id":2}]}',
      "$.users[*].id",
    );

    expect(result.matches).toEqual([1, 2]);
  });
});
