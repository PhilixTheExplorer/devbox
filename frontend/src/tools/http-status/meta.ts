import { defineTool } from "../_define";

export default defineTool({
  id: "http-status",
  name: "http status codes",
  category: "inspect",
  description: "look up http status codes and meanings locally.",
  tags: ["http", "status", "code", "response", "inspect"],
  seo: {
    primaryKeyword: "http status codes",
    secondaryKeywords: [
      "status code lookup",
      "http response codes",
      "http code meanings",
      "http status lookup",
    ],
    longTailKeywords: [
      "look up http status codes online",
      "http response code meaning",
      "developer http status code reference",
    ],
  },
  content: {
    overview: "Look up HTTP status codes and their meanings.",
    explanation:
      "The HTTP status code reference helps identify response classes, common meanings, and debugging hints while working with APIs, logs, network traces, or docs.",
    highlights: [
      "Search common HTTP response codes",
      "Filter by status class",
      "Use as a quick developer reference",
    ],
  },
});
