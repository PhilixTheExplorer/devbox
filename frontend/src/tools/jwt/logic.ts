export type JwtDecodeResult = {
  output: string;
  error: string | null;
  header: unknown | null;
  payload: unknown | null;
};

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function parseJwtPart(value: string) {
  return JSON.parse(decodeBase64Url(value)) as unknown;
}

export function decodeJwt(input: string): JwtDecodeResult {
  const token = input.trim();

  if (!token) {
    return { output: "", error: null, header: null, payload: null };
  }

  const parts = token.split(".");

  if (parts.length !== 3 || parts.some((part) => !part)) {
    return {
      output: "",
      error: "expected a jwt with header.payload.signature",
      header: null,
      payload: null,
    };
  }

  try {
    const header = parseJwtPart(parts[0]);
    const payload = parseJwtPart(parts[1]);
    const output = JSON.stringify({ header, payload }, null, 2);

    return { output, error: null, header, payload };
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "invalid jwt",
      header: null,
      payload: null,
    };
  }
}
