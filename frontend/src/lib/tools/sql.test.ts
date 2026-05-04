import { describe, expect, it } from "vitest";
import { formatSql } from "./sql";

describe("sql tool", () => {
  it("formats common query keywords", () => {
    const result = formatSql("select id, name from users where active = true");

    expect(result).toContain("SELECT");
    expect(result).toContain("\nFROM users");
    expect(result).toContain("\nWHERE active");
  });

  it("compacts whitespace", () => {
    expect(formatSql("select   *   from users", "compact")).toBe(
      "select * from users",
    );
  });
});
