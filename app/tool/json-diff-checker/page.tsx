import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Diff Checker",
  description: "JSON Diff Checker compares two JSON objects side-by-side and highlights the differences for easy analysis. It helps developers compare different versions of JSON data, track changes, and identify discrepancies between two objects, making it a valuable tool for debugging, data migrations, or API responses comparison.",
  keywords: "json diff checker, compare json, json difference finder, json compare tool, json diff tool, compare two json, json comparison",
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