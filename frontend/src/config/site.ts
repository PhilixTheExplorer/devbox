const SITE_URL_FALLBACK = "https://thedevbox.org";

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
