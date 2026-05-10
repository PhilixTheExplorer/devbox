import { defineTool } from "../_define";

export default defineTool({
  id: "json-typescript",
  name: "json → typescript",
  category: "convert",
  description: "infer typescript types from json locally.",
  tags: ["json", "typescript", "interface", "type", "convert"],
  seo: {
    primaryKeyword: "json to typescript",
    secondaryKeywords: [
      "json to interface",
      "typescript type generator",
      "json to ts",
      "generate typescript from json",
    ],
    longTailKeywords: [
      "infer typescript types from json online",
      "generate interface from json in browser",
      "json to typescript without upload",
    ],
  },
  content: {
    overview: "Generate TypeScript types from sample JSON.",
    explanation:
      "The JSON to TypeScript tool infers type shapes from example payloads so API responses, config files, and fixtures can become typed interfaces faster.",
    highlights: [
      "Infer TypeScript from JSON samples",
      "Create readable type definitions",
      "Speed up API and fixture typing",
    ],
  },
});
