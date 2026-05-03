export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export type HashResult = {
  output: string;
  error: string | null;
};

export const HASH_ALGORITHMS = [
  "SHA-256",
  "SHA-384",
  "SHA-512",
  "SHA-1",
] as const satisfies readonly HashAlgorithm[];

function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function digestText(
  input: string,
  algorithm: HashAlgorithm,
): Promise<HashResult> {
  if (!input) {
    return { output: "", error: null };
  }

  try {
    const digest = await crypto.subtle.digest(
      algorithm,
      new TextEncoder().encode(input),
    );

    return { output: toHex(digest), error: null };
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "hash failed",
    };
  }
}

export async function digestAllText(input: string) {
  const results = await Promise.all(
    HASH_ALGORITHMS.map(async (algorithm) => ({
      algorithm,
      result: await digestText(input, algorithm),
    })),
  );

  return results;
}
