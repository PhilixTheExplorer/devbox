export type ColorResult = {
  hex: string;
  rgb: string;
  hsl: string;
  css: string;
  preview: string;
  error: string | null;
};

type Rgb = { r: number; g: number; b: number; a: number };

function clamp(value: number, max = 255) {
  return Math.min(max, Math.max(0, value));
}

function parseHex(input: string): Rgb | null {
  const value = input.trim().replace(/^#/, "");
  if (![3, 4, 6, 8].includes(value.length) || /[^a-f0-9]/i.test(value)) {
    return null;
  }

  const expanded =
    value.length <= 4
      ? value
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : value;

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
    a:
      expanded.length === 8
        ? Number.parseInt(expanded.slice(6, 8), 16) / 255
        : 1,
  };
}

function parseRgb(input: string): Rgb | null {
  const match = /^rgba?\(([^)]+)\)$/i.exec(input.trim());
  if (!match) return null;
  const parts = match[1]
    .split(/[,/ ]+/)
    .filter(Boolean)
    .map(Number);
  if (parts.length < 3 || parts.some(Number.isNaN)) return null;
  return {
    r: clamp(parts[0]),
    g: clamp(parts[1]),
    b: clamp(parts[2]),
    a: parts[3] === undefined ? 1 : clamp(parts[3], 1),
  };
}

function hueToRgb(p: number, q: number, t: number) {
  let next = t;
  if (next < 0) next += 1;
  if (next > 1) next -= 1;
  if (next < 1 / 6) return p + (q - p) * 6 * next;
  if (next < 1 / 2) return q;
  if (next < 2 / 3) return p + (q - p) * (2 / 3 - next) * 6;
  return p;
}

function parseHsl(input: string): Rgb | null {
  const match = /^hsla?\(([^)]+)\)$/i.exec(input.trim());
  if (!match) return null;
  const parts = match[1].split(/[,/ ]+/).filter(Boolean);
  if (parts.length < 3) return null;

  const h = ((Number(parts[0]) % 360) + 360) % 360;
  const s = Number(parts[1].replace("%", "")) / 100;
  const l = Number(parts[2].replace("%", "")) / 100;
  const a = parts[3] === undefined ? 1 : clamp(Number(parts[3]), 1);
  if ([h, s, l, a].some(Number.isNaN)) return null;

  if (s === 0) {
    const gray = Math.round(l * 255);
    return { r: gray, g: gray, b: gray, a };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hueToRgb(p, q, h / 360 + 1 / 3) * 255),
    g: Math.round(hueToRgb(p, q, h / 360) * 255),
    b: Math.round(hueToRgb(p, q, h / 360 - 1 / 3) * 255),
    a,
  };
}

function toHexByte(value: number) {
  return Math.round(value).toString(16).padStart(2, "0");
}

function toHsl({ r, g, b, a }: Rgb) {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  const lightness = (max + min) / 2;
  let hue = 0;
  let saturation = 0;

  if (max !== min) {
    const delta = max - min;
    saturation =
      lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    if (max === nr) hue = (ng - nb) / delta + (ng < nb ? 6 : 0);
    else if (max === ng) hue = (nb - nr) / delta + 2;
    else hue = (nr - ng) / delta + 4;
    hue *= 60;
  }

  const base = `${Math.round(hue)} ${Math.round(saturation * 100)}% ${Math.round(
    lightness * 100,
  )}%`;
  return a === 1 ? `hsl(${base})` : `hsl(${base} / ${Number(a.toFixed(2))})`;
}

export function convertColor(input: string): ColorResult {
  const rgb = parseHex(input) ?? parseRgb(input) ?? parseHsl(input);
  if (!rgb) {
    return {
      hex: "",
      rgb: "",
      hsl: "",
      css: "",
      preview: "transparent",
      error: "Enter a hex, rgb(), rgba(), hsl(), or hsla() color.",
    };
  }

  const alphaHex = rgb.a === 1 ? "" : toHexByte(rgb.a * 255);
  const hex = `#${toHexByte(rgb.r)}${toHexByte(rgb.g)}${toHexByte(rgb.b)}${alphaHex}`;
  const rgbParts = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  const rgbText =
    rgb.a === 1
      ? `rgb(${rgbParts})`
      : `rgba(${rgbParts}, ${Number(rgb.a.toFixed(2))})`;

  return {
    hex,
    rgb: rgbText,
    hsl: toHsl(rgb),
    css: `color: ${hex};`,
    preview: rgbText,
    error: null,
  };
}
