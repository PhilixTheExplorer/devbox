"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Btn } from "@/components/ui/button";
import { CopyBtn } from "@/components/ui/copy-button";
import { ToolTextarea } from "@/components/ui/textarea";
import { getMarkdownPreviewStats } from "@/lib/tools/markdown-preview";

const sampleInput = `# Devbox Markdown Rulebook

This example shows common Markdown and GFM rules used in devbox docs.

## Heading Levels
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

## Emphasis
- **Bold text**
- *Italic text*
- ***Bold + italic***
- ~~Strikethrough~~
- Inline code: \`pnpm test:tool regex\`

## Links
- [Devbox Website](https://thedevbox.org)
- <https://github.com/PhilixTheExplorer/devbox>

## Blockquote
> Devbox tools run client-side.
> No telemetry by default.

## Lists
- JSON Formatter
- Regex Tester
- Timestamp Converter

1. Open devbox
2. Pick a tool
3. Copy the output

- [x] Ship base tools
- [x] Add unit tests
- [ ] Publish full docs

## Table
| Tool | Category | Status |
| --- | --- | --- |
| JSON Formatter | text | ready |
| Regex Tester | text | ready |
| IPYNB to PDF | convert | soon |

## Code Fences

\`\`\`bash
pnpm lint
pnpm test:tool regex
\`\`\`

\`\`\`ts
type DevboxTool = {
  id: string;
  cat: "text" | "convert";
  soon: boolean;
};
\`\`\`

\`\`\`json
{
  "name": "devbox",
  "openSource": true,
  "license": "MIT"
}
\`\`\`

## Horizontal Rule

---

## Image
![Devbox Banner](https://dummyimage.com/640x120/2a7a50/f4f0e6&text=devbox+markdown+preview)`;

export default function MarkdownPreviewTool() {
  const [input, setInput] = useState(sampleInput);
  const result = useMemo(() => getMarkdownPreviewStats(input), [input]);

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            markdown preview
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Btn
              size="sm"
              variant="ghost"
              onClick={() => setInput(sampleInput)}
            >
              sample
            </Btn>
            <Btn
              size="sm"
              variant="danger"
              onClick={() => setInput("")}
              disabled={!input}
            >
              clear
            </Btn>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="min-w-0">
            <PaneHeader label="markdown" />
            <ToolTextarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="# hello"
              rows={20}
              className="h-tool-editor min-h-tool-editor resize-none text-xs lg:h-tool-editor-lg"
            />
          </div>

          <div className="min-w-0">
            <PaneHeader label="preview">
              <CopyBtn text={result.text} disabled={!result.text} />
            </PaneHeader>
            <div className="h-tool-editor min-h-tool-editor overflow-auto rounded-sm border border-border bg-bg px-4 py-3 text-ui leading-relaxed text-text lg:h-tool-editor-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent underline"
                    >
                      {children}
                    </a>
                  ),
                  code: ({ children }) => (
                    <code className="rounded-sm border border-border bg-surface px-1 text-xs">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="mb-3 overflow-auto rounded-sm border border-border bg-surface px-3 py-2 text-xs">
                      {children}
                    </pre>
                  ),
                  table: ({ children }) => (
                    <div className="mb-3 overflow-auto">
                      <table className="w-full border-collapse text-xs">
                        {children}
                      </table>
                    </div>
                  ),
                  td: ({ children }) => (
                    <td className="border border-border px-2 py-1">
                      {children}
                    </td>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border px-2 py-1 text-left text-muted2">
                      {children}
                    </th>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-3 list-disc pl-5">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-3 list-decimal pl-5">{children}</ol>
                  ),
                  p: ({ children }) => <p className="mb-3">{children}</p>,
                  blockquote: ({ children }) => (
                    <blockquote className="mb-3 border-l-2 border-accent pl-3 text-muted2">
                      {children}
                    </blockquote>
                  ),
                  hr: () => <hr className="my-4 border-border" />,
                  img: ({ alt, src }) => (
                    // biome-ignore lint/performance/noImgElement: Markdown preview renders arbitrary user-authored image URLs.
                    <img
                      src={src}
                      alt={alt ?? ""}
                      className="mb-3 max-w-full rounded-sm border border-border"
                    />
                  ),
                  input: ({ checked, type }) => (
                    <input
                      type={type}
                      checked={checked}
                      readOnly
                      className="mr-2 align-middle accent-accent"
                    />
                  ),
                  h1: ({ children }) => (
                    <h1 className="mb-2 text-2xl font-normal">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-2 text-xl font-normal">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-2 text-lg font-normal">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="mb-2 text-ui font-normal text-muted2">
                      {children}
                    </h4>
                  ),
                  h5: ({ children }) => (
                    <h5 className="mb-2 text-xs font-normal text-muted2">
                      {children}
                    </h5>
                  ),
                  h6: ({ children }) => (
                    <h6 className="mb-2 text-ui-xs font-normal text-muted">
                      {children}
                    </h6>
                  ),
                }}
              >
                {input}
              </ReactMarkdown>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{result.stats.words} words</span>
          <span>{result.stats.headings} headings</span>
          <span>{result.stats.links} links</span>
          <span>gfm enabled</span>
        </footer>
      </div>
    </div>
  );
}

function PaneHeader({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-1.5 flex min-h-status-bar-compact items-center justify-between gap-3">
      <div className="text-2xs text-muted tracking-widest uppercase">
        {label}
      </div>
      {children}
    </div>
  );
}
