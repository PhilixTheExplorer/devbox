const SITE_URL_FALLBACK = "https://thedevbox.org";

export const SITE_NAME = "devbox";
export const SITE_TITLE = "devbox - tools that don't suck";
export const SITE_DESCRIPTION =
  "Fast, private, ad-free developer tools that run in your browser.";
export const SITE_KEYWORDS = [
  "developer tools",
  "web tools",
  "browser utilities",
  "json formatter",
  "base64 decoder",
  "hash generator",
  "jwt decoder",
  "regex tester",
  "timestamp converter",
  "devbox",
] as const;

export function getSiteOrigin() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_FALLBACK;

  try {
    return new URL(raw).origin;
  } catch {
    return new URL(SITE_URL_FALLBACK).origin;
  }
}

export const OSS_LINKS = {
  repo: "https://github.com/PhilixTheExplorer/devbox",
  contribute: "https://github.com/PhilixTheExplorer/devbox/pulls",
  issues: "https://github.com/PhilixTheExplorer/devbox/issues",
  sponsors: "https://github.com/sponsors/PhilixTheExplorer",
} as const;

export type OssSupportId = "star" | "sponsor" | "contribute";

export type OssSupportLink = {
  id: OssSupportId;
  label: string;
  href: string;
  title: string;
};

export const OSS_SUPPORT_LINKS: readonly OssSupportLink[] = [
  {
    id: "star",
    label: "star repo",
    href: OSS_LINKS.repo,
    title: "star this project on GitHub",
  },
  {
    id: "sponsor",
    label: "sponsor",
    href: OSS_LINKS.sponsors,
    title: "become a sponsor",
  },
  {
    id: "contribute",
    label: "contribute",
    href: OSS_LINKS.contribute,
    title: "open pull requests and contribute code",
  },
];
