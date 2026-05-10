import { defineTool } from "../_define";

export default defineTool({
  id: "mime-type",
  name: "mime type lookup",
  category: "inspect",
  description: "look up mime types and file extensions locally.",
  tags: ["mime", "content-type", "extension", "file", "inspect"],
  seo: {
    primaryKeyword: "mime type lookup",
    secondaryKeywords: [
      "content type lookup",
      "file extension mime type",
      "mime type checker",
      "media type lookup",
    ],
    longTailKeywords: [
      "look up mime type by extension",
      "content type reference for developers",
      "file extension mime type lookup online",
    ],
  },
  content: {
    overview: "Look up MIME types, content types, and file extensions.",
    explanation:
      "The MIME type lookup helps map file extensions to media types and content-type headers for uploads, APIs, static assets, and browser responses.",
    highlights: [
      "Search by extension or MIME type",
      "Find content-type header values",
      "Use as a compact file type reference",
    ],
  },
});
