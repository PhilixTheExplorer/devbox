import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import {
  getSiteOrigin,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
} from "@/config/site";
import "./globals.css";
import { DevboxShellProvider } from "@/components/shell/contexts/shell-provider";
import { DevboxShell } from "@/components/shell/views/app-shell";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  creator: "PhilixTheExplorer",
  publisher: SITE_NAME,
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
        <DevboxShellProvider>
          <DevboxShell>{children}</DevboxShell>
        </DevboxShellProvider>
      </body>
    </html>
  );
}
