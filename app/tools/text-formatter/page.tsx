import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text Formatter",
  description: "The Text Formatter allows you to format your text with various transformations such as capitalization, lowercasing, and more. It's a helpful tool for quickly adjusting text formatting.",
  keywords: "text formatter, capitalize text, lowercase text, format text, text case converter, text transformer",
};

const ToolDetail = () => {
  const slug = "text-formatter";

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