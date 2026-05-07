import { describe, expect, it } from "vitest";
import { jsonToTypescript } from "./logic";

describe("json-typescript tool", () => {
  it("infers interfaces from objects", () => {
    const result = jsonToTypescript(
      '{"id":1,"name":"devbox","active":true}',
      "Tool",
    );

    expect(result.error).toBeNull();
    expect(result.output).toContain("export interface Tool");
    expect(result.output).toContain("id: number");
    expect(result.output).toContain("name: string");
  });

  it("infers arrays", () => {
    expect(jsonToTypescript('[{"id":1},{"id":2}]', "Tool").output).toContain(
      "Array<Tool>",
    );
  });
});
