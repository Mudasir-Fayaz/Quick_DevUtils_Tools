import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "TOML Converter",
  description: "Convert TOML documents to and from JSON/YAML formats. This tool provides an efficient solution for developers who need to switch between TOML, JSON, and YAML formats. TOML is commonly used in configuration files, while JSON and YAML are more prevalent in data exchange. This converter helps streamline workflows by offering bidirectional conversion between these formats. It is essential for developers working with configuration files and managing data across various formats.",
  keywords: "toml, json, yaml, format conversion",
};

const ToolDetail = () => {
  const slug = "toml-converter";

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