import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Code Beautifier",
  description: "Code Beautifier is a tool that helps beautify and reformat messy JavaScript code into a clean and readable format. It automatically organizes your code with proper indentation, line breaks, and structure. This tool is a time-saver for developers who need to quickly clean up their code for better readability and maintenance.",
  keywords: "code beautifier, beautify JavaScript, format JavaScript, code cleaner, JavaScript formatting, reformat code",
};

const ToolDetail = () => {
  const slug = "code-beautifier";

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