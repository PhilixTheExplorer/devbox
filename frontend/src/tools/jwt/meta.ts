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
  content: {
    overview: "Decode JWT headers and payloads in the browser.",
    explanation:
      "The JWT decoder displays token header and payload data so claims, expiry values, issuers, and scopes can be inspected without sending the token to a server.",
    highlights: [
      "Decode JWT header and payload sections",
      "Inspect token claims locally",
      "Avoid uploading sensitive tokens",
    ],
  },
});
