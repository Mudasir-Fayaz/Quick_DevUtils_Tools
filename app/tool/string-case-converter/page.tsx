import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "String Case Converter",
  description: "The String Case Converter allows you to change the case of text to uppercase, lowercase, or title case. It's useful for formatting text for websites, documents, or other written content.",
  keywords: "string case converter, uppercase converter, lowercase converter, title case tool, case formatting, text case changer, text formatting, convert text case, capitalize text, case adjustment",
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