import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON to YAML",
  description: "Convert JSON documents to YAML format. This tool is ideal for developers who need to transform JSON data into a more human-readable format. YAML is more compact and easier to edit manually, making it suitable for configuration files and documentation. The tool ensures quick and accurate conversion between these popular data formats. It simplifies working with APIs, configurations, and data interchange.",
  keywords: "json, yaml, format conversion",
};

const ToolDetail = () => {
  const slug = "json-yaml";

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