import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Formatter",
  description: "HTML Formatter is a tool that beautifies and formats messy or minified HTML code to make it more readable. It automatically corrects the formatting, such as indentations and line breaks, to ensure your HTML is structured in a way that’s easier to understand and maintain. Perfect for web developers working with poorly formatted HTML, this tool improves readability and reduces debugging time. It’s a must-have for any developer needing to work with raw or compressed HTML code efficiently. Whether you're debugging, reviewing, or optimizing HTML, the formatter enhances your workflow.",
  keywords: "HTML formatter, beautify HTML, format HTML, prettify HTML, HTML beautifier, HTML formatting tool, online HTML formatter, code beautifier, readable HTML, web tools",
};

const ToolDetail = () => {
  const slug = "html-formatter";

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