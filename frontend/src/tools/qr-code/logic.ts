import qrcode from "qrcode-generator";

const MAX_BYTES = 2048;

export type QrCorrectionLevel = "L" | "M" | "Q" | "H";
export type QrModuleShape = "square" | "rounded" | "dots";

export type QrCodeResult =
  | {
      ok: true;
      byteLength: number;
      moduleCount: number;
      svg: string;
      dataUrl: string;
    }
  | {
      ok: false;
      byteLength: number;
      error: string;
    };

export function createQrCodeSvg(
  input: string,
  options: {
    correctionLevel?: QrCorrectionLevel;
    foreground?: string;
    background?: string;
    shape?: QrModuleShape;
    logoDataUrl?: string | null;
    logoSize?: number;
    logoBackground?: boolean;
    margin?: number;
    scale?: number;
  } = {},
): QrCodeResult {
  const bytes = new TextEncoder().encode(input);

  if (!input) {
    return { ok: false, byteLength: 0, error: "enter text to encode" };
  }

  if (bytes.length > MAX_BYTES) {
    return {
      ok: false,
      byteLength: bytes.length,
      error: `too long (${bytes.length}/${MAX_BYTES} bytes)`,
    };
  }

  try {
    const qr = qrcode(0, options.correctionLevel ?? "M");
    qr.addData(input, "Byte");
    qr.make();

    const svg = renderSvg({
      background: sanitizeHexColor(options.background, "#ffffff"),
      foreground: sanitizeHexColor(options.foreground, "#000000"),
      logoBackground: options.logoBackground ?? true,
      logoDataUrl: sanitizeLogoDataUrl(options.logoDataUrl),
      logoSize: clampInteger(options.logoSize ?? 20, 8, 30),
      margin: clampInteger(options.margin ?? 3, 0, 8),
      moduleCount: qr.getModuleCount(),
      scale: clampInteger(options.scale ?? 8, 2, 16),
      shape: options.shape ?? "square",
      isDark: (row, col) => qr.isDark(row, col),
    });

    return {
      ok: true,
      byteLength: bytes.length,
      moduleCount: qr.getModuleCount(),
      svg,
      dataUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    };
  } catch {
    return {
      ok: false,
      byteLength: bytes.length,
      error: "could not encode this input",
    };
  }
}

function clampInteger(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

function sanitizeHexColor(value: string | undefined, fallback: string) {
  return value && /^#[\da-f]{6}$/i.test(value) ? value : fallback;
}

function sanitizeLogoDataUrl(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  return /^data:image\/(?:png|jpeg|webp);base64,/i.test(value) ? value : null;
}

function escapeAttribute(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function renderSvg({
  background,
  foreground,
  isDark,
  logoBackground,
  logoDataUrl,
  logoSize,
  margin,
  moduleCount,
  scale,
  shape,
}: {
  background: string;
  foreground: string;
  isDark: (row: number, col: number) => boolean;
  logoBackground: boolean;
  logoDataUrl: string | null;
  logoSize: number;
  margin: number;
  moduleCount: number;
  scale: number;
  shape: QrModuleShape;
}) {
  const viewSize = moduleCount + margin * 2;
  const pixelSize = viewSize * scale;
  const modules: string[] = [];

  for (let row = 0; row < moduleCount; row += 1) {
    for (let col = 0; col < moduleCount; col += 1) {
      if (!isDark(row, col)) {
        continue;
      }

      const x = col + margin;
      const y = row + margin;

      if (shape === "dots") {
        modules.push(`<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.42"/>`);
      } else {
        const radius = shape === "rounded" ? ' rx="0.28" ry="0.28"' : "";
        modules.push(`<rect x="${x}" y="${y}" width="1" height="1"${radius}/>`);
      }
    }
  }

  const logo = logoDataUrl
    ? renderLogo({
        background,
        logoBackground,
        logoDataUrl,
        logoSize,
        viewSize,
      })
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${pixelSize}" height="${pixelSize}" viewBox="0 0 ${viewSize} ${viewSize}" shape-rendering="geometricPrecision"><rect width="100%" height="100%" fill="${background}"/><g fill="${foreground}">${modules.join("")}</g>${logo}</svg>`;
}

function renderLogo({
  background,
  logoBackground,
  logoDataUrl,
  logoSize,
  viewSize,
}: {
  background: string;
  logoBackground: boolean;
  logoDataUrl: string;
  logoSize: number;
  viewSize: number;
}) {
  const size = viewSize * (logoSize / 100);
  const x = (viewSize - size) / 2;
  const padding = size * 0.18;
  const backing = logoBackground
    ? `<rect x="${x - padding}" y="${x - padding}" width="${size + padding * 2}" height="${size + padding * 2}" rx="${padding}" fill="${background}"/>`
    : "";

  return `${backing}<image href="${escapeAttribute(logoDataUrl)}" x="${x}" y="${x}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>`;
}
