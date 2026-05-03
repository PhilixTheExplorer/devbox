import { describe, expect, it } from "vitest";
import { convertColor } from "./color-converter";

describe("color-converter tool", () => {
  it("converts hex to rgb and hsl", () => {
    const result = convertColor("#2a7a50");

    expect(result.error).toBeNull();
    expect(result.rgb).toBe("rgb(42, 122, 80)");
    expect(result.hsl).toBe("hsl(149 49% 32%)");
  });

  it("converts rgb to hex", () => {
    expect(convertColor("rgb(42, 122, 80)").hex).toBe("#2a7a50");
  });
});
