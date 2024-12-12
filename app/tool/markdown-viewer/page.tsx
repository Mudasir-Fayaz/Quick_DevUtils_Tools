import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Markdown Viewer",
  description: "Render and preview Markdown content as HTML for better visualization.",
};

const ToolDetail = () => {
  const slug = "markdown-viewer";

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