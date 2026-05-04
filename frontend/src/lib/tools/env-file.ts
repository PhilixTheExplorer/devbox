export type EnvEntry = {
  key: string;
  value: string;
  line: number;
  duplicate: boolean;
};

export type EnvFormatOptions = {
  sortKeys?: boolean;
  maskValues?: boolean;
};

export type EnvResult = {
  output: string;
  entries: EnvEntry[];
  warnings: string[];
};

function mask(value: string) {
  if (!value) return "";
  if (value.length <= 4) return "*".repeat(value.length);
  return `${value.slice(0, 2)}${"*".repeat(Math.min(value.length - 4, 12))}${value.slice(-2)}`;
}

export function formatEnvFile(
  input: string,
  options: EnvFormatOptions = {},
): EnvResult {
  const seen = new Map<string, number>();
  const entries: EnvEntry[] = [];
  const warnings: string[] = [];

  for (const [index, line] of input.split(/\r?\n/).entries()) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(trimmed);
    if (!match) {
      warnings.push(`Line ${index + 1} is not a valid KEY=value entry.`);
      continue;
    }

    const key = match[1];
    const duplicate = seen.has(key);
    if (duplicate) {
      warnings.push(
        `${key} is duplicated on lines ${seen.get(key)} and ${index + 1}.`,
      );
    } else {
      seen.set(key, index + 1);
    }

    entries.push({ key, value: match[2], line: index + 1, duplicate });
  }

  const sorted = options.sortKeys
    ? [...entries].sort((a, b) => a.key.localeCompare(b.key))
    : entries;

  return {
    entries,
    warnings,
    output: sorted
      .map(
        (entry) =>
          `${entry.key}=${options.maskValues ? mask(entry.value) : entry.value}`,
      )
      .join("\n"),
  };
}
