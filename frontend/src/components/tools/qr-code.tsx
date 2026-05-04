"use client";

import NextImage from "next/image";
import { type ChangeEvent, useMemo, useRef, useState } from "react";
import {
  ToolCheckbox,
  ToolSegmentedControl,
} from "@/components/tool-kit/tool-controls";
import { Btn, CopyBtn, SectionLabel, ToolTextarea } from "@/components/ui";
import {
  createQrCodeSvg,
  type QrCorrectionLevel,
  type QrModuleShape,
} from "@/lib/tools/qr-code";

const sampleInput = "https://www.thedevbox.org";
const allowedLogoTypes = new Set(["image/png", "image/jpeg", "image/webp"]);
const maxLogoBytes = 1024 * 1024;
const maxLogoPixels = 2048;

export default function QrCodeTool() {
  const [input, setInput] = useState(sampleInput);
  const [correctionLevel, setCorrectionLevel] =
    useState<QrCorrectionLevel>("H");
  const [shape, setShape] = useState<QrModuleShape>("square");
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoName, setLogoName] = useState("");
  const [logoError, setLogoError] = useState("");
  const [logoSize, setLogoSize] = useState(18);
  const [logoBackground, setLogoBackground] = useState(true);
  const [margin, setMargin] = useState(3);
  const [scale, setScale] = useState(8);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const result = useMemo(
    () =>
      createQrCodeSvg(input, {
        background,
        correctionLevel,
        foreground,
        logoBackground,
        logoDataUrl,
        logoSize,
        margin,
        scale,
        shape,
      }),
    [
      background,
      correctionLevel,
      foreground,
      input,
      logoBackground,
      logoDataUrl,
      logoSize,
      margin,
      scale,
      shape,
    ],
  );

  const downloadSvg = () => {
    if (!result.ok) {
      return;
    }

    const blob = new Blob([result.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadRaster = (type: "image/png" | "image/jpeg") => {
    if (!result.ok) {
      return;
    }

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          const extension = type === "image/png" ? "png" : "jpg";
          link.href = url;
          link.download = `qr-code.${extension}`;
          link.click();
          URL.revokeObjectURL(url);
        },
        type,
        0.92,
      );
    };
    image.src = result.dataUrl;
  };

  const uploadLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setLogoError("");

    if (!file) {
      return;
    }

    if (!allowedLogoTypes.has(file.type)) {
      setLogoDataUrl(null);
      setLogoName("");
      setLogoError("use png, jpg, or webp");
      event.target.value = "";
      return;
    }

    if (file.size > maxLogoBytes) {
      setLogoDataUrl(null);
      setLogoName("");
      setLogoError("logo must be 1 MB or smaller");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setLogoError("could not read logo");
        return;
      }

      validateLogoDimensions(reader.result).then((valid) => {
        if (!valid) {
          setLogoDataUrl(null);
          setLogoName("");
          setLogoError(`logo must be ${maxLogoPixels}px or smaller`);
          event.target.value = "";
          return;
        }

        setLogoDataUrl(reader.result as string);
        setLogoName(file.name);
        event.target.value = "";
      });
    };
    reader.onerror = () => setLogoError("could not read logo");
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    setLogoDataUrl(null);
    setLogoName("");
    setLogoError("");
  };

  return (
    <div className="box-border h-full overflow-hidden px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex h-full min-h-0 max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            qr code generator
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <Btn
              size="sm"
              variant="ghost"
              onClick={() => setInput(sampleInput)}
            >
              sample
            </Btn>
            <Btn
              size="sm"
              variant="danger"
              onClick={() => setInput("")}
              disabled={!input}
            >
              clear
            </Btn>
            <CopyBtn text={result.ok ? result.svg : ""} disabled={!result.ok} />
            <Btn
              size="sm"
              variant="accent"
              onClick={downloadSvg}
              disabled={!result.ok}
            >
              download svg
            </Btn>
            <Btn
              size="sm"
              variant="default"
              onClick={() => downloadRaster("image/png")}
              disabled={!result.ok}
            >
              png
            </Btn>
            <Btn
              size="sm"
              variant="default"
              onClick={() => downloadRaster("image/jpeg")}
              disabled={!result.ok}
            >
              jpg
            </Btn>
          </div>
        </header>

        <section className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(17rem,1.2fr)]">
          <div className="min-h-0 min-w-0 overflow-auto pr-1">
            <SectionLabel>text</SectionLabel>
            <ToolTextarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="text or url"
              rows={10}
              className="min-h-52 resize-y text-xs lg:h-72"
            />

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <SectionLabel>error correction</SectionLabel>
              <ToolSegmentedControl
                value={correctionLevel}
                options={[
                  { value: "L", label: "L" },
                  { value: "M", label: "M" },
                  { value: "Q", label: "Q" },
                  { value: "H", label: "H" },
                ]}
                onChange={setCorrectionLevel}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <SectionLabel>shape</SectionLabel>
              <ToolSegmentedControl
                value={shape}
                options={[
                  { value: "square", label: "square" },
                  { value: "rounded", label: "rounded" },
                  { value: "dots", label: "dots" },
                ]}
                onChange={setShape}
              />
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <ColorField
                label="foreground"
                value={foreground}
                onChange={setForeground}
              />
              <ColorField
                label="background"
                value={background}
                onChange={setBackground}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <SectionLabel>quiet zone</SectionLabel>
              <ToolSegmentedControl
                value={margin}
                options={[
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                  { value: 6, label: "6" },
                ]}
                onChange={setMargin}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <SectionLabel>logo</SectionLabel>
              <Btn
                size="sm"
                variant="default"
                onClick={() => logoInputRef.current?.click()}
              >
                upload
              </Btn>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={uploadLogo}
                className="hidden"
                tabIndex={-1}
              />
              <Btn
                size="sm"
                variant="danger"
                onClick={clearLogo}
                disabled={!logoDataUrl && !logoError}
              >
                remove
              </Btn>
              <ToolCheckbox
                checked={logoBackground}
                label="logo backing"
                onChange={setLogoBackground}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <SectionLabel>logo size</SectionLabel>
              <ToolSegmentedControl
                value={logoSize}
                options={[
                  { value: 12, label: "12%" },
                  { value: 18, label: "18%" },
                  { value: 24, label: "24%" },
                  { value: 30, label: "30%" },
                ]}
                onChange={setLogoSize}
              />
              <span
                className="min-h-4 max-w-full truncate text-ui-xs text-muted sm:max-w-64"
                title={logoError || logoName || "png, jpg, webp only"}
              >
                {logoError || logoName || "png, jpg, webp only"}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <SectionLabel>svg size</SectionLabel>
              <ToolSegmentedControl
                value={scale}
                options={[
                  { value: 4, label: "small" },
                  { value: 8, label: "medium" },
                  { value: 12, label: "large" },
                ]}
                onChange={setScale}
              />
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
            <SectionLabel>preview</SectionLabel>
            <div className="grid min-h-0 flex-1 place-items-center overflow-auto rounded-sm border border-border bg-surface p-4">
              {result.ok ? (
                <NextImage
                  src={result.dataUrl}
                  alt=""
                  width={result.moduleCount * scale}
                  height={result.moduleCount * scale}
                  unoptimized
                  className="block max-h-full max-w-full object-contain"
                />
              ) : (
                <p className="m-0 text-center text-xs text-muted">
                  {result.error}
                </p>
              )}
            </div>
          </div>
        </section>

        <footer className="shrink-0 overflow-hidden border-t border-border pt-3 text-ui-xs text-muted">
          <div className="flex min-h-4 flex-wrap gap-2">
            <span>{result.byteLength}/2048 bytes</span>
            <span>{correctionLevel} correction</span>
            <span>{shape}</span>
            <span>{logoDataUrl ? "logo embedded" : "no logo"}</span>
            <span>
              {result.ok ? `${result.moduleCount} modules` : "no qr yet"}
            </span>
            <span>{result.ok ? "ready" : "needs shorter input"}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function validateLogoDimensions(dataUrl: string) {
  return new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(
        image.naturalWidth <= maxLogoPixels &&
          image.naturalHeight <= maxLogoPixels,
      );
    };
    image.onerror = () => resolve(false);
    image.src = dataUrl;
  });
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-sm border border-border bg-surface px-3 py-2 text-ui-xs text-muted2">
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <code className="text-2xs text-muted">{value}</code>
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-7 w-9 cursor-pointer rounded-sm border border-border bg-transparent p-0"
        />
      </span>
    </label>
  );
}
