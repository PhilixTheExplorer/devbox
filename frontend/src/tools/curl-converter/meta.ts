import { defineTool } from "../_define";

export default defineTool({
  id: "curl-converter",
  name: "curl converter",
  category: "convert",
  description: "convert curl commands into fetch snippets locally.",
  tags: ["curl", "fetch", "http", "request", "convert"],
  seo: {
    primaryKeyword: "curl to fetch",
    secondaryKeywords: [
      "curl converter",
      "convert curl command",
      "fetch generator",
      "curl to javascript",
    ],
    longTailKeywords: [
      "convert curl to fetch in browser",
      "generate javascript fetch from curl",
      "curl command converter without upload",
    ],
  },
  content: {
    overview: "Turn curl commands into JavaScript fetch snippets.",
    explanation:
      "The curl converter extracts method, headers, body, and URL details from a command and produces fetch code that is easier to paste into scripts or browser tests.",
    highlights: [
      "Convert curl requests to fetch",
      "Preserve headers, methods, and request bodies",
      "Prototype HTTP calls without uploading commands",
    ],
  },
});
