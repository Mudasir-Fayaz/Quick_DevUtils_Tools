import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "YAML to JSON",
  description: "Convert YAML documents to JSON format. Ideal for developers working with data serialization and APIs. YAML is often used for configuration files, while JSON is the preferred format for web APIs. This tool makes it easy to convert YAML data into a format that's compatible with most web applications. It streamlines the workflow for developers working on data processing or API integration.",
  keywords: "yaml, json, format conversion, data format",
};

const ToolDetail = () => {
  const slug = "yaml-json";

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