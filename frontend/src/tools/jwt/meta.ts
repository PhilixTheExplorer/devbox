import { defineTool } from "../_define";

export default defineTool({
  id: "jwt",
  name: "jwt decoder",
  category: "inspect",
  description: "decode jwt headers and payloads locally.",
  tags: ["jwt", "token", "decode", "inspect", "header", "payload"],
  seo: {
    primaryKeyword: "jwt decoder",
    secondaryKeywords: [
      "jwt parser",
      "decode jwt token",
      "jwt payload viewer",
      "jwt header decoder",
    ],
    longTailKeywords: [
      "decode jwt without uploading",
      "view jwt payload in browser",
      "jwt decoder without tracking",
    ],
  },
});
