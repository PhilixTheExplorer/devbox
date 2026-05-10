import { defineTool } from "../_define";

export default defineTool({
  id: "case-converter",
  name: "case converter",
  category: "convert",
  description: "convert text between common identifier cases locally.",
  tags: ["case", "camel", "pascal", "snake", "kebab", "format", "convert"],
  seo: {
    primaryKeyword: "case converter",
    secondaryKeywords: [
      "camel case converter",
      "snake case converter",
      "kebab case converter",
      "pascal case converter",
    ],
    longTailKeywords: [
      "convert text to camel case online",
      "convert snake case to camel case",
      "identifier case converter in browser",
    ],
  },
  content: {
    overview:
      "Convert identifiers between camel, pascal, snake, kebab, and title case.",
    explanation:
      "The case converter reshapes labels, constants, filenames, and code identifiers so pasted text matches the naming convention used by a project or API.",
    highlights: [
      "Convert between common developer naming styles",
      "Handle multi-line text and repeated identifiers",
      "Prepare names for code, docs, and config",
    ],
  },
});
