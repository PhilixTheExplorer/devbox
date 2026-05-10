import { defineTool } from "../_define";

export default defineTool({
  id: "uuid",
  name: "uuid generator",
  category: "generate",
  description:
    "universally unique. locally generated. cryptographically random.",
  tags: ["uuid", "guid", "id", "generate", "random"],
  seo: {
    primaryKeyword: "uuid generator",
    secondaryKeywords: [
      "guid generator",
      "random uuid",
      "uuid v4",
      "generate uuid",
    ],
    longTailKeywords: [
      "generate uuid v4 in browser",
      "random uuid generator without tracking",
      "local guid generator online",
    ],
  },
  content: {
    overview: "Generate random UUID v4 and GUID values locally.",
    explanation:
      "The UUID generator creates cryptographically random identifiers for tests, fixtures, database records, mock APIs, and any workflow that needs a unique id quickly.",
    highlights: [
      "Generate UUID v4 values locally",
      "Create batches of unique identifiers",
      "Copy random GUIDs for development use",
    ],
  },
});
