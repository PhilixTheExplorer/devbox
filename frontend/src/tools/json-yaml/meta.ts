import { defineTool } from "../_define";

export default defineTool({
  id: "json-yaml",
  name: "json ↔ yaml",
  category: "convert",
  description: "convert json and yaml locally.",
  tags: ["json", "yaml", "convert", "config"],
  seo: {
    primaryKeyword: "json to yaml",
    secondaryKeywords: [
      "yaml to json",
      "json yaml converter",
      "convert json to yaml",
      "convert yaml to json",
    ],
    longTailKeywords: [
      "convert json to yaml in browser",
      "yaml to json without uploading",
      "config file converter online",
    ],
  },
  content: {
    overview: "Convert configuration data between JSON and YAML.",
    explanation:
      "The JSON YAML converter translates structured config formats for tools that prefer one syntax over the other, while preserving objects, arrays, and scalar values.",
    highlights: [
      "Convert JSON to YAML",
      "Convert YAML to JSON",
      "Validate config syntax while converting",
    ],
  },
});
