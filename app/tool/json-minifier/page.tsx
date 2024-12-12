import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON Minifier",
  description: "Minifies JSON data by removing unnecessary spaces to reduce file size and improve performance.",
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