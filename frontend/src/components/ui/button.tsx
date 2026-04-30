"use client";

import type { CSSProperties, ReactNode } from "react";

export type ButtonVariant = "default" | "accent" | "ghost" | "danger";

export interface BtnProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function Btn({
  children,
  onClick,
  variant = "default",
  size = "md",
  disabled = false,
  style,
  className = "",
}: BtnProps) {
  const sizeClasses =
    size === "sm"
      ? "px-[9px] py-[3px] text-[11px]"
      : "px-[13px] py-[6px] text-[12px]";

  const variantClasses: Record<ButtonVariant, string> = {
    default:
      "border-border2 text-text hover:border-accent hover:text-accent bg-transparent",
    accent:
      "border-accent text-accent bg-accent-dim hover:bg-accent hover:text-bg",
    ghost: "border-transparent text-muted hover:text-text bg-transparent",
    danger:
      "border-border2 text-muted2 hover:border-red hover:text-red bg-transparent",
  };

  const dynamicVariantClasses = disabled
    ? variant === "default" || variant === "danger"
      ? "border-border2 text-text bg-transparent"
      : variantClasses[variant]
    : variantClasses[variant];

  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 border rounded-sm font-inherit leading-none whitespace-nowrap transition-all duration-100
        ${sizeClasses}
        ${dynamicVariantClasses}
        ${disabled ? "opacity-38 cursor-default" : "cursor-pointer"}
        ${className}
      `}
      style={style}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
}
