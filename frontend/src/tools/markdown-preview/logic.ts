export type MarkdownPreviewResult = {
  text: string;
  stats: {
    words: number;
    headings: number;
    links: number;
  };
};

export function getMarkdownPreviewStats(input: string): MarkdownPreviewResult {
  const text = input
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_\-[\]()`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    text,
    stats: {
      words: text ? text.split(/\s+/).length : 0,
      headings: (input.match(/^#{1,6}\s+/gm) ?? []).length,
      links: (input.match(/\[[^\]]+\]\([^)]+\)/g) ?? []).length,
    },
  };
}
