import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Line Sorter",
  description: "Sorts lines of text alphabetically or numerically for better organization.",
};

const ToolDetail = () => {
  const slug = "line-sorter";

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