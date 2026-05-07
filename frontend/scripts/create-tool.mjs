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

function toCamel(value) {
  const pascal = toPascal(value);
  return `${pascal[0]?.toLowerCase() ?? ""}${pascal.slice(1)}`;
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
const camel = toCamel(id);
const componentName = `${pascal}Tool`;
const idKey = id.includes("-") ? `"${id}"` : id;

const toolFolder = join(src, "tools", id);
const metaPath = join(toolFolder, "meta.ts");
const logicPath = join(toolFolder, "logic.ts");
const testPath = join(toolFolder, "logic.test.ts");
const uiPath = join(toolFolder, "ui.tsx");
const registryPath = join(src, "tools", "index.ts");
const componentsPath = join(src, "tools", "components.tsx");

const registry = readFileSync(registryPath, "utf8");
if (registry.includes(`from "./${id}/meta"`)) {
  fail(`${id} is already registered`);
}

writeNewFile(
  metaPath,
  `import { defineTool } from "../_define";

export default defineTool({
  id: ${tsString(id)},
  name: ${tsString(name)},
  category: ${tsString(category)},
  description: ${tsString(description)},
  tags: [${tsString(id)}, ${tsString(category)}],
  seo: {
    primaryKeyword: ${tsString(name)},
    secondaryKeywords: [],
    longTailKeywords: [],
  },
});
`,
);

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
import { transform${pascal} } from "./logic";

describe("${id} tool", () => {
  it("transforms input", () => {
    expect(transform${pascal}("  hello  ")).toBe("hello");
  });
});
`,
);

writeNewFile(
  uiPath,
  `"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { Btn } from "@/components/ui/button";
import { transform${pascal} } from "./logic";

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
      footer={<span>ready</span>}
    />
  );
}
`,
);

// Insert the meta import + array entry into src/tools/index.ts.
// Anchor on the last `from "./<id>/meta"` line so we survive Biome's
// import-sort without needing to know where the new import slots in.
replaceInFile(registryPath, (current) => {
  const metaImportRe = /^import \w+ from "\.\/[\w-]+\/meta";$/gm;
  let lastEnd = -1;
  for (const match of current.matchAll(metaImportRe)) {
    lastEnd = match.index + match[0].length;
  }
  if (lastEnd === -1) {
    fail("could not find any meta imports in src/tools/index.ts");
  }

  const withImport = `${current.slice(0, lastEnd)}\nimport ${camel} from "./${id}/meta";${current.slice(lastEnd)}`;

  return withImport.replace(
    "export const TOOLS = [\n",
    `export const TOOLS = [\n  ${camel},\n`,
  );
});

// Insert the dynamic import + map entry into src/tools/components.tsx.
replaceInFile(componentsPath, (current) => {
  const withImport = current.replace(
    "\nexport const TOOL_COMPONENTS = {\n",
    `\nconst ${componentName} = dynamic(() => import("./${id}/ui"), {
  loading: ToolLoading,
});

export const TOOL_COMPONENTS = {
`,
  );

  return withImport.replace(
    "export const TOOL_COMPONENTS = {\n",
    `export const TOOL_COMPONENTS = {\n  ${idKey}: ${componentName},\n`,
  );
});

console.log(`created tool "${id}"`);
console.log(`- src/tools/${id}/meta.ts`);
console.log(`- src/tools/${id}/ui.tsx`);
console.log(`- src/tools/${id}/logic.ts`);
console.log(`- src/tools/${id}/logic.test.ts`);
console.log("- updated src/tools/index.ts");
console.log("- updated src/tools/components.tsx");
