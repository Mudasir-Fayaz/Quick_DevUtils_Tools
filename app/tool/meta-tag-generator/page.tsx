import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Meta Tag Generator",
  description: "Meta Tag Generator helps generate SEO-friendly meta tags, such as meta descriptions and meta keywords, for better search engine optimization (SEO). It simplifies the process of adding meta tags to your web pages, making it easier to enhance visibility and ranking on search engines. This tool is essential for website owners and developers who want to improve their site’s SEO without manually crafting each meta tag. Whether you're working on a new site or optimizing an existing one, the Meta Tag Generator makes it quick and easy to implement SEO best practices.",
  keywords: "meta tag generator, SEO meta tags, create meta tags, meta description generator, SEO tools, online meta tag tool, HTML meta tags, meta title generator, website SEO, meta keywords",
};

const ToolDetail = () => {
  const slug = "meta-tag-generator";

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