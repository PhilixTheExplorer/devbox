"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-9 px-10 overflow-auto h-full">
      <div className="max-w-[480px]">
        <div className="text-[10px] text-muted tracking-[2px] mb-2.5">
          {"// error"}
        </div>
        <h1 className="text-[26px] font-bold tracking-[-0.5px] mb-4 mt-0">
          something broke
        </h1>
        <p className="text-[13px] leading-[1.7] text-muted2 mb-4">
          {error.message || "an unexpected error occurred."}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 text-[12px] border border-accent text-accent bg-accent-dim rounded-sm cursor-pointer font-inherit transition-colors duration-100 hover:bg-accent hover:text-bg"
          >
            ↻ try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 text-[12px] border border-border text-muted rounded-sm no-underline font-inherit transition-colors duration-100 hover:border-accent hover:text-accent"
          >
            ← go home
          </Link>
        </div>
      </div>
    </div>
  );
}
