export type MimeEntry = {
  extension: string;
  mime: string;
  category: string;
};

export const MIME_TYPES: MimeEntry[] = [
  { extension: ".html", mime: "text/html", category: "text" },
  { extension: ".css", mime: "text/css", category: "text" },
  { extension: ".csv", mime: "text/csv", category: "text" },
  { extension: ".txt", mime: "text/plain", category: "text" },
  { extension: ".js", mime: "text/javascript", category: "code" },
  { extension: ".mjs", mime: "text/javascript", category: "code" },
  { extension: ".json", mime: "application/json", category: "data" },
  { extension: ".xml", mime: "application/xml", category: "data" },
  { extension: ".pdf", mime: "application/pdf", category: "document" },
  { extension: ".zip", mime: "application/zip", category: "archive" },
  { extension: ".gz", mime: "application/gzip", category: "archive" },
  { extension: ".png", mime: "image/png", category: "image" },
  { extension: ".jpg", mime: "image/jpeg", category: "image" },
  { extension: ".jpeg", mime: "image/jpeg", category: "image" },
  { extension: ".svg", mime: "image/svg+xml", category: "image" },
  { extension: ".webp", mime: "image/webp", category: "image" },
  { extension: ".mp3", mime: "audio/mpeg", category: "audio" },
  { extension: ".mp4", mime: "video/mp4", category: "video" },
  { extension: ".wasm", mime: "application/wasm", category: "binary" },
];

export function searchMimeTypes(query: string) {
  const needle = query.trim().toLowerCase().replace(/^\*/, "");
  return MIME_TYPES.filter(
    (entry) =>
      !needle ||
      entry.extension.includes(
        needle.startsWith(".") ? needle : `.${needle}`,
      ) ||
      entry.mime.toLowerCase().includes(needle) ||
      entry.category.includes(needle),
  );
}
