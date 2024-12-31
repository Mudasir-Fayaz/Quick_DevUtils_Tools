import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Entities",
  description: "Convert text to HTML entities and vice versa. This tool helps when working with special characters like &, <, > in HTML documents.",
  keywords: "html, entities, encode, decode, special characters",
};

const ToolDetail = () => {
  const slug = "html-entities";

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