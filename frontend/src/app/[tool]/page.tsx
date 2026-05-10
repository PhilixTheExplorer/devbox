import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolRouteView } from "@/components/shell";
import { SITE_NAME } from "@/config/site";
import { getToolById, TOOLS } from "@/tools";

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
  const title = `${toolMeta.seo.primaryKeyword} - private browser tool`;
  const description = `${toolMeta.content?.overview ?? toolMeta.description} Use this ${toolMeta.seo.primaryKeyword} free in your browser with no upload, no account, and no tracking.`;
  const image = `/${tool}/opengraph-image`;
  const keywords = Array.from(
    new Set([
      toolMeta.seo.primaryKeyword,
      ...toolMeta.seo.secondaryKeywords,
      ...toolMeta.seo.longTailKeywords,
      toolMeta.name,
      toolMeta.category,
      ...toolMeta.tags,
    ]),
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/${tool}`,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `/${tool}`,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${toolMeta.name} on ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
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
