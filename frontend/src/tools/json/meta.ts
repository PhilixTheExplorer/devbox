import { defineTool } from "../_define";

export default defineTool({
  id: "json",
  name: "json formatter",
  category: "format",
  description: "format, minify, validate, and sort json locally.",
  tags: ["json", "format", "formatter", "minify", "validate", "sort"],
  seo: {
    primaryKeyword: "json formatter",
    secondaryKeywords: [
      "json validator",
      "json beautifier",
      "json minifier",
      "format json online",
    ],
    longTailKeywords: [
      "format json without uploading files",
      "validate json in browser",
      "sort json keys online",
    ],
  },
  content: {
    overview:
      "Format, minify, validate, and sort JSON without sending data away.",
    explanation:
      "The JSON formatter turns dense payloads into readable structure, reports parse errors, and can produce compact JSON for APIs, config files, logs, and clipboard workflows.",
    highlights: [
      "Beautify or minify JSON payloads",
      "Optionally sort object keys for stable diffs",
      "Validate syntax directly in the browser",
    ],
  },
});
