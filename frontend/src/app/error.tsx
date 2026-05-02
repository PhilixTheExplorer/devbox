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
    <div className="py-page-y px-page-x overflow-auto h-full">
      <div className="max-w-copy">
        <div className="text-2xs text-muted tracking-widest mb-2.5">
          {"// error"}
        </div>
        <h1 className="text-2xl font-bold mb-4 mt-0">something broke</h1>
        <p className="text-ui leading-relaxed text-muted2 mb-4">
          {error.message || "an unexpected error occurred."}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 text-xs border border-accent text-accent bg-accent-dim rounded-sm cursor-pointer font-inherit transition-colors duration-100 hover:bg-accent hover:text-bg"
          >
            ↻ try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 text-xs border border-border text-muted rounded-sm no-underline font-inherit transition-colors duration-100 hover:border-accent hover:text-accent"
          >
            ← go home
          </Link>
        </div>
      </div>
    </div>
  );
}
