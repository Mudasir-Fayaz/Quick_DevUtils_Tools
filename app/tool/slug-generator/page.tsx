import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Slug Generator",
  description: "The Slug Generator creates clean, URL-friendly slugs from any text, making it easier to create SEO-friendly and readable web links.",
  keywords: "slug generator, url slug tool, url-friendly text, text to slug, slugify tool, create slugs, seo-friendly url, text to url, slug converter, web-friendly text",
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