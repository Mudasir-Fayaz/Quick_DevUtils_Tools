import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "String Case Converter",
  description: "Change the case of text to uppercase, lowercase, or title case for formatting purposes.",
};

const ToolDetail = () => {
  const slug = "string-case-converter";

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