import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Slug Generator",
  description: "Generate URL-friendly slugs from text for SEO optimization, ensuring readable and concise URLs for your web pages.",
  keywords: "slug, url, seo, text transform",
};

const ToolDetail = () => {
  const slug = "slug-generator";

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