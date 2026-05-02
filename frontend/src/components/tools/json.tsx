"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import {
  ToolCheckbox,
  ToolSegmentedControl,
} from "@/components/tool-kit/tool-controls";
import { Btn } from "@/components/ui/button";
import { formatJson, type JsonMode } from "@/lib/tools/json";

const sampleJson = `{
  "name": "devbox",
  "private": true,
  "tools": ["json", "uuid"],
  "settings": {
    "theme": "system",
    "offline": true
  }
}`;

export default function JsonFormatter() {
  const [input, setInput] = useState(sampleJson);
  const [mode, setMode] = useState<JsonMode>("format");
  const [sortKeys, setSortKeys] = useState(false);

  const result = useMemo(() => {
    return formatJson(input, mode, sortKeys);
  }, [input, mode, sortKeys]);

  const loadSample = () => setInput(sampleJson);
  const clear = () => setInput("");

  return (
    <TextToolLayout
      title="json formatter"
      input={input}
      output={result.output}
      error={result.error}
      placeholder='{"ok": true}'
      onInputChange={setInput}
      controls={
        <>
          <ToolSegmentedControl
            value={mode}
            options={[
              { value: "format", label: "format" },
              { value: "minify", label: "minify" },
            ]}
            onChange={setMode}
          />

          <ToolCheckbox
            checked={sortKeys}
            label="sort keys"
            onChange={setSortKeys}
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
          <span>{result.error ? "invalid" : "valid"}</span>
          {result.stats && (
            <>
              <span>input {result.stats.inputBytes} bytes</span>
              <span>output {result.stats.outputBytes} bytes</span>
            </>
          )}
        </>
      }
    />
  );
}
