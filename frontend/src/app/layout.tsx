import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { getSiteOrigin } from "@/config/site";
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
  applicationName: "devbox",
  title: {
    default: "devbox - tools that don't suck",
    template: "%s | devbox",
  },
  description: "No ads. No accounts. No tracking.",
  keywords: ["developer tools", "web tools", "utilities"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "devbox",
    title: "devbox - tools that don't suck",
    description: "No ads. No accounts. No tracking.",
  },
  twitter: {
    card: "summary",
    title: "devbox - tools that don't suck",
    description: "No ads. No accounts. No tracking.",
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
