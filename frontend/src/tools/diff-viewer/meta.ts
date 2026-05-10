import { defineTool } from "../_define";

export default defineTool({
  id: "diff-viewer",
  name: "diff viewer",
  category: "inspect",
  description: "compare two text snippets locally.",
  tags: ["diff", "compare", "patch", "text", "inspect"],
  seo: {
    primaryKeyword: "diff viewer",
    secondaryKeywords: [
      "text compare",
      "compare text online",
      "patch viewer",
      "text diff tool",
    ],
    longTailKeywords: [
      "compare two text snippets online",
      "diff viewer without uploading files",
      "browser text comparison tool",
    ],
  },
  content: {
    overview: "Compare two text snippets and inspect their differences.",
    explanation:
      "The diff viewer highlights additions, removals, and edits between two pieces of text so config changes, generated output, or copied snippets are easier to review.",
    highlights: [
      "Compare text side by side",
      "Highlight additions and removals",
      "Review changes without uploading files",
    ],
  },
});
