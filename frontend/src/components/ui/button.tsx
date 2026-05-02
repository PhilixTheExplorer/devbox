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
    size === "sm" ? "px-2.5 py-1 text-ui-xs" : "px-3.5 py-1.5 text-xs";

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
        ${disabled ? "opacity-40 cursor-default" : "cursor-pointer"}
        ${className}
      `}
      style={style}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
}
