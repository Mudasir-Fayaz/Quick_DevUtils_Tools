import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON to TOML",
  description: "Convert JSON documents to TOML format. This conversion tool is designed for developers who need to work with TOML's simpler and more human-readable structure. TOML is often used for configuration files, while JSON is more commonly used for data exchange. This tool streamlines the process of converting JSON data into TOML to meet specific formatting requirements. It is useful for managing configuration files and improving readability in TOML format.",
  keywords: "json, toml, format conversion",
};

const ToolDetail = () => {
  const slug = "json-toml";

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