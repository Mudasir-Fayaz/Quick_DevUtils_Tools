import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Viewer",
  description: "View, format, and preview HTML code with enhanced readability.",
};

const ToolDetail = () => {
  const slug = "html-viewer";

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