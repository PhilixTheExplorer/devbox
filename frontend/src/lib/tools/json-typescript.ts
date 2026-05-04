export type JsonTypescriptResult = {
  output: string;
  error: string | null;
};

function typeName(name: string) {
  const cleaned = name
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join("");
  return cleaned || "Root";
}

function propertyName(key: string) {
  return /^[a-zA-Z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
}

function mergeTypes(types: string[]) {
  return [...new Set(types)].sort().join(" | ");
}

function rootAliasName(
  rootName: string,
  rootType: string,
  declarations: string[],
) {
  const name = typeName(rootName);
  const hasNameConflict = declarations.some((declaration) =>
    declaration.startsWith(`export interface ${name} {`),
  );

  return rootType !== name && hasNameConflict ? `${name}Array` : name;
}

function inferType(
  value: unknown,
  name: string,
  declarations: string[],
): string {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (!value.length) return "unknown[]";
    return `Array<${mergeTypes(value.map((item) => inferType(item, name, declarations)))}>`;
  }

  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object": {
      const interfaceName = typeName(name);
      const entries = Object.entries(value as Record<string, unknown>);
      const body = entries
        .map(([key, next]) => {
          const optional = next === null ? "?" : "";
          return `  ${propertyName(key)}${optional}: ${inferType(
            next,
            key,
            declarations,
          )};`;
        })
        .join("\n");
      const declaration = `export interface ${interfaceName} {\n${body}\n}`;
      if (!declarations.includes(declaration)) declarations.push(declaration);
      return interfaceName;
    }
    default:
      return "unknown";
  }
}

export function jsonToTypescript(
  input: string,
  rootName = "Root",
): JsonTypescriptResult {
  try {
    const declarations: string[] = [];
    const rootType = inferType(JSON.parse(input), rootName, declarations);

    if (!declarations.length) {
      return {
        output: `export type ${typeName(rootName)} = ${rootType};`,
        error: null,
      };
    }

    if (rootType !== typeName(rootName)) {
      declarations.unshift(
        `export type ${rootAliasName(rootName, rootType, declarations)} = ${rootType};`,
      );
    }

    return { output: declarations.reverse().join("\n\n"), error: null };
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Invalid JSON.",
    };
  }
}
