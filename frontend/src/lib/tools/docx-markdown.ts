import mammoth from "mammoth";

export type DocxMarkdownResult = {
  markdown: string;
  paragraphs: number;
  messages: string[];
  error: string | null;
};

export async function convertDocxToMarkdown(
  buffer: ArrayBuffer,
): Promise<DocxMarkdownResult> {
  try {
    const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
    const markdown = htmlToMarkdown(result.value).trim();

    return {
      markdown,
      paragraphs: markdown ? markdown.split(/\n{2,}/).length : 0,
      messages: result.messages.map((message) => message.message),
      error: null,
    };
  } catch (error) {
    return {
      markdown: "",
      paragraphs: 0,
      messages: [],
      error: error instanceof Error ? error.message : "Could not convert DOCX.",
    };
  }
}

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function escapeTableCell(value: string) {
  return cleanText(value).replace(/\|/g, "\\|");
}

function inlineMarkdown(node: Node): string {
  if (node.nodeType === 3) return node.textContent ?? "";
  if (node.nodeType !== 1) return "";

  const element = node as Element;
  const children = Array.from(element.childNodes).map(inlineMarkdown).join("");

  switch (element.tagName.toLowerCase()) {
    case "strong":
    case "b":
      return `**${children}**`;
    case "em":
    case "i":
      return `*${children}*`;
    case "s":
    case "strike":
    case "del":
      return `~~${children}~~`;
    case "code":
      return `\`${children}\``;
    case "a": {
      const href = element.getAttribute("href");
      return href ? `[${children}](${href})` : children;
    }
    case "br":
      return "\n";
    default:
      return children;
  }
}

function tableToMarkdown(table: Element) {
  const rows = Array.from(table.querySelectorAll("tr")).map((row) => {
    const cells = Array.from(row.children)
      .filter((cell) => ["td", "th"].includes(cell.tagName.toLowerCase()))
      .flatMap((cell) => {
        const colspan = Number(cell.getAttribute("colspan") ?? "1");
        return [
          escapeTableCell(inlineMarkdown(cell)),
          ...Array(Math.max(0, colspan - 1)).fill(""),
        ];
      });
    return cells;
  });

  if (!rows.length) return "";

  const width = Math.max(...rows.map((row) => row.length));
  const normalized = rows.map((row) => [
    ...row,
    ...Array(Math.max(0, width - row.length)).fill(""),
  ]);
  const header = normalized[0];
  const body = normalized.slice(1);
  const separator = Array(width).fill("---");
  const formatRow = (row: string[]) => `| ${row.join(" | ")} |`;

  return [formatRow(header), formatRow(separator), ...body.map(formatRow)].join(
    "\n",
  );
}

function blockMarkdown(node: Node): string {
  if (node.nodeType === 3) return cleanText(node.textContent ?? "");
  if (node.nodeType !== 1) return "";

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  switch (tagName) {
    case "h1":
      return `# ${cleanText(inlineMarkdown(element))}`;
    case "h2":
      return `## ${cleanText(inlineMarkdown(element))}`;
    case "h3":
      return `### ${cleanText(inlineMarkdown(element))}`;
    case "h4":
      return `#### ${cleanText(inlineMarkdown(element))}`;
    case "h5":
      return `##### ${cleanText(inlineMarkdown(element))}`;
    case "h6":
      return `###### ${cleanText(inlineMarkdown(element))}`;
    case "p":
      return cleanText(inlineMarkdown(element));
    case "pre":
      return `\`\`\`\n${element.textContent?.trimEnd() ?? ""}\n\`\`\``;
    case "blockquote":
      return Array.from(element.childNodes)
        .map(blockMarkdown)
        .filter(Boolean)
        .join("\n")
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
    case "ul":
      return Array.from(element.children)
        .filter((child) => child.tagName.toLowerCase() === "li")
        .map((child) => `- ${cleanText(inlineMarkdown(child))}`)
        .join("\n");
    case "ol":
      return Array.from(element.children)
        .filter((child) => child.tagName.toLowerCase() === "li")
        .map(
          (child, index) => `${index + 1}. ${cleanText(inlineMarkdown(child))}`,
        )
        .join("\n");
    case "table":
      return tableToMarkdown(element);
    default:
      return Array.from(element.childNodes)
        .map(blockMarkdown)
        .filter(Boolean)
        .join("\n\n");
  }
}

export function htmlToMarkdown(html: string) {
  if (typeof DOMParser === "undefined") {
    return html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
      .replace(/<[^>]+>/g, "")
      .trim();
  }

  const doc = new DOMParser().parseFromString(html, "text/html");
  return Array.from(doc.body.childNodes)
    .map(blockMarkdown)
    .filter(Boolean)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n");
}
