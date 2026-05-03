"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ToolCheckbox,
  ToolSegmentedControl,
} from "@/components/tool-kit/tool-controls";
import { Btn, CopyBtn, SectionLabel } from "@/components/ui";
import { clampUuidCount, createUuids, formatUuids } from "@/lib/tools/uuid";

export default function UuidGen() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [batch, setBatch] = useState<string[]>([]);

  useEffect(() => {
    setBatch(createUuids(count));
  }, [count]);

  const output = useMemo(() => {
    return formatUuids(batch, uppercase, hyphens);
  }, [batch, hyphens, uppercase]);

  const regenerate = () => setBatch(createUuids(count));
  const updateCount = (nextCount: number) => {
    const safeCount = clampUuidCount(nextCount);
    setCount(safeCount);
  };

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            uuid generator
          </h1>

          <div className="flex flex-wrap items-center gap-1.5">
            <Btn size="sm" variant="accent" onClick={regenerate}>
              ↻ regenerate
            </Btn>
            <CopyBtn text={output} disabled={!output} />
          </div>
        </header>

        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <SectionLabel>count</SectionLabel>
            <ToolSegmentedControl
              value={count}
              options={[
                { value: 1, label: "1" },
                { value: 5, label: "5" },
                { value: 10, label: "10" },
                { value: 20, label: "20" },
                { value: 50, label: "50" },
              ]}
              onChange={updateCount}
            />

            <div className="flex flex-wrap gap-2 md:ml-auto">
              <ToolCheckbox
                checked={uppercase}
                label="uppercase"
                onChange={setUppercase}
              />
              <ToolCheckbox
                checked={hyphens}
                label="hyphens"
                onChange={setHyphens}
              />
            </div>
          </div>

          <UuidList uuids={output ? output.split("\n") : []} />
        </section>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{count} generated</span>
          <span>{uppercase ? "uppercase" : "lowercase"}</span>
          <span>{hyphens ? "with hyphens" : "no hyphens"}</span>
        </footer>
      </div>
    </div>
  );
}

function UuidList({ uuids }: { uuids: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      {uuids.map((uuid, index) => (
        <div
          key={uuid}
          className="flex items-center gap-2.5 rounded-sm border border-border bg-surface px-3 py-2"
        >
          <span className="min-w-6 text-right text-2xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <code className="flex-1 break-all text-xs tracking-wide">{uuid}</code>
          <CopyBtn text={uuid} />
        </div>
      ))}
    </div>
  );
}
