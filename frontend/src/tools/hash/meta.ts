import { defineTool } from "../_define";

export default defineTool({
  id: "hash",
  name: "hash generator",
  category: "generate",
  description: "generate message digests locally.",
  tags: ["hash", "digest", "sha", "sha-256", "generate"],
  seo: {
    primaryKeyword: "hash generator",
    secondaryKeywords: [
      "sha256 generator",
      "sha hash generator",
      "message digest generator",
      "checksum generator",
    ],
    longTailKeywords: [
      "generate sha256 hash in browser",
      "hash text without uploading",
      "message digest generator online",
    ],
  },
  content: {
    overview: "Generate message digests and checksums from text.",
    explanation:
      "The hash generator creates digest values for copied text, helping compare content, document checksums, or produce quick SHA-style values in local workflows.",
    highlights: [
      "Generate common text hash values",
      "Compare deterministic message digests",
      "Keep source text client-side",
    ],
  },
});
