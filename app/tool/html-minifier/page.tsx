import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Minifier",
  description: "Compresses and minifies HTML files to reduce size and improve performance.",
};

const ToolDetail = () => {
  const slug = "html-minifier";

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