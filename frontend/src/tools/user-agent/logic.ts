export type UserAgentInfo = {
  browser: string;
  os: string;
  device: string;
  engine: string;
  mobile: boolean;
};

function matchVersion(userAgent: string, pattern: RegExp) {
  const match = userAgent.match(pattern);
  return match?.[1] ?? "";
}

function withVersion(name: string, version: string) {
  return version ? `${name} ${version}` : name;
}

export function inspectUserAgent(userAgent: string): UserAgentInfo {
  const ua = userAgent.trim();

  const browser = (() => {
    if (/Edg\//.test(ua)) {
      return withVersion("Edge", matchVersion(ua, /Edg\/([\d.]+)/));
    }
    if (/OPR\//.test(ua)) {
      return withVersion("Opera", matchVersion(ua, /OPR\/([\d.]+)/));
    }
    if (/Firefox\//.test(ua)) {
      return withVersion("Firefox", matchVersion(ua, /Firefox\/([\d.]+)/));
    }
    if (/Chrome\//.test(ua) && !/Chromium\//.test(ua)) {
      return withVersion("Chrome", matchVersion(ua, /Chrome\/([\d.]+)/));
    }
    if (/Safari\//.test(ua) && /Version\//.test(ua)) {
      return withVersion("Safari", matchVersion(ua, /Version\/([\d.]+)/));
    }
    return "unknown";
  })();

  const os = (() => {
    if (/Windows NT 10/.test(ua)) return "Windows 10/11";
    if (/Windows NT/.test(ua)) return "Windows";
    if (/Android/.test(ua)) {
      return withVersion("Android", matchVersion(ua, /Android ([\d.]+)/));
    }
    if (/iPhone|iPad|iPod/.test(ua)) {
      return withVersion(
        "iOS",
        matchVersion(ua, /OS ([\d_]+)/).replaceAll("_", "."),
      );
    }
    if (/Mac OS X/.test(ua)) {
      return withVersion(
        "macOS",
        matchVersion(ua, /Mac OS X ([\d_]+)/).replaceAll("_", "."),
      );
    }
    if (/Linux/.test(ua)) return "Linux";
    return "unknown";
  })();

  const engine = (() => {
    if (/AppleWebKit\//.test(ua)) {
      return withVersion("WebKit", matchVersion(ua, /AppleWebKit\/([\d.]+)/));
    }
    if (/Gecko\//.test(ua)) {
      return withVersion("Gecko", matchVersion(ua, /rv:([\d.]+)/));
    }
    return "unknown";
  })();

  const mobile = /Mobile|Android|iPhone|iPad|iPod/.test(ua);
  const device = /iPad|Tablet/.test(ua)
    ? "tablet"
    : /Mobile|Android|iPhone|iPod/.test(ua)
      ? "mobile"
      : "desktop";

  return {
    browser,
    os,
    device,
    engine,
    mobile,
  };
}

export function formatUserAgentInfo(userAgent: string) {
  const info = inspectUserAgent(userAgent);

  return [
    `browser: ${info.browser}`,
    `os: ${info.os}`,
    `device: ${info.device}`,
    `engine: ${info.engine}`,
    `mobile: ${info.mobile ? "yes" : "no"}`,
  ].join("\n");
}
