import { describe, expect, it } from "vitest";
import { convertCurlToFetch } from "./curl-converter";

describe("curl-converter tool", () => {
  it("converts curl to fetch", () => {
    const result = convertCurlToFetch(
      "curl -X POST -H 'Content-Type: application/json' -d '{\"ok\":true}' https://api.test.dev",
    );

    expect(result.error).toBeNull();
    expect(result.summary?.method).toBe("POST");
    expect(result.output).toContain("fetch");
    expect(result.output).toContain("Content-Type");
  });

  it("requires curl", () => {
    expect(convertCurlToFetch("wget https://example.com").error).toContain(
      "curl",
    );
  });
});
