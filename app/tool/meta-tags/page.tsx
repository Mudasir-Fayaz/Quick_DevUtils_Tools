import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Meta Tag Generator",
  description: "Generate meta tags for SEO, social media, and HTML documents. This tool helps optimize content for search engines and improve social sharing appearances.",
  keywords: "meta tags, seo, social media, html",
};

const ToolDetail = () => {
  const slug = "meta-tags";

  if (!slug) {
    notFound();
  }

  return (
    <>
      <RenderTool slug={slug} />
    </>
  );
};

export default ToolDetail;