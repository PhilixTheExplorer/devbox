import { defineTool } from "../_define";

export default defineTool({
  id: "ipynb",
  name: "ipynb → pdf",
  category: "convert",
  description: "jupyter notebook to pdf. needs nbconvert server-side.",
  tags: ["jupyter", "notebook", "ipynb", "pdf", "python"],
  seo: {
    primaryKeyword: "ipynb to pdf",
    secondaryKeywords: [
      "jupyter notebook to pdf",
      "convert ipynb to pdf",
      "notebook to pdf",
      "jupyter pdf converter",
    ],
    longTailKeywords: [
      "convert jupyter notebook to pdf online",
      "export ipynb to pdf",
      "python notebook to pdf converter",
    ],
  },
  content: {
    overview:
      "Export Jupyter notebooks to PDF when server conversion is ready.",
    explanation:
      "The notebook to PDF tool is registered for future server-side nbconvert support, giving Python notebook users a direct export path from ipynb files.",
    highlights: [
      "Planned Jupyter notebook PDF export",
      "Designed for Python and data workflows",
      "Marked as coming soon until server support exists",
    ],
  },
  soon: true,
});
