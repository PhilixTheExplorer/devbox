import { describe, expect, it } from "vitest";
import { clampUuidCount, formatUuid, formatUuids } from "./logic";

const uuid = "123e4567-e89b-12d3-a456-426614174000";

describe("uuid tool", () => {
  it("formats uppercase uuids", () => {
    expect(formatUuid(uuid, true, true)).toBe(
      "123E4567-E89B-12D3-A456-426614174000",
    );
  });

  it("removes hyphens", () => {
    expect(formatUuid(uuid, false, false)).toBe(
      "123e4567e89b12d3a456426614174000",
    );
  });

  it("joins formatted uuid batches", () => {
    expect(formatUuids([uuid, uuid], false, false)).toBe(
      "123e4567e89b12d3a456426614174000\n123e4567e89b12d3a456426614174000",
    );
  });

  it("clamps generated count", () => {
    expect(clampUuidCount(-1)).toBe(1);
    expect(clampUuidCount(101)).toBe(100);
  });
});
