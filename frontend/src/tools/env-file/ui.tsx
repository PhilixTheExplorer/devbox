"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { ToolCheckbox } from "@/components/tool-kit/tool-controls";
import { Btn } from "@/components/ui/button";
import { formatEnvFile } from "./logic";

const sampleInput = `API_URL=https://api.example.dev
API_KEY=super-secret-token
NODE_ENV=development
API_KEY=duplicate-value`;

export default function EnvFileTool() {
  const [input, setInput] = useState(sampleInput);
  const [sortKeys, setSortKeys] = useState(true);
  const [maskValues, setMaskValues] = useState(false);
  const result = useMemo(
    () => formatEnvFile(input, { sortKeys, maskValues }),
    [input, sortKeys, maskValues],
  );

  return (
    <TextToolLayout
      title="env file formatter"
      input={input}
      output={result.output}
      placeholder="KEY=value"
      onInputChange={setInput}
      controls={
        <>
          <ToolCheckbox
            checked={sortKeys}
            label="sort keys"
            onChange={setSortKeys}
          />
          <ToolCheckbox
            checked={maskValues}
            label="mask values"
            onChange={setMaskValues}
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
      footer={
        <>
          <span>{result.entries.length} entries</span>
          <span>{result.warnings.length} warnings</span>
          {result.warnings.map((warning) => (
            <span key={warning}>{warning}</span>
          ))}
        </>
      }
    />
  );
}
