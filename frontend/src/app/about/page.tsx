import type { Metadata } from "next";
import { SupportLinks } from "@/components/support-link";
import { KV } from "@/components/ui";
import { OSS_LINKS } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about devbox and why these utilities are ad-free, account-free, and privacy-first.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="py-9 px-10 overflow-auto h-full">
      <div className="max-w-[640px]">
        <div className="text-[10px] text-muted tracking-[2px] mb-2.5">
          {"// about"}
        </div>
        <h1 className="text-[26px] font-bold tracking-[-0.5px] mb-7 mt-0">
          what is <span className="text-accent">[</span>devbox
          <span className="text-accent">]</span>?
        </h1>
        <section className="flex flex-col gap-[18px] leading-[1.9] text-muted2">
          <p>
            devbox is a collection of tools built by developers who got tired
            of: sites that require login to format json, sketchy "online
            converters" that probably log your data, and electron apps just to
            decode a jwt.
          </p>
          <p>
            every tool runs{" "}
            <span className="text-text">entirely in your browser</span>. your
            data never leaves your machine. we don't know what you paste here
            and we don't care.
          </p>
          <blockquote className="border-l-[3px] border-accent pl-4 text-text my-2">
            we believe developer tools should be fast, offline-capable, honest,
            and free. not "free" as in we track everything you do. actually
            free.
          </blockquote>
          <p>
            if a tool needs a server (like ipynb → pdf), we'll tell you clearly.
            everything else? purely client-side. no bullshit.
          </p>
          <p>
            we're open source. if you find a bug, have an idea, or want to
            contribute a tool -{" "}
            <a
              href={OSS_LINKS.issues}
              target="_blank"
              rel="noreferrer"
              className="text-accent cursor-pointer border-none bg-transparent font-inherit p-0 no-underline hover:underline"
            >
              open an issue ↗
            </a>
          </p>

          <SupportLinks className="flex flex-wrap gap-2 pt-1.5" />
        </section>
        <section className="mt-10 mb-10">
          <h2 className="text-[10px] text-accent tracking-[2px] uppercase mb-[14px] mt-0">
            tech stack
          </h2>
          <div className="border border-border rounded-sm overflow-hidden">
            {[
              ["runtime", "browser. just the browser."],
              ["framework", "next.js (app router) + react"],
              ["styling", "tailwind css v4"],
              ["test & lint", "vitest + biome"],
              ["fonts", "JetBrains Mono"],
              ["tracking", "none"],
              ["cookies", "none"],
              ["license", "MIT"],
            ].map(([k, v]) => (
              <KV key={k} label={k} value={v} copyable={false} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
