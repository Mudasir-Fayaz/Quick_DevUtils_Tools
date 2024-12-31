import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Viewer",
  description: "JSON Viewer helps you view and parse JSON data in a tree format, making it easier to explore and analyze the structure of JSON objects. It helps developers understand complex JSON structures and quickly spot issues or errors in the data. This tool is essential for debugging API responses or working with JSON-formatted data in web applications.",
  keywords: "JSON viewer, parse JSON, view JSON, JSON tree viewer, JSON formatter, analyze JSON, structured JSON view",
};

const ToolDetail = () => {
  const slug = "json-viewer";

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