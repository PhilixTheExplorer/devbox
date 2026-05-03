import { describe, expect, it } from "vitest";
import { convertAllCases, convertCase } from "./case-converter";

describe("case-converter tool", () => {
  it("converts words to common identifier cases", () => {
    expect(convertCase("hello dev box", "camel").output).toBe("helloDevBox");
    expect(convertCase("hello dev box", "pascal").output).toBe("HelloDevBox");
    expect(convertCase("hello dev box", "snake").output).toBe("hello_dev_box");
    expect(convertCase("hello dev box", "kebab").output).toBe("hello-dev-box");
    expect(convertCase("hello dev box", "constant").output).toBe(
      "HELLO_DEV_BOX",
    );
    expect(convertCase("hello dev box", "dot").output).toBe("hello.dev.box");
    expect(convertCase("hello dev box", "sentence").output).toBe(
      "Hello dev box",
    );
  });

  it("splits existing camel case", () => {
    expect(convertCase("helloDevBox", "title").output).toBe("Hello Dev Box");
  });

  it("returns all display cases", () => {
    expect(convertAllCases("hello world")).toHaveLength(10);
    expect(convertAllCases("hello world")[0]).toMatchObject({
      label: "camelCase",
      result: { output: "helloWorld", error: null },
    });
  });
});
