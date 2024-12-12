import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text Diff Checker",
  description: "Compares two text inputs and highlights differences for side-by-side analysis.",
};

const ToolDetail = () => {
  const slug = "text-diff-checker";

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