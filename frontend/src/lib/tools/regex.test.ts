import { describe, expect, it } from "vitest";
import { testRegex } from "./regex";

describe("regex tool", () => {
  it("finds matches and capture groups", () => {
    const result = testRegex("(dev)(box)", "i", "hello DevBox");

    expect(result.error).toBeNull();
    expect(result.count).toBe(1);
    expect(result.output).toContain("value: DevBox");
    expect(result.output).toContain("group 1: Dev");
    expect(result.output).toContain("group 2: Box");
  });

  it("returns regex errors", () => {
    const result = testRegex("[", "g", "sample");

    expect(result.output).toBe("");
    expect(result.error).toBeTruthy();
  });
});
