import { defineTool } from "../_define";

export default defineTool({
  id: "regex",
  name: "regex tester",
  category: "inspect",
  description: "test regular expressions against sample text locally.",
  tags: ["regex", "regexp", "pattern", "match", "inspect"],
  seo: {
    primaryKeyword: "regex tester",
    secondaryKeywords: [
      "regular expression tester",
      "regexp tester",
      "regex matcher",
      "test regex online",
    ],
    longTailKeywords: [
      "test regular expressions in browser",
      "regex tester without uploading text",
      "javascript regex tester online",
    ],
  },
  content: {
    overview: "Test JavaScript regular expressions against sample text.",
    explanation:
      "The regex tester runs patterns against input text so matches, groups, and flags can be checked before a regular expression is copied into code.",
    highlights: [
      "Test regex patterns in the browser",
      "Inspect matches against sample input",
      "Iterate on JavaScript regular expressions",
    ],
  },
});
