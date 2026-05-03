"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { Btn } from "@/components/ui/button";
import { queryJsonPath } from "@/lib/tools/json-path";

const sampleInput = `{
  "users": [
    { "id": 1, "name": "Ada", "role": "admin" },
    { "id": 2, "name": "Linus", "role": "maintainer" }
  ]
}`;

export default function JsonPathTool() {
  const [input, setInput] = useState(sampleInput);
  const [path, setPath] = useState("$.users[*].name");
  const result = useMemo(() => queryJsonPath(input, path), [input, path]);

  return (
    <TextToolLayout
      title="json path explorer"
      input={input}
      output={result.output}
      error={result.error}
      placeholder='{"users": []}'
      onInputChange={setInput}
      controls={
        <>
          <input
            value={path}
            onChange={(event) => setPath(event.target.value)}
            className="min-h-status-bar-compact w-56 rounded-sm border border-border bg-bg px-2.5 py-1 text-ui-xs text-text focus:border-accent focus:outline-none"
            aria-label="json path"
          />
          <Btn size="sm" variant="ghost" onClick={() => setInput(sampleInput)}>
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
        </>
      }
      footer={<span>{result.matches.length} matches</span>}
    />
  );
}
