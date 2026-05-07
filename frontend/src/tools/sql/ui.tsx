"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { ToolSegmentedControl } from "@/components/tool-kit/tool-controls";
import { Btn } from "@/components/ui/button";
import { formatSql, type SqlMode } from "./logic";

const sampleInput =
  "select users.id, users.email, count(events.id) from users left join events on events.user_id = users.id where users.active = true group by users.id, users.email order by users.email";

export default function SqlTool() {
  const [input, setInput] = useState(sampleInput);
  const [mode, setMode] = useState<SqlMode>("pretty");
  const output = useMemo(() => formatSql(input, mode), [input, mode]);

  return (
    <TextToolLayout
      title="sql formatter"
      input={input}
      output={output}
      placeholder="select * from users where active = true"
      onInputChange={setInput}
      controls={
        <>
          <ToolSegmentedControl
            value={mode}
            options={[
              { value: "pretty", label: "pretty" },
              { value: "compact", label: "compact" },
            ]}
            onChange={setMode}
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
      footer={<span>{mode}</span>}
    />
  );
}
