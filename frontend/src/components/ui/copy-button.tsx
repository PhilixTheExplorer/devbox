"use client";

import { useEffect, useRef, useState } from "react";
import { Btn, type ButtonVariant } from "./button";

interface CopyBtnProps {
  text: string | number;
  size?: "sm" | "md";
}

export function CopyBtn({ text, size = "sm" }: CopyBtnProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const resetSoon = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = setTimeout(() => setStatus("idle"), 1400);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(text));
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    resetSoon();
  };

  let label = "copy";
  let variant: ButtonVariant = "ghost";

  if (status === "copied") {
    label = "✓ copied";
    variant = "accent";
  }

  if (status === "error") {
    label = "copy failed";
    variant = "danger";
  }

  return (
    <Btn size={size} variant={variant} onClick={copy}>
      {label}
    </Btn>
  );
}
