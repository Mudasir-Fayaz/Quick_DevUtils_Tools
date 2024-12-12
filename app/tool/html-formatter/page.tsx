import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Formatter",
  description: "Formats and beautifies messy or minified HTML for better readability.",
};

const ToolDetail = () => {
  const slug = "html-formatter";

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