import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Path Finder",
  description: "JSON Path Finder allows you to find and extract specific values or paths from JSON objects using the powerful JSONPath syntax. It enables you to perform advanced queries and navigate large JSON structures efficiently, making it ideal for debugging or extracting specific information from complex data sets.",
  keywords: "json path finder, jsonpath tool, extract json data, json path extractor, find json values, json path search, jsonpath query",
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