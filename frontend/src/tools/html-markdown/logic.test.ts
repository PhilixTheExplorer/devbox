import { describe, expect, it } from "vitest";
import { convertHtmlMarkdown } from "./logic";

describe("html-markdown tool", () => {
  it("converts html tables to markdown tables", () => {
    const result = convertHtmlMarkdown(
      "<table><tr><th>A</th></tr><tr><td>B</td></tr></table>",
      "html-to-markdown",
    );

    expect(result.output).toContain("| A |");
    expect(result.output).toContain("| B |");
  });

  it("converts markdown to html", () => {
    const result = convertHtmlMarkdown("# Hello", "markdown-to-html");

    expect(result.output).toContain("<h1>");
  });
});
