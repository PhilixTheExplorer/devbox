import { describe, expect, it } from "vitest";
import { analyzeCron } from "./cron-parser";

describe("cron-parser tool", () => {
  it("explains valid expressions and previews runs", () => {
    const result = analyzeCron(
      "*/15 9 * * mon",
      new Date("2026-05-04T08:59:00.000Z"),
      2,
    );

    expect(result.valid).toBe(true);
    expect(result.explanation).toContain("every 15 minutes");
    expect(result.nextRuns).toHaveLength(2);
  });

  it("rejects invalid field counts", () => {
    expect(analyzeCron("* * *").error).toContain("five fields");
  });
});
