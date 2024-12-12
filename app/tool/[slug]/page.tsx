import { notFound } from "next/navigation";
import { getToolMetadata, toolsData } from '@/data'
import { RenderTool } from "@/components/layout/nossr";
type MetaDataType = {
  params: Promise<{
    slug: string;
  }>;
};
export async function generateStaticParams() {
  const slugs = toolsData.flatMap((category) => category.tools.map((tool) => tool.slug.replaceAll('/tool/','')));

  // Return as params for static paths
  return slugs.map((slug) => ({
    slug,
  }));
}
export const runtime = 'edge';

export async function generateMetadata({ params }: MetaDataType) {
  const metaData = getToolMetadata((await params).slug);

  if (!metaData) {
    notFound();
  }

  return metaData;
}


const ToolDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const slug = (await params).slug
  if (!slug) {
    notFound();
  }
  
  return (
    <>
    <RenderTool slug={slug}/>
    </>
  )
}

export default ToolDetail
