import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Minifier",
  description: "JSON Minifier removes unnecessary whitespace and formatting from JSON data to reduce file size and improve performance. It helps in optimizing JSON files for production environments, especially when working with large datasets or APIs. By compressing JSON files, it reduces download times and enhances overall web application performance.",
  keywords: "json minifier, minify json, compress json, json compression, reduce json size, minimize json, json optimizer",
};

const ToolDetail = () => {
  const slug = "json-minifier";

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