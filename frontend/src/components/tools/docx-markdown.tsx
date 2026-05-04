"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Btn } from "@/components/ui/button";
import { CopyBtn } from "@/components/ui/copy-button";
import { ToolTextarea } from "@/components/ui/textarea";
import {
  convertDocxToMarkdown,
  type DocxMarkdownResult,
} from "@/lib/tools/docx-markdown";

const maxDocxBytes = 10 * 1024 * 1024;
const maxDocxSizeLabel = "10 MB";

export default function DocxMarkdownTool() {
  const [fileName, setFileName] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [result, setResult] = useState<DocxMarkdownResult>({
    markdown: "",
    paragraphs: 0,
    messages: [],
    error: null,
  });

  const loadFile = async (file: File | undefined) => {
    if (!file) return;

    if (file.size > maxDocxBytes) {
      setFileName("");
      setIsConverting(false);
      setResult({
        markdown: "",
        paragraphs: 0,
        messages: [],
        error: `DOCX must be ${maxDocxSizeLabel} or smaller.`,
      });
      return;
    }

    setFileName(file.name);
    setIsConverting(true);
    setResult({
      markdown: "",
      paragraphs: 0,
      messages: [],
      error: null,
    });
    setResult(await convertDocxToMarkdown(await file.arrayBuffer()));
    setIsConverting(false);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
      },
      maxSize: maxDocxBytes,
      maxFiles: 1,
      multiple: false,
      onDropRejected: () => {
        setFileName("");
        setIsConverting(false);
        setResult({
          markdown: "",
          paragraphs: 0,
          messages: [],
          error: `DOCX must be ${maxDocxSizeLabel} or smaller.`,
        });
      },
      onDrop: (acceptedFiles) => loadFile(acceptedFiles[0]),
    });

  const clear = () => {
    setFileName("");
    setIsConverting(false);
    setResult({
      markdown: "",
      paragraphs: 0,
      messages: [],
      error: null,
    });
  };

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            docx → markdown
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Btn
              size="sm"
              variant="danger"
              onClick={clear}
              disabled={!fileName && !result.markdown}
            >
              clear
            </Btn>
          </div>
        </header>

        <section
          {...getRootProps()}
          className={`flex min-h-56 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed px-6 py-8 text-center transition-colors ${
            isDragReject
              ? "border-red bg-bg text-red"
              : isDragActive
                ? "border-accent bg-accent-dim text-text"
                : "border-border bg-surface text-muted2 hover:border-accent hover:text-text"
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-lg text-text">
            {isDragReject
              ? "drop a .docx file"
              : isDragActive
                ? "drop to convert"
                : "drop .docx here"}
          </div>
          <div className="max-w-readable text-ui-xs leading-relaxed">
            {fileName
              ? fileName
              : "click to browse or drag a Word document into this zone"}
          </div>
          <div className="text-2xs tracking-widest uppercase">
            {isConverting
              ? "converting"
              : result.error
                ? "conversion failed"
                : result.markdown
                  ? "converted"
                  : "ready"}
          </div>
        </section>

        <section>
          <div className="mb-1.5 flex min-h-status-bar-compact items-center justify-between gap-3">
            <div className="text-2xs text-muted tracking-widest uppercase">
              markdown
            </div>
            <CopyBtn text={result.markdown} disabled={!result.markdown} />
          </div>
          <ToolTextarea
            value={
              isConverting
                ? "converting docx to markdown..."
                : result.error || result.markdown
            }
            readOnly
            placeholder="drop a .docx file"
            rows={22}
            className={`h-tool-editor-lg min-h-tool-editor-lg resize-none text-xs ${
              result.error ? "border-red text-red" : ""
            }`}
          />
        </section>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{fileName || "no file selected"}</span>
          <span>{result.paragraphs} paragraphs</span>
          <span>{result.messages.length} messages</span>
          <span>
            {isConverting
              ? "converting"
              : result.error
                ? "conversion failed"
                : "ready"}
          </span>
        </footer>
      </div>
    </div>
  );
}
