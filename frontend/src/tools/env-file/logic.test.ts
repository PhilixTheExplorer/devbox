import { describe, expect, it } from "vitest";
import { formatEnvFile } from "./logic";

describe("env-file tool", () => {
  it("formats and sorts env entries", () => {
    const result = formatEnvFile("B=2\nA=1", { sortKeys: true });

    expect(result.output).toBe("A=1\nB=2");
  });

  it("warns about duplicates", () => {
    const result = formatEnvFile("API_KEY=one\nAPI_KEY=two");

    expect(result.warnings[0]).toContain("duplicated");
  });
});
