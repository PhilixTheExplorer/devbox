import { defineTool } from "../_define";

export default defineTool({
  id: "markdown-preview",
  name: "markdown preview",
  category: "inspect",
  description: "preview markdown locally.",
  tags: ["markdown", "preview", "md", "inspect"],
  seo: {
    primaryKeyword: "markdown preview",
    secondaryKeywords: [
      "markdown viewer",
      "md preview",
      "markdown renderer",
      "preview markdown online",
    ],
    longTailKeywords: [
      "preview markdown in browser",
      "markdown preview without upload",
      "render markdown locally online",
    ],
  },
  content: {
    overview: "Render Markdown into a live preview.",
    explanation:
      "The Markdown preview tool shows how Markdown content will read after rendering, useful for README edits, release notes, documentation, and quick writing checks.",
    highlights: [
      "Preview Markdown formatting",
      "Check docs before publishing",
      "Render pasted Markdown locally",
    ],
  },
});
