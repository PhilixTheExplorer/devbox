import { defineTool } from "../_define";

export default defineTool({
  id: "color-converter",
  name: "color converter",
  category: "convert",
  description: "convert color formats locally.",
  tags: ["color", "hex", "rgb", "hsl", "css", "convert"],
  seo: {
    primaryKeyword: "color converter",
    secondaryKeywords: [
      "hex to rgb",
      "rgb to hex",
      "hsl converter",
      "css color converter",
    ],
    longTailKeywords: [
      "convert hex to rgb in browser",
      "convert rgb to hsl online",
      "css color format converter",
    ],
  },
  content: {
    overview: "Convert CSS colors between hex, RGB, HSL, and related formats.",
    explanation:
      "The color converter helps translate design values into the format a stylesheet, design token, or component API expects while preserving the same visible color.",
    highlights: [
      "Convert common CSS color formats",
      "Inspect related color values quickly",
      "Copy browser-ready color output",
    ],
  },
});
