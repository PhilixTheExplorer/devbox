"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Btn } from "@/components/ui/button";
import { CopyBtn } from "@/components/ui/copy-button";
import { ToolTextarea } from "@/components/ui/textarea";
import { convertDocxToHtml, type DocxHtmlResult } from "./logic";

const maxDocxBytes = 10 * 1024 * 1024;
const maxDocxSizeLabel = "10 MB";

export default function DocxHtmlTool() {
  const [html, setHtml] = useState("");
  const [fileName, setFileName] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const [result, setResult] = useState<DocxHtmlResult>({
    html: "",
    messages: [],
    error: null,
  });

  const loadDocx = async (file: File | undefined) => {
    if (!file) return;

    if (file.size > maxDocxBytes) {
      setFileName("");
      setHtml("");
      setResult({
        html: "",
        messages: [],
        error: `DOCX must be ${maxDocxSizeLabel} or smaller.`,
      });
      return;
    }

    setFileName(file.name);
    setIsWorking(true);
    const next = await convertDocxToHtml(await file.arrayBuffer());
    setResult(next);
    setHtml(next.html);
    setIsWorking(false);
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
        setHtml("");
        setResult({
          html: "",
          messages: [],
          error: `DOCX must be ${maxDocxSizeLabel} or smaller.`,
        });
      },
      onDrop: (acceptedFiles) => loadDocx(acceptedFiles[0]),
    });

  const clear = () => {
    setFileName("");
    setHtml("");
    setResult({ html: "", messages: [], error: null });
  };

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            docx → html
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Btn
              size="sm"
              variant="danger"
              onClick={clear}
              disabled={!html && !fileName}
            >
              clear
            </Btn>
          </div>
        </header>

        <section
          {...getRootProps()}
          className={`flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed px-6 py-8 text-center transition-colors ${
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
            {fileName ||
              "click to browse or drag a Word document into this zone"}
          </div>
        </section>

        <section>
          <div className="mb-1.5 flex min-h-status-bar-compact items-center justify-between gap-3">
            <div className="text-2xs text-muted tracking-widest uppercase">
              html
            </div>
            <CopyBtn text={html} disabled={!html} />
          </div>
          <ToolTextarea
            value={
              isWorking ? "converting docx to html..." : result.error || html
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
          <span>{result.messages.length} messages</span>
          <span>{html.length} html chars</span>
          <span>
            {isWorking ? "converting" : result.error ? "failed" : "ready"}
          </span>
        </footer>
      </div>
    </div>
  );
}
