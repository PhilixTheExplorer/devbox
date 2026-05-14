import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_DISPLAY_NAME, SITE_NAME } from "@/config/site";

export const alt = `${SITE_NAME} developer tools`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
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
        <div style={{ color: "#52a878", fontSize: 32 }}>dev tools</div>
        <div style={{ color: "#91a0ad", fontSize: 28 }}>private by default</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 800 }}>
          <span style={{ color: "#52a878" }}>[</span>
          <span>{SITE_DISPLAY_NAME}</span>
          <span style={{ color: "#52a878" }}>]</span>
        </div>
        <div
          style={{
            color: "#b9c4ce",
            fontSize: 38,
            lineHeight: 1.35,
            maxWidth: 880,
          }}
        >
          {SITE_DESCRIPTION}
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
        <span>no ads</span>
        <span>no accounts</span>
        <span>no tracking</span>
      </div>
    </div>,
    size,
  );
}
