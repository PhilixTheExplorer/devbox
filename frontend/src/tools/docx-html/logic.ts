import mammoth from "mammoth";

export type DocxHtmlResult = {
  html: string;
  messages: string[];
  error: string | null;
};

export async function convertDocxToHtml(
  buffer: ArrayBuffer,
): Promise<DocxHtmlResult> {
  try {
    const result = await mammoth.convertToHtml({ arrayBuffer: buffer });

    return {
      html: result.value.trim(),
      messages: result.messages.map((message) => message.message),
      error: null,
    };
  } catch (error) {
    return {
      html: "",
      messages: [],
      error: error instanceof Error ? error.message : "Could not convert DOCX.",
    };
  }
}
