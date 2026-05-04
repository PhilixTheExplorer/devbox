import { describe, expect, it } from "vitest";
import { formatUserAgentInfo, inspectUserAgent } from "./user-agent";

const chromeWindows =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

const safariIos =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

describe("user-agent tool", () => {
  it("detects chrome on windows", () => {
    expect(inspectUserAgent(chromeWindows)).toMatchObject({
      browser: "Chrome 125.0.0.0",
      os: "Windows 10/11",
      device: "desktop",
      mobile: false,
    });
  });

  it("detects mobile safari on ios", () => {
    expect(inspectUserAgent(safariIos)).toMatchObject({
      browser: "Safari 17.0",
      os: "iOS 17.0",
      device: "mobile",
      mobile: true,
    });
  });

  it("formats a readable summary", () => {
    expect(formatUserAgentInfo(chromeWindows)).toContain(
      "browser: Chrome 125.0.0.0",
    );
  });
});
