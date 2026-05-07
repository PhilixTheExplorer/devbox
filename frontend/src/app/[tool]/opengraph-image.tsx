import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/config/site";
import { getToolById, TOOLS } from "@/tools";

export const alt = `${SITE_NAME} developer tool`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type ToolImageProps = {
  params: Promise<{ tool: string }>;
};

export function generateStaticParams() {
  return TOOLS.map((tool) => ({
    tool: tool.id,
  }));
}

export default async function Image({ params }: ToolImageProps) {
  const { tool } = await params;
  const toolMeta = getToolById(tool);
  const name =
    toolMeta?.seo.primaryKeyword ?? toolMeta?.name ?? "developer tool";
  const description =
    toolMeta?.description ??
    "Fast, private, ad-free developer tools that run in your browser.";
  const category = toolMeta?.category ?? "tool";
  const siteLabel = `[${SITE_NAME}]`;
  const fullDescription = `${description} Free, ad-free, and private in your browser.`;

  return new ImageResponse(
    <div
      style={{
        background: "#0b0f14",
        color: "#e8edf2",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
        height: "100%",
        justifyContent: "space-between",
        padding: 72,
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "#52a878", fontSize: 32 }}>{siteLabel}</div>
        <div style={{ color: "#91a0ad", fontSize: 28 }}>{category}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            color: "#e8edf2",
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 920,
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: "#b9c4ce",
            fontSize: 36,
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          {fullDescription}
        </div>
      </div>
      <div
        style={{
          borderTop: "2px solid #23303a",
          color: "#91a0ad",
          display: "flex",
          fontSize: 28,
          gap: 28,
          paddingTop: 28,
        }}
      >
        <span>local first</span>
        <span>browser based</span>
        <span>developer safe</span>
      </div>
    </div>,
    size,
  );
}
