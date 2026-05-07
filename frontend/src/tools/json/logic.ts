export type JsonMode = "format" | "minify";

export type JsonFormatResult = {
  output: string;
  error: string | null;
  stats: {
    inputBytes: number;
    outputBytes: number;
  } | null;
};

export function sortJson(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJson);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    return Object.keys(record)
      .sort((a, b) => a.localeCompare(b))
      .reduce<Record<string, unknown>>((sorted, key) => {
        sorted[key] = sortJson(record[key]);
        return sorted;
      }, {});
  }

  return value;
}

export function formatJson(
  input: string,
  mode: JsonMode,
  sortKeys: boolean,
): JsonFormatResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      output: "",
      error: null,
      stats: null,
    };
  }

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    const normalized = sortKeys ? sortJson(parsed) : parsed;
    const output = JSON.stringify(normalized, null, mode === "format" ? 2 : 0);

    return {
      output,
      error: null,
      stats: {
        inputBytes: new Blob([input]).size,
        outputBytes: new Blob([output]).size,
      },
    };
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "invalid json",
      stats: null,
    };
  }
}
