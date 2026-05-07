import { describe, expect, it } from "vitest";
import { createQrCodeSvg } from "./logic";

describe("qr code tool", () => {
  it("generates a local svg qr code", () => {
    const result = createQrCodeSvg("https://devbox.tools");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.byteLength).toBe(20);
      expect(result.moduleCount).toBeGreaterThan(0);
      expect(result.svg).toContain("<svg");
      expect(result.svg).toContain("<rect");
      expect(result.dataUrl).toMatch(/^data:image\/svg\+xml/);
    }
  });

  it("supports color, shape, and raster logo customization", () => {
    const result = createQrCodeSvg("devbox", {
      background: "#f7f7f7",
      foreground: "#14532d",
      logoDataUrl: "data:image/png;base64,abc",
      shape: "dots",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.svg).toContain('fill="#f7f7f7"');
      expect(result.svg).toContain('fill="#14532d"');
      expect(result.svg).toContain("<circle");
      expect(result.svg).toContain("<image");
    }
  });

  it("rejects oversized inputs before encoding", () => {
    const result = createQrCodeSvg("x".repeat(2049));

    expect(result).toEqual({
      ok: false,
      byteLength: 2049,
      error: "too long (2049/2048 bytes)",
    });
  });
});
