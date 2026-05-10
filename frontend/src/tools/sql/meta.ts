import { defineTool } from "../_define";

export default defineTool({
  id: "sql",
  name: "sql formatter",
  category: "format",
  description: "format sql queries locally.",
  tags: ["sql", "query", "database", "format", "formatter"],
  seo: {
    primaryKeyword: "sql formatter",
    secondaryKeywords: [
      "sql beautifier",
      "sql query formatter",
      "format sql online",
      "sql prettifier",
    ],
    longTailKeywords: [
      "format sql query in browser",
      "sql formatter without upload",
      "pretty print sql online",
    ],
  },
  content: {
    overview: "Make SQL queries easier to read, review, and share.",
    explanation:
      "The SQL formatter spaces and indents queries so joins, clauses, and nested statements are easier to scan during debugging, documentation, or code review.",
    highlights: [
      "Format common SQL query structure",
      "Improve readability for copied database queries",
      "Keep query text local to the browser",
    ],
  },
});
