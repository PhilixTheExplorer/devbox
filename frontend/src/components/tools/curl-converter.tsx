"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { Btn } from "@/components/ui/button";
import { convertCurlToFetch } from "@/lib/tools/curl-converter";

const sampleInput = `curl -X POST https://api.example.dev/users \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer token' \\
  -d '{"name":"Ada"}'`;

export default function CurlConverterTool() {
  const [input, setInput] = useState(sampleInput);
  const result = useMemo(() => convertCurlToFetch(input), [input]);

  return (
    <TextToolLayout
      title="curl converter"
      input={input}
      output={result.output}
      error={result.error}
      placeholder="curl https://api.example.dev"
      onInputChange={setInput}
      controls={
        <>
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
      footer={
        <>
          <span>{result.summary?.method ?? "no method"}</span>
          <span>{result.summary?.url ?? "no url"}</span>
          <span>
            {Object.keys(result.summary?.headers ?? {}).length} headers
          </span>
        </>
      }
    />
  );
}
