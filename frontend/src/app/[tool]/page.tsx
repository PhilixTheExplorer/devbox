import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolRouteView } from "@/components/shell";
import { SITE_NAME } from "@/config/site";
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

  const isSoon = "soon" in toolMeta && toolMeta.soon;
  const title = `${toolMeta.name} - private browser tool`;
  const description = `${toolMeta.description} Free, ad-free, and private in your browser.`;

  return {
    title,
    description,
    keywords: [toolMeta.category, ...toolMeta.tags],
    alternates: {
      canonical: `/${tool}`,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `/${tool}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    robots: {
      index: !isSoon,
      follow: !isSoon,
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
