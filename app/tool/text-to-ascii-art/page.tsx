import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text to ASCII Art",
  description: "Transforms plain text into creative ASCII art for decorative or fun purposes.",
};

const ToolDetail = () => {
  const slug = "text-to-ascii-art";

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