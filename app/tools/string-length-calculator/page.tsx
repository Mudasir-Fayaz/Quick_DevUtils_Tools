import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "String Length Calculator",
  description: "The String Length Calculator allows you to quickly calculate the number of characters in a string, including spaces and special symbols. This tool is helpful for content creators and developers working with string data.",
  keywords: "string length calculator, text length, character count, calculate string size, text size, string analysis, word count tool, measure text, string length checker, character measurement",
};

const ToolDetail = () => {
  const slug = "string-length-calculator";

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