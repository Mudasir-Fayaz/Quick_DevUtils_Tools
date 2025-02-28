import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Formatter",
  description: "JSON Formatter formats and beautifies JSON data to make it human-readable and easier to debug. It structures JSON into a more organized and visually appealing format, which is ideal for developers looking to work with JSON data quickly and efficiently. Whether you're troubleshooting an API response or cleaning up JSON for documentation, this tool ensures your data is easy to navigate and understand.",
  keywords: "json formatter, beautify json, format json, json beautifier, pretty json, json beautify tool, format json online",
};

const ToolDetail = () => {
  const slug = "json-formatter";

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