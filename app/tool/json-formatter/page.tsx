import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Formatter",
  description: "Formats and beautifies JSON data to make it human-readable and easier to debug.",
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