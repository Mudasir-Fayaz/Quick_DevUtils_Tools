import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Path Finder",
  description: "Finds and extracts specific values or data paths from JSON objects using JSONPath syntax.",
};

const ToolDetail = () => {
  const slug = "json-path-finder";

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