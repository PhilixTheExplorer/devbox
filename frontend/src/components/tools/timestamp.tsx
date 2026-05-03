"use client";

import { useEffect, useMemo, useState } from "react";
import { Btn, KV, SectionLabel } from "@/components/ui";
import {
  dateFromUnixSeconds,
  getCurrentSeconds,
  getRelativeLabel,
  toLocalDatetimeValue,
  unixSecondsFromDateInput,
} from "@/lib/tools/timestamp";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [datetime, setDatetime] = useState("");
  const [nowSeconds, setNowSeconds] = useState(0);

  useEffect(() => {
    const now = new Date();
    setNowSeconds(getCurrentSeconds());
    setTimestamp(String(Math.floor(now.getTime() / 1000)));
    setDatetime(toLocalDatetimeValue(now));
  }, []);

  const date = useMemo(() => {
    return dateFromUnixSeconds(timestamp);
  }, [timestamp]);

  const fromTimestamp = (value: string) => {
    setTimestamp(value);

    const nextDate = dateFromUnixSeconds(value);
    if (nextDate) {
      setDatetime(toLocalDatetimeValue(nextDate));
    }
  };

  const fromDatetime = (value: string) => {
    setDatetime(value);

    const seconds = unixSecondsFromDateInput(value);
    if (seconds !== null) {
      setTimestamp(String(seconds));
    }
  };

  const useNow = () => {
    const now = new Date();
    const seconds = Math.floor(now.getTime() / 1000);
    setNowSeconds(seconds);
    setTimestamp(String(seconds));
    setDatetime(toLocalDatetimeValue(now));
  };

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-readable flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            unix timestamp
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <Btn size="sm" variant="accent" onClick={useNow}>
              use now
            </Btn>
            <span className="text-ui-xs text-muted">
              current epoch: {nowSeconds || "..."}
            </span>
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <SectionLabel>unix timestamp seconds</SectionLabel>
            <input
              value={timestamp}
              onChange={(event) => fromTimestamp(event.target.value)}
              placeholder="1714329600"
              className="w-full rounded-sm border border-border bg-bg px-3.5 py-2.5 font-inherit text-lg tracking-widest text-text focus:border-accent focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <SectionLabel>datetime local</SectionLabel>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(event) => fromDatetime(event.target.value)}
              className="w-full rounded-sm border border-border bg-bg px-3.5 py-2.5 font-inherit text-ui text-text focus:border-accent focus:outline-none"
            />
          </div>

          {date && (
            <div className="overflow-hidden rounded-sm border border-border">
              <KV label="UTC" value={date.toUTCString()} />
              <KV label="ISO 8601" value={date.toISOString()} />
              <KV label="Local" value={date.toLocaleString()} />
              <KV
                label="Relative"
                value={getRelativeLabel(
                  Math.floor(date.getTime() / 1000),
                  nowSeconds || getCurrentSeconds(),
                )}
              />
              <KV
                label="Day"
                value={date.toLocaleDateString("en", { weekday: "long" })}
              />
              <KV label="Milliseconds" value={date.getTime()} />
            </div>
          )}

          {!date && (
            <div className="rounded-sm border border-red px-3 py-2 text-xs text-red">
              enter a valid unix timestamp
            </div>
          )}
        </section>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{date ? "valid timestamp" : "invalid timestamp"}</span>
          <span>
            {timestamp ? `${timestamp.length} digits` : "empty timestamp"}
          </span>
          <span>{datetime || "no datetime"}</span>
        </footer>
      </div>
    </div>
  );
}
