import { defineTool } from "../_define";

export default defineTool({
  id: "base64",
  name: "base64 encode/decode",
  category: "convert",
  description: "encode and decode base64 locally.",
  tags: ["base64", "encode", "decode", "convert"],
  seo: {
    primaryKeyword: "base64 decoder",
    secondaryKeywords: [
      "base64 encoder",
      "base64 encode",
      "base64 decode",
      "base64 converter",
    ],
    longTailKeywords: [
      "decode base64 in browser",
      "encode text to base64 online",
      "base64 converter without upload",
    ],
  },
  content: {
    overview: "Encode plain text to Base64 or decode Base64 back to text.",
    explanation:
      "The Base64 tool is useful for inspecting encoded payloads, quick config values, basic tokens, and transport-safe text while keeping every conversion client-side.",
    highlights: [
      "Switch between encode and decode modes",
      "Move output back into the input for quick round trips",
      "Convert text locally without network calls",
    ],
  },
});
