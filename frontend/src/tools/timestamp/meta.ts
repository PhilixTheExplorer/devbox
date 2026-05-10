import { defineTool } from "../_define";

export default defineTool({
  id: "timestamp",
  name: "unix timestamp",
  category: "convert",
  description: "convert unix timestamps and dates locally.",
  tags: ["unix", "timestamp", "time", "date", "epoch", "convert"],
  seo: {
    primaryKeyword: "unix timestamp converter",
    secondaryKeywords: [
      "epoch converter",
      "timestamp to date",
      "date to timestamp",
      "unix time converter",
    ],
    longTailKeywords: [
      "convert unix timestamp to date online",
      "date to epoch time converter",
      "timestamp converter in browser",
    ],
  },
  content: {
    overview: "Convert Unix timestamps, epoch values, and readable dates.",
    explanation:
      "The Unix timestamp converter turns epoch seconds or milliseconds into readable dates and converts dates back into timestamp values for logs, APIs, and debugging.",
    highlights: [
      "Convert timestamp values to dates",
      "Convert dates back to epoch time",
      "Inspect time values without leaving the page",
    ],
  },
});
