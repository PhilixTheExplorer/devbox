import { describe, expect, it } from "vitest";
import { digestText } from "./hash";

describe("hash tool", () => {
  it("generates a sha-256 digest", async () => {
    await expect(digestText("hello", "SHA-256")).resolves.toEqual({
      output:
        "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
      error: null,
    });
  });
});
