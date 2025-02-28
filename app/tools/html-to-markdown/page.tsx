import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML to Markdown Converter",
  description: "HTML to Markdown Converter helps simplify content editing by converting HTML code into the Markdown format. It allows users to edit content more easily in a text-based format, which is cleaner and easier to work with. The tool is designed for content creators, web developers, and anyone who wants to convert complex HTML content into simpler Markdown. Whether you're looking to migrate content from HTML to Markdown or simplify editing workflows, this tool streamlines the process. It’s an efficient solution for content editing and conversion tasks.",
  keywords: "HTML to Markdown, HTML to Markdown converter, convert HTML, HTML to text, Markdown conversion, Markdown tools, content conversion, HTML simplifier, Markdown editor, HTML formatter",
};

const ToolDetail = () => {
  const slug = "html-to-markdown";

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