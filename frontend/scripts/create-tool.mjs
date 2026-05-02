import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "src");
const allowedCategories = ["format", "convert", "generate", "inspect"];

const args = process.argv.slice(2);
const id = args[0];

function readFlag(name, fallback) {
  const index = args.indexOf(`--${name}`);
  if (index === -1) {
    return fallback;
  }

  return args[index + 1] ?? fallback;
}

function fail(message) {
  console.error(`create:tool: ${message}`);
  process.exit(1);
}

function toTitle(value) {
  return value.split("-").filter(Boolean).join(" ");
}

function toPascal(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join("");
}

function tsString(value) {
  return JSON.stringify(value);
}

function writeNewFile(path, content) {
  if (existsSync(path)) {
    fail(`${path} already exists`);
  }

  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function replaceInFile(path, replace) {
  const current = readFileSync(path, "utf8");
  const next = replace(current);

  if (next === current) {
    fail(`could not update ${path}`);
  }

  writeFileSync(path, next);
}

if (!id) {
  fail(
    'usage: pnpm create:tool <tool-id> [--category format] [--name "tool name"] [--description "..."]',
  );
}

if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id)) {
  fail("tool id must be kebab-case and start with a letter");
}

const category = readFlag("category", "format");
if (!allowedCategories.includes(category)) {
  fail(`category must be one of: ${allowedCategories.join(", ")}`);
}

const name = readFlag("name", toTitle(id));
const description = readFlag("description", `${toTitle(id)} tool.`);
const nameLiteral = tsString(name);
const pascal = toPascal(id);
const componentName = `${pascal}Tool`;

const componentPath = join(src, "components", "tools", `${id}.tsx`);
const logicPath = join(src, "lib", "tools", `${id}.ts`);
const testPath = join(src, "lib", "tools", `${id}.test.ts`);
const registryPath = join(src, "registry", "tools.ts");
const componentRegistryPath = join(src, "registry", "tool-components.tsx");

const registry = readFileSync(registryPath, "utf8");
if (registry.includes(`id: "${id}"`)) {
  fail(`${id} is already registered`);
}

writeNewFile(
  logicPath,
  `export function transform${pascal}(input: string) {
  return input.trim();
}
`,
);

writeNewFile(
  testPath,
  `import { describe, expect, it } from "vitest";
import { transform${pascal} } from "./${id}";

describe("${id} tool", () => {
  it("transforms input", () => {
    expect(transform${pascal}("  hello  ")).toBe("hello");
  });
});
`,
);

writeNewFile(
  componentPath,
  `"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { Btn } from "@/components/ui/button";
import { transform${pascal} } from "@/lib/tools/${id}";

const sampleInput = "hello";

export default function ${componentName}() {
  const [input, setInput] = useState(sampleInput);
  const output = useMemo(() => transform${pascal}(input), [input]);

  return (
    <TextToolLayout
      title={${nameLiteral}}
      input={input}
      output={output}
      placeholder={${nameLiteral}}
      onInputChange={setInput}
      controls={
        <>
          <Btn size="sm" variant="ghost" onClick={() => setInput(sampleInput)}>
            sample
          </Btn>
          <Btn size="sm" variant="danger" onClick={() => setInput("")} disabled={!input}>
            clear
          </Btn>
        </>
      }
      footer={
        <>
          <span>ready</span>
        </>
      }
    />
  );
}
`,
);

replaceInFile(registryPath, (current) =>
  current.replace(
    "export const TOOLS = [\n",
    `export const TOOLS = [
  {
    id: ${tsString(id)},
    name: ${tsString(name)},
    category: ${tsString(category)},
    description: ${tsString(description)},
    tags: [${tsString(id)}, ${tsString(category)}],
  },
`,
  ),
);

replaceInFile(componentRegistryPath, (current) => {
  const withImport = current.replace(
    "\ntype ToolComponent = ComponentType;",
    `
const ${componentName} = dynamic(() => import("@/components/tools/${id}"), {
  loading: ToolLoading,
});

type ToolComponent = ComponentType;`,
  );

  return withImport.replace(
    "export const TOOL_COMPONENTS = {\n",
    `export const TOOL_COMPONENTS = {
  ${id.includes("-") ? `"${id}"` : id}: ${componentName},
`,
  );
});

console.log(`created tool "${id}"`);
console.log(`- src/components/tools/${id}.tsx`);
console.log(`- src/lib/tools/${id}.ts`);
console.log(`- src/lib/tools/${id}.test.ts`);
console.log("- updated registry/tools.ts");
console.log("- updated registry/tool-components.tsx");
