import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Diff Checker",
  description: "Compares two JSON objects side-by-side and highlights the differences for easy analysis.",
};

const ToolDetail = () => {
  const slug = "json-diff-checker";

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