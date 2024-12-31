import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "YAML to TOML",
  description: "Convert YAML documents to TOML format. This tool helps developers working with configuration files or data serialization to easily convert between these two formats. TOML is popular for its simplicity and readability in configuration files. This converter supports seamless transformation between YAML and TOML, facilitating smoother workflows for developers. Perfect for those working with both formats in various programming environments.",
  keywords: "yaml, toml, format conversion, data format",
};

const ToolDetail = () => {
  const slug = "yaml-toml";

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