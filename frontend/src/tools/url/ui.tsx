"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import {
  ToolCheckbox,
  ToolSegmentedControl,
} from "@/components/tool-kit/tool-controls";
import { Btn } from "@/components/ui/button";
import { transformUrl, type UrlMode } from "./logic";

const sampleUrl =
  "https://thedevbox.org/tools/regex?mode=encode&from=home#examples";

export default function UrlFormatter() {
  const [input, setInput] = useState(sampleUrl);
  const [mode, setMode] = useState<UrlMode>("format");
  const [sortParams, setSortParams] = useState(true);

  const result = useMemo(() => {
    return transformUrl(input, mode, sortParams);
  }, [input, mode, sortParams]);

  const loadSample = () => setInput(sampleUrl);
  const clear = () => setInput("");

  return (
    <TextToolLayout
      title="url formatter"
      input={input}
      output={result.output}
      error={result.error}
      placeholder="https://example.com/path?query=value"
      onInputChange={setInput}
      controls={
        <>
          <ToolSegmentedControl
            value={mode}
            options={[
              { value: "format", label: "format" },
              { value: "encode", label: "encode" },
              { value: "decode", label: "decode" },
            ]}
            onChange={setMode}
          />

          <ToolCheckbox
            checked={sortParams}
            disabled={mode !== "format"}
            label="sort params"
            onChange={setSortParams}
          />

          <Btn size="sm" variant="ghost" onClick={loadSample}>
            sample
          </Btn>
          <Btn size="sm" variant="danger" onClick={clear} disabled={!input}>
            clear
          </Btn>
        </>
      }
      footer={
        <>
          <span>{mode}</span>
          <span>
            {sortParams && mode === "format"
              ? "sorted params"
              : "params unchanged"}
          </span>
          <span>{result.error ? "invalid url" : "ready"}</span>
          <span>{result.output.length} output chars</span>
        </>
      }
    />
  );
}
