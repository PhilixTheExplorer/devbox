"use client";

import { Btn } from "@/components/ui/button";

type SegmentOption<T extends string | number> = {
  value: T;
  label: string;
};

type ToolSegmentedControlProps<T extends string | number> = {
  value: T;
  options: readonly SegmentOption<T>[];
  onChange: (value: T) => void;
};

export function ToolSegmentedControl<T extends string | number>({
  value,
  options,
  onChange,
}: ToolSegmentedControlProps<T>) {
  return (
    <div className="inline-flex rounded-sm border border-border bg-bg p-0.5">
      {options.map((option) => (
        <Btn
          key={option.value}
          size="sm"
          variant={value === option.value ? "accent" : "ghost"}
          onClick={() => onChange(option.value)}
          className="border-transparent"
        >
          {option.label}
        </Btn>
      ))}
    </div>
  );
}

type ToolCheckboxProps = {
  checked: boolean;
  label: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

export function ToolCheckbox({
  checked,
  label,
  disabled = false,
  onChange,
}: ToolCheckboxProps) {
  return (
    <label className="inline-flex min-h-status-bar-compact cursor-pointer items-center gap-2 rounded-sm border border-border px-2.5 py-1 text-ui-xs text-muted2 hover:border-accent hover:text-text">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="m-0 accent-accent disabled:opacity-40"
      />
      {label}
    </label>
  );
}
