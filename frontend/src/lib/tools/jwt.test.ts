import { describe, expect, it } from "vitest";
import { decodeJwt } from "./jwt";

describe("jwt tool", () => {
  it("decodes jwt header and payload", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiZGV2Ym94In0.signature";
    const result = decodeJwt(token);

    expect(result.error).toBeNull();
    expect(result.header).toEqual({ alg: "HS256", typ: "JWT" });
    expect(result.payload).toEqual({ sub: "123", name: "devbox" });
    expect(result.output).toContain('"payload"');
  });

  it("rejects malformed tokens", () => {
    const result = decodeJwt("not.a.jwt.with.too.many.parts");

    expect(result.output).toBe("");
    expect(result.error).toBe("expected a jwt with header.payload.signature");
  });
});
