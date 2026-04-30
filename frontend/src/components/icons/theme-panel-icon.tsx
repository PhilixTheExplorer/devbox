import type { IconProps } from "@/components/icons";

export function ThemePanelIcon({ size = 11 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={true}
      focusable="false"
      className="block flex-shrink-0"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2v20a10 10 0 0 0 0-20Z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
