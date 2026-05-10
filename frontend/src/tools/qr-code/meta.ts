import { defineTool } from "../_define";

export default defineTool({
  id: "qr-code",
  name: "qr code generator",
  category: "generate",
  description: "generate qr codes online free.",
  tags: ["qr", "qrcode", "svg", "url", "generate", "png", "jpeg"],
  seo: {
    primaryKeyword: "qr code generator",
    secondaryKeywords: [
      "qr generator",
      "create qr code",
      "qr code svg",
      "url qr code generator",
    ],
    longTailKeywords: [
      "free online qr code generator",
      "qr generator online",
      "generate qr code in browser",
      "create qr code without uploading",
      "local svg qr code generator",
    ],
  },
  content: {
    overview: "Create QR codes for URLs, text, and short payloads.",
    explanation:
      "The QR code generator turns pasted content into scannable codes that can be exported for links, labels, presentations, and quick device handoff.",
    highlights: [
      "Generate QR codes in the browser",
      "Export QR output as common image formats",
      "Create codes without tracking or accounts",
    ],
  },
});
