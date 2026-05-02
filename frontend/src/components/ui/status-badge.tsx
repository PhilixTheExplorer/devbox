"use client";

interface StatusBadgeProps {
  ok: boolean;
  text: string;
}

export function StatusBadge({ ok, text }: StatusBadgeProps) {
  return (
    <div
      className={`text-ui-xs px-2.5 py-1 rounded-sm border ${
        ok
          ? "border-green text-green bg-green/5"
          : "border-red text-red bg-red/5"
      }`}
    >
      {ok ? "✓" : "✗"} {text}
    </div>
  );
}
