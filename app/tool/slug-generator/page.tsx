import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Slug Generator",
  description: "Generate clean, URL-friendly slugs from any text for better web links.",
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