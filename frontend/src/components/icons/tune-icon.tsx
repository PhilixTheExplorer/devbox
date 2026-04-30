import type { IconProps } from "@/components/icons";

export function TuneIcon({ size = 12 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden={true}
      focusable="false"
      className="block flex-shrink-0"
    >
      <path
        d="M2.2 4.5h3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M7.2 4.5h6.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle
        cx="5.6"
        cy="4.5"
        r="1.35"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M2.2 11.5h6.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M11 11.5h2.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle
        cx="9.4"
        cy="11.5"
        r="1.35"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
