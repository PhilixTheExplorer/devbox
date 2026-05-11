import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import {
  getSiteOrigin,
  getSiteStructuredData,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
} from "@/config/site";
import "./globals.css";
import { DevboxShellEffects } from "@/components/shell/state/shell-effects";
import { DevboxShell } from "@/components/shell/views/app-shell";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteOrigin = getSiteOrigin();
const structuredData = getSiteStructuredData();

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  authors: [
    { name: "PhilixTheExplorer", url: "https://github.com/PhilixTheExplorer" },
  ],
  creator: "PhilixTheExplorer",
  publisher: SITE_NAME,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} developer tools`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${jetbrainsMono.variable} h-full overflow-hidden`}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden bg-bg text-text text-ui leading-normal antialiased">
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <DevboxShellEffects />
        <DevboxShell>{children}</DevboxShell>
      </body>
    </html>
  );
}
