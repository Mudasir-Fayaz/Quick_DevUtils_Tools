import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Meta Tag Generator",
  description: "Generate SEO-friendly meta tags for better search engine optimization.",
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