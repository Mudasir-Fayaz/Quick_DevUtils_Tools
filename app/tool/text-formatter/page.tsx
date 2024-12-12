import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text Formatter",
  description: "Formats text by applying capitalization, lowercasing, or other text transformations.",
};

const ToolDetail = () => {
  const slug = "text-formatter";

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