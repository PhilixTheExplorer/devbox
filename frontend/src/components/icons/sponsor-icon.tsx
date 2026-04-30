import type { IconProps } from "@/components/icons";

export function SponsorIcon({ size = 12 }: IconProps) {
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
        d="M8 13.25C4.08 10.38 2.2 8.37 2.2 5.84a2.8 2.8 0 0 1 5.12-1.59L8 5.31l.68-1.06a2.8 2.8 0 0 1 5.12 1.59c0 2.53-1.88 4.54-5.8 7.41Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
