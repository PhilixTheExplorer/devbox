"use client";

import { useMemo, useState } from "react";
import { Btn, CopyBtn, SectionLabel, StatusBadge } from "@/components/ui";
import { analyzeCron } from "@/lib/tools/cron-parser";

const sampleInput = "*/15 9-17 * * mon-fri";

const fieldLabels = ["minute", "hour", "day of month", "month", "day of week"];

const presets = [
  ["every minute", "* * * * *"],
  ["every hour", "0 * * * *"],
  ["daily 9am", "0 9 * * *"],
  ["weekdays 9am", "0 9 * * 1-5"],
  ["every 15 min", "*/15 * * * *"],
  ["monthly", "0 0 1 * *"],
  ["mon-fri workday", "*/15 9-17 * * mon-fri"],
  ["sunday midnight", "0 0 * * sun"],
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function namedValue(value: string, field: string): string {
  const numeric = Number(value);

  if (field === "day of week" && Number.isInteger(numeric)) {
    return dayNames[numeric] ?? value;
  }

  if (field === "month" && Number.isInteger(numeric)) {
    return monthNames[numeric] || value;
  }

  return value;
}

function explainPart(value: string | undefined, field: string): string {
  if (!value) return "missing";
  if (value === "*") return `every ${field}`;
  if (value.startsWith("*/")) return `every ${value.slice(2)} ${field}s`;
  if (value.includes(",")) {
    return value
      .split(",")
      .map((part) => explainPart(part, field))
      .join(", ");
  }
  if (value.includes("-")) {
    const [start, end] = value.split("-");
    return `${namedValue(start, field)} through ${namedValue(end, field)}`;
  }
  if (field === "hour") return `at hour ${value.padStart(2, "0")}`;
  if (field === "minute") return `at minute ${value.padStart(2, "0")}`;
  return namedValue(value, field);
}

function formatRun(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function CronParserTool() {
  const [input, setInput] = useState(sampleInput);
  const result = useMemo(() => analyzeCron(input), [input]);
  const output = result.valid
    ? `${result.explanation}\n\nnext runs\n${result.nextRuns.join("\n")}`
    : "";

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-readable flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="m-0 text-2xl font-normal leading-tight text-text">
              cron parser
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <CopyBtn text={output} disabled={!output} />
            <Btn
              size="sm"
              variant="ghost"
              onClick={() => setInput(sampleInput)}
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
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <div>
            <SectionLabel>cron expression</SectionLabel>
            <input
              className="w-full rounded-sm border border-border bg-bg px-3.5 py-2.5 font-inherit text-ui tracking-normal text-text outline-none transition-colors placeholder:text-muted focus:border-accent"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="minute hour day-of-month month day-of-week"
              spellCheck={false}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <StatusBadge
              ok={result.valid}
              text={result.valid ? "valid cron" : "needs valid five fields"}
            />
            {result.error && (
              <span className="rounded-sm border border-red bg-red/5 px-2.5 py-1 text-ui-xs text-red">
                {result.error}
              </span>
            )}
          </div>

          {result.valid && (
            <div className="rounded-sm border border-accent bg-accent-dim px-4 py-3 text-ui text-accent">
              {result.explanation}
            </div>
          )}

          <div className="overflow-hidden rounded-sm border border-border">
            {fieldLabels.map((field, index) => (
              <div
                key={field}
                className="grid grid-cols-[7.5rem_4.5rem_minmax(0,1fr)] gap-3 border-b border-border px-3 py-2 text-ui-xs last:border-b-0"
              >
                <span className="text-muted">{field}</span>
                <code className="min-w-0 break-all text-accent">
                  {result.fields[index] ?? "-"}
                </code>
                <span className="min-w-0 text-muted2">
                  {explainPart(result.fields[index], field)}
                </span>
              </div>
            ))}
          </div>

          {result.nextRuns.length > 0 && (
            <div>
              <SectionLabel>next runs</SectionLabel>
              <div className="overflow-hidden rounded-sm border border-border">
                {result.nextRuns.map((run, index) => (
                  <div
                    key={run}
                    className="flex items-center gap-3 border-b border-border px-3 py-2 text-ui-xs last:border-b-0"
                  >
                    <span className="w-7 shrink-0 text-muted">{index + 1}</span>
                    <span className="min-w-0 flex-1 text-text">
                      {formatRun(run)}
                    </span>
                    <code className="hidden text-muted2 sm:block">{run}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <SectionLabel>presets</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {presets.map(([label, value]) => (
                <Btn
                  key={value}
                  size="sm"
                  variant={input === value ? "accent" : "default"}
                  onClick={() => setInput(value)}
                >
                  {label}
                </Btn>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
