export type Base64Mode = "encode" | "decode";

export type Base64Result = {
  output: string;
  error: string | null;
};

function bytesToBinary(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
}

function binaryToBytes(binary: string) {
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

export function encodeBase64(input: string) {
  return btoa(bytesToBinary(new TextEncoder().encode(input)));
}

export function decodeBase64(input: string) {
  const normalized = input.trim().replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );

  return new TextDecoder("utf-8", { fatal: true }).decode(
    binaryToBytes(atob(padded)),
  );
}

export function transformBase64(input: string, mode: Base64Mode): Base64Result {
  if (!input.trim()) {
    return { output: "", error: null };
  }

  try {
    return {
      output: mode === "encode" ? encodeBase64(input) : decodeBase64(input),
      error: null,
    };
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "invalid base64",
    };
  }
}
