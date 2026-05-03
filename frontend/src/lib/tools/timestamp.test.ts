import { describe, expect, it } from "vitest";
import {
  dateFromUnixSeconds,
  getRelativeLabel,
  unixSecondsFromDateInput,
} from "./timestamp";

describe("timestamp tool", () => {
  it("converts unix seconds to a date", () => {
    expect(dateFromUnixSeconds("0")?.toISOString()).toBe(
      "1970-01-01T00:00:00.000Z",
    );
  });

  it("returns null for invalid timestamp input", () => {
    expect(dateFromUnixSeconds("abc")).toBeNull();
  });

  it("converts date input to unix seconds", () => {
    expect(unixSecondsFromDateInput("1970-01-01T00:00:00.000Z")).toBe(0);
  });

  it("formats relative labels", () => {
    expect(getRelativeLabel(98, 100)).toBe("2s ago");
    expect(getRelativeLabel(160, 100)).toBe("in 1m");
    expect(getRelativeLabel(100, 100)).toBe("just now");
  });
});
