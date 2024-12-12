import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML to Markdown Converter",
  description: "Easily converts HTML code into Markdown format for simplified content editing.",
};

const ToolDetail = () => {
  const slug = "html-to-markdown";

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