import { describe, expect, it } from "vitest";
import { searchHttpStatuses } from "./logic";

describe("http-status tool", () => {
  it("searches by code", () => {
    expect(searchHttpStatuses("404")[0]?.name).toBe("Not Found");
  });

  it("filters by category", () => {
    expect(
      searchHttpStatuses("", "5xx").every(
        (status) => status.category === "5xx",
      ),
    ).toBe(true);
  });
});
