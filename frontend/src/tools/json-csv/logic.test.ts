import { describe, expect, it } from "vitest";
import { convertJsonCsv } from "./logic";

describe("json-csv tool", () => {
  it("converts json rows to csv", () => {
    const result = convertJsonCsv(
      '[{"name":"devbox","ready":true}]',
      "json-to-csv",
    );

    expect(result.output).toContain("name,ready");
    expect(result.output).toContain("devbox,true");
  });

  it("supports custom delimiters", () => {
    const result = convertJsonCsv(
      '[{"name":"devbox","ready":true}]',
      "json-to-csv",
      ";",
    );

    expect(result.output).toContain("name;ready");
    expect(result.output).toContain("devbox;true");
  });

  it("converts csv to json", () => {
    const result = convertJsonCsv(
      'name,note\ndevbox,"hello, world"',
      "csv-to-json",
    );

    expect(JSON.parse(result.output)).toEqual([
      { name: "devbox", note: "hello, world" },
    ]);
  });

  it("parses tab separated values", () => {
    const result = convertJsonCsv(
      "name\tready\ndevbox\ttrue",
      "csv-to-json",
      "\t",
    );

    expect(JSON.parse(result.output)).toEqual([
      { name: "devbox", ready: "true" },
    ]);
  });
});
