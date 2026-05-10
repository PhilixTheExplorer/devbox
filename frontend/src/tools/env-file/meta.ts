import { defineTool } from "../_define";

export default defineTool({
  id: "env-file",
  name: "env file formatter",
  category: "format",
  description: "format, sort, and inspect env files locally.",
  tags: ["env", "dotenv", "environment", "secret", "format"],
  seo: {
    primaryKeyword: "env formatter",
    secondaryKeywords: [
      "dotenv formatter",
      "env file formatter",
      "env sorter",
      "environment variable formatter",
    ],
    longTailKeywords: [
      "format env files without uploading",
      "sort environment variables online",
      "validate dotenv files in browser",
    ],
  },
  content: {
    overview:
      "Clean up dotenv and env files while keeping values in your browser.",
    explanation:
      "The env file formatter organizes environment variables, keeps comments readable, and helps spot malformed lines before a config file reaches a deployment or teammate.",
    highlights: [
      "Format and sort dotenv-style key value pairs",
      "Inspect duplicate or invalid environment entries",
      "Work locally without uploading secrets",
    ],
  },
});
