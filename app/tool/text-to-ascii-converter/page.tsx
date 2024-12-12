import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text to ASCII Converter",
  description: "Converts plain text into corresponding ASCII codes for encoding and data processing needs.",
};

const ToolDetail = () => {
  const slug = "text-to-ascii-converter";

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