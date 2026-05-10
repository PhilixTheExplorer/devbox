import { defineTool } from "../_define";

export default defineTool({
  id: "json-csv",
  name: "json ↔ csv",
  category: "convert",
  description: "convert json and csv locally.",
  tags: ["json", "csv", "spreadsheet", "table", "convert"],
  seo: {
    primaryKeyword: "json to csv",
    secondaryKeywords: [
      "csv to json",
      "json csv converter",
      "convert json to csv",
      "convert csv to json",
    ],
    longTailKeywords: [
      "convert json array to csv online",
      "json to csv without uploading files",
      "csv to json browser tool",
    ],
  },
  content: {
    overview: "Convert JSON arrays and CSV tables back and forth.",
    explanation:
      "The JSON CSV converter helps move structured records between API-friendly JSON and spreadsheet-friendly CSV for inspection, cleanup, and lightweight data exchange.",
    highlights: [
      "Convert JSON arrays to CSV",
      "Convert CSV rows to JSON",
      "Preview structured data locally",
    ],
  },
});
