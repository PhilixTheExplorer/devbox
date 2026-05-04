import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

export type HtmlMarkdownMode = "html-to-markdown" | "markdown-to-html";

export type HtmlMarkdownResult = {
  output: string;
  error: string | null;
};

function createTurndown() {
  const service = new TurndownService({
    codeBlockStyle: "fenced",
    headingStyle: "atx",
    bulletListMarker: "-",
  });
  service.use(gfm);
  return service;
}

export function convertHtmlMarkdown(
  input: string,
  mode: HtmlMarkdownMode,
): HtmlMarkdownResult {
  try {
    if (mode === "html-to-markdown") {
      return {
        output: createTurndown().turndown(input).trim(),
        error: null,
      };
    }

    return {
      output: renderToStaticMarkup(
        createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, input),
      ),
      error: null,
    };
  } catch (error) {
    return {
      output: "",
      error:
        error instanceof Error ? error.message : "Could not convert input.",
    };
  }
}
