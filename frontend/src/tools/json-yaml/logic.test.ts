import { describe, expect, it } from "vitest";
import { convertJsonYaml } from "./logic";

describe("json-yaml tool", () => {
  it("converts json to yaml", () => {
    const result = convertJsonYaml(
      '{"name":"devbox","tools":["json","yaml"]}',
      "json-to-yaml",
    );

    expect(result.error).toBeNull();
    expect(result.output).toContain("name: devbox");
    expect(result.output).toContain("- json");
  });

  it("converts yaml to json", () => {
    const result = convertJsonYaml(
      "name: devbox\nprivate: true",
      "yaml-to-json",
    );

    expect(result.error).toBeNull();
    expect(JSON.parse(result.output)).toEqual({
      name: "devbox",
      private: true,
    });
  });
});
