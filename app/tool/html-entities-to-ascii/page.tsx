import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Entities to ASCII",
  description: "Decodes HTML entities and converts them into their corresponding ASCII characters for simplified text representation.",
};

const ToolDetail = () => {
  const slug = "html-entities-to-ascii";

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