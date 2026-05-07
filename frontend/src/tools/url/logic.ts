export type UrlMode = "format" | "encode" | "decode";

export type UrlFormatResult = {
  output: string;
  error: string | null;
};

function parseUrl(input: string) {
  try {
    return new URL(input);
  } catch {
    return new URL(input, "https://example.com");
  }
}

export function formatUrl(input: string, sortParams: boolean) {
  const url = parseUrl(input);
  const params = [...url.searchParams.entries()];

  if (sortParams) {
    params.sort(([aKey, aValue], [bKey, bValue]) => {
      const keySort = aKey.localeCompare(bKey);
      return keySort || aValue.localeCompare(bValue);
    });
  }

  const query = params.map(([key, value]) => `  ${key}: ${value}`).join("\n");
  const normalized = new URL(url.toString());
  normalized.search = "";

  for (const [key, value] of params) {
    normalized.searchParams.append(key, value);
  }

  return [
    `href: ${normalized.toString()}`,
    `origin: ${url.origin}`,
    `protocol: ${url.protocol}`,
    `host: ${url.host}`,
    `pathname: ${url.pathname}`,
    `hash: ${url.hash || "(none)"}`,
    "query:",
    query || "  (none)",
  ].join("\n");
}

export function transformUrl(
  input: string,
  mode: UrlMode,
  sortParams: boolean,
): UrlFormatResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { output: "", error: null };
  }

  try {
    if (mode === "encode") {
      return { output: encodeURIComponent(input), error: null };
    }

    if (mode === "decode") {
      return { output: decodeURIComponent(input), error: null };
    }

    return { output: formatUrl(trimmed, sortParams), error: null };
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "invalid url",
    };
  }
}
