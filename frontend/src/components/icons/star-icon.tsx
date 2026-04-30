import type { IconProps } from "@/components/icons";

export function StarIcon({ size = 12 }: IconProps) {
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
        d="M8 1.85 9.97 5.82 14.35 6.45 11.18 9.53 11.93 13.91 8 11.82 4.07 13.91 4.82 9.53 1.65 6.45 6.03 5.82 8 1.85Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
