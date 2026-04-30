import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolRouteView } from "@/components/shell";
import { getToolById, TOOLS } from "@/registry/tools";

type ToolPageProps = {
  params: Promise<{ tool: string }>;
};

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    tool: tool.id,
  }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { tool } = await params;
  const toolMeta = getToolById(tool);

  if (!toolMeta) {
    return {
      title: "Tool not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: toolMeta.name,
    description: toolMeta.description,
    alternates: {
      canonical: `/${tool}`,
    },
    openGraph: {
      title: `${toolMeta.name} | devbox`,
      description: toolMeta.description,
      url: `/${tool}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${toolMeta.name} | devbox`,
      description: toolMeta.description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool } = await params;
  const toolMeta = getToolById(tool);

  if (!toolMeta) {
    notFound();
  }

  return (
    <div className="px-3.5 py-3 lg:px-6 lg:py-5">
      <ToolRouteView tool={toolMeta} />
    </div>
  );
}
