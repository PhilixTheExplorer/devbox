import Link from "next/link";
import { SupportLinks } from "@/components/support-link";
import { TOOL_CATEGORIES, TOOLS, type ToolMeta } from "@/registry/tools";

export default function HomePage() {
  const categories = TOOL_CATEGORIES;

  return (
    <div className="py-9 px-10 overflow-auto h-full">
      <header className="mb-12">
        <div className="text-[10px] text-muted tracking-[2px] mb-2.5">
          {"// welcome"}
        </div>
        <h1 className="text-[38px] font-bold tracking-[-1px] leading-none m-0">
          <span className="text-accent">[</span>devbox
          <span className="text-accent">]</span>
        </h1>
        <p className="text-muted2 mt-3 text-[13px] leading-[1.7] max-w-[480px] mb-0">
          no ads. no accounts. no tracking.
          <br />
          tools that run in your browser, built by people who were tired of bad
          tooling.
        </p>

        <SupportLinks className="mt-5 flex flex-wrap gap-2" />
      </header>

      {categories.map((cat) => {
        const tools = TOOLS.filter((t) => t.category === cat);
        if (!tools.length) return null;
        return (
          <section key={cat} className="mb-9">
            <header className="text-[10px] text-accent tracking-[2px] uppercase mb-2.5 flex items-center gap-3">
              {cat}
              <div className="flex-1 h-[1px] bg-border" />
            </header>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-0.5">
              {tools.map((tool) => (
                <HomeCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

type HomeCardProps = {
  tool: ToolMeta;
};

function HomeCard({ tool }: HomeCardProps) {
  const isSoon = "soon" in tool && tool.soon;

  const content = (
    <>
      <div className="text-[13px] text-text mb-[3px] flex items-center gap-2">
        {tool.name}
        {isSoon && (
          <span className="text-[9px] text-muted border border-border px-[5px] py-[1px] rounded-sm">
            soon
          </span>
        )}
      </div>
      <div className="text-[11px] text-muted">{tool.description}</div>
    </>
  );

  if (isSoon) {
    return (
      <div className="text-left px-4 py-[13px] border rounded-sm font-inherit transition-all duration-150 bg-surface border-border cursor-default opacity-50">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/${tool.id}`}
      className="text-left px-4 py-[13px] border rounded-sm font-inherit transition-all duration-150 bg-surface border-border cursor-pointer hover:bg-accent-dim hover:border-accent no-underline"
    >
      {content}
    </Link>
  );
}
