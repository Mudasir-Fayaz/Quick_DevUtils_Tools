import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text Diff Checker",
  description: "The Text Diff Checker compares two text inputs side by side, highlighting differences between them for easier analysis and comparison. It's great for comparing document revisions or tracking changes in code.",
  keywords: "text diff checker, compare text, text comparison, text differences, diff tool, compare documents",
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