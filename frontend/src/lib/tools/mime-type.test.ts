import { describe, expect, it } from "vitest";
import { searchMimeTypes } from "./mime-type";

describe("mime-type tool", () => {
  it("searches by extension", () => {
    expect(searchMimeTypes("json")[0]?.mime).toBe("application/json");
  });

  it("searches by mime category", () => {
    expect(
      searchMimeTypes("image").some((entry) => entry.extension === ".png"),
    ).toBe(true);
  });
});
