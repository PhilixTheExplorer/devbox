export type JsonPathResult = {
  output: string;
  matches: unknown[];
  error: string | null;
};

function tokenizePath(path: string) {
  const source = path.trim();
  if (!source || source === "$") return [];
  if (!source.startsWith("$")) {
    throw new Error("Path must start with $.");
  }

  const tokens: string[] = [];
  let index = 1;

  while (index < source.length) {
    if (source[index] === ".") {
      index += 1;
      const match = /^[A-Za-z_$][\w$-]*/.exec(source.slice(index));
      if (!match) throw new Error("Invalid dot segment.");
      tokens.push(match[0]);
      index += match[0].length;
    } else if (source[index] === "[") {
      const end = source.indexOf("]", index);
      if (end === -1) throw new Error("Missing closing bracket.");
      const raw = source.slice(index + 1, end).trim();
      if (raw === "*") {
        tokens.push("*");
      } else if (/^\d+$/.test(raw)) {
        tokens.push(raw);
      } else {
        const quoted = /^["'](.+)["']$/.exec(raw);
        if (!quoted)
          throw new Error("Bracket segments need an index or quoted key.");
        tokens.push(quoted[1]);
      }
      index = end + 1;
    } else {
      throw new Error(`Unexpected token "${source[index]}".`);
    }
  }

  return tokens;
}

function select(nodes: unknown[], token: string) {
  const next: unknown[] = [];

  for (const node of nodes) {
    if (token === "*") {
      if (Array.isArray(node)) next.push(...node);
      else if (node && typeof node === "object")
        next.push(...Object.values(node));
      continue;
    }

    if (Array.isArray(node) && /^\d+$/.test(token)) {
      const value = node[Number(token)];
      if (value !== undefined) next.push(value);
      continue;
    }

    if (node && typeof node === "object" && token in node) {
      next.push((node as Record<string, unknown>)[token]);
    }
  }

  return next;
}

export function queryJsonPath(json: string, path: string): JsonPathResult {
  try {
    const data = JSON.parse(json);
    const tokens = tokenizePath(path);
    const matches = tokens.reduce(select, [data]);

    return {
      matches,
      error: null,
      output: JSON.stringify(
        matches.length === 1 ? matches[0] : matches,
        null,
        2,
      ),
    };
  } catch (error) {
    return {
      matches: [],
      error: error instanceof Error ? error.message : "Invalid JSON path.",
      output: "",
    };
  }
}
