import { defineTool } from "../_define";

export default defineTool({
  id: "cron-parser",
  name: "cron parser",
  category: "inspect",
  description: "explain cron expressions and preview upcoming runs locally.",
  tags: ["cron", "schedule", "job", "time", "inspect"],
  seo: {
    primaryKeyword: "cron parser",
    secondaryKeywords: [
      "cron expression parser",
      "cron schedule preview",
      "cron explainer",
      "cron expression tester",
    ],
    longTailKeywords: [
      "explain cron expression online",
      "preview next cron run times",
      "cron parser in browser",
    ],
  },
  content: {
    overview: "Explain cron expressions and preview upcoming run times.",
    explanation:
      "The cron parser translates schedule expressions into plain language and lists upcoming runs, making jobs easier to verify before they reach production.",
    highlights: [
      "Explain cron syntax in readable text",
      "Preview the next scheduled runs",
      "Check schedules in the browser",
    ],
  },
});
