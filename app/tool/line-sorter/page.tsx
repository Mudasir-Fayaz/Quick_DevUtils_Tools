import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Line Sorter",
  description: "Sorts lines of text alphabetically or numerically. It's great for organizing lists, names, or any type of text data that needs to be sorted.",
  keywords: "line sorter, sort text, sort lines, alphabetical sorter, text sorting tool, numeric line sorter",
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