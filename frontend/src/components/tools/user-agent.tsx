"use client";

import { useEffect, useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { Btn } from "@/components/ui/button";
import { formatUserAgentInfo } from "@/lib/tools/user-agent";

const sampleUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

export default function UserAgentTool() {
  const [input, setInput] = useState(sampleUserAgent);

  useEffect(() => {
    if (navigator.userAgent) {
      setInput(navigator.userAgent);
    }
  }, []);

  const output = useMemo(() => formatUserAgentInfo(input), [input]);

  return (
    <TextToolLayout
      title="user agent"
      input={input}
      output={output}
      placeholder="paste a user-agent string"
      onInputChange={setInput}
      controls={
        <>
          <Btn
            size="sm"
            variant="ghost"
            onClick={() => setInput(navigator.userAgent || sampleUserAgent)}
          >
            current
          </Btn>
          <Btn
            size="sm"
            variant="ghost"
            onClick={() => setInput(sampleUserAgent)}
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
        </>
      }
      footer={
        <>
          <span>{input.length} chars</span>
          <span>{output ? "parsed" : "empty"}</span>
          <span>{output.split("\n").filter(Boolean).length} fields</span>
        </>
      }
    />
  );
}
