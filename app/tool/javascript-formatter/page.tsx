import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JavaScript Formatter",
  description: "JavaScript Formatter helps format and organize your JavaScript code to improve readability and consistency. It automatically indents and structures your code, making it easier for developers to read, debug, and maintain. Whether you're working with complex code or trying to clean up a messy script, this tool ensures your code is well-organized and professional-looking.",
  keywords: "JavaScript formatter, beautify JavaScript, format JavaScript, code formatting, readable JavaScript, JavaScript beautifier",
};

const ToolDetail = () => {
  const slug = "javascript-formatter";

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