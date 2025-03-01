import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Validator",
  description: "JSON Validator ensures that your JSON data is correctly structured and syntactically valid. This tool checks for missing braces, commas, and other syntax errors, helping developers avoid common mistakes. It's perfect for ensuring that the JSON data you're working with will parse correctly in your application or API.",
  keywords: "json validator, validate json, json checker, check json syntax, online json validator, json validation tool, json syntax checker",
};

const ToolDetail = () => {
  const slug = "json-validator";

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