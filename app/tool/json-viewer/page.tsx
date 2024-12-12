import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Viewer",
  description: "View and parse JSON data in a tree format for easier exploration and analysis.",
};

const ToolDetail = () => {
  const slug = "json-viewer";

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